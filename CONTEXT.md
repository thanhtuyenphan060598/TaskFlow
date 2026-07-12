# Mentor Context: Fullstack Project "TaskFlow"

> File lưu tiến độ học/build. Mở session mới với AI → đọc file này để nắm context.
>
> Prompt gợi ý: "Đọc CONTEXT.md. Tôi đang build fullstack 'TaskFlow', vai trò học viên,
> bạn là mentor. Tiếp tục từ giai đoạn đang dở. QUY TẮC: bạn chỉ mentor + hướng dẫn,
> TÔI là người gõ lệnh/viết file. Code viết TIẾNG ANH. Đi từng bước nhỏ, giải thích
> trước khi làm."

---

## 0. Mục Tiêu
Build 1 dự án Fullstack thật chạy được, có user thật, gồm FE + BE + Realtime + Async
+ Docker + Deploy → để tự tin apply vị trí Fullstack Developer (JS/TS).
Nguyên tắc: KHÔNG nhồi công nghệ cho có. Mỗi công nghệ thêm khi có nhu cầu thật.

## 1. Profile Học Viên
- FE: React/Next.js (2-4 năm). Target: Fullstack Dev (JS/TS).
- Điểm mạnh: JS/TS, tư duy component, async, HTTP. Tư duy phản biện tốt (hay hỏi "tại sao").

## 2. Domain: "TaskFlow" — Team Task & Project Management (kiểu Trello/Linear thu nhỏ)
Chọn vì ép chạm gần như mọi kỹ thuật: Auth/RBAC, data modeling nhiều tầng, realtime,
queue/Kafka, file upload, offline (IndexedDB), search/pagination.

## 3. Stack Đã Chốt
- FE: Next.js (App Router) + React + TailwindCSS + React Query + Zustand (BỎ Jotai)
      + React Hook Form + Zod + IndexedDB.
- BE: Fastify + TypeScript (tự xây kiến trúc layered, KHÔNG dùng Nest) + Prisma + PostgreSQL
      + Redis (cache/queue) → Kafka (giai đoạn sau) + JWT+refresh + bcrypt + Zod.
- Realtime: WebSocket. Testing: Jest+Supertest (BE), Playwright (e2e).
- DevOps: Docker + compose → (optional cuối) K8s. Deploy: VPS + Nginx + Cloudflare + GitHub Actions.

## 4. Quyết Định Quan Trọng
- BE = Fastify (tự thiết kế kiến trúc). Client state = Zustand (bỏ Jotai).
- K8s & Kafka để GIAI ĐOẠN CUỐI/optional (tránh over-engineering sớm).
- Phong cách mentor = KẾT HỢP: học viên tự gõ/viết mọi thứ (data model, auth, business
  rule); mentor giải thích + review; tài liệu (như file này) mentor viết hộ.
- Package manager = pnpm (qua corepack). Terminal = PowerShell (KHÔNG Git Bash — lỗi corepack).
- Code (biến/hàm/comment/string) = TIẾNG ANH. Message hiển thị user → xử lý i18n ở FE sau.

---

## 5. Lộ Trình 10 Giai Đoạn
Mỗi GĐ: Lý thuyết & kiến trúc → Code (học viên tự làm) → Checkpoint câu hỏi.

| GĐ | Tên | Kết quả | Trạng thái |
|---|---|---|---|
| 0 | Foundation & Monorepo | Repo + tooling + shared package | ✅ DONE |
| 1 | BE Core + Data Modeling | Data model + Prisma + Postgres + CRUD API | 🔄 ĐANG LÀM (✅ phần DATA xong → 🔄 phần CRUD API CHƯA giảng, sẽ bắt đầu bằng lý thuyết REST. Chi tiết mục 7) |
| 2 | Auth & Security | Register/login, JWT+refresh, RBAC, rate-limit | chưa |
| 3 | FE Core | Next.js UI, React Query, RHF+Zod, Tailwind | chưa |
| 4 | FE State & Offline | Zustand, IndexedDB, optimistic update | chưa |
| 5 | Realtime | WebSocket, presence, live board | chưa |
| 6 | Async & Events | Redis queue → Kafka (notification, activity log) | chưa |
| 7 | Testing | Unit + integration + e2e | chưa |
| 8 | Docker & Deploy | Dockerize, Nginx, VPS, Cloudflare, CI/CD | chưa |
| 9 | Nâng cao (optional) | K8s, observability, scaling | chưa |

---

## 6. GIAI ĐOẠN 0 — ĐÃ LÀM (chi tiết)
Cấu trúc đã dựng (D:\TaskFlow):
```
apps/                      (rỗng — dành cho api & web)
packages/shared/
  package.json             @taskflow/shared, type=module, deps: zod ^4.4.3
  src/index.ts             barrel file: export * from "./schemas/task.js"
  src/schemas/task.ts      createTaskSchema (Zod) + type CreateTaskInput (z.infer)
package.json               root: private, packageManager pnpm@9.15.0, devDeps: tsx
pnpm-workspace.yaml        packages: apps/*, packages/*
pnpm-lock.yaml , .gitignore
```
Đã kiểm chứng: pnpm install OK (2 workspace), symlink/junction của pnpm (test thực tế),
Zod schema chạy qua tsx OK (valid → pass, invalid → "Title is required").

Kiến thức đã nắm: monorepo, pnpm vs npm, root vs gói con, packageManager+corepack,
cài dep vào đúng gói (--filter / -D -w), symlink pnpm, Zod + z.infer, chạy TS bằng tsx.
Lỗi môi trường đã xử lý: Git Bash không hợp pnpm → dùng PowerShell; execution policy.

Lệnh hay dùng:
- Cài deps: pnpm install
- Thêm dep vào gói: pnpm --filter @taskflow/shared add <pkg>
- Thêm dev dep vào root: pnpm add -D -w <pkg>
- Chạy 1 file TS: pnpm exec tsx <file>

---

## 7. GIAI ĐOẠN 1 — TIẾN ĐỘ

### 7a. Phần DATA — ✅ ĐÃ XONG
- Data model: User, Workspace, Membership(role), Project, Board, Task, TaskAssignee → học viên tự thiết kế, mentor review.
- schema.prisma (6 model + 3 enum) valid; 2 migrations (init + make_author_required).
- PostgreSQL chạy bằng Docker (docker-compose.yml ở root; container taskflow-postgres; volume taskflow_pgdata; port 5432).
  DATABASE_URL trong apps/api/.env = postgresql://taskflow:taskflow@localhost:5432/taskflow?schema=public
- Thực hành Prisma Studio: tạo data 6 bảng; verify JOIN/FK/cascade/referential-integrity bằng SQL. Ôn tập 3/3 đúng.

### 7b. Phần CRUD API — 🔄 CHƯA GIẢNG (mới giới thiệu sơ)
- CHƯA giảng chính thức. Mentor mới đưa bản nháp lý thuyết REST, học viên MỚI ĐỌC SƠ QUA → cần giảng lại
  bài bản + checkpoint khi quay lại.
- Nội dung REST sẽ giảng: resource + URL(endpoint danh từ số nhiều) + HTTP method (GET/POST/PATCH/DELETE=CRUD),
  request(method/url/headers/body) & response(status code + body), status code (2xx OK / 4xx lỗi client / 5xx lỗi server).
  Ẩn dụ nhà hàng: DB=bếp, API=phục vụ, frontend=khách, REST=quy tắc gọi món.
- TODO tiếp: (1) giảng REST + checkpoint; (2) chọn web framework (Express/Fastify/Hono — phân tích cho học viên chọn);
  (3) layered architecture (routes → services → repositories, giải thích vì sao tách lớp);
  (4) CRUD Task dùng Zod từ @taskflow/shared validate input.
- LƯU Ý: Prisma Client hiện CHƯA sinh (thiếu apps/api/src/generated/prisma) → học viên chạy `pnpm exec prisma generate` trước khi code.

GHI CHÚ PRISMA 7 (đã vấp — nhớ để khỏi vấp lại):
- Prisma 7 BỎ `url = env(...)` trong schema.prisma. Connection URL đặt ở prisma.config.ts
  (datasource.url = process.env["DATABASE_URL"]). Nếu để url trong schema → lỗi P1012.
- generator provider = "prisma-client" (mới), output tự sinh vào src/generated/prisma.
- @relation("tên") CHỈ cần khi có >=2 quan hệ giữa CÙNG 2 model. 1 quan hệ đơn → KHÔNG cần
  (đã kiểm chứng: xóa nhãn "TaskAuthor" vẫn valid). User↔Task chỉ 1 quan hệ (author) nên bỏ nhãn.
- KHÔNG dùng PowerShell Set-Content cho file .prisma (thêm BOM làm hỏng dòng 1). Dùng editor.
- QUYẾT ĐỊNH: Task.authorId = NOT NULL (task luôn do user đăng nhập tạo, server tự điền từ token;
  nguyên tắc "chặt trước, nới lỏng sau"). Assignee là n-n qua TaskAssignee → "chưa gán" = chưa có
  dòng liên kết, không cần nullable. dueDate & description = nullable (user được bỏ trống).

Bài tập thiết kế (làm trước khi vào GĐ1):
1. Các bảng có field gì?
2. Quan hệ 1-1 / 1-n / n-n? (1 user ở nhiều workspace, 1 workspace nhiều user → quan hệ gì, cần bảng trung gian nào?)
3. Field nào unique? Field nào cần index?

---

## 8. Kiến Thức Nền (từ buổi học trước, giữ lại)
- HTTP: methods + idempotent (GET/PUT/DELETE idempotent; POST/PATCH không). Status 2xx/3xx/4xx/5xx.
- Middleware & Request Lifecycle: middleware = hàm giữa request→handler→response, xâu chuỗi pipeline.
  next() = đi tiếp phần tử kế tiếp (KHÔNG phải nhảy qua router); quên next → request treo → timeout.
  Thứ tự quan trọng: cái TẠO data trước cái DÙNG data; auth trước route handler.
  Request stateless: KHÔNG lưu req.user vào biến global (nghìn request đồng thời → rò rỉ).
  Auth fail → trả 401/403 NGAY, không next().
