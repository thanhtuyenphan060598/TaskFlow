# Session Handoff — 2026-08-03 tối muộn

## Mở session mới

```bash
cd /Users/ecbdeveloper/Documents/TaskFlow && ./.harness/init.sh
pnpm --filter @taskflow/shared build
pnpm --filter @taskflow/api dev
pnpm --filter @taskflow/web dev
```

Đọc: `.harness/CONTEXT.md` mục **⏸️ ĐIỂM DỪNG**.

Mentor: **tao/mày**; học viên tự gõ code; hỏi bằng chữ.

## Đang làm

`feat-app1-task` — Create Task gần xong.

## Xong

- FE form RHF + full `createTaskSchema` + mutation/invalidate
- `CreateTaskInput` cho coerce dueDate
- Migrate AuditLog; `$transaction` task+audit (create/update/delete)

## Buổi sau — ONE step đầu

1. Browser verify create → **201**
2. Rồi **B:** surface lỗi API/FE rõ (error-handler đang trả `"Internal Server Error"` chung)

## Seed

`owner@taskflow.dev` / `password123`
