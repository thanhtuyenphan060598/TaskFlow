# Session Handoff

> Cập nhật cuối buổi: **2026-07-21** (chiều) — dừng trước SQL Bài 4.

## Current Objective

- Goal: `feat-0.3-iam` — code Mảng 1 **xong**; đang **drill SQL** trước Mảng 2 org tree.
- **Buổi sau mở:** SQL **Bài 4** — `title` task mà `member@taskflow.dev` thấy (chuỗi Task→Board→Project→Workspace→Membership).
- Mảng 2 org tree: **sau** khi xong Bài 4 (và nên so sánh với `findAllForUser`).

## Completed This Session (2026-07-21)

- [x] Harness sync + `./.harness/init.sh` PASS
- [x] Chốt cách học: mentor gợi ý only — **cấm SQL/code mẫu chép**
- [x] SQL Bài 1: SELECT / WHERE / COUNT — PASS
- [x] SQL Bài 2: JOIN User↔Membership — PASS
- [x] SQL Bài 3: EXISTS correlate workspace+member — PASS (`Seed Workspace`)

## Not Done (buổi sau)

- [ ] SQL Bài 4 — multi-join / EXISTS trên cây Task
- [ ] (Optional) Curl C-PATCH
- [ ] Mảng 2 org tree — chưa bắt đầu

## psql quick start

```bash
docker exec -it taskflow-postgres psql -U taskflow -d taskflow
```

- Kết thúc câu: `;`
- Prompt `-#` = câu dở → `Ctrl+C`
- Pager `:` → `q`
- Bảng Prisma: `"User"`, `"Membership"`, cột `"userId"`, `"workspaceId"`

## Bài 4 — mentor chỉ nói 1 việc

**Câu hỏi:** Member thấy task title nào?

**Chuỗi:** Task → Board → Project → Workspace → Membership → User (email `member@taskflow.dev`)

**Nộp:** SQL + số row + các title. Kỳ vọng ~2 task workspace Seed, không có task outsider.

## Mentor rules

- Xưng tao/mày; học viên tự gõ
- Một bài một yêu cầu — đừng hỏi lan
- Không ask_question nút bấm
