import { defineConfig } from "vite";
import vitePugPlugin from "vite-plugin-pug-transformer";
import pugPlugin from "vite-plugin-pug";
import path, { resolve } from "path";

const root = resolve(__dirname, "src");
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: "./dist",
    rollupOptions: {
      input: {
        index: resolve("index.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "unknown";
          if (name.endsWith(".css")) {
            return "assets/css/[name][extname]";
          } else if (
            name.endsWith(".jpg") ||
            name.endsWith(".png") ||
            name.endsWith(".webp") ||
            name.endsWith(".svg")
          ) {
            return "assets/img/[name][extname]";
          } else {
            return "assets/[name][extname]";
          }
        },
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
      },
    },
  },
  plugins: [
    vitePugPlugin({}),
    pugPlugin({
      localImports: true,
      alias: {
        "~/src": path.resolve(__dirname, "./src/"),
      },
    }),
  ],
});
