# Session Progress Log

## Current State

**Last Updated:** 2026-07-26 (toi)
**Active Feature:** `feat-0.4-design-system` **DONE** — next: `feat-app1-task`
**GĐ0.1 + GĐ0.2 + GĐ0.3:** DONE

## Session 2026-07-26 — GĐ0.4 Design System (session 2)

- [x] Tailwind v4 hybrid C — `@theme` tokens in `globals.css`
- [x] Button primary/secondary + className merge default `""`
- [x] Storybook 10 + Button/Modal stories
- [x] Modal + `@radix-ui/react-dialog` + Portal/Content/Close structure
- [x] `css.d.ts`, `.vscode` css lint, typecheck PASS
- [x] Table, FormField/Input/Label, AppLayout + stories
- [x] AuthGuard + AppLayout removed from ui (app shell → apps/web GĐ1)
- [x] GĐ0.4 KHÉP (mentor implement phần còn lại 2026-07-26)

## Session 2026-07-25 — GĐ0.4 (session 1)

- [x] Scaffold `packages/ui`, Button L0, harness rules

## What's Next

1. **feat-app1-task** — apps/web Next.js + board/task FE
2. Optional IAM debt: GET /audit, org repo

## Notes

- Storybook 10: không cài `@storybook/addon-essentials` (merged vào core từ v9)
- `pnpm --filter @taskflow/ui storybook` — port 6006
