# Session Progress Log

## Current State

**Last Updated:** 2026-08-03 (toi — harness handoff sau khi mentor CLI đứt)
**Active Feature:** `feat-app1-task` **in-progress**
**GĐ0.1 → GĐ0.4:** DONE

## Session 2026-08-03 tối — Task Create: BFF POST + WIP form (ĐỨT giữa validate FE)

- [x] Chốt scope: **hardcode `boardId`** seed Board A (`e0dd4eb4-f55b-465d-a63f-f1ad11713bbe`) — nợ Board/Project/Workspace UI sau (tránh orphan / scope creep)
- [x] Form Create Task đặt **cùng trang `/tasks`** (không modal/route mới)
- [x] BFF `POST` trong `apps/web/src/app/api/tasks/route.ts` — cookie→Bearer, forward body, forward `res.status` (201) — mentor review PASS
- [x] Lý thuyết: `useMutation` + `invalidateQueries`; `proxy.ts` (page UX) vs check cookie trong Route Handler (data auth)
- [ ] **WIP** `tasks/page.tsx`: có `BOARD_ID`, hàm `createTask` typed `CreateTaskSchema`, import schema/`useMutation` — **chưa** form UI, chưa `useMutation` hook, chưa RHF/`zodResolver`, chưa invalidate
- [ ] **Checkpoint mở (mentor chết token/auth trước khi trả lời):**
  1. Học viên: "tao đã validation bằng schema rồi" — cần review: type import ≠ runtime Zod
  2. Chưa chốt RHF vs `useState` cho `title`
  3. Chưa chốt `zodResolver(createTaskSchema)` vs chỉ dựa BE 400
- [ ] Browser test create task — chưa chạy
- [ ] **NEXT mentor:** review WIP → chốt FE validate → wire form + mutation → test

## Session 2026-08-03 — GĐ1(app) React Query + Register

- [x] `providers.tsx` — `QueryClient` + lazy `useState`
- [x] `tasks/page.tsx` — `useQuery` list
- [x] Browser: login → `/tasks` list PASS
- [x] Register BFF + page; browser 201 + 409 PASS
- [x] Bài học: `initialData: []` che loading; optional chaining

## Session 2026-07-31 — GĐ1(app) auth + task list

- [x] BFF GET tasks, list UI, E2E login→list PASS

## What's Next

1. Review / hoàn thiện Create Task form (`zodResolver` + `useMutation` + invalidate)
2. Browser test create
3. Edit / Delete UI sau

## Notes / Nợ

- Hardcode `BOARD_ID` — trả khi có Board list API/UI
- Register `onSubmit` thiếu `setFormError(null)` đầu hàm (nhỏ)
- Nợ GĐ9: BFF data routes → nginx same-domain
- `./.harness/init.sh` + `pnpm --filter @taskflow/shared build` trước session mới
