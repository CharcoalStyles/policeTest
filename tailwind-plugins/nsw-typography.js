const plugin = require('tailwindcss/plugin')

module.exports = {
  prefix: 'nsw-',
  plugins: [
    plugin(function ({ addComponents }) {
      const styles = {
        '.h1': {
          fontSize: '48px',
          fontWeight: '600',
          lineHeight: '60px'
        }
      }
      addComponents(styles)
    })
  ]
}
