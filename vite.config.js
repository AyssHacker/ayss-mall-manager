import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        //公共接口地址
        target: 'http://cba.itlike.com/public/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/,'')
      }
    }
  }
})
