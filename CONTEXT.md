# Mentor Context: Fullstack Project "TaskFlow"

> File lưu tiến độ học/build. Mở session mới với AI → đọc file này để nắm context.
>
> Prompt gợi ý: "Đọc CONTEXT.md. Tôi đang build fullstack 'TaskFlow', vai trò học viên,
> bạn là mentor. Tiếp tục từ giai đoạn đang dở. QUY TẮC: bạn chỉ mentor + hướng dẫn,
> TÔI là người gõ lệnh/viết file. Code viết TIẾNG ANH. Đi từng bước nhỏ, giải thích
> trước khi làm."


## ⏸️ ĐIỂM DỪNG HIỆN TẠI (đọc ĐẦU TIÊN — cập nhật cuối buổi)

**Vừa xong:** GĐ1 hoàn tất — CRUD API cho resource Task, kiến trúc 3 lớp (route→service→repository),
Zod validate, error handler tập trung, seed data. Đã test curl đầu-cuối, tất cả PASS. (Chi tiết mục 7b.)

**BÀI TIẾP THEO (buổi sau bắt đầu từ đây): GĐ2 — Auth & Security.**
Thứ tự dự kiến giảng (đi từng bước nhỏ, giải thích trước khi code, học viên tự gõ):
1. Lý thuyết Authentication vs Authorization (nối lại 401 vs 403 đã học ở GĐ1) + checkpoint.
2. Hash password bằng bcrypt (thay `password: "placeholder"` trong seed) — vì sao không lưu plaintext.
3. Endpoint POST /auth/register + POST /auth/login (Zod schema mới trong @taskflow/shared).
4. JWT + refresh token: access token ngắn hạn + refresh dài hạn; giải thích vì sao 2 token.
5. Middleware/hook xác thực (Fastify preHandler) → gắn user vào request; route cần auth.
6. Áp dụng ngay vào Task: thay SEED_USER_ID bằng user id lấy từ token (chỉ sửa 1 dòng trong task.service — nợ kỹ thuật đã ghi ở 7b).
7. RBAC dùng enum Role (OWNER/ADMIN/MEMBER) — vd: chỉ author/OWNER được xóa task → đây là lúc trả 403 thật.
8. (Cuối) rate-limit bằng plugin Fastify.

**Trước khi code GĐ2, chạy lại môi trường:** `docker compose up -d` (Postgres). Prisma Client đã generate sẵn.

**Cách mentor (BẮT BUỘC giữ):** mentor CHỈ hướng dẫn + giải thích + review; HỌC VIÊN tự gõ mọi code/lệnh.
Tài liệu (file này) mentor viết hộ. Code tiếng Anh. Đi từng bước nhỏ. Checkpoint câu hỏi mỗi bài.
KHÔNG tự ý sửa file của học viên khi chưa giải thích & học viên chưa đồng ý.

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
| 1 | BE Core + Data Modeling | Data model + Prisma + Postgres + CRUD API | ✅ DONE (DATA + CRUD API Task 3 lớp chạy & test OK. Chi tiết mục 7) |
| 2 | Auth & Security | Register/login, JWT+refresh, RBAC, rate-limit | 👉 TIẾP THEO (bắt đầu buổi sau — xem mục ⏸️ ĐIỂM DỪNG HIỆN TẠI đầu file) |
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

### 7b. Phần CRUD API — ✅ ĐÃ XONG (giảng + code + test đầu-cuối OK)
Đã giảng đủ 4 bài: (1) REST + checkpoint; (2) so sánh Express/Fastify/Hono → CHỐT Fastify (giải thích edge là gì,
vì sao Hono không hợp: ta deploy VPS truyền thống, không edge); (3) layered architecture route→service→repository;
(4) CRUD Task với Zod validate. Ẩn dụ nhà hàng: DB=bếp, API=phục vụ, FE=khách, REST=quy tắc gọi món.

Cấu trúc apps/api/src đã dựng:
- lib/prisma.ts       → PrismaClient dùng chung, KẾT NỐI QUA DRIVER ADAPTER @prisma/adapter-pg (Prisma 7 khuyến nghị),
                        import "dotenv/config" để nạp DATABASE_URL. (KHÔNG dùng engine binary cũ.)
- lib/errors.ts       → class AppError(statusCode, message) + helper notFound() = AppError(404).
- repositories/task.repository.ts → CHỈ chạm Prisma (create/findAll/findById/update/delete), dùng type Prisma.TaskCreateInput/UpdateInput.
- services/task.service.ts → business logic, KHÔNG chạm HTTP. authorId server tự gắn từ process.env.SEED_USER_ID
                        (author: { connect: { id } }); getById throw notFound; update/delete gọi getById trước để check tồn tại.
- routes/task.routes.ts → Zod .parse(body); trả 201 (POST) / 200 (GET/PATCH) / 204 (DELETE); ép request.params as {id}.
- server.ts           → app.setErrorHandler tập trung: ZodError→400, AppError→statusCode, khác→500.
                        app.register(taskRoutes, { prefix: "/api/v1" })  → endpoint là /api/v1/tasks (học viên tự thêm versioning).
                        PORT = 3001 (tránh đụng Next.js 3000). Script dev = "tsx watch src/server.ts".

Shared schema (packages/shared/src/schemas/task.ts): createTaskSchema { title, boardId(z.uuid — Zod v4 cú pháp mới),
description?, dueDate?(z.coerce.date) }; updateTaskSchema = createTaskSchema.partial(). authorId CỐ TÌNH VẮNG (client không gửi).

Seed data (apps/api/prisma/seed.ts): tạo User + Workspace→Project→Board. In ra SEED_USER_ID & SEED_BOARD_ID.
- SEED_USER_ID đã lưu vào apps/api/.env. Board id test hiện có: b44cfb35-907d-4fd4-8ed0-875bebe2a839.
- Chạy lại seed: pnpm --filter @taskflow/api exec tsx prisma/seed.ts

ĐÃ TEST (curl, mentor chạy): POST→201 (author tự gắn đúng), GET list→200, GET missing→404, thiếu title→400,
boardId sai uuid→400. Tất cả PASS. (Lưu ý: `tsx watch` restart giữa chừng có thể gây GET trả [] chập chờn khi test tự động —
không phải lỗi; khi test integration ở GĐ7 chạy server KHÔNG watch.)

Prisma Client: ĐÃ generate (apps/api/src/generated/prisma tồn tại). Postgres chạy Docker OK.

TODO GĐ tiếp / nợ kỹ thuật:
- Validate luôn request.params (:id) bằng Zod (hiện mới ép kiểu `as {id}`, chưa validate uuid ở params).
- GĐ2 Auth: thay SEED_USER_ID bằng user id lấy từ token → chỉ sửa 1 dòng trong task.service (route/schema không đụng).
- Cân nhắc lại TaskAssignee.userId đang String? (nullable) — lệch nhẹ ghi chú GĐ1 "assignee không cần nullable"; review khi làm assignee.

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
