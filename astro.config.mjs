// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://zkmcu.dev",
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough", // Dit lost de ASSETS fout op
  }),

  integrations: [
    starlight({
      title: "zkmcu",
      description:
        "no_std Rust family of SNARK and STARK verifiers for ARM Cortex-M and RISC-V microcontrollers.",
      favicon: "/favicon.ico",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
        },
        { tag: "link", attrs: { rel: "manifest", href: "/site.webmanifest" } },
        { tag: "meta", attrs: { name: "theme-color", content: "#b07348" } },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Niek-Kamer/zkmcu",
        },
      ],
      customCss: ["./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
      },
      expressiveCode: {
        themes: ["catppuccin-mocha", "catppuccin-latte"],
        styleOverrides: {
          borderColor: "var(--sl-color-hairline)",
          borderRadius: "8px",
          frames: {
            editorBackground: "var(--sl-color-gray-7)",
            terminalBackground: "var(--sl-color-gray-7)",
            editorActiveTabBackground: "var(--sl-color-gray-6)",
            terminalTitlebarBackground: "var(--sl-color-gray-6)",
          },
        },
      },
      sidebar: [
        { label: "Home", link: "/" },
        { label: "Getting started", link: "/getting-started/" },
        { label: "Architecture", link: "/architecture/" },
        { label: "Wire formats", link: "/wire-format/" },
        {
          label: "On silicon",
          items: [
            { label: "STARK (75 ms, 100 KB)", link: "/stark/" },
            {
              label: "BabyBear × Quartic (cross-ISA 1.04×)",
              link: "/babybear/",
            },
            { label: "Semaphore (real-world)", link: "/semaphore/" },
            { label: "Benchmarks", link: "/benchmarks/" },
            { label: "Deterministic timing", link: "/determinism/" },
          ],
        },
        { label: "Security", link: "/security/" },
        { label: "Self-audit", link: "/self-audit/" },
      ],
      editLink: {
        baseUrl: "https://github.com/Niek-Kamer/zkmcu/edit/main/web/",
      },
      lastUpdated: true,
      disable404Route: true,
    }),
  ],
  vite: {
    ssr: {
      external: ["node:path", "node:fs", "node:url"],
    },
  },
});
