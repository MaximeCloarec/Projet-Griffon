import { execSync } from "child_process";
import { beforeAll, afterAll } from "vitest";
import { PrismaClient } from "../../src/generated/prisma-test";
import * as fs from 'node:fs';

export const prismaTest = new PrismaClient();

beforeAll(async () => {
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
    if (fs.existsSync("./tests/test.db")) {
        fs.unlinkSync("./tests/test.db");
    }
});
