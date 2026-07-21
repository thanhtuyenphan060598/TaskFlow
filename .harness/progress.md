# Session Progress Log

## Current State

**Last Updated:** 2026-07-21 (chiều — end session)
**Active Feature:** `feat-0.3-iam` — Mảng 1 code **KHÉP**; **SQL drill** Bài 1–3 PASS; **next = Bài 4**.
**GĐ0.1 Security + GĐ0.2 Monorepo:** ĐÃ KHÉP.

## ⏸️ ĐIỂM DỪNG — bàn giao buổi sau

### Session 2026-07-21 — SQL drill (psql)

- [x] Checkpoint: đọc SQL ~10%; FE→BE chưa đụng SQL; học SQL thuần trước Prisma
- [x] Quy tắc: mentor gợi ý only — **không code/SQL mẫu chép**
- [x] Bài 1 PASS — SELECT, WHERE, COUNT; `'...'` vs `"..."`; `"User"`
- [x] Bài 2 PASS — JOIN; `"userId"`; alias; ambiguous id
- [x] Bài 3 PASS — EXISTS correlate → `Seed Workspace` (1 row)
- [ ] **Bài 4** — Task→Board→Project→Workspace→Membership → title tasks member thấy

### Code IAM (trước buổi này — không sửa thêm)

- Mảng 1a/1b/1c PASS; HEAD `2e19c66`
- Curl C-PATCH optional — chưa evidence

## Status

### What's Done

- [x] GĐ0, GĐ1, GĐ2 Auth, GĐ0.1, GĐ0.2
- [x] feat-0.3-iam Mảng 1 (READ+WRITE+harden)
- [x] SQL Bài 1–3

### What's Next (thứ tự)

1. **SQL Bài 4** (buổi sau mở đầu)
2. So sánh Bài 4 ↔ `task.repository.findAllForUser`
3. Mảng 2 org tree (closure table)
4. (Optional) Curl C-PATCH

## Notes for Next Session

1. `AGENTS.md` + `CONTEXT.md` mục ⏸️ + `session-handoff.md`
2. `./.harness/init.sh` + psql vào Docker Postgres
3. Một việc một lúc — Bài 4 trước, đừng nhảy Mảng 2
