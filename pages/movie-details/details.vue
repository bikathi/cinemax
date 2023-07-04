<script setup lang="js">
	import {useMovieStore} from '~/store/movies.js';
	definePageMeta({
	    name: "details"
	})

	const route = useRoute();
	const runtimeConfig = useRuntimeConfig();
	const basePosterPath = runtimeConfig.public.MEDIA_BASE_PATH;
	const movieStore = useMovieStore();
	const {getMovie} = movieStore;
	const movie = ref({});

	movie.value = await getMovie(route.query.index);
	onMounted(() => {
		if(movie.value === undefined) {
			console.log("undefined vote_average");
			const movieId = route.query.id;
			fetch(
				`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
				{
					headers: {
						Authorization: `Bearer ${runtimeConfig.public.TMDB_RAT}`
					},
				}
			).then((response) => {
				return response.json();
			}).then((data) => {
				console.log(data);
				movie.value = data;
			});
		}
	});
</script>

<template>
	<main class="flex-grow">
		<div
			class="h-[30rem] bg-gradient-to-b from-purple-900 to-white w-full relative flex flex-col justify-between">
			<img
				src="/images/details-bg-1.jpg"
				alt="movie-poster"
				class="h-full w-full object-cover absolute mix-blend-overlay" />
			<h1 class="truncate font-ubuntu p-2 text-4xl text-white">
				{{ route.query.name }}
			</h1>
			<div class="h-fit w-full flex flex-col sm:flex-row">
				<div class="h-[22rem] sm:h-96 w-56 mx-4 rounded-md">
					<img
						:src="`${basePosterPath}${route.query.poster}`"
						alt="movie-poster"
						class="w-fit h-full object-cover rounded-md" />
				</div>
				<div class="flex flex-col justify-end mx-4 sm:mx-0">
					<h1 class="text-gray-400 font-ubuntu text-2xl">
						TMDB: {{ movie && Math.round(movie.vote_average * 10) /10 }} |
						{{ movie && movie.vote_count }}
					</h1>
					<h1 class="text-gray-400 font-ubuntu text-lg">
						Release Date: {{ movie && movie.release_date }}
					</h1>
				</div>
			</div>
		</div>
		<p class="p-4 font-nunito font-normal text-gray-700">
			{{ movie && movie.overview }}
		</p>
	</main>
</template>
