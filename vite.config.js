import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [react()],
  server: {
    open: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
  
      },
    },
  },
  define: {
    'process.env': {
      API_BASE_URL: mode === 'production' ? '/api' : '/api', 
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}))
