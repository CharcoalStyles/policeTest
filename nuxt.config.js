export default {
  // Disable server-side rendering
  ssr: false,

  // Target
  target: 'static',

  // Global page headers
  head: {
    title: 'Digital Career Pathway',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Build and manage a digital career in NSW Government based on interests, capabilities, goals and past experiences.' }
    ],
    script: [
      { src: 'https://onegov.nsw.gov.au/quickfeed/js/quickfeed.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/nsw-design-system@2/dist/css/main.css' }
    ]
  },

  // Global CSS
  css: ['~/assets/css/slider.css', '~/assets/css/transitions.css', '~/assets/css/tooltips.css'],

  // Plugins to run before rendering page
  plugins: [
    '~/plugins/currency',
    '~/plugins/collect',
    '~/plugins/debounce',
    '~/plugins/pluralise',
    { src: '~/plugins/persist', ssr: false },
    { src: '~plugins/vimeo-player' }
  ],

  // Auto import components
  components: true,

  tailwindcss: {
    cssPath: '~/assets/tailwind.css'
  },

  googleAnalytics: {
    id: 'UA-188748344-2'
  },

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  // Modules
  modules: ['portal-vue/nuxt', '@nuxt/content', 'vue-scrollto/nuxt'],

  // Build Configuration
  build: {
    vendor: [
      'vue-vimeo-player'
    ]
  }
}
