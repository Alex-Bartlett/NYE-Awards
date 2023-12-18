import { c as create_ssr_component, f as each, e as escape } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div><h1 data-svelte-h="svelte-1pj7hf8">Categories</h1> <table><thead data-svelte-h="svelte-8ylax8"><th>ID</th> <th>Name</th></thead> <tbody>${each(data.categories, (category) => {
    return `<tr><td>${escape(category.id)}</td> <td>${escape(category.name)}</td> </tr>`;
  })}</tbody></table> <h1 class="mt-2" data-svelte-h="svelte-1w4ennq">People</h1> <table><thead data-svelte-h="svelte-8ylax8"><th>ID</th> <th>Name</th></thead> <tbody>${each(data.people, (person) => {
    return `<tr><td>${escape(person.id)}</td> <td>${escape(person.name)}</td> </tr>`;
  })}</tbody></table> <h1 data-svelte-h="svelte-1v1u3u5">Quotes</h1></div>`;
});
export {
  Page as default
};
