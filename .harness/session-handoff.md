# Session Handoff

> Cập nhật cuối buổi: **2026-07-22** (tối) — Mảng 2 org tree KHÉP.

## Current Objective

- Goal: `feat-0.3-iam` — Mảng 2 **xong** (schema, migrate, seed, SQL drill Bài 5).
- **Buổi sau:** Mảng 3 ABAC hoặc org repository (optional).

## Completed This Session (2026-07-22 tối)

- [x] Schema fix + migrate OrgUnit/OrgUnitClosure
- [x] Seed org tree (học viên gõ) — Workspace A, 11 closures
- [x] SQL descendants Production + ancestors Dev
- [x] pnpm dev scripts (db:psql, seed, prisma:*)

## Not Done

- [ ] Org repository / API
- [ ] Mảng 3 ABAC
- [ ] Curl C-PATCH optional

## SQL quick ref (2 FK closure)

```sql
-- Descendants of X (go down)
WHERE ancestorId = X  +  JOIN OrgUnit ON descendantId

-- Ancestors of Y (go up)
WHERE descendantId = Y  +  JOIN OrgUnit ON ancestorId
```

## Dev commands

```bash
pnpm init          # harness verify
pnpm db:psql       # psql shell
pnpm seed          # reseed
pnpm prisma:validate
```

## Mentor rules

- Xưng tao/mày; học viên tự gõ code (seed lần này học viên gõ)
- Bài mới: giải thích trước, checkpoint sau
- Không ask_question nút bấm
