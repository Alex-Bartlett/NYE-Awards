<script>
  import { enhance } from "$app/forms";
  export let form;
</script>

<div class="flex flex-col items-center mt-5">
  <h1 class="text-2xl">Please log in to continue</h1>

  <form
    action="?/login"
    method="POST"
    use:enhance
    class="mt-10 flex flex-col items-center"
  >
    <div>
      <label class="block mb-1 text-lg" for="username">Username</label>
      <input
        class="bg-slate-800 text-xl w-52 p-2 rounded-md"
        type="text"
        id="username"
        name="username"
        required
      />
    </div>
    <div class="my-5">
      <label class="block mb-1 text-lg" for="password">Password</label>
      <input
        class="bg-slate-800 text-xl w-52 p-2 rounded-md"
        type="password"
        id="password"
        name="password"
      />
    </div>

    {#if form?.invalid}
      <p class="text-red-500">Username and password are required</p>
    {/if}
    {#if form?.credentials}
      <p class="text-red-500">Invalid login credentials</p>
    {/if}
    <button
      type="submit"
      class="mt-2 w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75 disabled:bg-gray-600"
      >Login</button
    >
  </form>
</div>
