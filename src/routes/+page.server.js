// import * as db from '../lib/server/database';
import * as db from '$lib/server/database';

export function load({ cookies }) {
	const id = cookies.get('userid');

	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}

	return {
		todos: db.getTodos(id) ?? []
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		db.createTodo(cookies.get('userid'), data.get('description'));
	}
};