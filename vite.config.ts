import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "./", // ✅ ensures correct asset paths
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["https://hackgnan-1.onrender.com"],
  },
  preview: {
    port: 8080,
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
