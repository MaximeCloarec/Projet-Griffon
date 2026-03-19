import { execSync } from "child_process";
import { beforeAll, afterAll } from "vitest";
import { PrismaClient } from "../../src/generated/prisma-test/index.js"; // ✅ FIX ICI
import fs from "node:fs";

export const prismaTest = new PrismaClient();

beforeAll(async () => {
    // Reset DB test
    execSync(
        "npx prisma db push --force-reset --schema=./src/prisma/schema.test.prisma",
        {
            stdio: "inherit",
        }
    );

    await prismaTest.$connect();
});

afterAll(async () => {
    await prismaTest.$disconnect();

    // Supprime le fichier SQLite
    if (fs.existsSync("./tests/test.db")) {
        fs.unlinkSync("./tests/test.db");
    }
});