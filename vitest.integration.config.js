import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "integration",
        include: ["tests/integration/**/*.test.js"],
        setupFiles: ["./tests/integration/setup.js"],
        testTimeout: 20000,
    }
});
