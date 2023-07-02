<script setup lang="js">
	import { marked } from "marked";
	import privacy from "../PRIVACY.md?raw";

	definePageMeta({
		name: "about"
	})
</script>

<template>
	<main class="p-4 flex-grow flex justify-center">
		<div
			class="[&>h2]:font-roboto [&>h2]:text-xl [&>h2]:tracking-wide [&>h2]:my-2 [&>p]:font-nunito [&>h3]:font-roboto [&>h3]:my-2 [&>blockquote>p]:font-roboto [&>blockquote>p]:tracking-wide md:max-w-[65%] [&>h1]:font-roboto [&>h1]:text-2xl [&>p]:md:text-lg [&>h3]:tracking-wide"
			v-html="
				marked.parse(privacy, {
					gfm: true,
					mangle: false,
					headerIds: false,
				})
			"></div>
	</main>
</template>
