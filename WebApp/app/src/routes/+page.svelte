<script>
	import ListButton from "$lib/components/ListButton.svelte";
</script>

<div class="flex justify-center mt-20">
	<ul class="text-center flex flex-col w-1/2 sm:w-1/3 lg:w-1/6 xl:w-1/12">
		<ListButton href="/vote" name="Vote" />
		<ListButton href="/prepare" name="Prepare" />
		<ListButton href="/present" name="Present" />
	</ul>
</div>
