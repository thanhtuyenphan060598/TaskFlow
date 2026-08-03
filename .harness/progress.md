# Session Progress Log

## Current State

**Last Updated:** 2026-08-03 (toi muon — stop, mai hoc tiep)
**Active Feature:** `feat-app1-task` **in-progress**
**GĐ0.1 → GĐ0.4:** DONE

## Session 2026-08-03 tối muộn — Create Task form + transaction (STOP)

- [x] Checkpoint: type ≠ Zod runtime; chốt RHF + `zodResolver(createTaskSchema)`
- [x] Form Create Task: `useForm` + `defaultValues.boardId` + `useMutation` + `invalidateQueries` + reset
- [x] Fix TS: `CreateTaskInput` / `CreateTaskSchema` + `useForm<Input, unknown, Output>` (do `z.coerce.date()`)
- [x] Root cause 500 sau create: `AuditLog` table missing → migrate `20260723125820_add_audit_log` applied (status up to date)
- [x] A: `$transaction` wrap create/update/delete + audit; repo `db` optional chỉ task+audit
- [x] Lý thuyết: partial success; orchestrator cho cross-service tx; không mở `db` mọi repo
- [ ] **B (NEXT):** error-handler/FE surface lỗi rõ hơn (đừng nuốt Prisma thành `"Internal Server Error"` chung)
- [ ] Browser retest create → 201 (làm đầu buổi sau)
- [ ] Edit / Delete UI

## Session 2026-08-03 — React Query + Register + BFF POST

- [x] providers + useQuery list; Register; BFF POST tasks

## What's Next

1. Verify create task 201 in browser
2. B — better 500/error messages (API + FE)
3. Edit / Delete UI

## Notes / Nợ

- Hardcode `BOARD_ID`
- Register `setFormError(null)` nhỏ
- Nợ GĐ9 BFF
- `./.harness/init.sh` + `pnpm --filter @taskflow/shared build` trước session mới
