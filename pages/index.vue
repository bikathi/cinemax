<template>
	<div class="h-screen flex px-2">
		<div class="w-1/2 flex flex-col justify-center space-y-2">
			<h1 class="font-roboto text-6xl font-normal">Cinemax</h1>
			<h2 class="font-normal text-3xl">
				Tired of Waiting In-Line to Get a Cinema Ticket?
			</h2>
			<p class="font-nunito text-xl">
				Well then, you're in luck. At Cinemax, we pride ourselves
				in ensuring you no longer have to queue in lines to enjoy
				movie nights. Book your tickets for any one of our cinemas for
				the movie of your choice and conviniently pay with your M-Pesa.
			</p>
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
		<div class="w-1/2 flex flex-col justify-center items-center">
			<img
				src="/images/clear-bg-landing.png"
				alt="landing-img"
				class="w-2/3" />
		</div>
	</div>
</template>
