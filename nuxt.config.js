export default {
  // Disable server-side rendering
  ssr: false,

  // Target
  target: 'static',

  // Global page headers
  head: {
    title: 'Procurement Career Pathways Tool',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Build and manage a digital career in NSW Government based on interests, capabilities, goals and past experiences.'
      }
    ],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-KF79WV96DK',
        async: true
      },
      {
        src: '/analytics.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/nsw-design-system@2/dist/css/main.css'
      }
    ]
  },

  // Global CSS
  css: [
    '~/assets/css/slider.css',
    '~/assets/css/transitions.css',
    '~/assets/css/tooltips.css'
  ],

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
  // Modules for dev and build
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  // Modules
  modules: ['portal-vue/nuxt', '@nuxt/content', 'vue-scrollto/nuxt'],

  tailwindcss: {
    cssPath: ['~/assets/tailwind.css', { injectPosition: 'first' }]
  },

  // Build Configuration
  build: {
    vendor: ['vue-vimeo-player']
  },
}
