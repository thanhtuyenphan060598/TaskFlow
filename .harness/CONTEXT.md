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

## 📖 THUẬT NGỮ TIẾNG ANH — BẮT BUỘC giải thích kèm (học viên chốt 2026-07-25)

**Quy tắc mentor:** Mỗi khi dùng thuật ngữ tiếng Anh chuyên ngành trong bài giảng → **luôn** ghi nghĩa tiếng Việt trong ngoặc ngay cạnh. Không nhồi jargon (thuật ngữ chuyên ngành) không giải thích.

**Format:** `english-term (nghĩa tiếng Việt ngắn, dễ hiểu)`

## 📚 CÁCH DẠY — GIẢI THÍCH TRƯỚC, THỰC HÀNH SAU (học viên chốt 2026-07-25)

**Quy tắc bắt buộc:** Gặp **keyword mới** hoặc **kiến thức mới** → mentor **giải thích trước** (một ý, ví dụ đời thường, ít bảng) → học viên **ok** → mới gõ lệnh / sửa file.

**Thứ tự mỗi bài:**

1. **Lý thuyết** — một ý chính; thuật ngữ Anh kèm `(nghĩa Việt)` mỗi lần xuất hiện
2. **Hỏi “hiểu chưa”** — học viên gõ text (không nút bấm); checkpoint chỉ khi cần, không spam
3. **Thực hành** — học viên tự gõ; mentor review diff / output

**Cấm:** nhồi nhiều khái niệm một lúc; nhảy scaffold trước khi có bức tranh; giảng kiểu tài liệu kỹ thuật khi học viên chưa có hình mental model.

**Phản hồi buổi 2026-07-25 tối:** học viên báo giải thích rối — buổi sau ưu tiên **một bài một ý**, analogy (ví dụ đời thường) trước jargon; tóm tắt “xây nhà” ở cuối buổi đã dùng làm template.

**Self-check mentor (GĐ0.4):** đã nhảy scaffold + Button trước lý thuyết — không lặp lại.

**Từ điển nhanh (bổ sung dần khi gặp):**

| Thuật ngữ | Nghĩa |
|-----------|--------|
| **headless** (UI không đầu / không có giao diện sẵn) | Thư viện UI lo **behavior (hành vi) + a11y (trợ năng)** — **không** ship CSS đẹp sẵn. Radix gọi là **unstyled (không style sẵn)** trên docs chính thức. Mày tự **skin (lớp vỏ)** bằng Tailwind/CSS. |
| **unstyled** (không style sẵn) | Từ Radix dùng trên website — cùng nghĩa headless: có component logic, không có look mặc định. |
| **styled UI library** (thư viện UI có giao diện sẵn) | MUI, Ant Design — ship cả look + behavior; override theme khó hơn headless. |
| **peerDependencies** (phụ thuộc ngang hàng) | Package **không tự cài** dependency đó; bắt app host (ví dụ Next) phải cài sẵn — tránh 2 bản React trong 1 app. |
| **devDependencies** (phụ thuộc lúc phát triển) | Chỉ cần khi **code/test package** trên máy dev; không bắt app cuối phải mang theo. |
| **design system** (hệ thống thiết kế) | Bộ component + màu + spacing + quy ước UI dùng chung cả product. |
| **design tokens** (token thiết kế) | Biến gốc: màu, cỡ chữ, khoảng cách — ví dụ `--color-primary`. |
| **scoped** (phạm vi cục bộ) | Style chỉ áp component đó, không tràn sang component khác. |
| **singleton** (một instance duy nhất) | Chỉ được **một bản** runtime — React cả app chỉ được mount **một** React. |
| **build tool** (công cụ build) | Biến source TS/JSX/CSS → artifact (sản phẩm build) chạy được — tsc emit, Vite, tsup, Next build. |
| **bundler** (công cụ đóng gói) | Webpack/Vite/Next gom nhiều module → bundle (một hoặc vài file) chạy browser. |
| **compile / transpile** (biên dịch) | Đổi TS/JSX → JS browser hiểu. **Transpile** = biên dịch từng file, thường không tối ưu nặng như full compile production. |
| **emit** (xuất file) | `tsc` ghi file `.js` ra disk; `noEmit: true` = chỉ check type, không ghi file. |
| **dist** (thư mục build) | Output sau build — `dist/index.js`, `.d.ts`… Khác `src/` (source gốc). |
| **source-only package** (package chỉ trỏ source) | `main: "./src/index.ts"` — chưa build riêng; consumer (app/bundler) lo compile. |
| **consume** (tiêu thụ / dùng package) | App import `@taskflow/ui` — app là consumer, ui là library được dùng. |
| **transpilePackages** (config Next compile workspace) | Next biên dịch package monorepo trong `node_modules` workspace — cần khi ui trỏ `.ts` source. |
| **HMR** (hot module reload — sửa thấy ngay) | Dev server reload module vừa sửa, không refresh cả trang. Storybook/Vite có. |
| **moduleResolution: bundler** (cách TS resolve import cho bundler) | Luật import cho code **đi qua bundler** (Next/Vite), không ép đuôi `.js` kiểu Node ESM. |
| **NodeNext** (luật import kiểu Node ESM) | Dùng cho **api/shared** chạy/tham chiếu Node — `"type":"module"` + import có đuôi `.js`. **Không** copy sang `packages/ui`. |
| **implementation detail** (chi tiết triển khai nội bộ) | Radix/Tailwind nằm **trong** `@taskflow/ui`; app không import trực tiếp. |
| **skin** (lớp vỏ giao diện) | CSS/Tailwind bọc ngoài component headless — phần user nhìn thấy. |
| **a11y / accessibility** (trợ năng) | Người khiếm thị/bàn phím vẫn dùng được — ARIA, focus, tab order. |
| **portal** (cổng render) | Render UI ra **chỗ khác** trong DOM (thường `document.body`) — Modal không bị `overflow:hidden` của cha che. |
| **focus trap** (bẫy focus) | Tab chỉ loop trong Modal, không nhảy ra nền trang phía sau. |
| **asChild** (ghép vào con) | Pattern Radix: behavior bọc **element con do mày chọn** (ví dụ `<Button>`) thay vì render `<button>` riêng. |
| **Storybook** (sổ truyện component) | App mini xem/thử component **tách khỏi** backend và page thật. |
| **spread props** (`...props`) | Trải mọi prop còn lại xuống thẻ con — `onClick`, `className`… không liệt kê hết. |

## ⚠️ LỖI TOOL: KHÔNG dùng ask_question (nút bấm tương tác) — ĐÃ CHẨN ĐOÁN XONG

Học viên chạy mentor qua `cline` TRONG TERMINAL của Cursor (KHÔNG phải Chat panel IDE).
→ Terminal agent KHÔNG có UI host để render nút bấm → tool multiple-choice (ask_question) LUÔN abort
"Interactive runtime abort requested". Tương tự, nút Compact UI → session CLI orphan → "Compaction failed: has no owner".
→ Đây là LIMITATION của terminal agent (Cursor 3.11.25 / macOS 26.3.1), KHÔNG phải lỗi code/MCP/project. Đã xác nhận bởi cả agent Cursor.
→ Mentor sau BẮT BUỘC: (1) TUYỆT ĐỐI không gọi ask_question — hỏi lựa chọn bằng CHỮ, học viên gõ text trả lời.
(2) Nén context thì bảo học viên MỞ SESSION MỚI (đọc CONTEXT.md), đừng bấm Compact UI.
(3) Không cần xóa cache/reinstall. Muốn dùng nút bấm/compact mượt thì học viên tự chuyển sang Chat panel IDE.

## ⏸️ ĐIỂM DỪNG HIỆN TẠI (đọc ĐẦU TIÊN — cập nhật cuối buổi 2026-07-31)

**Source of truth trạng thái:** `.harness/feature_list.json` (`current_focus` = `feat-app1-task`, **in-progress**).

**Vừa xong buổi 2026-07-31 (GĐ1 app — auth + list):**
- Login → cookie → `proxy.ts` → `/tasks` **test PASS**
- BFF `GET /api/tasks` + tasks page list
- Bài học React dev: Strict Mode, AbortController, error state sticky

**Bước tiếp:**
1. React Query cho tasks
2. Register page
3. Task CRUD UI

**Đã xong trước đó (2026-07-28/29):**
- `apps/web` scaffold, shell `(dashboard)` / `(auth)`, login RHF + `loginSchema`.
- `packages/shared` **build → `dist/`** — api NodeNext + Next đều consume JS thật.
- Auth **httpOnly cookie** (không localStorage): BFF `POST /api/auth/login` trên Next `:3000`.
- `proxy.ts` (Next 16) bảo vệ page `/tasks`… — đọc cookie server-side.
- Fastify `jwtVerify()` vẫn **Bearer only** — BFF đọc cookie rồi gắn `Authorization` khi gọi `:3001`.

**Bước tiếp buổi sau (một file một lúc):**
1. React Query — `useQuery` cho `/api/tasks`
2. Register page + BFF `/api/auth/register`
3. Task create form

~~1. `app/api/tasks/route.ts`~~ ✅  
~~2. `tasks/page.tsx` fetch list~~ ✅

**GĐ0.4 + GĐ0.3 IAM:** ✅ KHÉP.

### Nợ kỹ thuật GĐ1-web (học viên chốt 2026-07-29 — trả GĐ9 deploy)

| Nợ | Lý do dev | Trả khi nào |
|----|-----------|-------------|
| **BFF Route Handlers** (`/api/auth/login`, `/api/tasks`…) | Dev tách `:3000` / `:3001` — cookie httpOnly không cross-origin | **GĐ9:** nginx cùng domain `app.com` — `/api/v1` → Fastify; client `fetch("/api/v1/tasks", { credentials: "include" })`; **xóa** proxy data routes (giữ login BFF tùy chọn) |
| **BFF = cost prod** | +1 hop Next, không cần nếu cùng domain | Documented — không mang nguyên pattern dev lên prod |
| **api chỉ Bearer** | `@fastify/jwt` default | Prod có thể thêm `@fastify/cookie` đọc cookie trực tiếp — hoãn |
| **`packages/config`** | Học viên từ chối over-engineer | Mỗi workspace giữ `tsconfig.json` riêng |

**Quyết định học viên:** Pattern **(A)** — học xong BFF tasks proxy GĐ1, ghi nợ refactor prod.

### Auth dev — mental model (3 hop login)

```
Browser ──POST /api/auth/login──► Next Route Handler (:3000)
Next (server) ──POST /api/v1/auth/login──► Fastify (:3001)
Next Set-Cookie httpOnly trên :3000 → proxy.ts cho /tasks
Client data calls GĐ1: fetch("/api/...") same-origin; Route Handler gắn Bearer → Fastify
```

**Cookie domain:** cookie `:3000` **không** tự gửi sang `:3001` (khác origin) — không phải vì httpOnly.

**Convention Next API routes:** `app/api/auth/login/route.ts` → `POST /api/auth/login` — **không** nhét `route.ts` cạnh `page.tsx` trong `(auth)/login/`.

### GĐ0.4 Design System — quyết định styling (cập nhật 2026-07-26)

Học viên chốt **C — Hybrid:** token = CSS vars trong Tailwind v4 `@theme`; component dùng utility class (`bg-primary`…). Gộp Lớp 1+3. **Skip CSS Modules (Lớp 2)** tạm thời.

| Lớp | Công cụ | Học gì | Component minh họa |
|-----|---------|--------|-------------------|
| 0 | React thuần | package DS, peerDeps, props typing, export | **Button** (structure) ✅ |
| 1+3 | **Tailwind v4 `@theme`** + CSS vars | token → utility class | **Button** primary variant |
| ~~2~~ | ~~CSS Modules~~ | skip tạm | — |
| 4 | **Radix** (headless) | Modal/Dialog | sau Button styled |

**Nguyên tắc:** App (`apps/web`) chỉ import `@taskflow/ui/*`. Radix/Tailwind là **implementation detail** (chi tiết triển khai nội bộ) bên trong package — giống shadcn nhưng do TaskFlow sở hữu.

**tsconfig `packages/ui` — KHÁC api/shared (2026-07-25):**

| Package | `moduleResolution` | Vì sao |
|---------|-------------------|--------|
| `apps/api`, `packages/shared` | **NodeNext** | Code chạy/tham chiếu **Node ESM** — import có đuôi `.js`. |
| `packages/ui` | **bundler** | Component **browser** — sau này Next/Vite bundle; **không** copy config Node. |
| | `lib`: DOM + DOM.Iterable | UI cần type DOM (`HTMLButtonElement`…). |

**Ranh giới `@taskflow/ui` (chốt 2026-07-26):** CHỈ presentational widgets — Button, Modal, Table, Input/Label/FormField, tokens. **KHÔNG** auth guard, **KHÔNG** app layout/shell — thuộc `apps/web` (GĐ1).

## ✅ PR SELF-REVIEW CHECKLIST (học viên chốt 2026-07-26 — chạy trước mọi commit/accept AI code)

> Học viên = reviewer cuối. AI/mentor có thể sai ranh giới package. **Vibe code không qua checklist = technical debt (nợ kỹ thuật).**

**Trước khi accept file mới / diff lớn — hỏi 5 câu:**

1. **Package đúng chưa?** Code này thuộc `apps/*` hay `packages/*`? Có import ngược chiều (app logic vào ui, React vào api) không?
2. **Có cần biết user/session/route/API không?** Có → **không** vào `@taskflow/ui` / `shared`.
3. **Widget hay shell?** Nút/input/bảng/modal = ui. Header/sidebar/layout page/auth guard = **apps/web**.
4. **Giải thích được 1 câu “vì sao file nằm đây”?** Không → dừng, hỏi lại mentor/AI.
5. **Typecheck/init chạy thật chưa?** `pnpm typecheck` — không trust “nhìn qua ổn”.

**Red flags (cờ đỏ) — reject ngay nếu thấy trong `packages/ui`:**

- AuthGuard, ProtectedRoute, `useAuth`, redirect login
- AppLayout / DashboardShell / sidebar nav product-specific
- `fetch` / API call / React Query hooks
- Import từ `apps/api` hoặc Prisma

**Bài học GĐ0.4:** AuthGuard + AppLayout đã từng bị nhét nhầm ui — học viên review catch, đã xóa.

### 📘 AUDIT LOG (đã giảng 2026-07-23 tối — học viên THÔNG)

**Mục đích:** truy vết ai làm gì sau khi thao tác thành công — không thay permission.

**Append-only:** chỉ INSERT vào `AuditLog`, không UPDATE/DELETE row audit.

**v1 scope:** Task CREATE/UPDATE/DELETE. Fields: userId, workspaceId, action, resourceType, resourceId, metadata?, createdAt.

**workspaceId:** Task → Board → Project → workspaceId. CREATE: include trên `taskRepository.create`; UPDATE/DELETE: tái dùng return `assertCanModifyTask` (query trước delete).

**Hook:** `task.service` sau DB success → `auditRepository.log(...)`.

### 📘 ABAC (đã giảng 2026-07-23 — học viên THÔNG, giữ để ôn)

**RBAC (Role-Based):** quyền gắn vào vai (role) toàn workspace — OWNER/ADMIN/MEMBER. Thô, không phân biệt "ai quản lý project nào".

**ABAC (Attribute-Based):** quyền dựa trên thuộc tính nhiều chiều — user là ai, resource thuộc đâu, action là gì. Cho phép "Trưởng phòng Dev chỉ manage task phòng Dev".

**Triển khai trong dự án (practical ABAC):** thêm bảng `ProjectMember` (role ở cấp project: MANAGER/CONTRIBUTOR/VIEWER). Logic check `assertCanModifyTask`:
1. Mày là author? → pass (sở hữu trực tiếp)
2. Mày là OWNER/ADMIN workspace? → pass (RBAC layer — quyền tối cao)
3. Mày là MANAGER của project chứa task? → pass (ABAC layer)
4. Không thỏa → 403

Thứ tự = cheap check trước (author: so sánh field, không query thêm), expensive check sau (ABAC: 1 query thêm vào ProjectMember).

**Prisma composite unique key:** `@@unique([userId, projectId])` → Prisma tự sinh tên `userId_projectId` → dùng trong `findUnique({ where: { userId_projectId: { userId, projectId } } })`.

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

### Mảng 2 org tree (closure table) — ✅ KHÉP (core); optional repo/API chưa làm

**Mục tiêu:** trong workspace, cây tổ chức công ty → phòng → team → nhân viên. Dùng **closure table** (không chỉ `parentId`) vì query “mọi descendant của node X” hay dùng trong IAM.

**Bước Mảng 2 (thứ tự):**
1. ✅ Lý thuyết + checkpoint closure
2. ✅ Schema `OrgUnit` + `OrgUnitClosure` (sửa createdAt + index)
3. ✅ Migration + seed org tree (Workspace A, 11 closure rows)
4. ✅ SQL descendants / ancestors (2 FK đảo chiều)
5. ⬜ Repository / API (optional)

| SQL Bài 5 | Nội dung | Trạng thái |
|-----------|----------|------------|
| 5a | Descendants của Production (`ancestorId` + JOIN `descendantId`) | ✅ PASS (3 rows) |
| 5b | Ancestors của Dev (`descendantId` + JOIN `ancestorId`) | ✅ PASS (3 rows) |

- ⬜ **Mảng 3** ABAC. ⬜ **Mảng 4** audit.

**BÀI TIẾP THEO cho agent/mentor mới:**

1. `./.harness/init.sh` hoặc `pnpm init`
2. **Mảng 3 ABAC** hoặc org repository (optional)
3. (Optional) Curl C-PATCH

**Dev commands (root):** `pnpm db:psql`, `pnpm seed`, `pnpm prisma:validate`, `pnpm prisma:migrate -- --name ...`

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
