import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], server: {
    host: '0.0.0.0',   // expose kare chhe
    port: 5173,         // tamne port fix karvo hoy to
    hmr: {
      host: "192.168.1.11", 
      protocol: "ws",

    },
  }

})
