# zkmcu-web

Astro + Starlight documentation site for [zkmcu](https://github.com/Niek-Kamer/zkmcu), deployed at [zkmcu.dev](https://zkmcu.dev).

Purpose is twofold: human-readable docs for the Rust verifier family (BN254 Groth16, BLS12-381 Groth16, winterfell STARK, all `no_std` on RP2350), and a live surface where benchmark numbers render straight from the source-of-truth TOML files in the main repo. Ofcourse nothing on this site should ever disagree with `benchmarks/runs/*/result.toml`, and the build setup makes that impossible by design.

## Repo layout

The main Rust source, benchmark data, and research reports live in the [zkmcu](https://github.com/Niek-Kamer/zkmcu) repo and are pulled in here as a git submodule at `zkmcu/`. Content under `zkmcu/benchmarks/runs/*/result.toml` is loaded at build time via Vite's `import.meta.glob`, so the rendered numbers always match whatever commit the submodule is pinned to.

```
.
├── public/                    static assets, CNAME, favicons
├── src/
│   ├── assets/                images, fonts
│   ├── components/            BenchTable, Footer
│   ├── content/docs/          *.md / *.mdx — doc pages
│   ├── lib/                   benchmarks loader, benchmarks-index, format
│   └── styles/                custom CSS layered on Starlight
├── zkmcu/                     git submodule → github.com/Niek-Kamer/zkmcu
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml   auto-deploy to GitHub Pages on push to main
```

## Local dev

```sh
# Clone with submodule populated:
git clone --recursive https://github.com/Niek-Kamer/zkmcu-web.git
cd zkmcu-web

# Or, if you already cloned without --recursive:
git submodule update --init

bun install
bun run dev              # localhost:4321
```

## Update numbers after zkmcu changes

```sh
git submodule update --remote zkmcu
git add zkmcu
git commit -m "zkmcu: bump to <new-sha>"
git push
```

The deploy workflow rebuilds on push and the new numbers roll out automatically.

## Scripts

| Command            | Action                                          |
|--------------------|-------------------------------------------------|
| `bun install`      | Install dependencies                            |
| `bun run dev`      | Start dev server at `localhost:4321`            |
| `bun run build`    | Build production static site to `./dist`        |
| `bun run preview`  | Preview the production build locally            |
| `bun run check`    | Biome + ESLint + `astro check` (used in CI)     |
| `bun run lint`     | Biome + ESLint only                             |
| `bun run lint:fix` | Auto-fix Biome + ESLint where possible          |
| `bun run format`   | Auto-format with Biome                          |

## Deployment

GitHub Actions auto-deploys `main` to GitHub Pages, see [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). The workflow:

1. Checks out with `submodules: recursive` so the zkmcu submodule populates.
2. Runs `bun install --frozen-lockfile`.
3. Runs `bun run build`.
4. Uploads `./dist` as the Pages artifact.
5. Deploys via `actions/deploy-pages@v4`.

The custom domain `zkmcu.dev` is served via [`public/CNAME`](./public/CNAME). One-time setup after the first successful deploy:

1. **GitHub Pages**: repo Settings → Pages → Source set to **GitHub Actions**. Custom domain field set to `zkmcu.dev`. Enable HTTPS once the cert is issued (~15 min after DNS lands).
2. **DNS** at the registrar:
   - Apex `zkmcu.dev` → four A records pointing at `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub Pages IPs), or an ALIAS / ANAME record if the registrar supports it.
   - `www.zkmcu.dev` → CNAME to `niek-kamer.github.io`.

## License

MIT, see [LICENSE](./LICENSE).

The code + content linked via the zkmcu submodule is under its own license (MIT OR Apache-2.0). See the [zkmcu repo](https://github.com/Niek-Kamer/zkmcu/blob/main/LICENSE-MIT) for terms on the core library + research content.
