/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
    serverExternalPackages: ["puppeteer-extra-plugin-stealth", "playwright-extra", "playwright", "patchright"]
};

export default config;
