<script setup lang="js">
	definePageMeta({
	    name: "movies",
		keepalive: true
	});
	const mountGridLoading = ref(false);
</script>

<template>
	<main class="flex-grow p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
		<Suspense>
			<MovieGrid
				@loadMoreMovies="
					() => {
						mountGridLoading = true;
					}
				"
				@moviesDoneLoading="
					() => {
						mountGridLoading = false;
					}
				" />
			<template #fallback>
				<h1>loading...</h1>
			</template>
		</Suspense>
		<MovieGridLoading
			v-if="mountGridLoading === true"
			v-for="a in 14" />
	</main>
</template>
