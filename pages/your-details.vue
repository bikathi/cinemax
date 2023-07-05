<script setup lang="js">
	const {data} = useFetch('/api/hello');
</script>

<template>
	<main class="flex-grow">
		<h1>Your details</h1>
        <h2>{{ data.hello }}</h2>
		<button
			class="bg-red-500"
			@click="tryApi">
			test api
		</button>
	</main>
</template>
