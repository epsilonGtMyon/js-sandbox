
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sandbox01: resolve(__dirname, 'src/sandbox01/index.html')
      }
    }
  },
  server: {
    open: true
  }
})