

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.f00e52a5.js","_app/immutable/chunks/scheduler.256b6e1f.js","_app/immutable/chunks/index.6f54c819.js"];
export const stylesheets = ["_app/immutable/assets/0.762c997d.css"];
export const fonts = [];
