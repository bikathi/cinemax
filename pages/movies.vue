<script setup lang="js">
	definePageMeta({
	    name: "movies"
	});
	const runtimeConfig = useRuntimeConfig()
</script>

<template>
	<main class="flex-grow p-5 grid grid-cols-6 gap-2">
		<div class="col-span-6">
			<h1 class="font-roboto text-3xl">Available Movies</h1>
		</div>
		<MovieDisplay
			v-for="a in 10"
			:key="a"
			posterLink="/images/extraction-2.jpg"
			movieId="1234567980347474"
			movieName="Extraction 2" />
	</main>
</template>
