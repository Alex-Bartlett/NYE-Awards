import "../../../../../../../../chunks/index.js";
import { s as supabase } from "../../../../../../../../chunks/supabaseClient.js";
const GET = async () => {
  const { data, err } = await supabase.from("quotes").select("id");
  return new Response(data.length, { status: 200 });
};
export {
  GET
};
