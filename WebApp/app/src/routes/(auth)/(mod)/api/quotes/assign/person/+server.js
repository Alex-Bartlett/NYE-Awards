import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../../../helper';

export const PUT = async ({ request }) => {
	const body = await request.json();

	if (!body.quote_id) {
		return BadRequest('Missing argument quote_id');
	}
	else if (!body.person_id) {
		return BadRequest('Missing argument person_id');
	}
	const { error } = await supabase
		.from('quote_people')
		.insert({
			quote_id: body.quote_id,
			person_id: body.person_id
		})
	return new Response(null, { status: 204 });
}

export const DELETE = async ({ request }) => {
	const body = await request.json();

	if (!body.quote_id) {
		return BadRequest('Missing argument quote_id');
	}
	else if (!body.person_id) {
		return BadRequest('Missing argument person_id');
	}
	const { error } = await supabase
		.from('quote_people')
		.delete()
		.eq('quote_id', body.quote_id)
		.eq('person_id', body.person_id)
	return new Response(null, { status: 204 });
}