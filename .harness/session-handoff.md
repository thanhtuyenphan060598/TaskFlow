# Session Handoff — GĐ1 Create Task (2026-08-03 tối)

## Mở session mới

```bash
cd /Users/ecbdeveloper/Documents/TaskFlow && ./.harness/init.sh
pnpm --filter @taskflow/shared build
pnpm --filter @taskflow/api dev       # :3001
pnpm --filter @taskflow/web dev       # :3000
```

Đọc **đầu tiên:** `.harness/CONTEXT.md` mục **⏸️ ĐIỂM DỪNG HIỆN TẠI**.

Mentor: xưng **tao**, gọi học viên **mày**. Chỉ hướng dẫn — học viên tự gõ code. Không `ask_question` nút bấm.

## Đang làm

`feat-app1-task` — **in-progress**  
Đang dừng: **FE validate createTask với schema** (WIP, mentor CLI đứt).

## Xong buổi này

- Hardcode `BOARD_ID` = `e0dd4eb4-f55b-465d-a63f-f1ad11713bbe` (seed Board A)
- BFF `POST /api/tasks` (forward status 201)
- Lý thuyết `useMutation` / `invalidateQueries` / proxy vs API auth

## WIP / chưa xong

`apps/web/src/app/(dashboard)/tasks/page.tsx`:

- Có hàm `createTask` + import schema — **chưa** form, **chưa** `useMutation` trong component
- Học viên nói đã validate schema — **cần review:** type ≠ `zodResolver` runtime

## Buổi sau — ONE step

1. Review WIP với học viên → chốt RHF+`zodResolver(createTaskSchema)` (hoặc useState tạm)
2. Wire form + mutation + `invalidateQueries`
3. Browser test create task

## Seed login

`owner@taskflow.dev` / `password123`

## Nợ

- Board/Project/Workspace UI (thay hardcode boardId)
- GĐ9: BFF data routes → nginx same-domain
