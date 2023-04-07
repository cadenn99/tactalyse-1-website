import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "./src"),
            "@root": path.resolve(__dirname, "./"),
        },
    },
    test: {
        clearMocks: true,
        globals: true,
        setupFiles: ['dotenv/config']
    }
});