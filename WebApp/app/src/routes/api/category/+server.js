// import { json } from '@sveltejs/kit';

// export const GET = () => {
// 	return json({ hello: "world" });
// }

// export const POST = async ({ request, cookies }) => {
// 	const body = await request.json();
// 	console.log(body);
// 	return new Response(JSON.stringify({ message: "success" }), { status: 201 });
// }

import { supabase } from "$lib/supabaseClient";

export const GET = async () => {
	const { data } = await supabase.from("quotes").select();
	return new Response(JSON.stringify({ quotes: data ?? [] }), { status: 201 });
}