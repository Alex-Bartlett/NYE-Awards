<script>
  import { enhance } from "$app/forms";
  export let form;
</script>

<h1>Login</h1>

<form action="?/login" method="POST" use:enhance>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" required />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" />
  </div>

  {#if form?.invalid}
    <p class="text-red-500">Username and password are required</p>
  {/if}
  {#if form?.credentials}
    <p class="text-red-500">Invalid login credentials</p>
  {/if}
  <button type="submit">Login</button>
</form>
