# Session Progress Log

## Current State

**Last Updated:** 2026-08-06 (pause trước filter/search)
**Active Feature:** `feat-app1-task` **in-progress**
**GĐ0.1 → GĐ0.4:** DONE

## Done (session / trước đó)

- [x] Dual JWT secret + RSC/Server Actions + zero Route Handlers (`ac7ca34`)
- [x] Học: proxy (navigation, `has` cookie) vs `apiFetch` (401 Fastify); RSC set cookie hạn chế
- [x] Chọn bài **A — Filter / search** (không B drag / C realtime)
- [x] Harness update + commit/push điểm dừng

## What's Next

1. **Phase 1 BE:** `listTasksQuerySchema` (Zod parse query) → GET `/tasks` → Prisma `where` (`status`, `q`)
2. Phase 2 FE: RSC `searchParams` + UI filter tối thiểu
3. Drag-drop / realtime sau; GĐ9 cùng domain

## Notes

- Zod = validate biên HTTP; Prisma = query DB — đừng lẫn
- Rule mentor: hướng dẫn; **「làm giúp」** mới code
- Không thêm `app/api/*` nếu RSC/Server Action đủ
- Env: `JWT_ACCESS_SECRET` + `JWT_REFRESH_SECRET` (khác nhau, ≥32)
