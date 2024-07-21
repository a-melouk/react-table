import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve("src", "components/Table.tsx"),
      name: "react-table-search-sort",
      fileName: (format) => `react-array.${format}.js`,
    },
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts", // if you have any setup files,
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
  },
});
