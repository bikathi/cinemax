<script setup lang="js">
	import { BreedingRhombusSpinner } from 'epic-spinners'
	definePageMeta({
		name: "stkpush"
	});
	const route = useRoute();
	const authenticating = ref(false);
	const showProceed = ref(false);
	const showTryAgain = ref(false);

	// TODO: Replace this with more secure logic
	const mpesaAccessToken = ref("");

	async function initiateDarajaAuth() {
		// ensure we don't see the try again screen and the proceed screen at first
		showTryAgain.value = false;
		showProceed.value = false;

		// show the authenticating screen
		authenticating.value = true;

		const {data} = await useFetch("/daraja-auth");
		console.log(`data: ${JSON.stringify(data.value)}`);
		if(!data.value.successfull) {
			// show try again screen
			showTryAgain.value = true;
		} else {
			mpesaAccessToken.value = data.value.data.access_token;
			// show the proceed button
			showProceed.value = true;
		}
	}

	async function proceedWithStkPush() {
		console.log("proceeding with stkpush...");
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
			@click="initiateDarajaAuth">
			Accept
		</button>
	</main>
	<main
		v-if="authenticating"
		class="absolute h-screen bg-slate-700 opacity-95 backdrop-blur-md w-full flex flex-col justify-center items-center space-y-2">
		<div
			v-if="showProceed"
			class="flex flex-col justify-center items-center">
			<h1 class="font-ubuntu text-2xl sm:text-3xl text-white">
				Initialization Successfull. Proceed?
			</h1>
			<button
				class="p-2 px-3 bg-purple-600 w-fit text-white rounded-full"
				@click="proceedWithStkPush">
				Proceed.
			</button>
		</div>
		<div
			v-else-if="showTryAgain"
			class="flex flex-col justify-center items-center">
			<h1 class="font-ubuntu text-2xl sm:text-3xl text-white">
				Request Failed. Try Again?
			</h1>
			<button
				class="p-2 px-3 bg-purple-600 w-fit text-white rounded-full"
				@click="initiateDarajaAuth">
				Try Again.
			</button>
		</div>
		<div v-else>
			<breeding-rhombus-spinner
				:animation-duration="2000"
				:size="65"
				color="#FFFFFF" />
			<h1 class="font-ubuntu text-2xl sm:text-3xl text-white">
				Initiating
			</h1>
		</div>
	</main>
</template>
