import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
export const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
