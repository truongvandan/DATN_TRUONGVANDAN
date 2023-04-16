import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: 
    {
      '@' : path.resolve(__dirname, './'),
    },
  },
  plugins: [react(), tailwindcss()],
})
