// vite.config.ts
import path from "path";
import { defineConfig } from "file:///F:/Dev/react-array/node_modules/vite/dist/node/index.js";
import react from "file:///F:/Dev/react-array/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///F:/Dev/react-array/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "F:\\Dev\\react-array";
var vite_config_default = defineConfig({
  build: {
    //Specifies that the output of the build will be a library.
    lib: {
      //Defines the entry point for the library build. It resolves
      //to src/index.ts,indicating that the library starts from this file.
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "react-jp-ui",
      //A function that generates the output file
      //name for different formats during the build
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    },
    //Generates sourcemaps for the built files,
    //aiding in debugging.
    sourcemap: true,
    //Clears the output directory before building.
    emptyOutDir: true
  },
  //react() enables React support.
  //dts() generates TypeScript declaration files (*.d.ts)
  //during the build.
  plugins: [react(), dts()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxEZXZcXFxccmVhY3QtYXJyYXlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXERldlxcXFxyZWFjdC1hcnJheVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovRGV2L3JlYWN0LWFycmF5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICAvL1NwZWNpZmllcyB0aGF0IHRoZSBvdXRwdXQgb2YgdGhlIGJ1aWxkIHdpbGwgYmUgYSBsaWJyYXJ5LlxuICAgIGxpYjoge1xuICAgICAgLy9EZWZpbmVzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIGxpYnJhcnkgYnVpbGQuIEl0IHJlc29sdmVzXG4gICAgICAvL3RvIHNyYy9pbmRleC50cyxpbmRpY2F0aW5nIHRoYXQgdGhlIGxpYnJhcnkgc3RhcnRzIGZyb20gdGhpcyBmaWxlLlxuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgbmFtZTogXCJyZWFjdC1qcC11aVwiLFxuICAgICAgLy9BIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHRoZSBvdXRwdXQgZmlsZVxuICAgICAgLy9uYW1lIGZvciBkaWZmZXJlbnQgZm9ybWF0cyBkdXJpbmcgdGhlIGJ1aWxkXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGluZGV4LiR7Zm9ybWF0fS5qc2AsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiBcIlJlYWN0XCIsXG4gICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vR2VuZXJhdGVzIHNvdXJjZW1hcHMgZm9yIHRoZSBidWlsdCBmaWxlcyxcbiAgICAvL2FpZGluZyBpbiBkZWJ1Z2dpbmcuXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIC8vQ2xlYXJzIHRoZSBvdXRwdXQgZGlyZWN0b3J5IGJlZm9yZSBidWlsZGluZy5cbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgfSxcbiAgLy9yZWFjdCgpIGVuYWJsZXMgUmVhY3Qgc3VwcG9ydC5cbiAgLy9kdHMoKSBnZW5lcmF0ZXMgVHlwZVNjcmlwdCBkZWNsYXJhdGlvbiBmaWxlcyAoKi5kLnRzKVxuICAvL2R1cmluZyB0aGUgYnVpbGQuXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBkdHMoKV0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOE8sT0FBTyxVQUFVO0FBQy9QLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBO0FBQUEsSUFFTCxLQUFLO0FBQUE7QUFBQTtBQUFBLE1BR0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzdDLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFHTixVQUFVLENBQUMsV0FBVyxTQUFTLE1BQU07QUFBQSxJQUN2QztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMsV0FBVztBQUFBLE1BQy9CLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUEsSUFHQSxXQUFXO0FBQUE7QUFBQSxJQUVYLGFBQWE7QUFBQSxFQUNmO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQSxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUMxQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
