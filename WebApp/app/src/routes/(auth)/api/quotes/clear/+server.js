import { supabase } from "$lib/supabaseClient";

export const DELETE = async () => {
	let { data, err } = await supabase
		.from('quotes')
		.delete()
		.gt('id', 0)
	return new Response(null, { status: 204 });
}