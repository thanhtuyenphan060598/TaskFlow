# Session Handoff — 2026-08-04

## Mở session mới

```bash
cd /Users/ecbdeveloper/Documents/TaskFlow && ./.harness/init.sh
pnpm --filter @taskflow/shared build
pnpm --filter @taskflow/api dev
pnpm --filter @taskflow/web dev
```

Đọc: `.harness/CONTEXT.md` mục **⏸️ ĐIỂM DỪNG**.

## Đang làm

`feat-app1-task` — **CRUD UI cơ bản KHÉP**; feature vẫn in-progress (board/drag/realtime…).

## Xong buổi này

- Create verify 201; error surface B; Delete 204; Edit PATCH 200

## Buổi sau — chọn 1

1. Polish nợ nhỏ (login catch, edit ids)
2. Edit status/priority
3. Board list API — bỏ hardcode `BOARD_ID`

## Seed

`owner@taskflow.dev` / `password123`
