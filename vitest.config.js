import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            provider: "v8", // or 'istanbul'
            exclude: ['generated/**']
        },
        globals: true,
        pool: "forks"
    },
});
