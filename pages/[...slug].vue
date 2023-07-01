<template>
	<div class="h-screen flex flex-col justify-center items-center">
		<img
			src="/core-svg/broken-link.svg"
			alt="broken-link"
			class="w-20" />
		<h1 class="text-3xl font-ubuntu">Oops!</h1>
		<h1 class="text-xl font-ubuntu">Seems like you have a broken link :(</h1>
		<NuxtLink :to="{name: 'home'}" class="nuxt-link">Go Home</NuxtLink>
	</div>
</template>
