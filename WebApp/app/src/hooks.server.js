import { supabase } from '$lib/supabaseClient.js';
import { sequence } from '@sveltejs/kit/hooks';

// Auth
const first = async ({ resolve, event }) => {
	const session = event.cookies.get('session');

	// If no session token, load page as normal
	if (!session) {
		console.log("no session");
		return await resolve(event);
	}

	// Find user based on session
	const userRes = await supabase.from('users').select('username, role, person_id').eq('user_auth_token', session).single();
	const user = userRes.data;
	if (user) {
		event.locals.user = {
			name: user.username,
			role: user.role,
			person_id: user.person_id
		}
	}

	return await resolve(event);
}

// CORS
const second = async ({ resolve, event }) => {
	// Apply CORS header for API routes
	const apiKey = event.request.headers.get('API-key');
	let apiKeyValid = false
	// Validate api key if exists
	if (apiKey) {
		const { data, error } = await supabase.from('api_keys').select().eq('key', apiKey).single();
		if (data) {
			apiKeyValid = true;
		}
	}
	if (event.url.pathname.startsWith('/api')) {
		// Simple API authorisation
		if ((!event.locals.user || !event.locals.user.role === 'ADMIN') && !apiKeyValid) {
			return new Response(null, { status: 403 })
		}
		// Required for CORS to work
		if (event.request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*',
				}
			});
		}
	}

	const response = await resolve(event);
	if (event.url.pathname.startsWith('/api')) {
		response.headers.append('Access-Control-Allow-Origin', `*`);
	}
	return response;
};

export const handle = sequence(first, second)