import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 4173,
    allowedHosts: ["imagenes-animales.onrender.com"],
  },
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
  },
});
// import react from "@vitejs/plugin-react";
