# Session Handoff — 2026-08-05 (zero Route Handlers)

## Mở session

```bash
cd /Users/ecbdeveloper/Documents/TaskFlow && ./.harness/init.sh
pnpm --filter @taskflow/api dev
pnpm --filter @taskflow/web dev
```

## Architecture (đã ship)

- Dual JWT: `JWT_ACCESS_SECRET` + `JWT_REFRESH_SECRET` (`namespace` access/refresh)
- Tasks: RSC + Server Actions; client islands = create form + task row
- Auth: `app/(auth)/actions.ts` (login/register); **không** còn `app/api/**`
- Refresh: `proxy.ts` + `lib/api/server.ts` `apiFetch`
- Đã gỡ React Query / RHF / data+auth BFF Route Handlers

## Verify đã PASS

- Browser login → `/tasks`
- Refresh cookie only → proxy set access mới
- Invalid refresh → `/login`
- lint + tsc PASS

## Seed

`owner@taskflow.dev` / `password123`

## Next

Filter / drag-drop / realtime (RQ chỉ khi cần); GĐ9 cùng domain
