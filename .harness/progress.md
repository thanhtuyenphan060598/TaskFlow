# Session Progress Log

## Current State

**Last Updated:** 2026-07-23 (toi)
**Active Feature:** `feat-0.3-iam` **DONE** — next focus `feat-0.4-design-system`
**GĐ0.1 + GĐ0.2:** DONE

## Session 2026-07-23 (toi) — Mang 4 audit log

- [x] Ly thuyet audit vs permission
- [x] Schema AuditLog + AuditAction + migration 20260723125820
- [x] audit.repository.ts
- [x] task.service hooks CREATE/UPDATE/DELETE
- [x] workspaceId tu board chain / assertCanModifyTask
- [x] Verify PATCH → 1 AuditLog row PASS; tsc PASS

## Session 2026-07-23 (sang + chieu) — Mang 3 ABAC

- [x] ProjectMember schema + permission ABAC + curl 3/3

## What's Next

1. **feat-0.4-design-system** — packages/ui, Storybook
2. Optional: GET /audit, org repo, curl C-PATCH

## Notes

- `pnpm init`, `pnpm db:psql`
- Import ESM: luon `.js` extension (vd `../lib/prisma.js`)
