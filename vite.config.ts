import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(process.env.NODE_ENV === 'development' ? [componentTagger()] : []),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") }
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
