import { AppData } from '../types';
import { INITIAL_APP_DATA } from '../data/defaultData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'kkn_mas_kelompok_24_data_v6';

const isBrowser = () => typeof window !== 'undefined';

// 1. Synchronous Load (Local Cache / Fallback)
export const getStoredAppData = (): AppData => {
  if (!isBrowser()) {
    return INITIAL_APP_DATA;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_APP_DATA;
    }
    const parsed = JSON.parse(raw);
    return {
      home: { 
        ...INITIAL_APP_DATA.home, 
        ...(parsed.home || {}),
        stats: {
          ...INITIAL_APP_DATA.home?.stats,
          ...(parsed.home?.stats || {}),
          totalAnggota: Array.isArray(parsed.members) ? parsed.members.length : (parsed.home?.stats?.totalAnggota || INITIAL_APP_DATA.members.length),
          totalProker: Array.isArray(parsed.prokerList) ? parsed.prokerList.length : (parsed.home?.stats?.totalProker || INITIAL_APP_DATA.prokerList.length)
        }
      },
      members: parsed.members && Array.isArray(parsed.members) && parsed.members.length > 0 ? parsed.members : INITIAL_APP_DATA.members,
      prokerList: parsed.prokerList && Array.isArray(parsed.prokerList) ? parsed.prokerList : INITIAL_APP_DATA.prokerList,
      socials: { ...INITIAL_APP_DATA.socials, ...(parsed.socials || {}) },
      photos: parsed.photos && Array.isArray(parsed.photos) ? parsed.photos : INITIAL_APP_DATA.photos,
      afterMovie: { ...INITIAL_APP_DATA.afterMovie, ...(parsed.afterMovie || {}) }
    };
  } catch (err) {
    console.error('Error loading data from localStorage:', err);
    return INITIAL_APP_DATA;
  }
};

// 2. Asynchronous Fetch from Supabase Database
export const fetchAppDataFromSupabase = async (): Promise<AppData> => {
  const localData = getStoredAppData();

  if (!isSupabaseConfigured() || !supabase) {
    return localData;
  }

  try {
    const { data, error } = await supabase
      .from('site_data')
      .select('data')
      .eq('id', 'kkn_wonoagung_data')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch error, using local cache:', error.message);
      return localData;
    }

    if (data && data.data) {
      const dbAppData: AppData = data.data;
      
      // Pastikan statistik anggota & proker selalu akurat
      if (dbAppData.home && dbAppData.home.stats) {
        if (Array.isArray(dbAppData.members)) {
          dbAppData.home.stats.totalAnggota = dbAppData.members.length;
        }
        if (Array.isArray(dbAppData.prokerList)) {
          dbAppData.home.stats.totalProker = dbAppData.prokerList.length;
        }
      }

      // Cache ke localStorage dengan proteksi quota
      if (isBrowser()) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbAppData));
        } catch (storageErr) {
          console.warn('LocalStorage caching failed (quota limit):', storageErr);
        }
      }
      return dbAppData;
    } else {
      // Jika database Supabase benar-benar belum memiliki baris data, lakukan initial seed
      console.log('No data row found in Supabase, seeding initial data...');
      await saveAppDataToSupabase(localData);
      return localData;
    }
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err);
    return localData;
  }
};

// 3. Asynchronous Save to Supabase & LocalStorage
export const saveAppDataToSupabase = async (data: AppData): Promise<{ success: boolean; error?: string }> => {
  // Pastikan data stats anggota sinkron
  const synchronizedData: AppData = {
    ...data,
    home: {
      ...data.home,
      stats: {
        ...data.home?.stats,
        totalAnggota: data.members?.length || 0,
        totalProker: data.prokerList?.length || 0,
        totalDusun: data.home?.stats?.totalDusun || 5,
        targetMasyarakat: data.home?.stats?.targetMasyarakat || '1.200+ Warga'
      }
    }
  };

  // 1. Simpan ke LocalStorage cache terlebih dahulu
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(synchronizedData));
    } catch (e) {
      console.warn('Failed saving to localStorage (quota or disabled):', e);
    }
  }

  // 2. Jika Supabase terkonfigurasi, upsert ke database
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('site_data')
        .upsert({
          id: 'kkn_wonoagung_data',
          data: synchronizedData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error upserting to Supabase:', error);
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      console.error('Failed saving to Supabase:', err);
      return { success: false, error: err?.message || 'Error saving data to database' };
    }
  }

  return { success: true };
};

export const saveAppData = (data: AppData): void => {
  saveAppDataToSupabase(data);
};

export const resetToDefaultData = (): AppData => {
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APP_DATA));
    } catch (err) {
      console.error('Error resetting data:', err);
    }
  }
  saveAppDataToSupabase(INITIAL_APP_DATA);
  return INITIAL_APP_DATA;
};
