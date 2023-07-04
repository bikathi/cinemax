<script setup lang="js">
	const componentEmits = defineEmits(['loadMoreMovies', 'moviesDoneLoading'])
	const runtimeConfig = useRuntimeConfig();
	const movies = ref([]);
	const currentPage = ref(1);

	const {data, error} = await useFetch(
	    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
	    {
	        headers: {
	            Authorization: `Bearer ${runtimeConfig.public.TMDB_RAT}`
	        },
	        suspense: true,
            lazy: true,
            cache: 1000 * 60 * 60 // cache results for an hour
	    }
	);

    movies.value = await data.value.results.map((result) => {
        return result;
    });

    /*
    async function loadMoreMovies() {
        currentPage.value = currentPage.value + 1;
        componentEmits("loadMoreMovies");

        const {data, error} = await useFetch(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`,
            {
                headers: {
                    Authorization: `Bearer ${runtimeConfig.public.TMDB_RAT}`
                },
                suspense: false,
                lazy: true,
                cache: 1000 * 60 * 60 // cache results for an hour
            }
        );
        data.value.results.forEach((result) => {
            movies.value.push(result);
        });
    }
    */
</script>

<template>
	<div class="col-span-6">
		<h1 class="font-roboto text-3xl">Now Playing</h1>
	</div>
	<MovieDisplay
		v-for="(movie, index) in movies"
		:key="index"
		:posterLink="movie.poster_path"
		:movieId="index"
		:movieName="movie.title" />
	<div class="h-full flex justify-center items-center">
		<button
			class="nuxt-link w-fit mt-0 px-3"
			@click="">
			See More
		</button>
	</div>
</template>
