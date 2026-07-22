# Session Progress Log

## Current State

**Last Updated:** 2026-07-22 (chiều)
**Active Feature:** `feat-0.3-iam` — **Mảng 2 org tree**: closure lý thuyết PASS + schema `OrgUnit`/`OrgUnitClosure` học viên GÕ XONG (chưa migrate, còn 2 nợ sửa nhỏ).
**GĐ0.1 Security + GĐ0.2 Monorepo:** ĐÃ KHÉP.

## ⏸️ ĐIỂM DỪNG — bàn giao buổi sau (2026-07-22)

### Session 2026-07-22 (chiều) — Mảng 2 schema closure table

- [x] Học viên định cân nhắc migrate qua Express + làm lại từ đầu → mentor CẢN. Gốc rối = closure table + SQL thuần, KHÔNG phải framework. Giữ Fastify.
- [x] Giảng LẠI closure table chi tiết 6 phần (parentId vs closure, ví dụ Nova, hàng depth=0 self, query descendants 1 phát không đệ quy, tradeoff ghi nặng đọc nhẹ).
- [x] Checkpoint bài tay: thêm QA(6) dưới Production(2) → sửa 2 lỗi học viên (nhầm (2,4,1)→(2,6,1); hiểu sai depth=0 "define sẵn" → thực ra mỗi node mới tự đẻ hàng self). Bài tay thêm An(7) dưới Dev(4) → 4 hàng depth 0→3 → **PASS**.
- [x] Giảng self-relation Prisma 2 FK cùng trỏ OrgUnit → phải đặt TÊN @relation ("Ancestor"/"Descendant") khớp đôi; composite `@@id([ancestorId,descendantId])`. Checkpoint asAncestor(Production)=#2,9,10,11 → **PASS**.
- [x] Học viên GÕ 2 model vào schema.prisma (dòng 139-163) + field ngược `orgUnits` trong Workspace.
- [ ] **NỢ SỬA (tối nay làm trước):**
  - BUG dòng 143: `createAt` → `createdAt` (thiếu chữ d).
  - Chỉnh dòng 162: `@@index([ancestorId, descendantId])` (trùng composite @@id, vô ích) → đổi `@@index([descendantId])` (tối ưu query "tổ tiên của X").
- [ ] Sau khi sửa: `pnpm --filter @taskflow/api exec prisma validate` → migrate → seed org tree → SQL query descendants.

### Session 2026-07-21 (tối) — SQL Bài 4 + Mảng 2 lý thuyết

### Session 2026-07-21 (tối) — SQL Bài 4 + Mảng 2 lý thuyết

- [x] SQL Bài 4 PASS — 2 rows (`Member's task`, `Owner's task`); sửa JOIN Membership + WHERE email
- [x] Map SQL ↔ `findAllForUser`; hiểu `some` vs `every`
- [x] Mảng 2: closure table — ancestor/descendant/depth; checkpoint PASS
- [x] Chốt quy tắc mentor: **bài mới = giải thích đủ trước, checkpoint sau** (ghi CONTEXT.md)
- [x] Mảng 2 bước 2: học viên thiết kế `OrgUnit` + closure trong `schema.prisma` (DONE 2026-07-22)

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

1. **SỬA 2 NỢ schema** (createAt→createdAt dòng 143; @@index dòng 162 → [descendantId]) → `prisma validate`
2. **Migration** OrgUnit + OrgUnitClosure
3. **Seed** org tree mẫu (Nova→Production→{Dev,Design}, HR) trong Seed Workspace
4. **SQL query descendants** (WHERE ancestorId = X) — nối tiếp SQL drill
5. Repository / API (optional)

## Notes for Next Session

1. Đọc CONTEXT.md mục ⏸️ + quy tắc “giải thích trước khi hỏi”
2. `./.harness/init.sh`
3. Một việc một lúc — SỬA 2 nợ schema TRƯỚC, rồi mới migrate. Đừng nhảy seed/API
4. Học viên đã THÔNG closure table (bài tay QA + An PASS, asAncestor PASS) — không cần giảng lại từ đầu, chỉ ôn nhanh nếu quên
