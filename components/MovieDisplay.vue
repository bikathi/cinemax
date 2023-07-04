<script setup lang="js">
	const componentProps = defineProps({
	   posterLink: {
	       type: String,
	       default: null,
	       required: true
	   },
	   movieId: {
			type: Number,
			default: null,
			required: true
	   },
	   movieName: {
	       type: String,
	       default: null,
	       required: true
	   }
	});
	const basePosterPath = "https://image.tmdb.org/t/p/w500";
</script>

<template>
	<div class="flex flex-col h-fit relative group space-y-1">
		<img
			:src="`${basePosterPath}${posterLink}`"
			alt="movie-poster"
			class="h-[95%] w-full rounded-md object-fill group-hover:brightness-75" />
		<h1 class="font-nunito truncate">{{ movieName }}</h1>
		<div
			class="absolute top-[43%] w-full h-fit hidden group-hover:flex items-center justify-center">
			<NuxtLink
				:to="{
					name: 'details',
					query: { name: movieName.trim(), id: movieId },
				}"
				class="nuxt-link w-fit mt-0"
				>Learn More</NuxtLink
			>
		</div>
	</div>
</template>
