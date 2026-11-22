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

# apps/quaternion（TanStack Start + React Three Fiber）の依存をインストール
quaternion-install:
    cd apps/quaternion && pnpm install

# apps/quaternion の開発サーバー (http://localhost:3000)
quaternion-dev:
    cd apps/quaternion && pnpm dev

# apps/quaternion をビルドして public/et-cetera/quaternion/ に取り込む（/et-cetera/quaternion/ 配下で配信）
quaternion:
    cd apps/quaternion && pnpm install --frozen-lockfile && pnpm typecheck && BASE_PATH=/et-cetera/quaternion/ pnpm build
    rm -rf public/et-cetera/quaternion
    mkdir -p public/et-cetera
    cp -r apps/quaternion/dist/client public/et-cetera/quaternion
