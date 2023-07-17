import { defineStore } from 'pinia';

export const useMovieStore = defineStore('MovieStore', () => {
	const movies = ref([]);

	function addMovie(movie) {
		movies.value.push(movie);
	}

	async function getMovie(id) {
		return movies.value[id];
	}

	function clearMovieList() {
		movies.value = [];
	}

	return {
		movies,
		addMovie,
		getMovie,
		clearMovieList,
	};
});
