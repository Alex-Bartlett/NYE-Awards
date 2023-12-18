import { c as create_ssr_component, f as each, v as validate_component } from "../../../../chunks/ssr.js";
import { L as ListButton } from "../../../../chunks/ListButton.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex justify-center mt-20"><ul class="text-center flex flex-col w-1/2 sm:w-1/3 lg:w-1/6 xl:w-1/12">${each(data.categories, (category) => {
    return `${validate_component(ListButton, "ListButton").$$render(
      $$result,
      {
        name: category.name,
        href: `/vote/${category.id}`,
        disabled: !data.unsubmittedCategoriesIds.includes(category.id)
      },
      {},
      {}
    )}`;
  })}</ul></div>`;
});
export {
  Page as default
};
