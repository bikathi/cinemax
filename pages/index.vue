<template>
	<div class="h-screen flex  place-content-center place-items-center">
		<div class="w-1/2 flex flex-col justify-center space-y-2">
			<h1 class="font-roboto text-6xl font-normal text-center">Cinemax</h1>
			<h2 class="font-normal text-3xl">
				Tired of Waiting In-Line to Get a Cinema Ticket?
			</h2>
			
			<div class="place-items-center p-1 flex justify-center">
				<input
					type="text"
					placeholder="what movie do you want to watch?"
					class="homepage-search" />
				<NuxtLink
					to="/movies"
					class="bg-purple-600 h-12 rounded-r-full w-[13%] inline-flex items-center justify-center"
					>Search</NuxtLink
				>
			</div>
		</div>
	</div>
</template>
