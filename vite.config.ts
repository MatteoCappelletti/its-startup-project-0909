import { defineConfig } from "vite";
import { resolve } from "path";

// Configurazione Vite per un'applicazione multi-pagina (MPA)
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        characters: resolve(__dirname, "characters.html"),
        episodes: resolve(__dirname, "episodes.html"),
        characterDetail: resolve(__dirname, "character-detail.html"),
      },
    },
  },
});
