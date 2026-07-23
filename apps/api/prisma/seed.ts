import { prisma } from "../src/lib/prisma.js";
import { hashPassword } from "../src/lib/password.js";

async function main() {
  await prisma.taskAssignee.deleteMany();
  await prisma.task.deleteMany();
  await prisma.board.deleteMany();
  await prisma.project.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.orgUnitClosure.deleteMany();
  await prisma.orgUnit.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();

  // Password chung, hash chuẩn → login được
  const password = await hashPassword("password123");

  // 3 user vai trò khác nhau
  const owner = await prisma.user.create({
    data: { email: "owner@taskflow.dev", password, name: "Owner User" }
  });
  const admin = await prisma.user.create({
    data: { email: "admin@taskflow.dev", password, name: "Admin User" }
  });
  const member = await prisma.user.create({
    data: { email: "member@taskflow.dev", password, name: "Member User" }
  });

  // 1 workspace + gán role qua Membership
  const workspaceA = await prisma.workspace.create({ data: { name: "Workspace A " } });
  await prisma.membership.createMany({
    data: [
      { userId: owner.id, workspaceId: workspaceA.id, role: "OWNER" },
      { userId: admin.id, workspaceId: workspaceA.id, role: "ADMIN" },
      { userId: member.id, workspaceId: workspaceA.id, role: "MEMBER" }
    ]
  });

  const orgUnits = await prisma.orgUnit.createMany({
    data: [
      { name: "Nova Agency", workspaceId: workspaceA.id },
      { name: "Production", workspaceId: workspaceA.id },
      { name: "Dev", workspaceId: workspaceA.id },
      { name: "Design", workspaceId: workspaceA.id },
      { name: "HR", workspaceId: workspaceA.id }
    ]
  }).then(async () => {
    return await prisma.orgUnit.findMany({
      where: { workspaceId: workspaceA.id },
      orderBy: { createdAt: "asc" }
    });
  });


  await prisma.orgUnitClosure.createMany({
    data: [
      { ancestorId: orgUnits[0].id, descendantId: orgUnits[0].id, depth: 0 },
      { ancestorId: orgUnits[0].id, descendantId: orgUnits[1].id, depth: 1 },
      { ancestorId: orgUnits[1].id, descendantId: orgUnits[2].id, depth: 1 },
      { ancestorId: orgUnits[1].id, descendantId: orgUnits[3].id, depth: 1 },
      { ancestorId: orgUnits[0].id, descendantId: orgUnits[4].id, depth: 1 },
      { ancestorId: orgUnits[3].id, descendantId: orgUnits[3].id, depth: 0 },
      { ancestorId: orgUnits[0].id, descendantId: orgUnits[3].id, depth: 2 },
      { ancestorId: orgUnits[4].id, descendantId: orgUnits[4].id, depth: 0 },
      { ancestorId: orgUnits[2].id, descendantId: orgUnits[2].id, depth: 0 },
      { ancestorId: orgUnits[0].id, descendantId: orgUnits[2].id, depth: 2 },
      { ancestorId: orgUnits[1].id, descendantId: orgUnits[1].id, depth: 0 },
    ]
  });

  const project = await prisma.project.create({
    data: { name: "Project A", workspaceId: workspaceA.id }
  });
  const board = await prisma.board.create({
    data: { name: "Board A", projectId: project.id }
  });

  // Task do MEMBER tạo + task do OWNER tạo (để test các case RBAC)
  const memberTask = await prisma.task.create({
    data: { title: "Member's task", boardId: board.id, authorId: member.id }
  });
  const ownerTask = await prisma.task.create({
    data: { title: "Owner's task", boardId: board.id, authorId: owner.id }
  });

  await prisma.projectMember.createMany({
    data: [
      { projectId: project.id, userId: admin.id, role: "MANAGER" },
      { projectId: project.id, userId: member.id, role: "CONTRIBUTOR" },
    ]
  })

  // Workspace B (separate tenant) + outsider user to test isolation
  const outsider = await prisma.user.create({
    data: { email: "outsider@taskflow.dev", password, name: "Outsider User" }
  });
  const workspaceB = await prisma.workspace.create({ data: { name: "Workspace B" } });
  await prisma.membership.create({
    data: { userId: outsider.id, workspaceId: workspaceB.id, role: "OWNER" }
  });

  const projectB = await prisma.project.create({
    data: { name: "Project B", workspaceId: workspaceB.id }
  });
  const boardB = await prisma.board.create({
    data: { name: "Board B", projectId: projectB.id }
  });
  const outsiderTask = await prisma.task.create({
    data: { title: "Outsider's task", boardId: boardB.id, authorId: outsider.id }
  });

  console.log("Seed done. Password for all users = 'password123'");
  console.log("OWNER  =", owner.email, owner.id);
  console.log("ADMIN  =", admin.email, admin.id);
  console.log("MEMBER =", member.email, member.id);
  console.log("BOARD_ID    =", board.id);
  console.log("MEMBER_TASK =", memberTask.id);
  console.log("OWNER_TASK  =", ownerTask.id);
  console.log("OUTSIDER =", outsider.email, outsider.id);
  console.log("OUTSIDER_TASK =", outsiderTask.id);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
