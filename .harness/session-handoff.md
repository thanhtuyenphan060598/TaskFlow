# Session Handoff — 2026-08-04 tối

## Mở session mới

```bash
cd /Users/ecbdeveloper/Documents/TaskFlow && ./.harness/init.sh
pnpm --filter @taskflow/shared build
pnpm --filter @taskflow/api dev
pnpm --filter @taskflow/web dev
```

Đọc: `.harness/CONTEXT.md` mục **⏸️ ĐIỂM DỪNG**.

## Xong

- Task CRUD + status/priority; boards API+select; FE `api/`+`useTasks`
- Silent refresh PASS
- Quy ước: clean từ đầu; mentor chỉ code khi nhờ

## Buổi sau — chọn

1. Redirect `/login` khi refresh fail  
2. JWT `type` access vs refresh  
3. feat-app1 lớn (drag-drop / filter / realtime)

## Seed

`owner@taskflow.dev` / `password123`
