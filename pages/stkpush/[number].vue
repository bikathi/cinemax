<script setup lang="js">
	import { BreedingRhombusSpinner } from 'epic-spinners'
	definePageMeta({
		name: "stkpush"
	});
	const route = useRoute();
	const initiating = ref(false);
	const runtimeConfig = useRuntimeConfig();
	const MPESA_CONSUMER_KEY = runtimeConfig.public.MPESA_CONSUMER_KEY;
	const MPESA_CONSUMER_SECRET = runtimeConfig.public.MPESA_CONSUMER_SECRET;
	const mpesaCredentials = btoa(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`);

	async function initiateStkPush() {
		initiating.value = true;
		console.log("starting request....");

		const {data, error} = await useFetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
			method: "GET",
			headers: {
				Authorization: `Basic ${mpesaCredentials}`,
			}
		});
		console.log(`data: ${JSON.stringify(data)}`);
		console.log(`error: ${JSON.stringify(error.value)}`);
		initiating.value = false;
	}
</script>

<template>
	<main class="flex-grow flex flex-col justify-center items-center space-y-2">
		<h1 class="font-ubuntu text-2xl sm:text-3xl">Ticket Purchase</h1>
		<p class="max-w-[95%] sm:max-w-[50%] font-nunito text-lg">
			By clicking 'Accept' below, you allow us to bill you
			<span class="text-purple-600">700Ksh</span> for your movie of choice
			to the number +{{ route.params.number }}.
		</p>
		<p
			class="max-w-[95%] sm:max-w-[50%] font-nunito text-lg border-l-[7px] border-[1px] p-2 sm:text-xl bg-yellow-200 border-yellow-500 rounded-md">
			Kindly note that the transaction is irreversible and non-refundable.
		</p>
		<button
			class="p-2 px-3 bg-purple-600 w-fit text-white rounded-full"
			@click="initiateStkPush">
			Accept
		</button>
	</main>
	<main
		v-if="initiating"
		class="absolute h-screen bg-slate-700 opacity-95 backdrop-blur-md w-full flex flex-col justify-center items-center space-y-2">
		<breeding-rhombus-spinner
			:animation-duration="2000"
			:size="65"
			color="#FFFFFF" />
		<h1 class="font-ubuntu text-2xl sm:text-3xl text-white">Initiating</h1>
	</main>
</template>
