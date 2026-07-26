import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/Memory/",

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                settings: resolve(__dirname, "settings.html"),
                game: resolve(__dirname, "game.html"),
                endscreen: resolve(__dirname, "endscreen.html"),
            },
        },
    },
});