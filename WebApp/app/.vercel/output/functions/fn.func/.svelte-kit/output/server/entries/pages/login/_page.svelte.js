import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "devalue";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<div class="flex flex-col items-center mt-5"><h1 class="text-2xl" data-svelte-h="svelte-7o2kt2">Please log in to continue</h1> <form action="?/login" method="POST" class="mt-10 flex flex-col items-center"><div data-svelte-h="svelte-1cempc3"><label class="block mb-1 text-lg" for="username">Username</label> <input class="bg-slate-800 text-xl w-52 p-2 rounded-md" type="text" id="username" name="username" required></div> <div class="my-5" data-svelte-h="svelte-9s56h5"><label class="block mb-1 text-lg" for="password">Password</label> <input class="bg-slate-800 text-xl w-52 p-2 rounded-md" type="password" id="password" name="password"></div> ${form?.invalid ? `<p class="text-red-500" data-svelte-h="svelte-11mbg07">Username and password are required</p>` : ``} ${form?.credentials ? `<p class="text-red-500" data-svelte-h="svelte-1exc2pm">Invalid login credentials</p>` : ``} <button type="submit" class="mt-2 w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75 disabled:bg-gray-600" data-svelte-h="svelte-qs6bnv">Login</button></form></div>`;
});
export {
  Page as default
};
