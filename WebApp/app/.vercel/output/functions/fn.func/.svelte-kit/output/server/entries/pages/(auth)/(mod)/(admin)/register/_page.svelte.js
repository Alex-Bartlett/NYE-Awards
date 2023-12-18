import { c as create_ssr_component, d as createEventDispatcher, f as each, h as add_attribute, e as escape, v as validate_component } from "../../../../../../chunks/ssr.js";
import "devalue";
const PeopleDropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { people } = $$props;
  createEventDispatcher();
  if ($$props.people === void 0 && $$bindings.people && people !== void 0)
    $$bindings.people(people);
  return `<div class="flex flex-col items-center"><select class="bg-slate-800 text-xl w-52 p-2 rounded-md">${each(people, (person) => {
    return `<option${add_attribute("value", person.id, 0)}>${escape(person.name[0].toUpperCase() + person.name.substr(1))}</option>`;
  })}</select></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let { data } = $$props;
  let personId;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex flex-col items-center mt-5"><h1 class="text-2xl" data-svelte-h="svelte-nbokhq">Register</h1> <form action="?/register" method="POST" class="mt-10 flex flex-col items-center"><div data-svelte-h="svelte-tv5ork"><label class="block mb-1 text-lg" for="username">Username</label> <input class="bg-slate-800 text-xl w-52 p-2 rounded-md" type="text" id="username" name="username"></div> <div class="my-2" data-svelte-h="svelte-b3ph8"><label class="block mb-1 text-lg" for="password">Password</label> <input class="bg-slate-800 text-xl w-52 p-2 rounded-md" type="password" id="password" name="password"></div> <input type="hidden" id="personId" name="personId"${add_attribute("value", personId, 0)}> <div class="mb-5"><div class="text-lg mb-1" data-svelte-h="svelte-1d6kggu">Person</div> ${validate_component(PeopleDropdown, "PeopleDropdown").$$render($$result, { people: data.people }, {}, {})}</div> ${form?.user ? `<p class="text-red-500" data-svelte-h="svelte-1wkhkkr">Username is taken</p>` : ``} <button class="mt-2 w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75 disabled:bg-gray-600" type="submit" data-svelte-h="svelte-1qv3vnf">Register</button></form></div>`;
});
export {
  Page as default
};
