import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base dinâmica: usa VITE_BASE quando disponível (ex.: Vercel),
  // senão mantém base do GitHub Pages.
  base: process.env.VITE_BASE ?? "/",
});
