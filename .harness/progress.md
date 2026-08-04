# Session Progress Log

## Current State

**Last Updated:** 2026-08-04
**Active Feature:** `feat-app1-task` **in-progress** (CRUD UI cơ bản KHÉP; feature lớn còn board/drag/realtime…)
**GĐ0.1 → GĐ0.4:** DONE

## Session 2026-08-04 — Verify create + B errors + Delete/Edit

- [x] Browser create task → 201 PASS
- [x] B: error-handler dev message; FE show mutation errors; forced-500 test OK
- [x] Lý thuyết: await reject → handler; `!res.ok` vs network throw; login try/catch
- [x] Delete BFF `[id]` (204) + FE mutation — browser PASS
- [x] Edit BFF PATCH + draftTitle UX — browser PASS
- [ ] Nợ nhỏ: login catch setLoginError; edit a11y id; updateTask return type
- [ ] **NEXT:** chọn hướng — polish nợ, status/priority edit, hoặc Board API bỏ hardcode

## Session 2026-08-03 — Create form + transaction

- [x] RHF+zodResolver create; CreateTaskInput; migrate AuditLog; $transaction

## What's Next

1. (Optional) commit/push buổi này
2. Chọn 1: polish | status/priority | Board list thay BOARD_ID

## Notes / Nợ

- Hardcode `BOARD_ID`
- Nợ GĐ9 BFF
- `./.harness/init.sh` + shared build trước session mới
