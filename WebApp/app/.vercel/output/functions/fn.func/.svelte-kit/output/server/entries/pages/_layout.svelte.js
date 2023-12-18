import { c as create_ssr_component } from "../../chunks/ssr.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header data-svelte-h="svelte-1lb8nzx"><h1 class="text-center text-emerald-600 text-5xl lg:text-6xl py-4 font-medium"><a href="/">MooM Awards 2023</a></h1></header> ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
