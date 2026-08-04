# Session Progress Log

## Current State

**Last Updated:** 2026-08-04 (toi)
**Active Feature:** `feat-app1-task` **in-progress**
**GĐ0.1 → GĐ0.4:** DONE

## Session 2026-08-04 — CRUD + boards + refactor + silent refresh

- [x] status/priority, Board API+BFF+select, FE refactor (`api/` + `useTasks`)
- [x] Silent refresh BFF + `request()` retry — browser PASS (401→refresh→task POST/GET)
- [x] Harness: clean-from-start; giải thích access≠refresh type claim
- [x] Commit/push `c598eb2`

## What's Next

1. Optional: redirect login khi refresh fail; JWT `type` claim
2. feat-app1 tiếp (drag-drop / filter / realtime…)

## Notes / Nợ

- JWT access/refresh cùng secret, chưa có `type` — access còn hạn vẫn verify được trên `/refresh`
- Nợ GĐ9 BFF
- Mentor chỉ code khi học viên nhờ rõ
