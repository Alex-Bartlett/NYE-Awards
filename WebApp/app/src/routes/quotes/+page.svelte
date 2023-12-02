<script>
	export let data;
</script>

<div>
	<h1>Categories</h1>
	<table>
		<thead>
			<th>ID</th>
			<th>Name</th>
		</thead>
		<tbody>
			{#each data.categories as category}
				<tr>
					<td>{category.id}</td>
					<td>{category.name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<h1 class="mt-2">People</h1>
	<table>
		<thead>
			<th>ID</th>
			<th>Name</th>
		</thead>
		<tbody>
			{#each data.people as person}
				<tr>
					<td>{person.id}</td>
					<td>{person.name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
