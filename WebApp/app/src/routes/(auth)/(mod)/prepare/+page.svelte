<script>
	import { goto } from "$app/navigation";
</script>

<div class="flex flex-col text-center mt-10">
	<div class="text-xl">
		<span class="text-red-500">Warning: </span>This will overwrite existing
		data!
	</div>
	<div class="mt-5">
		<a
			class="text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-auto transition-colors ease-in duration-75"
			id="confirmPrepare"
			href="/prepare/0">I understand</a
		>
	</div>
</div>
