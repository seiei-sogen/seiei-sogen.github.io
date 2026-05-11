/**
 * debug-mock.js
 *
 * Stub for the `debug` npm package. Prevents SSR bundling of the real
 * `debug` library during Astro builds. Resolved via the Vite alias in
 * `astro.config.mjs`: `alias: { 'debug': '/src/utils/debug-mock.js' }`
 *
 * If you need real debug logging, install `debug` via npm and remove
 * the alias from `astro.config.mjs`.
 */

export default function debug(namespace) {
  return function () {};
}

export function debuglog() {
  return function () {};
}

debug.enabled = false;
debug.disable = () => {};
debug.enable = () => {};
debug.log = () => {};
