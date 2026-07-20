# Session Progress Log

## Current State

**Last Updated:** 2026-07-20 14:36
**Active Feature:** feat-0.3-iam — Mảng 1 Multi-tenancy. **Mảng 1a READ + Mảng 1b WRITE (Việc 4) DONE + TEST PASS.** Mảng 1 Multi-tenancy Task coi như KHÉP.
**GĐ0.1 Security + GĐ0.2 Monorepo:** ĐÃ KHÉP.

## ⏸️ ĐIỂM DỪNG — bàn giao agent/mentor mới

**Mảng 1b WRITE (Việc 4 — create boardId scope) — ✅ DONE (test 2026-07-20):**

Bịt lỗ hổng IDOR: member POST task với boardId của workspace mình KHÔNG thuộc → giờ trả 404.

| Case                                          | Mong | Kết quả |
| --------------------------------------------- | ---- | ------- |
| C-CREATE-1 member POST BOARD_B (cross-tenant) | 404  | ✅ 404  |
| C-CREATE-2 member POST BOARD_A (hợp lệ)       | 201  | ✅ 201  |
| C-CREATE-3 member POST board UUID random      | 404  | ✅ 404  |

Verify thêm: `tsc --noEmit` EXIT 0 (compile sạch).

**Code Việc 4 (học viên gõ, mentor review):**

1. `board.repository.ts` (FILE MỚI) — `findWorkspaceIdByBoardId(boardId)` select project.workspaceId. Tách file riêng đúng SRP (KHÔNG nợ kỹ thuật — học viên chọn tốt hơn phương án tạm của mentor).
2. `permission.service.assertMemberOfWorkspaceForBoard(boardId, userId)` — board null→404; không member→404. 2 message GIỐNG NHAU (`Board with id ... not found`) chống info-disclosure.
3. `task.service.create` → `async` + gọi assert TRƯỚC `taskRepository.create` (fail-fast, không ghi DB rồi mới check).
4. `task.routes` POST đã có `await taskService.create` sẵn — không sửa.

**Bài học lý thuyết Việc 4:**

- 404 (cross-tenant, giấu tài nguyên) vs 403 (trong tenant, thiếu quyền) — Việc 4 dùng 404 vì cross-tenant.
- Side-effect order: check TRƯỚC ghi DB (đừng create rồi rollback).
- Info-disclosure: message board-not-exist == board-cross-tenant.
- SRP: query prisma.board → thuộc boardRepository, không nhét vào taskRepository.

**Mảng 1a READ isolation — ✅ DONE trước đó (C1-C4 PASS):**
findAllForUser (memberships.some), assertMemberOfWorkspaceForTask (404), getAll/getById scoped, seed Workspace A+B.

**Seed IDs (đổi mỗi lần seed — chạy lại lấy IDs mới):**

```
password = password123
MEMBER = member@taskflow.dev
OUTSIDER = outsider@taskflow.dev
```

Refresh seed: `cd apps/api && pnpm exec tsx prisma/seed.ts` (in ra BOARD_A/BOARD_B/task IDs mới).

## Status

### What's Done

- [x] GĐ0, GĐ1, GĐ2 Auth Bài 1-7
- [x] GĐ0.1 Security (rate-limit + refresh + validate :id)
- [x] GĐ0.2 Monorepo
- [x] feat-0.3-iam Mảng 1a READ isolation + test 5/5 PASS
- [x] feat-0.3-iam Mảng 1b WRITE (Việc 4 create boardId scope) + test 3/3 PASS + tsc EXIT 0

### What's In Progress

- (trống) — Mảng 1 Multi-tenancy Task đã KHÉP

### What's Next

1. Mảng 2 org tree (closure table)
2. Mảng 3 RBAC → ABAC
3. Mảng 4 audit log nền
4. feat-0.4-design-system

## Blockers / Risks

- [ ] Nợ refresh token nâng cao (rotation/revoke) — hoãn GĐ0.3 / Redis
- [ ] Access token cũng qua /refresh (cùng secret) — cần type access/refresh trong payload, hoãn GĐ0.3

## Evidence of Completion (Mảng 1)

- [x] Mảng 1a READ: C1-C4 isolation curl PASS (2026-07-20)
- [x] Mảng 1b WRITE: C-CREATE-1/2/3 PASS (BOARD_B→404, BOARD_A→201, random→404) + tsc EXIT 0 (2026-07-20)
- Server port **3001**, PREFIX `/api/v1`

## Notes for Next Session

1. Đọc `AGENTS.md` + `.harness/CONTEXT.md` (mục ⏸️) + `feature_list.json` (current_focus)
2. `./.harness/init.sh` + `docker compose up -d`
3. Mảng 1 Multi-tenancy Task đã xong — bắt đầu Mảng 2 org tree (mentor giải thích closure table trước, học viên gõ)
4. Pattern đã thiết lập: permission.service assert* (404 cross-tenant / 403 in-tenant), repository per-model (task/board/membership), service gọi assert TRƯỚC side-effect
5. Xưng tao/mày. Không ask_question nút bấm. Curl ngắn từng lệnh.
