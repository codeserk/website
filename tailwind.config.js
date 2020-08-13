/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  variants: ['responsive', 'group-hover', 'hover', 'focus', 'first', 'last'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1170px'
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif']
    },
    extend: {
      colors: {
        cyan: '#9cdbff'
      },
      margin: {
        '96': '24rem',
        '128': '32rem'
      }
    }
  }
}
