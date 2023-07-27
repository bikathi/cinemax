<script setup lang="js">

	const route = useRoute();
	       const linkValid = ref("")

	   async function confirmMyRefferalLink() {
	       const {data, error} = await useFetch("/api/confirm-refferal-link", {
	        method: "POST",
	        body: route.params.id
	    });

	    console.log("Confirm response data:"  + JSON.stringify(data.value, null, 2))
	    console.log("Confirm response error:"  + JSON.stringify(error.value, null, 2));

	       if(data.value.successfull === true) {
	           linkValid.value = true;
	       } else {
	           linkValid.value = false;
	       }
	   }
</script>

<template>
	<h1>hello world welcome to ref</h1>
	<button
		@click="confirmMyRefferalLink"
		class="bg-red-500 p-2 rounded-md text-white w-fit">
		Confirm my link
	</button>
	<div v-if="linkValid === true">
		<h1 class="text-3xl">
			Thankyou for showwing interest in Cinemax. Proceed to buy a ticket
			to receive your coupon discount as our new client
		</h1>
		<NuxtLink
			:to="{ name: 'movies' }"
			class="text-3xl bg-red-500"
			>Proceed To Use My Coupon</NuxtLink
		>
	</div>
	<div v-else-if="linkValid === false">
		<h1 class="text-3xl">
			Invalid link. Click the button below to go home
		</h1>
		<NuxtLink
			:to="{ name: 'home' }"
			class="text-3xl bg-red-500"
			>Take Me Home</NuxtLink
		>
	</div>
</template>
