# Session Handoff

## Current Objective

- Goal: feat-0.3-iam — sau Mảng 1 (multi-tenancy Task) → **Mảng 2 org tree (closure table)**.
- Current status: Mảng 1a/1b DONE + harden PATCH/hardcode DONE (`tsc` OK). Curl C-PATCH optional chưa chạy.
- Branch: local changes (code harden + harness) — chưa commit trừ khi học viên yêu cầu.

## Completed This Session (tối 2026-07-20)

- [x] Review Mảng 1: lỗ PATCH `boardId` (IDOR), hardcode status/role, footgun `findAll`
- [x] Học viên fix: `updateTaskSchema` omit `boardId` + `.partial().strict()`
- [x] Học viên: `CreateTaskSchema`/`UpdateTaskSchema`; `Role` enum; xóa `findAll`
- [x] Lý thuyết: `process.env` vs `.env` / dotenv merge (không đè key đã có)
- [x] Cập nhật harness (CONTEXT / progress / feature_list / handoff)

## Verification Evidence

| Case | Expected | Result |
|------|----------|--------|
| tsc `--noEmit` (apps/api) | EXIT 0 | PASS |
| C-PATCH boardId in body | 400 | chưa chạy |
| C-PATCH title only | 200 | chưa chạy |
| Mảng 1a/1b curl (sáng) | PASS | PASS (đã ghi trước) |

## Files Touched (harden)

- `packages/shared/src/schemas/task.ts` — update omit boardId
- `apps/api/src/services/task.service.ts` — shared types
- `apps/api/src/services/permission.service.ts` — Role enum
- `apps/api/src/repositories/task.repository.ts` — removed findAll
- `apps/api/src/config/env.ts` — no SEED_USER_ID
- `apps/api/.env` — DATABASE_URL, PORT, JWT_SECRET (local, không commit secret prod)

## Next Step

1. Optional: curl C-PATCH (400/200)
2. Mentor giải thích **closure table** (org tree) → học viên thiết kế schema / migration
3. Không nhảy ABAC/audit trước khi org tree có skeleton

## Mentor Rules

- Xưng tao/mày; học viên tự gõ code/lệnh
- Không ask_question nút bấm
- Pattern assert: 404 cross-tenant / 403 in-tenant; check trước side-effect
