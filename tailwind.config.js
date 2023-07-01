/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js}',
		'./nuxt.config.{js}',
		'./app.vue',
	],
	theme: {
		extend: {
			fontFamily: {
				ubuntu: ['Ubuntu', 'sans-serif'],
				nunito: ['Nunito', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
