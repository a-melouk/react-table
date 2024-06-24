import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts", // if you have any setup files,
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
  },
});
