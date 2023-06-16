module.exports = {
  future: {},
  purge: [],
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        print: { raw: 'print' }
      },
      fontSize: {
        family: '8rem',
        '[32px]': '2rem',
        '[40px]': '2.5rem',
        '[42px]': '2.625rem'
      },
      // https://www.digital.nsw.gov.au/design-system/style/typography
      fontFamily: {
        sans: ['Public Sans', 'Arial', 'sans-serif']
      },
      // https://www.digital.nsw.gov.au/design-system/style/colour
      colors: {
        'nsw-notification': {
          info: '#2E5299',
          success: '#00A908',
          warning: '#DC5800',
          error: '#B81237'
        },
        'nsw-brand': {
          'primary-blue': '#002664',
          'primary-blue-2': '#146CFD',
          'primary-highlight': '#D7153A',
          'secondary-blue': '#2E5299',
          'tertiary-blue': '#0085B3',
          'psc-green': '#00857C',
          'psc-purple': '#3E2C56',
          'grey-primary': '#22272B'
        },
        'nsw-grey': {
          50: '#F2F2F2',
          100: '#F4F4F7', // Light10
          200: '#E4E4E6', // Light20
          400: '#A0A5AE', // Light40
          600: '#6D7079', // Dark60
          700: '#4C4F55', // Dark70
          800: '#333333' // Dark80
        },
        'role-pill': {
          blue: '#E4F8FF',
          green: '#D7FFD7'
        }
      },
      backgroundImage: {
        'home-hero': "url('/images/home-hero.jpg')",
        flourish: "url('/flourish.svg')",
        blob: "url('/bg.svg')"
      },
      backgroundPosition: {
        'right-50-screen': 'right 40vh'
      },
      outline: {
        buttons: ['3px solid #0085B3', '3px']
      },
      width: {
        radio: '1.4rem',
        aside: '450px',
        'modal-accessible': 'calc(100vw - 0.75rem)'
      },
      padding: {
        0.5: '0.125rem'
      },
      height: {
        0.5: '0.125rem',
        radio: '1.4rem',
        modal: '80vh',
        third: '50vh',
        header: '700px',
        slider: 'calc(100vh - 2.5rem)',
        'modal-accessible': 'calc(100vh - 0.75rem)',
        'modal-accessible-lg': '700px'
      },
      minHeight: {
        modal: '80vh'
      },
      maxWidth: {
        tooltip: '200px'
      },
      maxHeight: {
        modal: '600px',
        autosuggest: '300px',
        'modal-accessible': 'calc(100vh - 0.75rem)',
        'modal-accessible-lg': '700px'
      }
    }
  },
  variants: {
    borderWidth: ['responsive', 'last', 'first', 'hover', 'focus'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    extend: {
      backgroundColor: ['group-focus']
    }
  },
  plugins: [require('./tailwind-plugins/nsw-typography')]
}
