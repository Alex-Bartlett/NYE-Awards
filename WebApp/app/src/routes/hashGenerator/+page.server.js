import bcrypt from 'bcrypt';

const hash = async ({ request, fetch }) => {
	const data = await request.formData();
	const content = data.get('text');
	const hash = await bcrypt.hash(content, 10);
	console.log(hash);
};

export const actions = { hash }