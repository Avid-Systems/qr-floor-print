import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        format: "iife",
        dir: "dist",
        entryFileNames: "mw_QRFloorPrint.js",
      },
    },
  },
});
