# Session Progress Log

## Current State

**Last Updated:** 2026-07-21 (tối)
**Active Feature:** `feat-0.3-iam` — SQL drill **KHÉP**; **Mảng 2 org tree** lý thuyết xong, chưa code schema.
**GĐ0.1 Security + GĐ0.2 Monorepo:** ĐÃ KHÉP.

## ⏸️ ĐIỂM DỪNG — bàn giao buổi sau

### Session 2026-07-21 (tối) — SQL Bài 4 + Mảng 2 lý thuyết

- [x] SQL Bài 4 PASS — 2 rows (`Member's task`, `Owner's task`); sửa JOIN Membership + WHERE email
- [x] Map SQL ↔ `findAllForUser`; hiểu `some` vs `every`
- [x] Mảng 2: closure table — ancestor/descendant/depth; checkpoint PASS
- [x] Chốt quy tắc mentor: **bài mới = giải thích đủ trước, checkpoint sau** (ghi CONTEXT.md)
- [ ] Mảng 2 bước 2: học viên thiết kế `OrgUnit` + closure trong `schema.prisma`

### Session 2026-07-21 (chiều) — SQL drill Bài 1–3

- [x] Bài 1–3 PASS (xem CONTEXT.md)

### Code IAM

- Mảng 1a/1b/1c PASS; HEAD `2e19c66`
- Curl C-PATCH optional — chưa evidence

## Status

### What's Done

- [x] GĐ0, GĐ1, GĐ2 Auth, GĐ0.1, GĐ0.2
- [x] feat-0.3-iam Mảng 1 (READ+WRITE+harden)
- [x] SQL Bài 1–4
- [x] Mảng 2 lý thuyết closure table

### What's Next (thứ tự)

1. **Mảng 2:** học viên phác Prisma model `OrgUnit` + closure table → mentor review
2. Migration + seed org tree
3. SQL query descendants
4. (Optional) Curl C-PATCH

## Notes for Next Session

1. Đọc CONTEXT.md mục ⏸️ + quy tắc “giải thích trước khi hỏi”
2. `./.harness/init.sh`
3. Một việc một lúc — schema trước, đừng nhảy seed/API
