import { defineConfig } from "vite";
import path, { resolve } from "path";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { paths } from "./src/js/config/constants";

export default defineConfig({
  root: ".",
  plugins: [
    ViteEjsPlugin({
      title: "Тестовое задание",
      headerPath: paths.headerPath,
      heroPath: paths.heroPath,
      footerPath: paths.footerPath,
      contentPath: paths.contentPath,
      clientsPath: paths.clientsPath,
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
