import { j as json } from "../../../../../../../chunks/index.js";
import { s as supabase } from "../../../../../../../chunks/supabaseClient.js";
const GET = async () => {
  let { data, err } = await supabase.from("people").select().order("name");
  if (err) {
    console.error(err);
  }
  return json(data);
};
const POST = async ({ request }) => {
  const body = await request.json();
  if (body.name) {
    const { data, err } = await supabase.from("people").insert({ name: body.name }).select();
    return new Response(JSON.stringify(data), {
      status: 201
    });
  }
  return BadRequest("Missing name argument");
};
function BadRequest(err) {
  return new Response(err, { status: 400 });
}
export {
  GET,
  POST
};
