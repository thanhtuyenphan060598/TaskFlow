# Session Handoff — GĐ1 apps/web (2026-08-01)

## Mở session mới

```bash
cd /d/TaskFlow && ./.harness/init.sh
pnpm --filter @taskflow/shared build
pnpm dev                              # api :3001
pnpm --filter @taskflow/web dev       # web :3000
```

Đọc: `.harness/CONTEXT.md` mục **⏸️ ĐIỂM DỪNG**.

## Đang làm

`feat-app1-task` — in-progress

## Xong buổi này

- React Query wrap `GET /api/tasks`: `app/providers.tsx` (`QueryClientProvider`) + `tasks/page.tsx` dùng `useQuery`
- Bỏ `useEffect`/`useState`/`AbortController` thủ công
- Verify: typecheck pass, browser test login → `/tasks` list render, network 1 GET, console sạch

## Buổi sau — ONE step

Register page + BFF `POST /api/auth/register` (pattern giống login: RHF+Zod form → route handler → Fastify).

## Nợ GĐ9

Dev BFF → prod nginx same domain → bỏ data proxy routes (CONTEXT).

## Seed login

`owner@taskflow.dev` / `password123`
