<script>
	import ListButton from "$lib/components/ListButton.svelte";
	import { page } from "$app/stores";
</script>

<div class="flex justify-center mt-20">
	<ul class="text-center flex flex-col w-1/2 sm:w-1/3 lg:w-1/6 xl:w-1/12">
		<ListButton href="/vote" name="Vote" />
		{#if $page.data.user.role === "MODERATOR" || $page.data.user.role === "ADMIN"}
			<ListButton href="/prepare" name="Prepare" />
		{/if}
		{#if $page.data.user.role === "ADMIN"}
			<ListButton href="/present" name="Present" />
			<ListButton href="/register" name="Register" />
		{/if}
		{#if $page.data.user}
			<li class="my-2">
				<form action="/logout" method="POST">
					<button
						type="submit"
						class="rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-full inline-block transition-colors ease-in duration-75"
						>Logout
					</button>
				</form>
			</li>
		{/if}
	</ul>
</div>
