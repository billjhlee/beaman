var webpack = require('webpack')
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    // link: [
    //   // You don't need that line anymore!
    //   {
    //     rel: 'stylesheet',
    //     href: 'https://fonts.googleapis.com/css?family=Do+Hyeon'
    //   }
    // ]
  },
  /*
        "Password requirement failed",
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    '~assets/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vee-validate',
    '@/plugins/v-observe.js',
    { src: '@/plugins/vue-quill.js', mode: 'client' },
    '@/plugins/vue-overlay.js',
    '@/plugins/nuxt-client-init.js',
    '@/plugins/axios.js',
    '@/plugins/iframe.js',
    '@/plugins/lazyload.js'
    // { src: '@/plugins/toasted.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */

  buildModules: ['@nuxtjs/moment'],
  moment: {
    defaultTimeZone: 'Asia/Seoul',
    defaultLocale: 'ko',
    locales: ['ko']
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    'nuxt-webfontloader',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          //import whole set
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far']
          }
        ]
      }
    ]
  ],
  styleResources: {
    scss: ['~assets/scss/app.scss']
  },

  toast: {
    position: 'top-center',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  // router: {
  //   linkActiveClass: 'my-nuxt-active-link',
  //   linkExactActiveClass: 'my-nuxt-exact-active-link'
  // },
  // router: {
  // middleware: 'authenticated'
  // },
  /*
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  env: {
    cookieUrl:
      process.env.NODE_ENV === 'production'
        ? '.beerman.co.kr'
        : // 'localhost'
          'localhost'
  },
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://api.beerman.co.kr'
        : // 'http://localhost:5000'
          'http://localhost:5000',
    credentials: true
    // proxy: true
  },
  // proxy: {
  //   '/api/': {
  //     target: 'http://13.125.243.114:3000',
  //     pathRewrite: { '^/api/': '' }
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      })
    ],
    transpile: ['vee-validate/dist/rules'],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  webfontloader: {
    google: {
      families: [
        'Do Hyeon',
        'Noto Sans KR',
        'Gothic A1',
        'Jua',
        'Nanum Gothic Coding',
        'Nanum Gothic'
      ] //Loads Lato font with weights 400 and 700
    }
  }
}
