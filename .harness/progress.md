# Session Progress Log

## Current State

**Last Updated:** 2026-07-22 (tối)
**Active Feature:** `feat-0.3-iam` — Mảng 2 org tree **KHÉP** (schema+migrate+seed+SQL); next = Mảng 3 ABAC hoặc org repo optional.
**GĐ0.1 Security + GĐ0.2 Monorepo:** ĐÃ KHÉP.

## ⏸️ ĐIỂM DỪNG — bàn giao buổi sau

### Session 2026-07-22 (tối)

- [x] Sửa schema nợ (createdAt, @@index descendantId) → validate PASS
- [x] Migration `add_org_unit_closure` apply PASS
- [x] Học viên seed org tree Workspace A — 5 OrgUnit + 11 closure PASS
- [x] SQL Bài 5: descendants Production + ancestors Dev PASS
- [x] pnpm scripts dev (`db:psql`, `seed`, prisma:*)
- [ ] Org repository/API (optional)
- [ ] Curl C-PATCH (optional)

### Session 2026-07-22 (chiều)

- [x] Closure lý thuyết + schema OrgUnit/OrgUnitClosure (học viên gõ)

### Session 2026-07-21

- [x] SQL Bài 1–4 PASS; Mảng 1 code KHÉP

## Status

### What's Done

- [x] GĐ0, GĐ1, GĐ2 Auth, GĐ0.1, GĐ0.2
- [x] feat-0.3-iam Mảng 1
- [x] SQL Bài 1–5
- [x] Mảng 2 core (closure table end-to-end)

### What's Next

1. Mảng 3 ABAC
2. (Optional) org.repository + API
3. (Optional) Curl C-PATCH

## Notes for Next Session

1. CONTEXT.md mục ⏸️
2. `pnpm init` hoặc `./.harness/init.sh`
3. `pnpm db:psql` — không cần make trên Windows Git Bash
