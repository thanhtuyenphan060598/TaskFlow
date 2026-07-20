# Session Progress Log

## Current State

**Last Updated:** 2026-07-20 21:10
**Active Feature:** feat-0.3-iam — Mảng 1 Multi-tenancy **KHÉP + harden PATCH/hardcode**. Next = Mảng 2 org tree (closure table).
**GĐ0.1 Security + GĐ0.2 Monorepo:** ĐÃ KHÉP.

## ⏸️ ĐIỂM DỪNG — bàn giao agent/mentor mới (tối 2026-07-20)

### Session tối — review + fix lỗ PATCH / hardcode

**Đã làm (học viên gõ, mentor review):**

| Việc | Chi tiết | Verify |
|------|----------|--------|
| Bịt PATCH `boardId` | `updateTaskSchema = createTaskSchema.omit({ boardId: true }).partial().strict()` | `tsc` EXIT 0; **curl C-PATCH chưa chạy** |
| Type từ shared | `task.service` dùng `CreateTaskSchema` / `UpdateTaskSchema` | OK |
| Role enum | `permission.service` dùng `Role` + `canModifyRoles` | OK |
| Xóa footgun | bỏ `taskRepository.findAll()` | OK |
| Env cleanup | `env.ts` chỉ `DATABASE_URL`, `JWT_SECRET`, `PORT?`; bỏ `SEED_USER_ID` | `.env` đủ 3 dòng |

**Lý thuyết lỗ PATCH (đừng quên):**

- `assertCanModifyTask` chỉ check task **hiện tại** (author / OWNER|ADMIN workspace cũ).
- Body `boardId` từng lọt vì `.partial()` từ create → Prisma đổi FK board → task nhảy tenant (IDOR).
- Fix đúng product: PATCH không đổi board; move board = API riêng + assert sau.

**Curl gợi ý buổi sau (port 3001, `/api/v1`):**

```bash
# login member → TOKEN
# C-PATCH-1: PATCH body có boardId → mong 400
# C-PATCH-2: PATCH { "title": "..." } → mong 200
```

### Mảng 1a/1b (sáng) — đã PASS trước đó

- READ C1–C4 PASS; WRITE create C-CREATE-1/2/3 PASS.
- Seed: `member@taskflow.dev` / `outsider@taskflow.dev` / `password123` — IDs đổi mỗi lần seed.

## Status

### What's Done

- [x] GĐ0, GĐ1, GĐ2 Auth Bài 1-7
- [x] GĐ0.1 Security + GĐ0.2 Monorepo
- [x] feat-0.3-iam Mảng 1a READ + 1b WRITE create
- [x] Harden: omit boardId trên update + shared types + Role enum + xóa findAll

### What's In Progress

- feat-0.3-iam còn Mảng 2/3/4
- Optional: curl confirm C-PATCH

### What's Next

1. (Optional) Curl C-PATCH 400/200
2. **Mảng 2 org tree (closure table)** — mentor lý thuyết trước
3. Mảng 3 RBAC→ABAC
4. Mảng 4 audit log
5. feat-0.4-design-system

## Blockers / Risks

- [ ] Nợ refresh token rotation/revoke — hoãn
- [ ] Access token qua `/auth/refresh` (cùng secret) — cần `type` trong payload, hoãn
- [ ] Curl C-PATCH chưa có evidence PASS trên harness

## Notes for Next Session

1. Đọc `AGENTS.md` + `.harness/CONTEXT.md` (mục ⏸️) + `feature_list.json`
2. `./.harness/init.sh` (prisma generate nếu thiếu `src/generated/prisma`)
3. Xưng tao/mày; học viên tự gõ; không ask_question nút bấm
4. Bắt đầu Mảng 2 sau (hoặc trong) verify C-PATCH
