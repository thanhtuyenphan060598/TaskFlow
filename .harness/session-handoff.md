# Session Handoff

> Cập nhật cuối buổi: **2026-07-21** (tối) — SQL Bài 4 PASS; Mảng 2 lý thuyết closure xong.

## Current Objective

- Goal: `feat-0.3-iam` — Mảng 1 code **xong**; SQL drill **xong**; **Mảng 2 org tree** đang lý thuyết → code schema.
- **Buổi sau mở:** học viên thiết kế `OrgUnit` + closure table trong `schema.prisma` (mentor review, không viết hộ).

## Completed This Session (2026-07-21 tối)

- [x] SQL Bài 4 PASS — `Member's task`, `Owner's task` (2 rows)
- [x] So sánh SQL ↔ `findAllForUser`; `some`/`every` IAM
- [x] Closure table: ancestor, descendant, depth — checkpoint PASS
- [x] Quy tắc mentor mới: bài mới = giải thích đủ trước, hỏi sau (CONTEXT.md)

## Not Done (buổi sau)

- [ ] Prisma schema OrgUnit + closure
- [ ] Migration + seed org tree
- [ ] SQL query descendants
- [ ] (Optional) Curl C-PATCH

## Closure table — tóm tắt nhanh (mentor đọc trước khi dạy)

Cây ví dụ: Nova → Dev → Backend Team; Nova → HR.

| ancestor | descendant | depth | Ý |
|----------|------------|-------|---|
| nova | be | 2 | Nova xuống Backend = 2 cấp (qua Dev) |
| dev | be | 1 | Dev → Backend trực tiếp |
| be | be | 0 | node tự trỏ mình |

Không có `hr → be` (ngang hàng). Query descendants của `dev`: `WHERE ancestor = dev AND depth >= 0`.

## Mentor rules

- Xưng tao/mày; học viên tự gõ code
- **Bài mới: giải thích đủ (ví dụ + bảng + tradeoff) TRƯỚC checkpoint**
- Một bài một yêu cầu — đừng hỏi lan
- Không ask_question nút bấm
- Cấm SQL/code mẫu đầy đủ để chép
