import { createClient } from '@supabase/supabase-js';

// These values should be set in your environment (e.g. Netlify site settings)
// Vite automatically exposes variables prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
