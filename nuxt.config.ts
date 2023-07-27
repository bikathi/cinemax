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
      MEDIA_BASE_PATH: process.env.MEDIA_BASE_PATH,
      MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
      MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
      MPESA_BUSINESS_SHORTCODE: process.env.MPESA_BUSINESS_SHORTCODE,
      MPESA_CALLBACK_URL_BASE: process.env.MPESA_CALLBACK_URL_BASE,
      MPESA_PUBLIC_PASSKEY: process.env.MPESA_PUBLIC_PASSKEY,
      AT_API_KEY: process.env.AT_API_KEY
    }
  },
  modules: [
    '@pinia/nuxt',
  ]
})
