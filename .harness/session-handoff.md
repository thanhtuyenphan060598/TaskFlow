# Session Handoff

## Current Objective

- Goal: feat-0.3-iam Mảng 1 Multi-tenancy — READ path done; làm Việc 4 WRITE (create boardId scope).
- Current status: Mảng 1a getAll/getById isolation TEST 5/5 PASS (2026-07-20).
- Branch: uncommitted local changes (harness docs updated this session)

## Completed This Session

- [x] Verify tenant isolation READ path (C1-C4 curl tests) — all PASS
- [x] Học viên hiểu multi-tenancy: member thấy hết task trong workspace, không cross-tenant; 404 giấu existence
- [x] Cập nhật harness docs cho agent tiếp theo

## Verification Evidence

| Case | Expected | Result |
|------|----------|--------|
| C1 member GET /tasks | Chỉ task workspace A | PASS (2 tasks, no Outsider's) |
| C1b outsider GET /tasks | Chỉ Outsider's task | PASS |
| C2 member → outsider task id | 404 | PASS |
| C3 outsider → member task id | 404 | PASS |
| C4 member → own task id | 200 | PASS |

## Files Involved (Mảng 1 — đã có, không sửa thêm session này)

- `apps/api/src/repositories/task.repository.ts` — findAllForUser
- `apps/api/src/services/permission.service.ts` — assertMemberOfWorkspaceForTask
- `apps/api/src/services/task.service.ts` — getAll/getById scoped
- `apps/api/src/routes/task.routes.ts` — GET truyền userId
- `apps/api/prisma/seed.ts` — Workspace A + B test data

## Next Step (Việc 4)

Scope `POST /tasks` create theo boardId:

1. Mentor giải thích approach (repo board→workspace + membership assert)
2. Học viên gõ code
3. Test: member POST task với BOARD_B (outsider workspace) → phải fail

## Startup for Next Agent

1. Read `AGENTS.md` (mentor role, xưng tao/mày)
2. Read `.harness/CONTEXT.md` mục ⏸️ + `feature_list.json` + `progress.md`
3. `./.harness/init.sh`
4. Continue Việc 4
