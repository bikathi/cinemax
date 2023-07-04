<script setup lang="js">
	definePageMeta({
	    name: "movies",
		keepalive: true
	});
	const mountGridLoading = ref(false);
</script>

<template>
	<main class="flex-grow p-5 grid grid-cols-6 gap-2">
		<Suspense>
			<MovieGrid
				@loadMoreMovies="
					() => {
						console.log('movies loading event emmitted');
						mountGridLoading = true;
					}
				"
				@moviesDoneLoading="
					() => {
						console.log('movies done loading');
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
