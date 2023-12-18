import { s as supabase } from "../../../../../../../../chunks/supabaseClient.js";
const DELETE = async () => {
  await supabase.from("quotes").delete().gt("id", 0);
  return new Response(null, { status: 204 });
};
export {
  DELETE
};
