# Session Handoff

> Cập nhật: **2026-07-26** — GĐ0.4 DONE.

## Current Objective

- **feat-0.4-design-system:** DONE
- **Next:** `feat-app1-task` — apps/web (auth guard lives here, NOT ui)

## Boundary rule (2026-07-26)

- `@taskflow/ui` = widgets only (Button, Modal, Table, Form fields)
- App layout shell + auth = `apps/web`

## Dev commands

```bash
./.harness/init.sh
pnpm typecheck
pnpm --filter @taskflow/ui storybook
```
