# Session Handoff — GĐ1 apps/web (2026-07-31)

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

- Full auth flow: login BFF + cookie + proxy + tasks BFF + list UI
- E2E test PASS
- shared `dist/` build, api CORS

## Buổi sau — ONE step

React Query wrap `GET /api/tasks` (giải thích trước, một file).

## Nợ GĐ9

Dev BFF → prod nginx same domain → bỏ data proxy routes (CONTEXT).

## Seed login

`owner@taskflow.dev` / `password123`
