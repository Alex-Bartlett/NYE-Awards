import * as server from '../entries/pages/(auth)/vote/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(auth)/vote/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/vote/+page.server.js";
export const imports = ["_app/immutable/nodes/10.6ef52d70.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/index.6f54c819.js","_app/immutable/chunks/each.fb95c91e.js","_app/immutable/chunks/ListButton.abb2f25b.js"];
export const stylesheets = [];
export const fonts = [];
