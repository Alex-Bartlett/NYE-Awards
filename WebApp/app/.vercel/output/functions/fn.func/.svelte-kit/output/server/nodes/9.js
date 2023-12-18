import * as server from '../entries/pages/(auth)/quotes/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(auth)/quotes/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/quotes/+page.server.js";
export const imports = ["_app/immutable/nodes/9.4a226d06.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/each.fb95c91e.js","_app/immutable/chunks/index.6f54c819.js"];
export const stylesheets = [];
export const fonts = [];
