import { c as create_ssr_component, f as each, h as add_attribute, e as escape, v as validate_component } from "../../../../../../chunks/ssr.js";
const CategoryChecklist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { categories } = $$props;
  let { quote } = $$props;
  let { activeCategories } = $$props;
  function GetActiveCategories(categories2, quote2) {
    let newCategories = categories2;
    quote2.categories.forEach((category) => {
      newCategories.forEach((activeCategory) => {
        if (activeCategory.id == category.id) {
          activeCategory.active = true;
        }
      });
    });
    activeCategories = newCategories;
  }
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  if ($$props.quote === void 0 && $$bindings.quote && quote !== void 0)
    $$bindings.quote(quote);
  if ($$props.activeCategories === void 0 && $$bindings.activeCategories && activeCategories !== void 0)
    $$bindings.activeCategories(activeCategories);
  {
    GetActiveCategories(categories, quote);
  }
  return `  ${each(activeCategories, (category) => {
    return `<div><input type="checkbox"${add_attribute("id", `category-${category.id}`, 0)}${add_attribute("value", category.id, 0)}${add_attribute("name", category.name, 0)} ${category.active ? "checked" : ""}> <label${add_attribute("for", `category-${category.id}`, 0)}>${escape(category.name)}</label> </div>`;
  })}`;
});
const PeopleChecklist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { people } = $$props;
  let { quote } = $$props;
  let { activePeople } = $$props;
  function GetActivePeople(people2, quote2) {
    let newPeople = people2;
    quote2.people.forEach((person) => {
      newPeople.forEach((activePerson) => {
        if (activePerson.id == person.id) {
          activePerson.active = true;
        }
      });
    });
    activePeople = newPeople;
  }
  if ($$props.people === void 0 && $$bindings.people && people !== void 0)
    $$bindings.people(people);
  if ($$props.quote === void 0 && $$bindings.quote && quote !== void 0)
    $$bindings.quote(quote);
  if ($$props.activePeople === void 0 && $$bindings.activePeople && activePeople !== void 0)
    $$bindings.activePeople(activePeople);
  {
    GetActivePeople(people, quote);
  }
  return `  ${each(activePeople, (person) => {
    return `<div><input type="checkbox"${add_attribute("id", `person-${person.id}`, 0)}${add_attribute("value", person.id, 0)}${add_attribute("name", person.name, 0)} ${person.active ? "checked" : ""}> <label${add_attribute("for", `person-${person.id}`, 0)}>${escape(person.name[0].toUpperCase() + person.name.substr(1))}</label> </div>`;
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let categoryChecklist;
  let peopleChecklist;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${data.quote ? `<div class="flex flex-col justify-center mt-10"><div class="text-center"><h2 class="text-2xl">${escape(data.quote.full_quote)}</h2></div> <div class="flex justify-center mt-10"><div class="flex flex-col sm:flex-row flex-grow sm:flex-grow-0 justify-center px-10 sm:px-0 sm:w-2/3 xl:w-1/2"><div class="rounded-lg border-2 border-slate-300 px-4 pb-3 pt-2 h-auto w-full md:w-1/2 lg:w-2/5 xl:w-1/3 ml-0 sm:mr-10 mb-5 sm:mb-0"><h3 class="text-lg mb-2" data-svelte-h="svelte-8yfi6a">Categories</h3> ${validate_component(CategoryChecklist, "CategoryChecklist").$$render(
      $$result,
      {
        categories: data.categories,
        quote: data.quote,
        this: categoryChecklist
      },
      {
        this: ($$value) => {
          categoryChecklist = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="rounded-lg border-2 border-slate-300 px-4 pb-3 pt-2 h-auto w-full md:w-1/2 lg:w-2/5 xl:w-1/3 ml-0 sm:ml-10"><h3 class="text-lg mb-2" data-svelte-h="svelte-zs1i4z">People</h3> ${validate_component(PeopleChecklist, "PeopleChecklist").$$render(
      $$result,
      {
        people: data.people,
        quote: data.quote,
        this: peopleChecklist
      },
      {
        this: ($$value) => {
          peopleChecklist = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div> <div class="flex justify-center mt-10"><button class="w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75" data-svelte-h="svelte-t5km0p">Save and continue</button></div></div>` : `<h2 data-svelte-h="svelte-mq16uh">You have reached the end</h2> <a href="/" data-svelte-h="svelte-901p0i">Return home</a>`} `;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
