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

## ⏸️ ĐIỂM DỪNG HIỆN TẠI (đọc ĐẦU TIÊN — cập nhật cuối buổi)

**Vừa xong:** GĐ1 hoàn tất + ĐÃ ĐÁNH BÓNG "sạch" — CRUD API resource Task, kiến trúc 3 lớp
(route→service→repository), Zod validate, error handler tập trung, seed data. Test curl đầu-cuối PASS. (Chi tiết mục 7b.)

**Đánh bóng schema (mới làm — bài học Zod strip/strict):**
- `createTaskSchema` giờ dùng `.strict()` → field lạ (vd authorId) bị TỪ CHỐI 400 "Unrecognized key"
  thay vì âm thầm strip (mặc định .strip() = VỨT BỎ im lặng, KHÔNG lưu — đây là thứ gây bối rối trước đó).
- Thêm `status`/`priority` optional (z.enum, khai báo TRONG shared, KHÔNG import Prisma — giữ đồng bộ tay với schema.prisma).
  → client giờ set được status/priority khi tạo; không gửi thì DB dùng default TODO/LOW.
- `dueDate: z.coerce.date().nullable().optional()` → null/absent = "no due date" (lưu null, hết bug 1970-01-01).
- Service (task.service.ts) đồng bộ: CreateTaskData thêm status/priority + dueDate:Date|null; hàm create truyền 2 field đó vào Prisma.
- ĐÃ TEST 4 case PASS: status/priority ăn thật(201); authorId→400; dueDate null→lưu null; status sai enum→400.

**ĐANG LÀM: GĐ2 — Auth & Security. Tiến độ:**
- ✅ Bài 1: Lý thuyết AuthN vs AuthZ (401 vs 403) — checkpoint 4/4 PASS.
- ✅ Bài 2: bcrypt. Đã cài `bcryptjs` + `@types/bcryptjs` (api). Tạo `lib/password.ts` (hashPassword/verifyPassword, SALT_ROUNDS=10).
  Đã verify hash/compare chạy đúng, salt ngẫu nhiên OK.
- ✅ Bài 3: REGISTER xong. Files: shared `schemas/auth.ts` (registerSchema min8+strict, loginSchema min1+strict) + export ở index.
  `repositories/user.repository.ts` (create/findByEmail/findById). `lib/errors.ts` thêm conflict()=409.
  `services/auth.service.ts` register: check trùng email→409, hash, create, trả SafeUser (KHÔNG lộ password).
  `routes/auth.routes.ts` POST /register. ĐÃ TEST: register→201 (response ko có password), trùng→409, DB lưu $2b$ hash. PASS.
- ✅ REFACTOR (giữa chừng, học viên tự yêu cầu): tách `config/env.ts` (Zod validate env: DATABASE_URL/SEED_USER_ID/PORT,
  safeParse+process.exit(1) fail-fast), `lib/error-handler.ts` (tách setErrorHandler ra hàm), `app.ts` (buildApp: setErrorHandler
  + register routes, KHÔNG listen — để test integration GĐ7 import được), `server.ts` rút gọn (buildApp + listen env.PORT).
  Routes dùng prefix theo CÁCH B: prefix=`/api/v1/tasks|/auth|/health`, path trong file rút gọn (task POST/GET path=""; :id; auth /register; health /).
  Đã đổi hết `req,res`→`request,reply` chuẩn Fastify. ĐÃ TEST lại tất cả endpoint PASS (path "" chạy tốt).

- ✅ Bài 3b: LOGIN xong. `errors.ts` thêm unauthorized()=401. auth.service.login: findByEmail→verifyPassword,
  cả 2 nhánh (ko có user / sai pass) trả CÙNG "Invalid email or password" (chống user enumeration). route POST /login trả 200.
  Tạm trả SafeUser (Bài 4 đổi thành JWT). ĐÃ TEST 4 case PASS: đúng→200; sai pass→401; email ko tồn tại→401 (message giống hệt); thiếu pass→400 Zod.

- ✅ Bài 4: JWT — XONG HẾT (Bước 1+2+3). Trạng thái chính xác:
  • ✅ Bước 1: cài `@fastify/jwt ^10.2.0`. Thêm `JWT_SECRET="dev-super-secret-change-me-in-production-a1b2c3d4e5f6"`
    vào apps/api/.env. Thêm `JWT_SECRET: z.string().min(16,...)` vào envSchema (config/env.ts). Verify fail-fast PASS.
  • ✅ Bước 2: app.ts có `import fastifyJwt from "@fastify/jwt";` + `import { env } from "./config/env.js";`
    và `app.register(fastifyJwt, { secret: env.JWT_SECRET })` đăng ký TRƯỚC register routes. (Học viên đã gõ từ trước; CONTEXT cũ ghi nhầm là chưa.)
  • ✅ Bước 3 (CÁCH A): login route (auth.routes.ts) ký token TẠI ROUTE: `app.jwt.sign({ userId: user.id }, { expiresIn })`
      → accessToken 15m + refreshToken 7d → trả `{ accessToken, refreshToken }`. SERVICE (auth.service.ts) GIỮ NGUYÊN, chỉ xác thực + trả SafeUser (có id).
      KHÔNG cài jsonwebtoken. ĐÃ XÓA file rác `lib/jwt.ts` (rỗng — CÁCH A ký ở route nên không cần).
      ĐÃ TEST: register user mới → login → trả 2 token; decode payload access: {userId,iat,exp} exp-iat=900s(15m), refresh=604800s(7d). PASS.
  • Lý thuyết JWT học viên ĐÃ NGẤM: JWT = encode(base64, ai đọc cũng được) + sign(chữ ký chống sửa), KHÔNG encrypt.
    encode≠encrypt≠hash. Phải gửi CẢ 3 phần header.payload.signature. Ví dụ "tấm vé xem phim có dấu mộc".
  • ĐÃ GIẢNG (học viên hỏi "sao trả token qua body mà không set cookie?"): JSON body = linh hoạt (web+mobile+CLI) + chống CSRF,
    NHƯNG dính XSS nếu lưu localStorage. Cookie httpOnly = chống XSS nhưng dính CSRF + chỉ hợp web same-site. Giai đoạn API thuần chưa FE
    → chọn body để test curl/Postman + đa client. Mô hình chuẩn (để dành GĐ3/cuối GĐ2): access token trong memory FE, refresh token cookie httpOnly
    (cần @fastify/cookie + CSRF). Chưa làm bây giờ để tránh nhồi.

- ✅ Bài 5: AUTH HOOK — XONG HẾT. Kiến trúc chuẩn Fastify (fastify-plugin):
  • `types/fastify-jwt.d.ts`: declare module "@fastify/jwt" (payload {userId} lúc ký + user {userId,iat,exp} sau verify — iat/exp do JWT tự chèn qua expiresIn)
    + declare module "fastify" (thêm `authenticate` vào FastifyInstance). Nhớ `import "@fastify/jwt"` đầu file = module augmentation.
  • `hooks/authenticate.ts`: hàm hook thuần `authenticate(request,reply)` → try `request.jwtVerify()` (auto đọc header Authorization Bearer + verify chữ ký/hạn, gán request.user)
    catch → `throw unauthorized("Unauthorized")` (AppError 401 qua error handler tập trung, KHÔNG tự send — vì lỗi jwt "trần" không mang status, để rơi xuống error handler chung sẽ thành 500 SAI).
  • `plugins/auth.plugin.ts`: `export const authPlugin = fp(async (app) => { app.decorate("authenticate", authenticate); })`.
    Đã cài `fastify-plugin`. BỌC fp() để phá encapsulation → decorator leo lên ROOT scope → mọi route con thấy `app.authenticate`.
  • `app.ts`: `app.register(authPlugin)` SAU register(fastifyJwt), TRƯỚC routes. (app.ts chỉ WIRING, logic ở hooks/, đăng ký ở plugins/.)
  • `routes/task.routes.ts`: `app.addHook("preHandler", app.authenticate)` 1 dòng đầu hàm → bảo vệ CẢ 5 route Task. Nhờ ENCAPSULATION hook chỉ áp trong scope taskRoutes, KHÔNG lan sang auth/health (nên /login vẫn gọi được không cần token).
  • ĐÃ TEST 4/4 PASS: GET tasks no-token→401; login→ra accessToken; GET tasks + Bearer token→200; token rác→401.
  • LÝ THUYẾT ĐÃ NGẤM: encapsulation Fastify (mỗi register()=hộp con; con đọc được đồ cha, đồ sinh trong con KHÔNG leo ngược lên cha/anh em);
    fp()="plugin merge thẳng vào cha, không tạo hộp con"; quên fp → KHÔNG lỗi lúc boot, chỉ lỗi RUNTIME khi request chạm app.authenticate (TypeError not a function → 500).
    addHook(scope) vs per-route preHandler (mảng, cho phép [authenticate, authorize] tuần tự AuthN→AuthZ ở Bài 7).

- ✅ Bài 6: ÁP AUTH VÀO TASK — XONG. Đã trả nợ SEED_USER_ID:
  • task.service.ts: `create(data, authorId: string)` → `author: { connect: { id: authorId } }`. DỌN RÁC: xóa `import "dotenv/config"`, `const SEED_USER_ID`, khối `if(!SEED_USER_ID) throw`.
    authorId là param BẮT BUỘC (không optional) → TS ép route phải truyền. Service giờ sạch env, không biết userId từ đâu ra (token/session/test) → testable.
  • task.routes.ts: route POST → `taskService.create(data, request.user.userId)`. request.user có nhờ authenticate hook + type Bài 5.
  • ĐÃ TEST PASS: login jwt-test@example.com → tạo task → authorId == userId trong token (5474c7ef-...). Task gắn ĐÚNG người đăng nhập, không còn SEED_USER_ID cứng.
  • CHECKPOINT (đáp): truyền request.user.userId (param) thay vì cả request vào service — vì service phải SẠCH HTTP: truyền request thì service buộc chặt Fastify, không unit-test/tái dùng (cron/queue) được, vi phạm separation of concerns.
  • ⚠️ NỢ CÒN LẠI: seed.ts password "placeholder" chưa hash → seed user KHÔNG login được (nên test bằng user register mới). Để dành fix lúc Bài 7 (cần nhiều user role khác nhau → seed lại đàng hoàng).

- ✅ Bài 7: RBAC (Mức B — role đầy đủ qua Membership) — XONG. TEST 4/4 PASS.
  • QUY TẮC (OR): sửa/xóa task được NẾU (là author) HOẶC (OWNER/ADMIN của workspace chứa task). else 403.
  • LOGIC AUTHOR-FIRST (học viên tự phân tích data distribution chọn): đa số user=MEMBER, đa số thao tác=sửa task MÌNH
    → check author TRƯỚC (authorId có sẵn trong query task → FREE, đa số dừng đây), CHỈ khi không phải author mới query role.
    Bài học: "đúng mô hình" (role rộng→hẹp) ≠ "tối ưu vận hành" (author-first). Với OR + short-circuit, thứ tự KHÔNG đổi kết quả, chỉ đổi số query.
  • KIẾN TRÚC (đúng layered — học viên BẮT LỖI mentor giữa chừng): permission.service KHÔNG được chạm prisma (chỉ repository chạm DB).
    - `repositories/task.repository.ts`: thêm `findAuthorAndWorkspaceId(id)` — select gọn { authorId, board.project.workspaceId } (task ko có trực tiếp workspaceId → lồng qua board→project).
    - `repositories/membership.repository.ts` (MỚI): `findByUserAndWorkspace(userId, workspaceId)` → findUnique composite key `userId_workspaceId` (từ @@unique) select {role}, trả null nếu ko thuộc workspace.
    - `services/permission.service.ts`: `assertCanModifyTask(taskId, userId)` — GỌI 2 repo, chỉ chứa LOGIC quyết định. Kiểu "assert": đủ quyền→return im lặng; ko→throw. null task→notFound(404); author→return; role OWNER/ADMIN→return (membership?.role dùng ?. chắn null); else→forbidden(403).
    - `lib/errors.ts`: thêm `forbidden()`=AppError(403). (401="ko biết mày là ai"/chưa auth → authenticate; 403="biết rồi nhưng ko đủ quyền" → RBAC.)
    - `services/task.service.ts`: update/delete nhận thêm `userId`, gọi `assertCanModifyTask` TRƯỚC repo.update/delete (check-before-action: nếu check sau thì data đã bị sửa/xóa dù trả 403). BỎ getById thừa (assert đã throw 404). getById route GET giữ nguyên (đọc ko cần quyền modify).
    - `routes/task.routes.ts`: PATCH/DELETE truyền `request.user.userId` xuống service (giống POST Bài 6).
  • SEED (fix nợ password + tạo data test RBAC): `prisma/seed.ts` viết lại — deleteMany con→cha (FK), hashPassword("password123"),
    3 user owner/admin/member@taskflow.dev + Membership 3 role cùng 1 workspace + 2 task (member's + owner's). Login được bằng password123.
    IDs hiện tại: MEMBER=b47d5e6f... MEMBER_TASK=b89157ff... OWNER=4c8334a6... OWNER_TASK=ed12018d... ADMIN=dbfda8d3... BOARD=d635ea08...
  • TEST 4/4 PASS: MEMBER sửa task mình→200; MEMBER sửa task owner→403; OWNER sửa task member→200; ADMIN sửa task member→200.
  • ⚠️ NỢ THIẾT KẾ (YAGNI — CHƯA làm, đợi có resource thứ 2-3 thấy LẶP mới refactor theo Rule of Three):
    permission.service giờ chỉ có assertCanModifyTask. Tương lai nhiều resource (board/project/workspace) → cân nhắc:
    H1 tách permission theo resource; H2 hàm getUserRole chung + policy riêng; H3 CASL/ability object. Giờ giữ nguyên, ko over-engineer.
  • Nợ cũ vẫn treo: validate :id bằng Zod ở params (hiện `as {id:string}`).

**BÀI TIẾP THEO (GĐ2 còn lại):**
- Bài 8 (cuối GĐ2): rate-limit `@fastify/rate-limit`.

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
