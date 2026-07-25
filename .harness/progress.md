# Session Progress Log

## Current State

**Last Updated:** 2026-07-25 (toi)
**Active Feature:** `feat-0.4-design-system` **in-progress**
**GĐ0.1 + GĐ0.2 + GĐ0.3:** DONE

## Session 2026-07-25 — GĐ0.4 Design System (session 1)

- [x] Scaffold `packages/ui` (package.json peer+dev React 19)
- [x] tsconfig bundler + DOM lib (sửa từ NodeNext — ui ≠ Node)
- [x] Button Lớp 0 + index export
- [x] `pnpm typecheck` PASS
- [x] Harness: thuật ngữ, cách dạy, từ điển, GĐ0.4 styling roadmap
- [x] Lý thuyết: peer/dev, DS scope, build/source-only, Prisma Studio lockfile, Radix vs MUI
- [ ] Storybook, tokens.css Lớp 1, Button review từng dòng
- [ ] Học viên ôn lại bức tranh DS (mentor giảng đơn giản hơn buổi sau)

## Session 2026-07-23 (toi) — Mang 4 audit log

- [x] Ly thuyet audit vs permission
- [x] Schema AuditLog + AuditAction + migration 20260723125820
- [x] audit.repository.ts
- [x] task.service hooks CREATE/UPDATE/DELETE
- [x] workspaceId tu board chain / assertCanModifyTask
- [x] Verify PATCH → 1 AuditLog row PASS; tsc PASS

## What's Next

1. **feat-0.4-design-system** — ôn lý thuyết DS (1 ý/bài) HOẶC tokens Lớp 1 HOẶC Storybook
2. Optional IAM debt: GET /audit, org repo, curl C-PATCH

## Notes

- `pnpm init`, `pnpm typecheck`, `pnpm db:psql`
- `packages/ui` tsconfig = **bundler**; api/shared = **NodeNext**
- react-dom trong lockfile prisma = Prisma Studio peer, không ảnh hưởng API runtime
