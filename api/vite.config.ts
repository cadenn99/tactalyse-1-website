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
        setupFiles: ['dotenv/config'],
        coverage: {
            exclude: [
                '**/__mocks__/**/*',
                '**/__test__/**/*',
            ],
            provider: 'istanbul', // or 'c8'
            reporter: ['lcov', 'html'],
        },
    }
});