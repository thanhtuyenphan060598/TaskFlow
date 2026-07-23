# Session Progress Log

## Current State

**Last Updated:** 2026-07-23 (sang)
**Active Feature:** feat-0.3-iam - Mang 3 ABAC dang do (schema + migration DONE, seed ProjectMember + permission.service chua lam).
**GD0.1 Security + GD0.2 Monorepo:** DA KHEP.

## DIEM DUNG - ban giao buoi sau

### Session 2026-07-23 (sang)

- [x] Giai thich RBAC vs ABAC (hoc vien da hieu)
- [x] Hoc vien thiet ke schema ProjectMember + enum RoleWorkspace/RoleProject
- [x] prisma validate PASS
- [x] Migration 20260723040552 apply PASS (drop enum Role cu -> RoleWorkspace; tao bang ProjectMember)
- [x] prisma generate lai + pnpm seed PASS
- [ ] Them seed ProjectMember vao seed.ts (DANG DO - chua lam)
- [ ] Cap nhat permission.service.ts them ABAC layer (check ProjectMember MANAGER)
- [ ] Curl verify ABAC (MANAGER sua task nguoi khac trong project -> 200; CONTRIBUTOR sua task nguoi khac -> 403)

### Session 2026-07-22 (toi)

- [x] Sua schema no (createdAt, @@index descendantId) -> validate PASS
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
- [x] feat-0.3-iam Man- [x] Migration 202607230x] Mang 2 core (closure table end-to-end)
- [x] Mang 3 ABAC: ly thuyet + schema + migration

### What is Next

1. Seed ProjectMember vao seed.ts (owner=MANAGER, member=CONTRIBUTOR, Project A)
2. Cap nhat permission.service.ts - them check ABAC layer (ProjectMember MANAGER)
3. Curl verify ABAC cases
4. (Optional) Org repository + API
5. (Optional) Curl C-PATCH

## Notes for Next Session

1. CONTEXT.md muc diem dung dau file
2. pnpm init hoac ./.harness/init.sh
3. Seed chua co ProjectMember - them truoc khi test ABAC
4. permission.service.ts can sua assertCanModifyTask de check ProjectMember.role === MANAGER
