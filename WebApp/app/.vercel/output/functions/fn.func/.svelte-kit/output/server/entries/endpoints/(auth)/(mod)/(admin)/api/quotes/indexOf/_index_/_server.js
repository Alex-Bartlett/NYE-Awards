import { j as json } from "../../../../../../../../../chunks/index.js";
import { s as supabase } from "../../../../../../../../../chunks/supabaseClient.js";
import { F as FormatQuoteData, B as BadRequest } from "../../../../../../../../../chunks/helper.js";
const GET = async ({ params }) => {
  if (params.index) {
    const { data, err } = await supabase.from("quotes").select(`
			id,
			content,
			full_quote,
			quote_people (
				people (
					id,
					name
				)
			),
			quote_categories (
				categories (
					id,
					name
				)
			)
			`).order("id", { ascending: true }).range(params.index, params.index);
    if (data.length) {
      return json(FormatQuoteData(data[0]));
    }
    return new Response(null, { status: 404 });
  }
  return BadRequest("Missing index parameter");
};
const DELETE = async ({ params }) => {
  if (params.id) {
    await supabase.from("quotes").delete().eq("id", params.id);
    return new Response(null, { status: 204 });
  }
  return BadRequest("Missing id parameter");
};
export {
  DELETE,
  GET
};
