# Mentor Context: Fullstack Project "TaskFlow"

> File lưu tiến độ học/build. Mở session mới với AI → đọc file này để nắm context.
>
> Prompt gợi ý: "Đọc CONTEXT.md. Tôi đang build fullstack 'TaskFlow', vai trò học viên,
> bạn là mentor. Tiếp tục từ giai đoạn đang dở. QUY TẮC: bạn chỉ mentor + hướng dẫn,
> TÔI là người gõ lệnh/viết file. Code viết TIẾNG ANH. Đi từng bước nhỏ, giải thích
> trước khi làm."

## 🗣️ XƯNG HÔ (QUAN TRỌNG — mentor sau ĐỌC & TUÂN THỦ)

Học viên yêu cầu mentor xưng **"tao"**, gọi học viên là **"mày"**. KHÔNG dùng bạn/tôi/ta/tớ/mình.
Giọng thẳng thắn, đời thường, vẫn nghiêm túc về kiến thức. Code + comment vẫn TIẾNG ANH.

## ⚠️ LỖI TOOL: KHÔNG dùng ask_question (nút bấm tương tác) — ĐÃ CHẨN ĐOÁN XONG

Học viên chạy mentor qua `cline` TRONG TERMINAL của Cursor (KHÔNG phải Chat panel IDE).
→ Terminal agent KHÔNG có UI host để render nút bấm → tool multiple-choice (ask_question) LUÔN abort
"Interactive runtime abort requested". Tương tự, nút Compact UI → session CLI orphan → "Compaction failed: has no owner".
→ Đây là LIMITATION của terminal agent (Cursor 3.11.25 / macOS 26.3.1), KHÔNG phải lỗi code/MCP/project. Đã xác nhận bởi cả agent Cursor.
→ Mentor sau BẮT BUỘC: (1) TUYỆT ĐỐI không gọi ask_question — hỏi lựa chọn bằng CHỮ, học viên gõ text trả lời.
(2) Nén context thì bảo học viên MỞ SESSION MỚI (đọc CONTEXT.md), đừng bấm Compact UI.
(3) Không cần xóa cache/reinstall. Muốn dùng nút bấm/compact mượt thì học viên tự chuyển sang Chat panel IDE.

## ⏸️ ĐIỂM DỪNG HIỆN TẠI (đọc ĐẦU TIÊN — cập nhật cuối buổi 2026-07-20)

**Vừa xong:** feat-0.3-iam **Mảng 1 Multi-tenancy (READ path)** — tenant isolation cho `GET /tasks` và `GET /tasks/:id`. TEST isolation 5/5 case PASS (2026-07-20, học viên chạy curl).

**ĐANG LÀM: GĐ0.3 IAM — feat-0.3-iam (in-progress). Tiến độ Mảng 1:**

- ✅ **Mảng 1a — READ isolation (getAll/getById):** XONG + TEST PASS.
  • `task.repository.findAllForUser(userId)`: task WHERE workspace có `memberships: { some: { userId } }` (Board→Project→Workspace).
  • `permission.service.assertMemberOfWorkspaceForTask(taskId, userId)`: không phải member workspace chứa task → `notFound` (404, KHÔNG 403 — giấu cross-tenant).
  • `task.service`: `getAll(userId)` → findAllForUser; `getById(id, userId)` → assert trước.
  • `task.routes`: GET "/" và GET "/:id" truyền `request.user.userId`.
  • Seed: Workspace A (owner/admin/member) + Workspace B (outsider@taskflow.dev) + task riêng mỗi bên.
  • **TEST PASS (seed 2026-07-20):**
  - C1 member GET /tasks → 2 task workspace A (Owner's + Member's), KHÔNG có Outsider's task.
  - C1b outsider GET /tasks → CHỈ Outsider's task (7681f831-...).
  - C2 member GET outsider task → 404 `"Task with id ... not found"`.
  - C3 outsider GET member task (681bdfa6-...) → 404.
  - C4 member GET task mình → 200.
    • Seed IDs lần test (đổi mỗi lần seed — chạy lại `pnpm exec tsx prisma/seed.ts` trong apps/api):
    MEMBER=member@taskflow.dev | OUTSIDER=outsider@taskflow.dev | password=password123
    MEMBER_TASK=681bdfa6-2341-428d-8c15-23aafe46f522 | OUTSIDER_TASK=7681f831-6eae-4bf3-986a-15ee971012f0
    BOARD_A=aa555075-293d-4bc1-9d4d-447cf29da13f | BOARD_B=04f72b9b-57c5-4781-85b5-d1646f46ac55

- ✅ **Mảng 1b — WRITE isolation (Việc 4 — create boardId scope):** XONG + TEST 3/3 PASS + tsc EXIT 0 (2026-07-20). Lỗ hổng IDOR đã bịt (member biết UUID board tenant khác POST task vào → giờ 404). Code: `board.repository.ts` (mới) findWorkspaceIdByBoardId (SRP, ko nợ); `permission.assertMemberOfWorkspaceForBoard` (board null→404, ko member→404, 2 message giống nhau chống info-disclosure); `task.service.create` async + assert TRƯỚC create. TEST: BOARD_B(cross-tenant)→404, BOARD_A(hợp lệ)→201, board random→404. Bài học: 404 vs 403, side-effect order, info-disclosure, SRP, Prisma findUnique trả null.

- ⬜ Mảng 2: org tree (closure table). Mảng 3: RBAC→ABAC. Mảng 4: audit log. (chưa làm)

**Đã khép trước đó (không lặp lại chi tiết):** GĐ0 Foundation, GĐ1 CRUD Task, GĐ2 Auth (Bài 1-7), GĐ0.1 Security (rate-limit + refresh + validate :id), GĐ0.2 Monorepo.

**BÀI TIẾP THEO cho agent/mentor mới:**

1. Việc 4: scope `create()` theo `boardId` (lỗ hổng WRITE còn lại của Mảng 1).
2. Sau khi Việc 4 + test PASS → coi Mảng 1 Multi-tenancy Task KHÉP; sang org tree / ABAC / audit.

**Cách mentor (BẮT BUỘC giữ):** mentor CHỈ hướng dẫn + giải thích + review; HỌC VIÊN tự gõ mọi code/lệnh.
Tài liệu (file này) mentor viết hộ. Code tiếng Anh. Đi từng bước nhỏ. Checkpoint câu hỏi mỗi bài.
KHÔNG tự ý sửa file của học viên khi chưa giải thích & học viên chưa đồng ý.

---

## 0. Mục Tiêu

Build 1 dự án Fullstack thật chạy được, có user thật, gồm FE + BE + Realtime + Async

- Docker + Deploy → để tự tin apply vị trí Fullstack Developer (JS/TS).
  Nguyên tắc: KHÔNG nhồi công nghệ cho có. Mỗi công nghệ thêm khi có nhu cầu thật.

## 0-BIS. 🔥 ĐỊNH HƯỚNG MỚI (18/7/2026 — QUAN TRỌNG, THAY roadmap 10 GĐ cũ ở mục 5)

Học viên quyết ĐỔI TẦM: từ "1 project nhỏ TaskFlow" → xây "CompanyOS" = HỆ SINH THÁI vận hành 1 công ty.
MỤC TIÊU VẪN LÀ HỌC KỸ THUẬT (công ty chỉ là "cái cớ" thực tế). KHÔNG build thật để bán.
CÔNG TY GIẢ ĐỊNH (mentor chọn để ép học nhiều kỹ thuật nhất): **"Nova Agency"** — Digital Agency
(dịch vụ phần mềm + marketing cho khách), ~50 người, phòng: Giám đốc/Sản xuất(Dev,Design)/Kinh doanh/Account/Nhân sự/Kế toán.
Lý do chọn agency: ép chạm multi-tenancy, RBAC/ABAC, time-series, state machine, PDF, realtime, queue, BI.

NGUYÊN TẮC KIẾN TRÚC (học viên tự chốt sau khi mentor cảnh báo): KHÔNG "big design up front" (over-engineer).
→ "Nền platform vững + gắn app dần" (vertical slice). Trừu tượng hóa (rút package chung) chỉ khi ≥2-3 app LẶP (Rule of Three).

### ROADMAP MỚI "Nova Agency CompanyOS" (nền → 7 app web → test → deploy → mobile):

- **GĐ0 NỀN TẢNG (Platform):**
  - 0.1 Đóng Security (ĐANG DỞ): rate-limit (Bài 8) + refresh token endpoint /auth/refresh + nợ validate :id Zod.
  - 0.2 Chuẩn hóa MONOREPO đa-app: tách packages/(nền chung) vs apps/(từng app), turborepo/pnpm workspace.
    ⚠️ Thiết kế packages để CẢ web+mobile share: packages/shared(types,Zod), packages/api-client(gọi API) = web+mobile chung;
    packages/ui = chỉ web (React Native cần UI riêng), share hooks/logic. Đặt ranh giới đúng từ đầu vì BIẾT TRƯỚC có mobile GĐ10.
  - 0.3 IAM + Org Structure (xương sống): multi-tenancy (nhiều công ty/workspace tách biệt), org tree (công ty→phòng→team→nhân viên, closure table),
    RBAC→ABAC (quyền theo vai + tài nguyên), audit log nền. ← auth+RBAC hiện tại là MẦM của cái này.
  - 0.4 Design System nền: packages/ui (Button/Table/Modal/Form), Storybook, theme, layout, auth-guard FE.
- **GĐ1 App PROJECT & TASK** (có sẵn BE — hoàn thiện + FE): React Query, RHF+Zod, Tailwind, drag-drop, realtime board (WebSocket presence), offline (Zustand+IndexedDB), search/filter/pagination.
- **GĐ2 App TIME TRACKING**: time-series data, SQL aggregation (GROUP BY), báo cáo tuần/tháng, chart, timer realtime.
- **GĐ3 App CRM**: khách hàng/liên hệ, deal pipeline (state machine, kanban lead→won/lost), search/filter nâng cao (full-text/Elasticsearch optional).
- **GĐ4 App INVOICING**: báo giá→hóa đơn từ giờ log (cross-app data), PDF export (puppeteer/pdfkit), số tự tăng + thuế (money=decimal), lưu file S3/MinIO.
- **GĐ5 App HRM + LEAVE**: hồ sơ nhân viên/hợp đồng (file upload), xin nghỉ duyệt nhiều cấp (WORKFLOW/APPROVAL engine — dùng chung sau), calendar.
- **GĐ6 App NOTIFICATION + CHAT** (nền async): Event Bus (Redis Pub/Sub→Kafka), queue (BullMQ), chat realtime (WebSocket rooms/presence), email/push tập trung.
- **GĐ7 App ANALYTICS DASHBOARD**: gom data 6 app (materialized view), Redis cache + invalidation, biểu đồ BI/reporting.
- **GĐ8 TESTING**: unit+integration+e2e (Jest, Supertest, Playwright), CI GitHub Actions.
- **GĐ9 DEPLOY & DEVOPS**: Dockerize toàn hệ, Nginx, VPS, Cloudflare, CI/CD; (optional) K8s, Prometheus/Grafana.
- **GĐ10 MOBILE APP** (cuối cùng): React Native/Expo, tái dùng packages/shared+api-client (code sharing web↔mobile),
  token SecureStore + biometric, push FCM/APNs + deep link, offline SQLite/WatermelonDB sync, camera upload.

LIÊN THÔNG "hệ sinh thái" (ví dụ dòng chảy xuyên app): Sales chốt deal(CRM)→tạo Project(Task)→log giờ(Time)→xuất hóa đơn(Invoicing)→noti khách(Notification)→lên Dashboard(Analytics).

### GĐ0.1 TIẾN ĐỘ: ✅ KHÉP (rate-limit + refresh + validate :id)

### GĐ0.3 IAM — feat-0.3-iam (ĐANG LÀM):

- ✅ **Mảng 1a READ isolation** — getAll/getById tenant-scoped. TEST 5/5 PASS 2026-07-20 (chi tiết mục ⏸️ ĐIỂM DỪNG).
- ✅ **Mảng 1b WRITE isolation (Việc 4)** — scope `create(boardId)` theo workspace membership. TEST 3/3 PASS + tsc EXIT 0 2026-07-20.
- ⬜ Mảng 2 org tree (closure table). Mảng 3 RBAC→ABAC. Mảng 4 audit log.

ĐIỂM ĐANG ĐỨNG: GĐ0.3 IAM — Mảng 1 Multi-tenancy Task KHÉP (READ+WRITE); Mảng 2 org tree là bước kế tiếp.
(Mục 5 "Lộ Trình 10 Giai Đoạn" bên dưới là roadmap CŨ — GIỮ LÀM THAM KHẢO, roadmap CHÍNH = mục 0-BIS.)

## 1. Profile Học Viên

- FE: React/Next.js (2-4 năm). Target: Fullstack Dev (JS/TS).
- Điểm mạnh: JS/TS, tư duy component, async, HTTP. Tư duy phản biện tốt (hay hỏi "tại sao").

## 2. Domain: "TaskFlow" — Team Task & Project Management (kiểu Trello/Linear thu nhỏ)

Chọn vì ép chạm gần như mọi kỹ thuật: Auth/RBAC, data modeling nhiều tầng, realtime,
queue/Kafka, file upload, offline (IndexedDB), search/pagination.

## 3. Stack Đã Chốt

- FE: Next.js (App Router) + React + TailwindCSS + React Query + Zustand (BỎ Jotai) + React Hook Form + Zod + IndexedDB.
- BE: Fastify + TypeScript (tự xây kiến trúc layered, KHÔNG dùng Nest) + Prisma + PostgreSQL + Redis (cache/queue) → Kafka (giai đoạn sau) + JWT+refresh + bcrypt + Zod.
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

| GĐ  | Tên                     | Kết quả                                          | Trạng thái                                                               |
| --- | ----------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| 0   | Foundation & Monorepo   | Repo + tooling + shared package                  | ✅ DONE                                                                  |
| 1   | BE Core + Data Modeling | Data model + Prisma + Postgres + CRUD API        | ✅ DONE (DATA + CRUD API Task 3 lớp chạy & test OK. Chi tiết mục 7)      |
| 2   | Auth & Security         | Register/login, JWT+refresh, RBAC, rate-limit    | 👉 TIẾP THEO (bắt đầu buổi sau — xem mục ⏸️ ĐIỂM DỪNG HIỆN TẠI đầu file) |
| 3   | FE Core                 | Next.js UI, React Query, RHF+Zod, Tailwind       | chưa                                                                     |
| 4   | FE State & Offline      | Zustand, IndexedDB, optimistic update            | chưa                                                                     |
| 5   | Realtime                | WebSocket, presence, live board                  | chưa                                                                     |
| 6   | Async & Events          | Redis queue → Kafka (notification, activity log) | chưa                                                                     |
| 7   | Testing                 | Unit + integration + e2e                         | chưa                                                                     |
| 8   | Docker & Deploy         | Dockerize, Nginx, VPS, Cloudflare, CI/CD         | chưa                                                                     |
| 9   | Nâng cao (optional)     | K8s, observability, scaling                      | chưa                                                                     |

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

- lib/prisma.ts → PrismaClient dùng chung, KẾT NỐI QUA DRIVER ADAPTER @prisma/adapter-pg (Prisma 7 khuyến nghị),
  import "dotenv/config" để nạp DATABASE_URL. (KHÔNG dùng engine binary cũ.)
- lib/errors.ts → class AppError(statusCode, message) + helper notFound() = AppError(404).
- repositories/task.repository.ts → CHỈ chạm Prisma (create/findAll/findById/update/delete), dùng type Prisma.TaskCreateInput/UpdateInput.
- services/task.service.ts → business logic, KHÔNG chạm HTTP. authorId server tự gắn từ process.env.SEED_USER_ID
  (author: { connect: { id } }); getById throw notFound; update/delete gọi getById trước để check tồn tại.
- routes/task.routes.ts → Zod .parse(body); trả 201 (POST) / 200 (GET/PATCH) / 204 (DELETE); ép request.params as {id}.
- server.ts → app.setErrorHandler tập trung: ZodError→400, AppError→statusCode, khác→500.
  app.register(taskRoutes, { prefix: "/api/v1" }) → endpoint là /api/v1/tasks (học viên tự thêm versioning).
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

## 8-BIS. 🌳 IAM & Tenant Isolation — GIẢNG SÂU (2026-07-20, học viên hỏi vì thấy khó)

**IAM (Identity & Access Management — quản lý danh tính & quyền truy cập):** chỉ gồm 2 câu hỏi:
- Identity (danh tính): "Mày là ai?" → login + JWT (đã xong ở Auth).
- Access (quyền truy cập): "Mày được đụng cái gì?" → chính là Mảng 1 multi-tenancy.
→ Đừng sợ keyword. IAM = gộp mấy thứ đã làm.

**Chuỗi Task→Board→Project→Workspace→Membership KHÔNG phải query rối — nó là DATA MODEL (đường quan hệ):**
```
User ──< Membership >── Workspace ──< Project ──< Board ──< Task
```
(`<` = một-nhiều). Task không dính thẳng User. Muốn biết "task này thuộc công ty (workspace) nào, user có quyền không" → phải ĐI NGƯỢC LÊN CÂY: Task→Board→Project→Workspace→có Membership của user không? Có→cho; Không→404 giấu.

**`some` (Prisma) = "có ít nhất 1 phần tử khớp":**
- Vì quan hệ một-nhiều → `memberships` là 1 MẢNG, không phải 1 giá trị. Không viết được `memberships.userId === X` (mảng không có .userId).
- 3 từ khóa quan hệ mảng: `some` (≥1 khớp — DÙNG cái này), `every` (tất cả khớp), `none` (không cái nào khớp).
- `some: { userId }` = "workspace có ít nhất 1 dòng membership của user này" = "user là thành viên".

**1 query thay vì N query (nhờ thiết kế DB chặt):**
- N+1 problem (vấn đề N cộng 1): nếu tự đi từng bước (findUnique task→board→project→workspace→membership) = 5 lần round-trip (chuyến khứ hồi tới DB) = chậm, sập khi scale.
- Where lồng `board:{project:{workspace:{memberships:{some:{userId}}}}}` → Prisma dịch thành 1 SQL với JOIN (nối bảng) nhiều tầng, gửi DB 1 LẦN. Mỗi tầng lồng = 1 JOIN; `some` ≈ EXISTS/JOIN lọc.
- LÀM ĐƯỢC 1 phát VÌ đã có foreign key (khóa ngoại — cột trỏ sang bảng khác) nối sẵn: task.boardId→board, board.projectId→project... Không có FK = không có "sợi dây" trên ER diagram = DB không biết đường JOIN sạch + Prisma không sinh quan hệ lồng.
- BÀI HỌC LỚN: thiết kế relation kỹ ở GĐ1 = giờ gặt quả query gọn.

SQL tương đương (để hình dung):
```sql
SELECT task.* FROM task
JOIN board ON board.id = task."boardId"
JOIN project ON project.id = board."projectId"
JOIN workspace ON workspace.id = project."workspaceId"
JOIN membership ON membership."workspaceId" = workspace.id
WHERE membership."userId" = 'user-X-id';
```

**QUY ƯỚC MENTOR (học viên yêu cầu 2026-07-20):** keyword/viết tắt tiếng Anh → mở ngoặc dịch ngay bên phải, VD: IDOR (Insecure Direct Object Reference — tham chiếu tài nguyên trực tiếp không an toàn).

---

## 8. Kiến Thức Nền (từ buổi học trước, giữ lại)

- HTTP: methods + idempotent (GET/PUT/DELETE idempotent; POST/PATCH không). Status 2xx/3xx/4xx/5xx.
- Middleware & Request Lifecycle: middleware = hàm giữa request→handler→response, xâu chuỗi pipeline.
  next() = đi tiếp phần tử kế tiếp (KHÔNG phải nhảy qua router); quên next → request treo → timeout.
  Thứ tự quan trọng: cái TẠO data trước cái DÙNG data; auth trước route handler.
  Request stateless: KHÔNG lưu req.user vào biến global (nghìn request đồng thời → rò rỉ).
  Auth fail → trả 401/403 NGAY, không next().
