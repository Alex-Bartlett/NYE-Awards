import { c as create_ssr_component, h as add_attribute, e as escape } from "./ssr.js";
const ListButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { name } = $$props;
  let { disabled = false } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `<li class="my-2">${!disabled ? `<a class="text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-full inline-block transition-colors ease-in duration-75"${add_attribute("href", href, 0)} ${disabled ? "disabled" : ""}>${escape(name)}</a>` : `<div class="text-lg rounded-md bg-gray-600 py-2 px-4 w-full inline-block cursor-default">${escape(name)}</div>`}</li>`;
});
export {
  ListButton as L
};
