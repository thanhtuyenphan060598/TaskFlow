import { prisma } from '../src/lib/prisma.js';

async function main() {
    const user = await prisma.user.create({
        data: {
            email: "seed@taskflow.dev",
            password: "placeholder", // will be hashed once Auth exists
            name: "Seed User",
        }
    })

    const workspace = await prisma.workspace.create({
        data: { name: "Seed Workspace" }
    })

    const project = await prisma.project.create({
        data: { name: "Seed Project", workspaceId: workspace.id }
    })

    const board = await prisma.board.create({
        data: { name: "Seed Board", projectId: project.id }
    })

    // Print the ids we need to configure the app.
    console.log("Seed done.");
    console.log("SEED_USER_ID =", user.id);
    console.log("SEED_BOARD_ID =", board.id);
}

main().then(
    () => process.exit(0)
).catch((error) => {
    console.error(error);
    process.exit(1);
});