import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-table-search-sort-paginate",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    // Generates sourcemaps for the built files, aiding in debugging.
    sourcemap: true,
    // Clears the output directory before building.
    emptyOutDir: true,
    // Adjust chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // react() enables React support.
  // dts() generates TypeScript declaration files (*.d.ts) during the build.
  plugins: [react(), dts()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts", // if you have any setup files,
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
  },
});
