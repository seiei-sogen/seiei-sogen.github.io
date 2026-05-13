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
