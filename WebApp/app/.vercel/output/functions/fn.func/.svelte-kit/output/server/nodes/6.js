import * as server from '../entries/pages/(auth)/(mod)/(admin)/register/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(auth)/(mod)/(admin)/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/(mod)/(admin)/register/+page.server.js";
export const imports = ["_app/immutable/nodes/6.cde00889.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/index.6f54c819.js","_app/immutable/chunks/forms.4feac6f3.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.68086654.js","_app/immutable/chunks/navigation.c4a97ad3.js","_app/immutable/chunks/each.fb95c91e.js"];
export const stylesheets = [];
export const fonts = [];
