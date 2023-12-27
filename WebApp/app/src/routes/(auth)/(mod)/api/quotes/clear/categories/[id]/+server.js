import { supabase } from "$lib/supabaseClient";
import { BadRequest } from '../../../../helper';

export const DELETE = async ({ params }) => {
	if (params.id) {
		let { data, error } = await supabase
			.from('quote_categories')
			.delete()
			.eq("quote_id", params.id)
		return new Response(null, { status: 204 });
	}
	return BadRequest('Missing id parameter');
}