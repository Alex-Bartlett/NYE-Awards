import "../../../../../../../../../chunks/index.js";
import { s as supabase } from "../../../../../../../../../chunks/supabaseClient.js";
import { B as BadRequest } from "../../../../../../../../../chunks/helper.js";
const PUT = async ({ request }) => {
  const body = await request.json();
  if (!body.quote_id) {
    return BadRequest("Missing argument quote_id");
  } else if (!body.category_id) {
    return BadRequest("Missing argument category_id");
  }
  await supabase.from("quote_categories").insert({
    quote_id: body.quote_id,
    category_id: body.category_id
  });
  return new Response(null, { status: 204 });
};
const DELETE = async ({ request }) => {
  const body = await request.json();
  if (!body.quote_id) {
    return BadRequest("Missing argument quote_id");
  } else if (!body.category_id) {
    return BadRequest("Missing argument category_id");
  }
  await supabase.from("quote_categories").delete().eq("quote_id", body.quote_id).eq("category_id", body.category_id);
  return new Response(null, { status: 204 });
};
export {
  DELETE,
  PUT
};
