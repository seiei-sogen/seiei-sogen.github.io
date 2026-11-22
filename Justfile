set shell := ["bash", "-cu"]

default:
    @just --list

install:
    pnpm install

dev:
    pnpm dev

build:
    pnpm build

preview:
    pnpm preview

check:
    pnpm astro check

sync:
    pnpm astro sync

astro *ARGS:
    pnpm astro {{ARGS}}

add *ARGS:
    pnpm add {{ARGS}}

clean:
    rm -rf .astro node_modules/.vite

reset: clean dev

pwa-icons:
    node scripts/generate-pwa-icons.mjs

search QUERY:
    ccc search {{QUERY}}

# code-vipassana をビルドして public/code-vipassana/ に取り込む（/code-vipassana/ 配下で配信）
vipassana DIR="../code-vipassana":
    cd {{DIR}} && npm ci && BASE_PATH=/code-vipassana/ npm run build
    rm -rf public/code-vipassana
    cp -r {{DIR}}/dist/client public/code-vipassana

# apps/（et-cetera 用の TanStack Start アプリ。全トピック共通）の依存をインストール
apps-install:
    cd apps && pnpm install

# apps/ の開発サーバー (http://localhost:3000)
apps-dev:
    cd apps && pnpm dev

# apps/ をビルドして public/et-cetera/ に取り込む（/et-cetera/ 配下で配信）。
# ルート定義（routeTree.gen.ts）はビルド時に生成されるので、型チェックはビルドの後に行う
apps-build:
    cd apps && pnpm install --frozen-lockfile && BASE_PATH=/et-cetera/ pnpm build && pnpm typecheck
    rm -rf public/et-cetera
    cp -r apps/dist/client public/et-cetera
