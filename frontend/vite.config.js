import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import lineClamp from '@tailwindcss/line-clamp'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api':
      {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  plugins: [
    tailwindcss({
      config: {
        theme: {
          extend: {},
        },
        plugins: [lineClamp()], // 👈 add it here
      },
    }),
    react(),
  ],
})
