import * as server from '../entries/pages/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/5.8574d415.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/index.6f54c819.js","_app/immutable/chunks/ListButton.abb2f25b.js","_app/immutable/chunks/stores.ef5854a9.js","_app/immutable/chunks/singletons.68086654.js"];
export const stylesheets = [];
export const fonts = [];
