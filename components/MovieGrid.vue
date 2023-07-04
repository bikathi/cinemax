<script setup lang="js">
	import {useMovieStore} from '~/store/movies.js';
	
	const componentEmits = defineEmits(['loadMoreMovies', 'moviesDoneLoading'])
	const runtimeConfig = useRuntimeConfig();
	const movies = ref([]);
	const currentPage = ref(1);
	const movieStore = useMovieStore();
	const { addMovie } = movieStore;

	const {data, error} = await useFetch(
	    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
	    {
	        headers: {
	            Authorization: `Bearer ${runtimeConfig.public.TMDB_RAT}`
	        },
	        suspense: true,
	    }
	);

    movies.value = await data.value.results.map((result) => {
		addMovie(result);
        return result;
    });

    async function loadMoreMovies() {
        
        componentEmits("loadMoreMovies");

        const {data, error} = await useFetch(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage.value}`,
            {
                headers: {
                    Authorization: `Bearer ${runtimeConfig.public.TMDB_RAT}`
                },
                suspense: false,
            }
        );
        data.value.results.forEach((result) => {
            movies.value.push(result);
			addMovie(result);
        });
		componentEmits("moviesDoneLoading");
    }
</script>

<template>
	<div class="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 2xl:col-span-7">
		<h1 class="font-roboto text-3xl">Now Playing</h1>
	</div>
	<MovieDisplay
		v-for="(movie, index) in movies"
		:key="index"
		:posterLink="movie.poster_path"
		:movieId="movie.id"
		:movieIndex="index"
		:movieName="movie.title" />
	<div class="h-full flex justify-center items-center">
		<button
			class="nuxt-link w-fit mt-0 px-3"
			@click="() => {
				currentPage++;
				loadMoreMovies();
			}">
			See More
		</button>
	</div>
</template>
