# Session Progress Log

## Current State

**Last Updated:** 2026-08-05 (zero Route Handlers)
**Active Feature:** `feat-app1-task` **in-progress**
**GĐ0.1 → GĐ0.4:** DONE

## Done

- [x] Dual JWT secret
- [x] **Refactor `/tasks` Next canonical:** RSC fetch + Server Actions; gỡ RQ/RHF khỏi tasks; xóa data BFF (tasks/boards)
- [x] Xóa toàn bộ Route Handlers; login/register → Server Actions; refresh → server helper
- [x] Verify: Server Action login → `/tasks`; proxy refresh cookie-only → access mới; invalid → `/login`; lint + `tsc` PASS
- [x] Commit + push (session này)

## What's Next

1. Filter / search / drag-drop / realtime (RQ chỉ khi bài toán cần)
2. GĐ9 cùng domain

## Notes

- Rule: không thêm `app/api/*` nếu RSC/Server Action giải quyết được
- RQ = opt-in sau (board interactive / offline)
- Env local: `JWT_ACCESS_SECRET` + `JWT_REFRESH_SECRET` (khác nhau, ≥32) — không commit `.env`
