<script>
	import "../app.css";
	import logo from "$lib/assets/moomawardslogo2025.png";
</script>

<header>
	<h1
		class="lg:mt-10 text-center text-emerald-600 text-5xl lg:text-6xl py-4 font-medium"
	>
		<a href="/" class="flex justify-center"
			><img
				class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5"
				src={logo}
				alt="Moom Awards 2023"
				srcset=""
			/></a
		>
	</h1>
</header>

<slot />
