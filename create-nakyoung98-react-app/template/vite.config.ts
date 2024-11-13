/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@commons": path.resolve(__dirname, "./src/@commons"),
      "@config": path.resolve(__dirname, "./src/@config"),
      "@domains": path.resolve(__dirname, "./src/@domains"),
      "@lib": path.resolve(__dirname, "./src/@lib"),
      "@mocks": path.resolve(__dirname, "./src/@mocks"),
      "@network": path.resolve(__dirname, "./src/@network"),
      "@pages": path.resolve(__dirname, "./src/@pages"),
      "@routes": path.resolve(__dirname, "./src/@routes"),
    },
  },

  test: {
    environment: "happy-dom",
  },
});
