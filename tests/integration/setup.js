import { execSync } from "child_process";
import fs from "fs";
import { PrismaClient } from "../../src/generated/prisma-test/client.js";

export const prismaTest = new PrismaClient();

beforeAll(async () => {
    // Reset DB test
    execSync("npx prisma db push --force-reset --schema=./src/prisma/schema.test.prisma", {
        stdio: "inherit",
    });

    await prismaTest.$connect();
});

afterAll(async () => {
    await prismaTest.$disconnect();

    // // Supprime le fichier SQLite
    // if (fs.existsSync("./tests/test.db")) {
    //     fs.unlinkSync("./tests/test.db");
    // }
});