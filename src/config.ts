let process: any;

const p = process?.env ? process.env : import.meta.env;

export const supabase_config = {
    "VITE_SUPABASE_URL": p.VITE_SUPABASE_URL,
    "VITE_SUPABASE_ANON_KEY": p.VITE_SUPABASE_ANON_KEY
};