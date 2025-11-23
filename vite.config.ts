import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use base path only for production (GitHub Pages)
  // For local dev, this will be '/', for production build uses '/quranicphrases/'
  base: process.env.NODE_ENV === 'production' ? '/quranicphrases/' : '/',
  server: {
    // Configure dev server headers for optimal caching
    headers: {
      // Cache indefinitely, but revalidate with server on each request
      // stale-while-revalidate: Serve cached version immediately, check for updates in background
      'Cache-Control': 'public, max-age=31536000, stale-while-revalidate=86400',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
})
