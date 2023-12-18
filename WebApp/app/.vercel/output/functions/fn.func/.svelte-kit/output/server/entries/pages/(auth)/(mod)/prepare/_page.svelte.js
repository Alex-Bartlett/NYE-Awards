import { c as create_ssr_component } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col text-center mt-10"><div class="text-xl" data-svelte-h="svelte-ryrf16"><span class="text-red-500">Warning: </span>This will overwrite existing
		data!</div> <div class="mt-5"><button class="text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-auto transition-colors ease-in duration-75" id="confirmPrepare" type="submit" name="confirmPrepare" data-svelte-h="svelte-16sblqi">I understand</button></div></div>`;
});
export {
  Page as default
};
