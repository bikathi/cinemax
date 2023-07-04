// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: "/core-svg/cinemax-fav.svg" }
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ],
      title: "Cinemax"
    }
  },
  runtimeConfig: {
    public: {
      TMDB_RAT: process.env.TMDB_RAT,
    }
  },
  modules: [
    '@pinia/nuxt',
  ]
})
