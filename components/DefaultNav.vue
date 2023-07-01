<script setup lang="js">
	const routeLinks = [
		{name: "Home", toName: "home"},
		{name: "Movies", toName: "movies"},
		{name: "About", toName: "about"},
	];

	const route = useRoute();
</script>

<template>
	<nav class="py-2 text-center border-b-2 flex items-center">
		<div class="w-1/2 text-start ml-5">
			<NuxtLink
				to="/"
				class="font-ubuntu text-2xl"
				>Cinemax</NuxtLink
			>
			<h2 class="font-nunito">Easily Book Movie Tickets Online</h2>
		</div>
		<div class="w-1/2 text-start px-10">
			<NuxtLink
				v-for="(link, index) in routeLinks"
				:key="index"
				:to="{ name: link.toName }"
				:class="route.name === link.toName ? 'active-route-link' : ''"
				class="font-roboto text-lg mx-2 tracking-wide hover:transition-all hover:border-b-2 hover:border-b-purple-600 duration-300"
				>{{ link.name }}</NuxtLink
			>
		</div>
	</nav>
</template>
