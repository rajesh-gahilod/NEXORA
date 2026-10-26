import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/NEXORA/', // Official GitHub Pages base path for repo https://github.com/rajesh-gahilod/NEXORA
})
