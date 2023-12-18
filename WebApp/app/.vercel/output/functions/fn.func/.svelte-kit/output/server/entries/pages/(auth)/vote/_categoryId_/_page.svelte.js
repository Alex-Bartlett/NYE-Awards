import { c as create_ssr_component, e as escape, v as validate_component, f as each, h as add_attribute } from "../../../../../chunks/ssr.js";
const Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-full sm:w-2/3 lg:w-1/3 m-2 text-center bg-slate-700 border-emerald-600 border-2 rounded-md p-2">${slots.default ? slots.default({}) : ``}</div>`;
});
const maxSelectedQuotes = 3;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedQuotes;
  let emoji;
  let { data } = $$props;
  console.log(data.user);
  let quotes = Object.values(data.quotes);
  quotes.forEach((quote) => quote.isSelected = false);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  selectedQuotes = quotes.filter((quote) => quote.isSelected == true);
  emoji = selectedQuotes.length === maxSelectedQuotes ? "✔" : "❌";
  return `<div class="flex flex-col items-center"><h1 class="text-2xl">Voting for: ${escape(data.category.name)}</h1> ${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => {
      return `<p class="text-xl">${escape(selectedQuotes.length)} out of ${escape(maxSelectedQuotes)} selected ${escape(emoji)}</p> <ul class="text-lg my-2">${each(quotes.filter((q) => q.isSelected), (quote) => {
        return `<li class="text-left"><input type="checkbox"${add_attribute("id", quote.id, 0)}${add_attribute("value", quote.id, 0)}${add_attribute("name", quote.id, 0)} ${selectedQuotes.length >= maxSelectedQuotes && !selectedQuotes.includes(quote) ? "disabled" : ""}${add_attribute("checked", quote.isSelected, 1)}> <label${add_attribute("for", quote.id, 0)}>${escape(quote.content)}</label> </li>`;
      })}</ul> ${selectedQuotes.length === maxSelectedQuotes ? `<button class="mt-2 w-max text-lg rounded-md bg-emerald-700 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75 disabled:bg-gray-600" data-svelte-h="svelte-npat15">Submit</button>` : ``}`;
    }
  })} ${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => {
      return `<ul class="text-lg">${each(quotes.filter((q) => !q.isSelected), (quote) => {
        return `<li class="text-left"><input type="checkbox"${add_attribute("id", quote.id, 0)}${add_attribute("value", quote.id, 0)}${add_attribute("name", quote.id, 0)} ${selectedQuotes.length >= maxSelectedQuotes && !selectedQuotes.includes(quote) ? "disabled" : ""}${add_attribute("checked", quote.isSelected, 1)}> <label${add_attribute("for", quote.id, 0)}>${escape(quote.content)}</label> </li>`;
      })}</ul>`;
    }
  })} <div data-svelte-h="svelte-10j05a9"><a href="/vote" class="text-emerald-600 hover:underline">Cancel and return</a></div></div>`;
});
export {
  Page as default
};
