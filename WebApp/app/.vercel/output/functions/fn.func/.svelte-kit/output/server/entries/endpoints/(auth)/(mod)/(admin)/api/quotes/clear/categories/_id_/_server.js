import { s as supabase } from "../../../../../../../../../../chunks/supabaseClient.js";
import { B as BadRequest } from "../../../../../../../../../../chunks/helper.js";
const DELETE = async ({ params }) => {
  if (params.id) {
    await supabase.from("quote_categories").delete().eq("quote_id", params.id);
    return new Response(null, { status: 204 });
  }
  return BadRequest("Missing id parameter");
};
export {
  DELETE
};
