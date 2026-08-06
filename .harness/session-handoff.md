# Session Handoff — 2026-08-06

## Mở session

```bash
cd /Users/ecbdeveloper/Documents/TaskFlow && ./.harness/init.sh
pnpm --filter @taskflow/api dev
pnpm --filter @taskflow/web dev
```

## Đã ship (không đổi code buổi này)

- Dual JWT; tasks RSC + Server Actions; auth Server Actions; không `app/api/**`
- Refresh: `proxy.ts` + `lib/api/server.ts` `apiFetch`
- HEAD: `ac7ca34`

## Điểm dừng 2026-08-06

- Học viên chọn **A — Filter / search**
- **Chưa implement** Phase 1 BE (Zod query + Prisma filter)
- Checkpoint mở: `status=FOOBAR` → Zod bắt, HTTP 400 (không để Prisma)

## Next (1 feature)

1. Shared: `listTasksQuerySchema` (`status?`, `q?`)
2. `GET /tasks` parse `request.query` → service/repo `findMany` where
3. Verify curl: filter OK + status rác → 400
4. Rồi mới FE `searchParams`

## Seed

`owner@taskflow.dev` / `password123`

## Mentor

Chỉ hướng dẫn; code khi học viên nói **「làm giúp」**.
