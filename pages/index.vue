<script setup lang="js">
	definePageMeta({
		name: "home"
	})
</script>

<template>
	<main class="flex flex-col justify-center items-center">
		<h1 class="font-roboto text-6xl font-normal text-center">Cinemax</h1>
		<h2 class="font-normal font-roboto tracking-wide text-2xl text-purple-600">
			Waiting In-Line to Get a Ticket?
		</h2>
		<h3 class="font-roboto font-normal tracking-wide text-xl">
			Get It Online Today. Ready?
		</h3>
		<NuxtLink
			:to="{ name: 'movies' }"
			class="bg-purple-600 font-nunito p-2 text-white rounded-full inline-flex 
			items-center justify-center text-lg w-fit"
			>See Available Movies</NuxtLink
		>
	</main>
</template>
