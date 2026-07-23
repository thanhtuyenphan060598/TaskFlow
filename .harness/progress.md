# Session Progress Log

## Current State

**Last Updated:** 2026-07-23 (chieu)
**Active Feature:** feat-0.3-iam - Mang 3 ABAC KHEP. Con lai: Mang 4 audit log (optional).
**GD0.1 Security + GD0.2 Monorepo:** DA KHEP.

## DIEM DUNG - ban giao buoi sau

### Session 2026-07-23 (sang + chieu)

- [x] Giai thich RBAC vs ABAC (hoc vien da hieu)
- [x] Hoc vien thiet ke schema ProjectMember + enum RoleWorkspace/RoleProject
- [x] prisma validate PASS
- [x] Migration 20260723040552 apply PASS
- [x] prisma generate lai + pnpm seed PASS
- [x] Them seed ProjectMember vao seed.ts (owner=MANAGER, member=CONTRIBUTOR)
- [x] project-member.repository.ts - findByUserAndProject (composite unique key)
- [x] permission.service.ts - them ABAC layer: check ProjectMember.role === MANAGER
- [x] tsc EXIT 0
- [x] Curl 3/3 PASS: MEMBER->403, OWNER(MANAGER)->200, ADMIN(workspace)->200

### Session 2026-07-22 (toi)

- [x] Schema no (createdAt, @@index descendantId) -> validate PASS
- [x] Migration add_org_unit_closure apply PASS
- [x] Hoc vien seed org tree Workspace A - 5 OrgUnit + 11 closure PASS
- [x] SQL Bai 5: descendants Production + ancestors Dev PASS
- [x] pnpm scripts dev (db:psql, seed, prisma:*)

### Session 2026-07-22 (chieu)

- [x] Closure ly thuyet + schema OrgUnit/OrgUnitClosure (hoc vien go)

### Session 2026-07-21

- [x] SQL Bai 1-4 PASS; Mang 1 code KHEP

## Status

### What is Done

- [x] GD0, GD1, GD2 Auth, GD0.1, GD0.2
- [x] feat-0.3-iam Mang 1
- [x] SQL Bai 1-5
- [x] Mang 2 core (closure table end-to-end)
- [x] Mang 3 ABAC (schema + migration + seed + repository + permission.service + curl verify)

### What is Next

1. Mang 4 audit log (optional) hoac chuyen sang GD0.4 Design System
2. (Optional) Org repository + API
3. (Optional) Curl C-PATCH

## Notes for Next Session

1. CONTEXT.md muc diem dung dau file
2. pnpm init hoac ./.harness/init.sh
3. Mang 3 ABAC da KHEP - quyet dinh: tiep tuc Mang 4 hay sang GD0.4?
