import { AppData } from '../types';
import { INITIAL_APP_DATA } from '../data/defaultData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'kkn_mas_kelompok_24_data_v5';

const isBrowser = () => typeof window !== 'undefined';

// 1. Synchronous Load (Local Cache / Fallback)
export const getStoredAppData = (): AppData => {
  if (!isBrowser()) {
    return INITIAL_APP_DATA;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APP_DATA));
      return INITIAL_APP_DATA;
    }
    const parsed = JSON.parse(raw);
    return {
      home: { 
        ...INITIAL_APP_DATA.home, 
        ...(parsed.home || {}),
        stats: {
          ...INITIAL_APP_DATA.home?.stats,
          ...(parsed.home?.stats || {})
        }
      },
      members: parsed.members && Array.isArray(parsed.members) ? parsed.members : INITIAL_APP_DATA.members,
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
      console.warn('Supabase fetch error, using local fallback:', error.message);
      return localData;
    }

    if (data && data.data) {
      const dbAppData: AppData = data.data;
      // Cache ke localStorage
      if (isBrowser()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dbAppData));
      }
      return dbAppData;
    } else {
      // Jika di DB belum ada row, lakukan initial insert
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
  // Simpan dulu ke local cache
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed saving to localStorage:', e);
    }
  }

  // Jika Supabase terkonfigurasi, upsert ke database
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('site_data')
        .upsert({
          id: 'kkn_wonoagung_data',
          data,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error upserting to Supabase:', error);
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      console.error('Failed saving to Supabase:', err);
      return { success: false, error: err?.message || 'Error saving data' };
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

// Auth admin kini dikelola sepenuhnya oleh Supabase Auth.
// Lihat: src/lib/supabase.ts → signInAdmin, signOutAdmin, onAuthStateChange
