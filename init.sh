r#!/bin/bash
set -e

echo "=== TaskFlow → CompanyOS: Harness Init & Verify ==="
echo ""

# 1. Confirm working dir
echo "=== [1/5] Working directory ==="
pwd

# 2. Install deps
echo ""
echo "=== [2/5] pnpm install ==="
pnpm install

# 3. Postgres (Docker) must be up — Prisma cần DB
echo ""
echo "=== [3/5] Postgres (Docker) ==="
if docker ps --format '{{.Names}}' | grep -q 'taskflow-postgres'; then
  echo "OK: container taskflow-postgres đang chạy"
else
  echo "WARN: chưa thấy taskflow-postgres. Chạy: docker compose up -d"
  echo "     (bỏ qua bước DB nếu chỉ typecheck)"
fi

# 4. Prisma Client generate (idempotent)
echo ""
echo "=== [4/5] Prisma generate ==="
pnpm --filter @taskflow/api exec prisma generate || echo "WARN: prisma generate lỗi — kiểm tra schema/DB"

# 5. Type-check toàn bộ (bắt lỗi TS sớm)
echo ""
echo "=== [5/5] Type-check (tsc --noEmit) ==="
pnpm --filter @taskflow/api exec tsc --noEmit && echo "OK: api type-check pass" || echo "FAIL: api có lỗi type"
pnpm --filter @taskflow/shared exec tsc --noEmit 2>/dev/null && echo "OK: shared type-check pass" || echo "(shared: bỏ qua nếu chưa cấu hình tsc)"

echo ""
echo "=== Verification Complete ==="
echo ""
echo "Next steps:"
echo "1. Đọc feature_list.json — field current_focus = feature đang làm"
echo "2. Đọc CONTEXT.md để nắm lý thuyết/bài học chi tiết"
echo "3. Làm ĐÚNG 1 feature, verify (test/curl) TRƯỚC khi đánh done"
echo "4. Cập nhật progress.md + feature_list.json cuối session"