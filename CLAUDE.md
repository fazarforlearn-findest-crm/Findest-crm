# Findest Sport CRM — Repo Guide for AI Assistants

Internal CRM/ERP for **Findest Sport** (Indonesian sport-nutrition distributor: Optimum Nutrition, BSN, Isopure). Single-tenant, hosted on GitHub Pages, backed by Supabase. UI language is Bahasa Indonesia.

## Stack in one glance

- **Runtime**: static HTML + vanilla JS. No build step, no bundler, no framework. Just open the file in a browser.
- **Hosting**: GitHub Pages at `findestsport.github.io/Findest-crm/`.
- **Backend**: Supabase (project ref `wuejoxgbtvmlrriwlofk`) — Postgres, Auth (email/password), Storage.
- **CDN libs loaded via `<script src>`**: `@supabase/supabase-js@2`, `xlsx-0.20.1` (sheetjs), GSAP (embedded inline in `index.html`, loaded from CDN in `catalog.html`).
- **PWA**: `index.html` declares an inline manifest + apple-touch icon so it can be installed as a home-screen app.

There is **no package.json, no lockfile, no CI, no tests**. Do not add one unless the user explicitly asks.

## File layout

Everything lives at the repo root — there are no subdirectories for source code.

| File | Purpose |
|------|---------|
| `index.html` | The CRM itself (~11.5k lines, ~1.3 MB). Contains all pages, modals, styles, and app JS in one file. GSAP is embedded inline near the top (lines ~17–31). Actual app JS starts around line **2664**. |
| `catalog.html` | Public-facing product catalog for customers (mobile-first, WhatsApp-checkout flow). Reads `products` and `config` from Supabase with the anon key. |
| `update-harga-stok.html` | One-shot admin tool to sync pricelist + stock into `products`. Hard-codes the target list in `PRICELIST` and `STOK_DATA` arrays. |
| `uploadgambar.html` | Bulk-upload product images to the `produk` storage bucket and patch `products.foto_url`. Fuzzy-matches filenames to product names. |
| `.mcp.json` | MCP config pointing at the Supabase MCP server for the same project. |
| `README.md` | Just the repo name — not maintained. Do not treat it as canonical. |

## Supabase — the source of truth

**URL**: `https://wuejoxgbtvmlrriwlofk.supabase.co`
**Anon key**: hard-coded in each HTML file (search for `SUPABASE_KEY` / `createClient`). It's the public anon key — safe to commit, but if you rotate it, update **all four HTML files**.

### Tables the app reads/writes

Grouped by domain. All are queried through `sb.from('<table>')` (or `SB.from(...)` in `catalog.html` / `uploadgambar.html` / `update-harga-stok.html`).

- **Auth / access**: `user_profiles` (role, divisi, nama, email; auto-created as `gm` for the first login), `invites`.
- **Sales / CRM**: `customers`, `orders`, `visit_logs`, `konsinyasi`, `promos`.
- **Finance**: `invoices`, `payments`, `expenses`, `purchase_orders`, `rekap_kas`.
- **Warehouse**: `outlets`, `products`, `batches` (with expiry-date tracking), `deliveries`.
- **HR / Ops**: `employees`, `absensi` (attendance, unique on `(employee_id, tanggal)`), `leaves`, `kpi`.
- **Comms / admin**: `notices`, `notice_reads`, `config` (key/value, upserted on `key`), `activity_log`.

Only `activity_log` is queried directly by GM; it is written via `logActivity(action, tabel, data)` in `index.html`.

### Storage

- Bucket **`produk`**: product images. Path pattern is `<product_id>.<ext>`, uploaded with `upsert:true`. Public URL is written back into `products.foto_url`. See `uploadgambar.html` for the canonical flow.

### `config` keys the app expects

Set via the Settings page and read from multiple places — treat this as the app's runtime settings store.

- `catalog_wa`, `catalog_sales_name` — customer-catalog WhatsApp number and sales rep name.
- `bank_nama`, `bank_rekening`, `bank_atas_nama`, `qris_url` — payment info shown in `catalog.html`.
- `gp_margin`, `buffer_pakgun`, `biaya_fp_per_outlet`, `jumlah_outlet`, `bensin_buffer` — P&L formula inputs.
- `target_bonus`, `persen_bonus` — bonus formula.

## App architecture (`index.html`)

One monolithic SPA. Pages are `<div class="page" id="page-*">` blocks that get toggled via `nav(page, btnEl)`. Only one page is `.active` at a time.

### Pages

`dashboard`, `sales`, `finance`, `gudang`, `hr`, `absensi`, `notice`, `settings`, `invite` — declared around lines **739–2130**.

Each page has sub-tabs handled by:
- `stab(id, btn)` — Sales sub-tabs (`s-cust`, `s-ord`, `s-visit`, `s-konsi`, `s-kpi`).
- `ftab(id, btn)` — Finance sub-tabs (`f-inv`, `f-exp`, `f-pay`, `f-po`, `f-rekap`, `f-lr`, `f-kpi`).
- `gtab(id, btn)` — Gudang sub-tabs (`g-out`, `g-del`, plus batch/ED alerts).

### Role-based access

Defined in `ROLE_ACCESS` (see line ~2752). Roles are `gm`, `sales`, `finance`, `gudang`, `hr`.

- `buildNav(role)` builds the top-nav tabs based on `ROLE_ACCESS[role].tabs`.
- `setupWritePermissions(role)` hides "add/edit/delete" buttons based on `ROLE_ACCESS[role].write`.
- **`gm` sees and writes everything**. First-time login creates a `user_profiles` row with `role='gm'` — the app is designed so the founding user bootstraps as GM, then invites the rest via the Invite page.

When adding a new page or write action, update **both `tabs` and `write` arrays for every role that should have it**, or the tab won't render / buttons will stay hidden.

### Auth flow

`sb.auth.signInWithPassword` / `signUp` / `resetPasswordForEmail` / `updateUser` — all wrapped in `doLogin`, `doSignup`, `doForgotPassword`, `doResetPassword`. `initApp()` runs after login: it fetches `user_profiles`, builds nav, then calls `loadAllData()` which fans out to per-domain loaders (`loadCustomers`, `loadOrders`, …) that populate the `cache` object.

### Data loading pattern

There's a module-level `cache = { customers, outlets, products, orders, invoices, employees, deliveries, expenses }`. Loaders write to `cache.*` and then re-render the corresponding table. **Mutations do not automatically refresh** — most `add*`/`save*`/`delete*` functions call the matching loader themselves.

### Cross-domain side-effects to watch

- **Order → stock**: `autoKurangiStokDariOrder(order)` decrements `products.stok` and consumes `batches` (FIFO by expiry) when an order transitions to `Selesai`.
- **Konsinyasi → stock + finance**: `integrasiKonsiStok` and `integrasiKonsiFinance` mirror stock + rekap-kas movements when consignment rows are saved/updated.
- **PO → stock**: `autoStokMasukDariPO(po)` adds stock and batches when a PO is marked `Received`.
- **Invoice paid → payments**: `onInvoiceLunas(inv)` inserts a `payments` row.
- **Konsinyasi return → stock**: `kembalikanStokKonsi(konsi)` returns unsold consignment units.

If you change any of these, trace the whole chain — the app has no transactions, so partial failures leave data inconsistent.

## Conventions

- **Language**: everything user-facing is Indonesian. Function names, comments, and IDs mix English + Indonesian freely (`addCust`, `saveKonsi`, `hitungKonsiNilai`, `absenPulang`). Match the surrounding style.
- **Money**: rupiah, integer, no decimals. Use `fmt(n)` (`'Rp ' + n.toLocaleString('id-ID')`) for display and `parseRp(val)` to read from rupiah-formatted inputs. Fields listed in `RP_FIELDS` auto-format on input via `initRpInput`.
- **Dates**: ISO strings (`YYYY-MM-DD`) in DB. UI uses `new Date().toISOString().split('T')[0]` idiomatically.
- **Selectors**: DOM IDs are namespaced by page/modal — e.g. `cust-*`, `ord-*`, `inv-*`, `exp-*`, `emp-*`, `cfg-*`, `sim-*`, `kpi-*`, `dc-*` (customer drawer), `si-*` (sales intelligence).
- **Tables**: sortable columns use `data-tbl` + `data-col` + `class="th-sort"` and a `↕` suffix in the header text.
- **Modals**: opened with `openMo('mo-*')`, closed with `closeMo`. All modal IDs start with `mo-`.
- **Toasts**: `showToast(msg, type='success', duration)` — reuse this instead of `alert`.
- **Icons**: SVG paths in `NAV_ICONS` (Lucide-style). Add new nav icons there before referencing them.

## Editing large files

`index.html` is ~253k tokens — you cannot `Read` it in one call. Use `Grep` to locate sections (searching function names, page IDs, or Indonesian labels works well), then `Read` with `offset`/`limit`. Reliable anchors:

- App JS starts at **line 2664** (`function fmtInput`).
- Supabase init at **line 2741**.
- `ROLE_ACCESS` at **line 2752**.
- Page divs listed in the "Pages" section above.
- Every `.from('<table>')` call — grep for the table name to find every read/write site.

Prefer `Edit` with a unique surrounding block over `Write` for changes here; a full rewrite is very expensive and easy to corrupt.

## Local development

There's no dev server. To test:

- Open `index.html` (or `catalog.html`) directly in a browser, or serve the folder with any static server (`python -m http.server`, `npx serve`, VS Code Live Server).
- The anon key connects to the **production** Supabase project. Any writes hit real data — be careful with `update-harga-stok.html` and any script that upserts en masse. Recent history (see `git log`) shows credentials have been switched to a scratch project and reverted — assume prod unless the URL in the file says otherwise.
- Login uses real Supabase Auth. Use an existing test account or sign up (first signup auto-provisions as `gm`).

## Supabase MCP

`.mcp.json` wires an HTTP MCP server to the same project ref. In an interactive Claude Code session it can `list_tables`, `execute_sql`, `apply_migration`, etc. In non-interactive sessions Supabase MCP tools require OAuth and won't be callable — fall back to inspecting the app's queries to infer schema.

## Git workflow

- Default branch is `main`. Recent history shows small, focused PRs merged via GitHub (`#1`–`#11`).
- Commit messages are terse and descriptive (e.g. `Polish CRM light theme: badges, tables, modals`, `Drop migration tool; point update-harga-stok back at prod DB`). Match that style.
- **Never** commit alternate Supabase credentials without the user asking — the credential-switch commits (`69b6ac6`, `20efd88`) were both reverted quickly.

## Common gotchas

- **RP inputs**: if you add a new rupiah field, append its ID to `RP_FIELDS` and it'll auto-format. Read it with `parseRp(el.value)`, not `parseInt`.
- **Attendance uniqueness**: `absensi` upserts use `onConflict: 'employee_id,tanggal'`. Don't `insert` blindly.
- **Notice reads**: `notice_reads` upserts on `notice_id,user_email`.
- **`config` upsert**: always upsert on `key` — inserting duplicates creates orphan settings that the loader can't find.
- **Consignment math**: `hitungKonsiNilai` and `hitungKonsiSisa` are the trusted source; don't inline the arithmetic.
- **Catalog Google Drive images**: `catalog.html`'s `convertFotoUrl` rewrites Google Drive share links into thumbnail URLs. New image sources may need to be added there.
- **First-user bootstrap**: `initApp` auto-creates a `user_profiles` row with `role='gm'` if none exists. Don't remove that fallback without providing another way to seed the first GM.
