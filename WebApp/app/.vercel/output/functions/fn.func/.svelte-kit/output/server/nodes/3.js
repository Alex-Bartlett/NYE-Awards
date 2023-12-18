import * as server from '../entries/pages/(auth)/(mod)/_layout.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/(mod)/+layout.server.js";
export const imports = ["_app/immutable/nodes/3.a7a07bce.js","_app/immutable/chunks/4.d1b5dd9a.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/index.6f54c819.js"];
export const stylesheets = [];
export const fonts = [];
