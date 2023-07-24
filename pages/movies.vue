<script setup lang="js">
	import {useMovieStore} from '~/stores/movies.js';
	import { BreedingRhombusSpinner } from 'epic-spinners';

	definePageMeta({
	    name: "movies",
	})
	const mountGridLoading = ref(false);
	const movieStore = useMovieStore();
	const { clearMovieList } = movieStore;

	onMounted(() => {
		clearMovieList();
	})
</script>

<template>
	<main
		class="flex-grow p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
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
				<main
					class="flex-grow w-full flex flex-col justify-center items-center space-y-2 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 2xl:col-span-7">
					<breeding-rhombus-spinner
						:animation-duration="2000"
						:size="65"
						color=" rgb(147 51 234)" />
					<h1
						class="font-ubuntu text-2xl sm:text-3xl text-purple-600">
						Loading...
					</h1>
				</main>
			</template>
		</Suspense>
		<MovieGridLoading
			v-if="mountGridLoading === true"
			v-for="a in 10" />
	</main>
</template>
../stores/movies.js
