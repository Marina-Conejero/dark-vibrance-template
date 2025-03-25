
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Define environment variables with defaults for better DX
  // IMPORTANT: This only provides types - actual values must be in .env files or set in the environment
  define: {
    // Provide fallbacks for environment variables
    'import.meta.env.VITE_WEBHOOK_URL': JSON.stringify(process.env.VITE_WEBHOOK_URL || 'https://hook.eu2.make.com/ecdy4yhqu7twvvv49ph5cplxgiykrtft'),
  },
  // Add build configuration for SPA
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));
