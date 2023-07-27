<script setup lang="js">
	import { BreedingRhombusSpinner } from 'epic-spinners';

	definePageMeta({
		name: "stkpush"
	});
	const route = useRoute();
	const attemptingTransaction = ref(false);
	const showTryAgain = ref(false);
	const tryingStkPush = ref(false);

	async function initiateStkPush() {
		//show attempting transaction screen
		attemptingTransaction.value = true;

		// ensure the try again screen is hidden
		showTryAgain.value = false;

		// show the trying stkpush screen though
		tryingStkPush.value = true;
		const requestBody = {
			clientNumber: Number(route.params.number),
		}

		console.log("proceeding to attempt transaction...");
		const{data, error} = await useFetch("/initiate-stkpush", {
			method: "POST",
			body: JSON.stringify(requestBody),
		});
		console.log("data: " + data.value);
		console.log("error: " + error.value);

		if(data.value.message === "failed to get auth token") {
			console.log("attempt for transaction failed. please try again...");
			// if we were not able to request for an STK push start the entire process again
			tryingStkPush.value = false;
			showTryAgain.value = true;
		} else if(data.value.message === "transaction success") {
			navigateTo({name: "ticket", params: {fromNumber: route.params.number}});
		} else if(data.value.message === "transaction failed") {
			tryingStkPush.value = false;
			showTryAgain.value = true;
		}
		console.log("STK push was succcessfull...");
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
		v-if="attemptingTransaction"
		class="absolute h-screen bg-slate-700 opacity-95 backdrop-blur-md w-full flex flex-col justify-center items-center space-y-2">
		<div
			v-if="showTryAgain"
			class="flex flex-col justify-center items-center">
			<h1 class="font-ubuntu text-2xl sm:text-3xl text-white">
				Attempt Failed. Try Again?
			</h1>
			<button
				class="p-2 px-3 bg-purple-600 w-fit text-white rounded-full"
				@click="initiateStkPush">
				Try Again.
			</button>
		</div>
		<div
			v-else-if="tryingStkPush"
			class="flex flex-col justify-center items-center">
			<breeding-rhombus-spinner
				:animation-duration="2000"
				:size="65"
				color="#FFFFFF" />
			<h1 class="font-ubuntu text-2xl sm:text-3xl text-white">
				Attempting Transaction
			</h1>
		</div>
	</main>
</template>
