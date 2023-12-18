import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { L as ListButton } from "../../chunks/ListButton.js";
import { p as page } from "../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="flex justify-center mt-20"><ul class="text-center flex flex-col w-1/2 sm:w-1/3 lg:w-1/6 xl:w-1/12">${validate_component(ListButton, "ListButton").$$render($$result, { href: "/vote", name: "Vote" }, {}, {})} ${$page.data.user.role === "MODERATOR" || $page.data.user.role === "ADMIN" ? `${validate_component(ListButton, "ListButton").$$render($$result, { href: "/prepare", name: "Prepare" }, {}, {})}` : ``} ${$page.data.user.role === "ADMIN" ? `${validate_component(ListButton, "ListButton").$$render($$result, { href: "/present", name: "Present" }, {}, {})} ${validate_component(ListButton, "ListButton").$$render($$result, { href: "/register", name: "Register" }, {}, {})}` : ``} ${$page.data.user ? `<li class="my-2" data-svelte-h="svelte-1aua1"><form action="/logout" method="POST"><button type="submit" class="rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-full inline-block transition-colors ease-in duration-75">Logout</button></form></li>` : ``}</ul></div>`;
});
export {
  Page as default
};
