import { createClient } from "@supabase/supabase-js";
const VITE_SUPABASE_URL = "https://yyrwwljnegzhcwsottks.supabase.co";
const VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5cnd3bGpuZWd6aGN3c290dGtzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTQ3ODc1MCwiZXhwIjoyMDE3MDU0NzUwfQ.-YPz2vUAYSWpiNEPZQjxg5zN1a42A3_mXUNAxBSdXF4";
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
export {
  supabase as s
};
