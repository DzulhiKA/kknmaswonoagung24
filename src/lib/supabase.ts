import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Periksa apakah URL dan Key sudah dikonfigurasi secara valid oleh pengguna
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-supabase-project-id') &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  );
};

// Singleton instance Supabase client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Simpan session di localStorage agar persist saat refresh
        persistSession: true,
        // Deteksi perubahan session dari tab/window lain secara otomatis
        detectSessionInUrl: false,
        autoRefreshToken: true,
      },
    })
  : null;

// ============================================================
// AUTH HELPERS — Supabase Auth-based admin session management
// ============================================================

/** Login admin menggunakan email & password via Supabase Auth */
export const signInAdmin = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
};

/** Logout admin — menghapus session dari Supabase */
export const signOutAdmin = async (): Promise<void> => {
  if (!supabase) return;
  await supabase.auth.signOut();
};

/** Ambil session admin yang aktif (null jika belum login) */
export const getAdminSession = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
};

/**
 * Subscribe ke perubahan auth state.
 * Callback akan dipanggil setiap kali user login/logout
 * dari TAB MANAPUN di browser yang sama.
 * @returns fungsi unsubscribe
 */
export const onAuthStateChange = (
  callback: (isLoggedIn: boolean) => void
): (() => void) => {
  if (!supabase) return () => {};
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(!!session);
  });
  return () => listener.subscription.unsubscribe();
};
