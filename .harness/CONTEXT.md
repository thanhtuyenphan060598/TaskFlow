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

## ⏸️ ĐIỂM DỪNG HIỆN TẠI (đọc ĐẦU TIÊN — cập nhật cuối buổi 2026-07-22 chiều)

**Source of truth trạng thái:** `.harness/feature_list.json` (`current_focus` = `feat-0.3-iam`). File này = nhật ký học; `progress.md` = log session; `session-handoff.md` = bàn giao agent.

**Vừa xong buổi 2026-07-22 chiều:**
- Học viên có ý muốn migrate qua Express + làm lại từ đầu vì "rối" → mentor CẢN, đào ra gốc rối = **closure table + SQL thuần** (không phải framework). Giữ Fastify. Bài học tâm lý: đừng đập nhà xây lại vì 1 phòng bừa; rối nằm ở TƯ DUY, đổi framework không chữa.
- Giảng LẠI closure table CHI TIẾT (6 phần) — học viên THÔNG: bài tay thêm QA(6)/An(7) PASS, `asAncestor(Production)` = #2,9,10,11 PASS.
- Giảng self-relation Prisma (2 FK cùng trỏ 1 model → phải đặt tên `@relation`) — học viên GÕ XONG schema `OrgUnit` + `OrgUnitClosure`.

**ĐANG LÀM: GĐ0.3 IAM — feat-0.3-iam (in-progress).**
- Code Mảng 1 Multi-tenancy Task: **KHÉP** (commit `2e19c66`).
- SQL drill Bài 1–4: **KHÉP**.
- **Mảng 2:** lý thuyết PASS + schema GÕ XONG (chưa migrate). **NỢ SỬA trước migrate:** (1) dòng 143 `createAt`→`createdAt`; (2) dòng 162 `@@index([ancestorId,descendantId])` (trùng composite @@id) → `@@index([descendantId])`.
- **Bước tiếp:** sửa 2 nợ → `prisma validate` → migrate → seed org tree → SQL query descendants.

### 📘 LÝ THUYẾT CLOSURE TABLE (đã giảng 2026-07-22 — học viên THÔNG, giữ để ôn)

**Vấn đề:** cây tổ chức (Nova→phòng→team) nhưng bảng SQL phẳng (hàng+cột). `parentId` (adjacency list) đọc "mọi descendant của X" phải recursive CTE — nặng. IAM hỏi câu này SUỐT → dùng **closure table**.

**Closure table:** lưu SẴN mọi cặp tổ tiên–hậu duệ. 3 cột: `ancestorId`, `descendantId`, `depth` (0 = cùng node). **Quy tắc vàng:** mỗi node có 1 hàng self `(x,x,0)` — đẻ NGAY khi node sinh ra (KHÔNG define sẵn 1 lần). Hàng self cho phép "node X + mọi thứ dưới nó" gói trong 1 điều kiện `WHERE ancestorId = X`.

**Quy tắc chèn node mới:** node ở tầng k đẻ (k) hàng: self(depth 0) + với từng tổ tiên (depth 1,2,...). VD An dưới Dev(4) dưới Production(2) dưới Nova(1) → 4 hàng: (7,7,0),(4,7,1),(2,7,2),(1,7,3). **descendant LUÔN là node mới**, ancestor là chuỗi tổ tiên.

**Query:** descendants của X = `WHERE ancestorId = X`; ancestors của X = `WHERE descendantId = X`. Không đệ quy. Tradeoff: **ghi nặng** (thêm node = nhiều hàng), **đọc nhẹ** (1 query). IAM đọc > ghi → chọn closure.

### 📘 SELF-RELATION PRISMA (đã giảng 2026-07-22 — giữ để ôn)

Bảng `OrgUnitClosure` có 2 FK (`ancestorId`, `descendantId`) CÙNG trỏ `OrgUnit` → Prisma không tự phân biệt → **phải đặt TÊN `@relation("Ancestor"/"Descendant", ...)`** cho từng quan hệ, và bên `OrgUnit` khai 2 field ngược `asAncestor`/`asDescendant` với tên KHỚP đôi. `asAncestor` của node X = mọi hàng có `ancestorId = X`. Khóa chính = **composite `@@id([ancestorId, descendantId])`** (cặp đã đủ định danh, tự chặn trùng, không cần cột `id` thừa). Index riêng `@@index([descendantId])` để query "tổ tiên của X" nhanh.

### SQL drill (2026-07-21 — psql, Docker Postgres) — ✅ KHÉP

| Bài | Nội dung | Trạng thái |
|-----|----------|------------|
| 1 | SELECT / FROM / WHERE / COUNT; `"User"`; chuỗi `'...'`; `;` kết thúc câu; pager `q` | ✅ PASS |
| 2 | JOIN User↔Membership; `"userId"` camelCase; alias; ambiguous `id` | ✅ PASS |
| 3 | EXISTS correlate workspace ↔ membership ↔ user email | ✅ PASS (`Seed Workspace` 1 row) |
| 4 | Task→Board→Project→Workspace→Membership — title task member thấy | ✅ PASS (2 rows; lỗi đã sửa: JOIN Membership sai khóa; thiếu WHERE email) |

**Bài 4 evidence:** JOIN chain đúng `m."workspaceId" = w.id`; `WHERE u.email = 'member@taskflow.dev'` → `Member's task`, `Owner's task`. Map Prisma `findAllForUser`: nested `board→project→workspace→memberships.some { userId }` ≈ JOIN chain + filter user.

**Cách học (học viên chốt — BẮT BUỘC):** mentor chỉ gợi ý / hỏi / review. **Cấm** đưa code/SQL mẫu đầy đủ để chép. Học viên tự sửa lỗi trên psql. Lộ trình: SQL thuần → sau đó Prisma↔SQL song song.

**Lỗi syntax hay gặp (SQL drill):** thiếu `;` → prompt `-#`; `"User"` vs `user`; `'email'` vs `"email"`; `"userId"` quote; JOIN sai khóa → 0 rows im lặng; thiếu WHERE user → Outsider + nhân hàng theo membership.

### Mảng 1 Multi-tenancy Task — KHÉP (code); C-PATCH optional

- ✅ **1a READ** — TEST curl 5/5 PASS (2026-07-20).
- ✅ **1b WRITE create** — TEST curl 3/3 PASS.
- ✅ **1c harden** — commit `2e19c66`; tsc OK. Curl C-PATCH **optional, chưa evidence**.

### Mảng 2 org tree (closure table) — ĐANG LÀM (lý thuyết xong, chưa code)

**Mục tiêu:** trong workspace, cây tổ chức công ty → phòng → team → nhân viên. Dùng **closure table** (không chỉ `parentId`) vì query “mọi descendant của node X” hay dùng trong IAM.

**3 cột closure (học viên đã hiểu — checkpoint PASS):**

| Cột | Nghĩa |
|-----|--------|
| `ancestor` | node tổ tiên (điểm bắt đầu trên nhánh, có thể = chính nó) |
| `descendant` | node hậu duệ (ở dưới, có thể = chính nó) |
| `depth` | số cấp từ ancestor xuống descendant (0 = cùng node) |

Ví dụ cây: Nova → Dev → Backend Team; Nova → HR. Không có hàng `hr → be` (ngang hàng). Hàng `nova → be → depth 2` = từ Nova xuống Backend qua 2 cấp (Nova→Dev→Backend).

**Tradeoff:** ghi nặng hơn (thêm node = thêm nhiều hàng closure), đọc nhẹ (1 query descendants, không recursive).

**Bước Mảng 2 (thứ tự):**
1. ✅ Lý thuyết + checkpoint closure
2. ⬜ Học viên thiết kế model `OrgUnit` + bảng closure trong `schema.prisma`
3. ⬜ Migration + seed org tree mẫu (Seed Workspace)
4. ⬜ SQL query descendants
5. ⬜ Repository / API (optional)

- ⬜ **Mảng 3** ABAC. ⬜ **Mảng 4** audit.

**BÀI TIẾP THEO cho agent/mentor mới:**

1. `./.harness/init.sh`
2. **Mảng 2 bước 2:** học viên phác `OrgUnit` + closure table — mentor review, không viết hộ.
3. (Optional) Curl C-PATCH.

**Cách mentor (BẮT BUỘC giữ):** mentor CHỈ hướng dẫn + giải thích + review; HỌC VIÊN tự gõ mọi code/lệnh/SQL.
Tài liệu mentor viết hộ. Code tiếng Anh. Một việc một lúc — nói rõ “tao cần gì” trước khi hỏi thêm.
KHÔNG tự ý sửa file code học viên khi chưa giải thích & học viên chưa đồng ý.

### 📖 QUY TẮC MENTOR: BÀI MỚI = GIẢI THÍCH TRƯỚC, HỎI SAU (học viên chốt 2026-07-21 tối)

Khi **mở chủ đề/bài mới** (vd. closure table, org tree, ABAC…):

1. **Giải thích đủ trước** — khái niệm, ví dụ cụ thể, bảng minh họa, query mẫu ý tưởng (không phải code chép), tradeoff. Học viên FE→BE, SQL ~10%: **không được** nhảy thẳng checkpoint khi chưa có nền.
2. **Sau đó mới CHECKPOINT** — 1–2 câu hỏi ngắn xác nhận hiểu.
3. **Rồi mới bước làm** (schema, migration, curl…).

**Cấm:** giải thích sơ sài 3 dòng → hỏi luôn → học viên “không hiểu gì cả”. Nếu học viên báo chưa hiểu → giải thích lại **chi tiết hơn**, không đổ lỗi “mày đọc kỹ đi”.

**Prisma `some` / `every` (buổi này — đã chốt):** filter trên list quan hệ con; không chết query; parent không thỏa → bỏ parent đó khỏi kết quả. IAM membership + `userId` → dùng **`some`** (“user có trong workspace”), không dùng **`every`** (“cả workspace chỉ toàn user đó”).

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

- ✅ **Mảng 1a READ isolation** — getAll/getById tenant-scoped. TEST 5/5 PASS 2026-07-20.
- ✅ **Mảng 1b WRITE create** — scope `create(boardId)`. TEST 3/3 PASS + tsc EXIT 0.
- ✅ **Mảng 1c harden** — omit `boardId` trên update; shared types; Role enum; xóa findAll. tsc EXIT 0; curl C-PATCH optional chưa chạy (2026-07-20 tối).
- ⬜ Mảng 2 org tree (closure table). Mảng 3 RBAC→ABAC. Mảng 4 audit log.

ĐIỂM ĐANG ĐỨNG (đồng bộ 2026-07-21 tối): GĐ0.3 IAM — SQL Bài 1–4 PASS; Mảng 1 code KHÉP; Mảng 2 closure table lý thuyết xong → next = học viên thiết kế schema OrgUnit. (Mục 5 bảng 10 GĐ bên dưới = roadmap CŨ — tham khảo; CHÍNH = 0-BIS.)
(Mục 5 "Lộ Trình 10 Giai Đoạn" bên dưới là roadmap CŨ — GIỮ LÀM THAM KHẢO, roadmap CHÍNH = mục 0-BIS.)

## 1. Profile Học Viên

- FE: React/Next.js (2-4 năm). Target: Fullstack Dev (JS/TS). Migration FE→BE; **SQL gần như zero** (tự đánh giá đọc SQL ~10%, 2026-07-21).
- Điểm mạnh: JS/TS, tư duy component, async, HTTP. Tư duy phản biện tốt (hay hỏi "tại sao").
- **Cách học BẮT BUỘC (học viên chốt 2026-07-21):** mentor CHỈ gợi ý / hỏi / review. **CẤM** đưa code mẫu đầy đủ để chép theo (kể cả SQL). Học viên tự động não + tự gõ. Đưa sample hoàn chỉnh = mentor học hộ, học viên không đúc kết được. Lộ trình query: **SQL thuần trước → rồi mới Prisma↔SQL song song**. Drill trước Mảng 2 org tree.

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
| 2   | Auth & Security         | Register/login, JWT+refresh, RBAC, rate-limit    | ✅ DONE (Bài 1–7 + GĐ0.1). Roadmap CHÍNH = mục 0-BIS; đang GĐ0.3 IAM Mảng 2 |
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

> ⚠️ **SNAPSHOT LỊCH SỬ GĐ1** (giữ để ôn). Trạng thái HIỆN TẠI xem mục ⏸️ đầu file + `feature_list.json`. Nhiều chi tiết dưới đây đã supersede (vd: `SEED_USER_ID` đã bỏ; `updateTaskSchema` giờ omit `boardId`; authorId lấy từ JWT).

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
