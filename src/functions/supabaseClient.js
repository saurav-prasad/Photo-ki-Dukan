import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    "https://kheueafubbxnachgmzyh.supabase.co", process.env.REACT_APP_SUPABASE_API_KEY
)
export default supabaseClient