import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  base: '/web/',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // api: "modern-compiler", // Element Plus 中的解决办法
        silenceDeprecations: ['legacy-js-api']
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8088,
    open: true,
    cors: true,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://221.228.236.94:8023/api',
        // target: 'http://192.168.1.9:2022/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/gis': {
        target: 'http://221.228.236.94:9310', // 数管地图服务
        // target: 'http://192.168.1.9:2022/api', // 数管地图服务
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        rewrite: path => path.replace(/^\/gis/, ''),
      },
    },
  },
})
