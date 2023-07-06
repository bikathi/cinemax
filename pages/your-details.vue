<script setup lang="js">
	import { LoopingRhombusesSpinner } from 'epic-spinners';

	definePageMeta({
		name: "your-details",
		keepalive: true
	})
	const route = useRoute();
	const router = useRouter();
	const clientData = reactive({
		firstName: null,
		lastName: null,
		email: null,
		mobileNumber: null,
		location: null
	});
	const submittingForm = ref(false);

	async function saveClientDetails() {
		submittingForm.value = true;
		const {data, error} = await useFetch("/api/save-client-details", {
			method: "POST",
			body: JSON.stringify(clientData)
		});
		if(data.value.successfull) {
			// save the data.value.data.clientDetails to a Store for later refference

			submittingForm.value = false;

			// go to where mpesa starts
			router.push({name: 'stkpush', params: {number: `254${clientData.mobileNumber}`}});

		} else {
			// a notification for incase the call fails
		}
	}
</script>

<template>
	<main class="flex-grow p-5 space-y-2">
		<h1 class="font-ubuntu text-2xl sm:text-3xl">
			Thank You For Showing Interest In
		</h1>
		<h2 class="font-ubuntu text-xl sm:text-2xl text-purple-600">
			{{ route.query.movie }}
		</h2>
		<div
			class="border-l-[7px] border-[1px] p-2 font-nunito sm:text-xl bg-yellow-200 border-yellow-500 rounded-md">
			<p>Kindly fill the form below to initiate the payment process</p>
		</div>
		<form
			@submit.prevent="saveClientDetails"
			class="rounded-md border-[1px] p-2 sm:p-5 space-y-2">
			<div class="flex flex-col">
				<label
					for="first-name"
					class="font-roboto tracking-wide font-normal my-1"
					>First Name</label
				>
				<input
					type="text"
					placeholder="Jane"
					name="first-name"
					class="p-4 border-[1px] outline-none rounded-sm"
					v-model="clientData.firstName"
					required />
			</div>
			<div class="flex flex-col">
				<label
					for="last-name"
					class="font-roboto tracking-wide font-normal my-1"
					>Last Name</label
				>
				<input
					type="text"
					placeholder="Doe"
					name="last-name"
					class="p-4 border-[1px] outline-none rounded-sm"
					v-model="clientData.lastName"
					required />
			</div>
			<div class="flex flex-col">
				<label
					for="email"
					class="font-roboto tracking-wide font-normal my-1"
					>Your Email</label
				>
				<input
					type="email"
					placeholder="jane.doe@myawesomemail.com"
					name="email"
					class="p-4 border-[1px] outline-none rounded-sm"
					v-model="clientData.email"
					required />
			</div>
			<div class="flex flex-col">
				<label
					for="mobile-number"
					class="font-roboto tracking-wide font-normal my-1"
					>Your M-Pesa Mobile Number</label
				>
				<div class="flex space-x-2">
					<input
						type="text"
						placeholder="254"
						class="p-4 border-[1px] outline-none rounded-sm w-1/3 text-center"
						disabled />
					<input
						type="text"
						placeholder="712345678"
						name="mobile-number"
						class="p-4 border-[1px] outline-none rounded-sm w-2/3"
						v-model="clientData.mobileNumber"
						required />
				</div>
			</div>
			<div class="flex flex-col">
				<label
					for="first-name"
					class="font-roboto tracking-wide font-normal my-1"
					>Location</label
				>
				<select
					class="w-full rounded-sm p-4 outline-none"
					v-model="clientData.location">
					<option>Nairobi</option>
					<option>Kisumu</option>
					<option>Nakuru</option>
					<option>Mombasa</option>
				</select>
			</div>
		</form>
		<div
			class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-center justify-evenly space-x-0 sm:space-x-2">
			<button
				class="bg-transparent border-[1px] text-black w-full sm:w-1/3 p-4 rounded-sm"
				@click="
					() => {
						router.go(-1);
					}
				">
				Back
			</button>
			<button
				class="p-4 bg-purple-600 rounded-sm w-full sm:w-2/3 text-white flex justify-center items-center"
				@click="saveClientDetails">
				<looping-rhombuses-spinner
					v-if="submittingForm"
					:animation-duration="2500"
					:rhombus-size="10"
					color="#FFFFFF" />
				<span v-else>Proceed</span>
			</button>
		</div>
	</main>
</template>
