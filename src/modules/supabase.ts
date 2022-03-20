import { createClient } from '@supabase/supabase-js';

import { supabase_config } from '../config';

const supabaseUrl = supabase_config.VITE_SUPABASE_URL;
const supabaseAnonKey = supabase_config.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);