<script setup lang="js">
	   definePageMeta({
	       name: "refferal"
	   });
	const route = useRoute();
	const reffererPhoneNumber = route.params.fromNumber;

	const refferalDetails = reactive({
	    targetPhoneNumber: null,
		fromPhoneNumber: reffererPhoneNumber
	});
	
	

	async function sendRefferalSMS() {
	    console.log("starting to send refferal message...");
	       const {data, error} = await useFetch("/api/send-refferal-sms", {
	           method: "POST",
	           body: JSON.stringify(refferalDetails)
	       });

	       console.log("refferal data: " + JSON.stringify(data));
	       console.log("refferal error: " + JSON.stringify(error));
	}
</script>

<template>
	<div class="flex-grow flex flex-col justify-center items-center">
		<!-- <qr-code text="hello world"> </qr-code> -->

		<div>
			<h1 class="text-3xl font-ubuntu">Invite A Friend Via SMS</h1>
			<form
				action="#"
				@submit.prevent="sendRefferalSMS"
				class="rounded-md border-[1px] p-2 sm:p-5 space-y-2 flex flex-col w-full">
				<label
					for="first-name"
					class="font-roboto tracking-wide font-normal my-1"
					>Friend's Phone Number</label
				>
				<input
					type="tel"
					placeholder="Jane"
					name="254xxxxxxxxxx"
					class="p-4 border-[1px] outline-none rounded-sm"
					v-model="refferalDetails.targetPhoneNumber"
					required />
				<button
					type="submit"
					class="bg-transparent border-[1px] text-black w-full sm:w-1/3 p-4 rounded-sm block">
					Refer Friend
				</button>
			</form>
		</div>
	</div>
</template>
