import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Cambia esto por la URL de tu backend Django
        changeOrigin: true,
        secure: false,
        // Para depuración - muestra las redirecciones en la consola
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Enviando petición al servidor:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Recibida respuesta del servidor:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
})
