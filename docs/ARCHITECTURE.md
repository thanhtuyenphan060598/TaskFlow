# TaskFlow → CompanyOS — Kiến trúc Monorepo

> Tài liệu chốt QUY ƯỚC cấu trúc & ranh giới phụ thuộc (dependency boundary). Đọc trước khi thêm package/app mới.

## 1. Nguyên tắc nền

- **Không over-engineer**: chỉ tạo package khi THẬT SỰ có ≥2 nơi dùng (Rule of Three). Không tạo sẵn package rỗng.
- **Vertical slice**: nền vững + gắn app dần, không big-design-up-front.
- **Một chiều phụ thuộc (acyclic)**: KHÔNG có vòng lặp import (circular dependency).

## 2. Dependency Direction (LUẬT VÀNG)

```
        apps/  (web, api, mobile)
          │  depends on ▼   (apps import packages)
        packages/
          ├── ui           (React, CHỈ web)
          ├── api-client   (gọi API, web + mobile)
          └── shared       (Zod schema + types thuần — ĐÁY, không phụ thuộc ai)
```

Quy tắc bắt buộc:

1. **`apps/` được import `packages/`.** Chiều ngược lại (`packages/` import `apps/`) → CẤM.
2. **`packages/shared` là ĐÁY** — không import bất kỳ package nào khác, không phụ thuộc framework (no React, no Fastify, no axios). Chỉ Zod + TS thuần.
3. **`packages/*` không import lẫn nhau tạo vòng.** Cho phép một chiều: `ui`/`api-client` → `shared`. Cấm `shared` → `ui`.
4. **App không import app.** `apps/web` không import `apps/api` (chỉ gọi qua HTTP + types từ `shared`).

## 3. Vai trò từng workspace

### Hiện có

| Workspace         | Loại    | Vai trò                                             | Phụ thuộc |
| ----------------- | ------- | --------------------------------------------------- | --------- |
| `apps/api`        | app     | Fastify BE (route→service→repository), Prisma, auth | `shared`  |
| `packages/shared` | package | Zod schema + types dùng chung (auth, task, ...)     | — (đáy)   |

### Kế hoạch (tạo KHI CẦN, không tạo trước)

| Workspace             | Loại    | Vai trò                                            | Phụ thuộc                    | Tạo khi                            |
| --------------------- | ------- | -------------------------------------------------- | ---------------------------- | ---------------------------------- |
| `apps/web`            | app     | Next.js FE                                         | `shared`, `ui`, `api-client` | GĐ1(app) — làm FE task             |
| `packages/api-client` | package | Hàm gọi API (fetch/axios) + types shared, KHÔNG UI | `shared`                     | Khi web VÀ mobile cùng cần gọi API |
| `packages/ui`         | package | React component (Button/Table/Modal) — CHỈ web     | React, `shared`              | GĐ0.4 Design System                |
| `packages/config`     | package | tsconfig/eslint/prettier base                      | —                            | Khi ≥3 package lặp config          |
| `apps/mobile`         | app     | React Native/Expo                                  | `shared`, `api-client`       | GĐ10 Mobile                        |

## 4. Vì sao `api-client` tách khỏi `ui`?

- **Mobile** (React Native) tái dùng được `api-client` + `shared` (logic gọi API, validate) NHƯNG KHÔNG dùng `ui` (component web khác component RN).
- Tách logic (api-client) khỏi trình bày (ui) → mobile lấy đúng phần cần, không kéo theo React DOM.

## 5. Tooling hiện tại

- **pnpm workspace** (`pnpm-workspace.yaml`: `apps/*` + `packages/*`).
- **prettier** ở root (format toàn repo).
- **Chưa dùng turborepo** — ĐỢI khi có ≥3-4 package/app cần build/test song song + cache (dự kiến GĐ1 app trở đi). Giờ pnpm `--filter` + root scripts là đủ.

## 6. Root scripts (tiện, tránh gõ `--filter` dài)

Xem `package.json` gốc. Quy ước:

- `pnpm dev` — chạy api dev (sau này mở rộng chạy nhiều app).
- `pnpm build` — build tất cả workspace.
- `pnpm typecheck` — type-check tất cả.
- Verify toàn cục: `./.harness/init.sh`.
