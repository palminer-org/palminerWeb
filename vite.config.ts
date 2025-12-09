import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: false,  // Disable error overlay
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'https://palminer-api.example.app', // Target address for proxy
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Optional: rewrite path
      },
      // '/api': {
      //   target: 'http://localhost:5000',
      //   changeOrigin: true,
      //   secure: false, // Set to false if target is https server with invalid or self-signed certificate
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // },
      // // Another proxy configuration, e.g., for handling authentication requests
      // '/auth': {
      //   target: 'http://localhost:5001',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/auth/, '')
      // }
    }
  },
})
