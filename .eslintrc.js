module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    // 'prettier',
    // 'prettier/vue',
    // 'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': 'off',
    'no-console': 'off',
    'no-unreachable': 'off',
    'arrow-parens': 'off',
    'vue/no-unused-components': 'warn',
    'nuxt/no-globals-in-created': 'off',
    'no-prototype-builtins': 'off',
    'space-before-function-paren': ['error', 'never'],
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 0,
    'vue/singleline-html-element-content-newline': 0
  }
}
