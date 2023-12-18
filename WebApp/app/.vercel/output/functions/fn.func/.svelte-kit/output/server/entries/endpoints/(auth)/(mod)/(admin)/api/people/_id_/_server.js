import { j as json } from "../../../../../../../../chunks/index.js";
import { s as supabase } from "../../../../../../../../chunks/supabaseClient.js";
import { B as BadRequest } from "../../../../../../../../chunks/helper.js";
const GET = async ({ params }) => {
  if (params.id) {
    const { data, err } = await supabase.from("people").select().eq("id", params.id);
    if (data.length) {
      return json(data);
    }
    return new Response(null, { status: 404 });
  }
  return BadRequest("Missing id parameter");
};
const DELETE = async ({ params }) => {
  if (params.id) {
    await supabase.from("people").delete().eq("id", params.id);
    return new Response(null, { status: 204 });
  }
  return BadRequest("Missing id parameter");
};
export {
  DELETE,
  GET
};
