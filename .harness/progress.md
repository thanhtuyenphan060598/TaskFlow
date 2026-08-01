# Session Progress Log

## Current State

**Last Updated:** 2026-08-01
**Active Feature:** `feat-app1-task` **in-progress**
**GĐ0.1 → GĐ0.4:** DONE

## Session 2026-08-01 — GĐ1(app) React Query cho tasks (KHÉP buổi này)

- [x] Cài `@tanstack/react-query` cho `@taskflow/web`
- [x] `app/providers.tsx` — `QueryClientProvider`, mount trong root `layout.tsx`
- [x] `tasks/page.tsx` — thay `useEffect`/`useState`/`AbortController` bằng `useQuery({ queryKey: ["tasks"], queryFn })`
- [x] Verify: `tsc --noEmit` pass; browser test login → `/tasks` → list render đúng, network chỉ 1 GET `/api/tasks`, console sạch
- [ ] **NEXT:** Register page + BFF `/api/auth/register`, task CRUD UI

## Session 2026-07-31 — GĐ1(app) auth + task list (KHÉP buổi này)

- [x] BFF `GET /api/tasks/route.ts` — cookie → Bearer → Fastify
- [x] `tasks/page.tsx` — client fetch `/api/tasks`, render list
- [x] E2E test: login seed user → redirect `/tasks` → list hiện PASS
- [x] Bài học: Strict Mode double fetch dev; AbortController = cancel not dedupe; error state sticky vs setTasks
- [ ] **NEXT:** React Query, register page, task CRUD UI

## Session 2026-07-28/29 — GĐ1(app) apps/web (auth nền)

- [x] Scaffold `@taskflow/web`, shell `(dashboard)`/`(auth)`
- [x] Login RHF + `loginSchema`; shared `dist/` build
- [x] BFF `POST /api/auth/login`, httpOnly cookie, `proxy.ts`
- [x] `@fastify/cors` api; `API_URL` server-only
- [x] Nợ GĐ9 BFF prod documented in CONTEXT

## Session 2026-07-26 — GĐ0.4 Design System (KHÉP)

- [x] Tailwind v4, Button/Modal/Table/Form, Storybook 10

## What's Next

1. Register page + BFF (pattern giống login)
2. Task create/edit UI

## Notes

- Dev Strict Mode: useEffect fetch 2 lần — prod 1 lần
- AbortController: ignore `AbortError` in catch; không dùng để chống duplicate
- `./.harness/init.sh` + `pnpm --filter @taskflow/shared build` trước session mới
