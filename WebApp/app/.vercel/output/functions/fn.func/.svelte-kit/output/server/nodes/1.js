

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.cc6bb141.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/index.6f54c819.js","_app/immutable/chunks/stores.ef5854a9.js","_app/immutable/chunks/singletons.68086654.js"];
export const stylesheets = [];
export const fonts = [];
