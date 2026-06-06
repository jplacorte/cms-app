# 🧱 CMS App — Visual Page Builder

A modern, block-based visual page builder and content management system built with **Next.js 16**, **Drizzle ORM**, and **Neon Postgres**. Design entire web pages from a drag-and-drop editor, save them to a serverless database, and serve them dynamically — no code required.

---

## ✨ Features

### 🎨 Visual Drag-and-Drop Editor
- **Block-based architecture** — compose pages by dropping pre-built UI blocks onto a canvas
- **Real-time drag-and-drop** reordering powered by [dnd-kit](https://dndkit.com/)
- **Live resize handles** on every block using [re-resizable](https://github.com/bokuweb/re-resizable)
- **Nested containers** — drop blocks inside Sections and Grid layouts for complex compositions
- **Inline properties panel** — select any block and edit every visual property in real-time

### 🧩 19 Built-In Block Types

| Category | Blocks |
| --- | --- |
| **Layout** | Hero Section, Container Section, Grid Layout, Spacer, Divider |
| **Content** | Typography, Button, Card |
| **Media** | Image, Video (embed) |
| **Data Display** | Accordion / FAQ, Testimonial, Pricing Table, Metrics Grid |
| **Navigation** | Navbar, Sidebar Nav, Footer |
| **Forms & Social** | Contact Form, Social Links |

Every block is fully customizable — colors, spacing, typography, borders, shadows, and more — all from the properties panel.

### 🗄️ Serverless Persistence
- Pages are saved as **JSON block trees** to a **Neon Postgres** database via **Drizzle ORM**
- Upsert logic: saving a page with an existing slug updates it; new slugs create new pages
- Input validation with **Zod** schemas via Next.js Server Actions

### 🌐 Dynamic Public Pages
- Every saved page is accessible at `/<slug>` as a fully rendered, production-ready web page
- Server-side rendered with `force-dynamic` for always-fresh content
- The same block registry renders both the editor preview and the public page

### 🔒 Security
- All user-generated HTML content is sanitized with **DOMPurify** (`isomorphic-dompurify`) to prevent XSS attacks

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | TypeScript 5.9 |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **State Management** | [Zustand](https://zustand.docs.pmnd.rs/) |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) (core + sortable) |
| **Resizing** | [re-resizable](https://github.com/bokuweb/re-resizable) |
| **Database** | [Neon Postgres](https://neon.tech/) (serverless) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) + Drizzle Kit |
| **Validation** | [Zod 4](https://zod.dev/) |
| **Sanitization** | [isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | [Geist](https://vercel.com/font) (via `next/font`) + dynamic Google Fonts |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## 📂 Project Structure

```
cms-app/
├── public/                     # Static assets (SVGs, favicon)
├── src/
│   ├── actions/
│   │   └── save-page.ts        # Server Action — upserts page data to Neon
│   ├── app/
│   │   ├── [slug]/
│   │   │   └── page.tsx        # Dynamic public page renderer
│   │   ├── admin/
│   │   │   └── pages/
│   │   │       └── new/
│   │   │           └── page.tsx  # Visual page editor UI
│   │   ├── globals.css         # Tailwind CSS + theme tokens
│   │   ├── layout.tsx          # Root layout (Geist fonts, metadata)
│   │   └── page.tsx            # Landing / home page
│   ├── components/
│   │   ├── Blocks/             # 19 renderable block components
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── NavbarBlock.tsx
│   │   │   ├── CardBlock.tsx
│   │   │   ├── ContainerSection.tsx
│   │   │   ├── GridContainer.tsx
│   │   │   └── ...
│   │   └── Editor/             # Editor chrome & tooling
│   │       ├── EditorCanvas.tsx      # DnD-enabled block canvas
│   │       ├── Sidebar.tsx           # Block palette / component picker
│   │       ├── PropertiesPanel.tsx   # Per-block property editor
│   │       ├── SortableBlock.tsx     # Sortable + resizable block wrapper
│   │       ├── Properties/           # Per-block-type property forms
│   │       └── Wrappers/
│   │           └── DynamicBlockWrapper.tsx  # Shared renderer (editor + public)
│   ├── db/
│   │   ├── index.ts            # Neon + Drizzle client initialization
│   │   └── schema.ts           # Database schema (pages table)
│   ├── lib/
│   │   ├── block-map.ts        # Block registry mapping type → component
│   │   ├── types.ts            # Shared TypeScript interfaces for all blocks
│   │   └── ui/                 # Reusable form input primitives
│   │       ├── TextInput.tsx
│   │       ├── ColorInput.tsx
│   │       ├── NumberInput.tsx
│   │       ├── SelectInput.tsx
│   │       ├── RichTextInput.tsx
│   │       ├── ImageUploadInput.tsx
│   │       └── ...
│   └── store/
│       └── useEditorStore.ts   # Zustand store — block tree + editor state
├── drizzle.config.ts           # Drizzle Kit configuration
├── next.config.ts              # Next.js configuration
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 9 (recommended; installed via [Corepack](https://nodejs.org/api/corepack.html))
- A **[Neon](https://neon.tech/)** Postgres database (free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/jplacorte/cms-app.git
cd cms-app
```

### 2. Install Dependencies

```bash
pnpm install
```

> **Note:** On first install, pnpm may prompt you to approve build scripts for `esbuild`, `sharp`, and `unrs-resolver`. These are safe to allow — run `pnpm approve-builds` if prompted, or they are pre-configured in `pnpm-workspace.yaml`.

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
# Neon Postgres connection string
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"
```

You can find this connection string in your [Neon Dashboard](https://console.neon.tech/) after creating a project.

### 4. Push the Database Schema

Use Drizzle Kit to push the schema to your Neon database:

```bash
pnpm drizzle-kit push
```

This creates the `pages` table with the following structure:

| Column | Type | Description |
| --- | --- | --- |
| `id` | `serial` | Auto-incrementing primary key |
| `slug` | `varchar(255)` | Unique URL slug for the page |
| `title` | `varchar(255)` | Page title |
| `blocks` | `jsonb` | JSON tree of block data |
| `created_at` | `timestamp` | Auto-set on creation |
| `updated_at` | `timestamp` | Auto-updated on modification |

### 5. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📖 Usage

### Creating a Page

1. Navigate to **`/admin/pages/new`**
2. Enter a **page title** — a URL-friendly slug is auto-generated
3. **Click blocks** from the sidebar to add them to the canvas
4. **Drag to reorder** blocks using the grip handle on each block's toolbar
5. **Click any block** to select it and edit its properties in the right panel
6. **Resize blocks** by dragging the edge/corner handles (visible when selected)
7. Click **Save Page** to persist the page to the database

### Viewing a Page

After saving, the page is immediately available at:

```
http://localhost:3000/<your-slug>
```

For example, a page with slug `about-us` would be served at `/about-us`.

---

## 🏗️ Architecture

### Block Tree Data Model

Pages are stored as a recursive tree of blocks in a single JSONB column:

```typescript
type EditorBlock = {
  id: string;         // UUID
  type: string;       // e.g. "HeroSection", "TextBlock", "GridContainer"
  data: Record<string, unknown>;  // All visual properties
  children?: EditorBlock[];       // Nested blocks (for containers)
};
```

### Rendering Pipeline

The same `BlockRegistry` powers both the editor and public pages:

```
BlockRegistry (block-map.ts)
  ↓
  Maps block.type → React Component
  ↓
┌─────────────────────────────────┐
│  Editor (SortableBlock)         │  ← Adds DnD, resize, selection, toolbar
│  Public (DynamicBlockWrapper)   │  ← Renders raw block with width/height
└─────────────────────────────────┘
```

### State Management

The editor uses a single **Zustand** store (`useEditorStore`) that manages:
- `blocks` — the full recursive block tree
- `activeBlockId` — which block is currently selected
- `title` / `slug` — page metadata
- Tree manipulation helpers: `addBlock`, `updateBlock`, `removeBlock`, `moveBlock`

All tree operations (add, update, remove, move) are recursive to support arbitrarily nested containers.

---

## 🧪 Database Management

### Useful Drizzle Kit Commands

```bash
# Push schema changes directly to the database
pnpm drizzle-kit push

# Generate SQL migrations (for version-controlled schema changes)
pnpm drizzle-kit generate

# Open Drizzle Studio (visual database browser)
pnpm drizzle-kit studio
```

---

## 🚢 Deployment

### Deploy on Vercel

This project is optimized for **[Vercel](https://vercel.com/)** deployment:

1. Push your repository to GitHub
2. Import it in [Vercel Dashboard](https://vercel.com/new)
3. Add your `DATABASE_URL` environment variable in the Vercel project settings
4. Deploy — Vercel auto-detects Next.js and handles the rest

### Other Platforms

Any platform that supports Node.js 18+ can run this app:

```bash
pnpm build
pnpm start
```

Ensure the `DATABASE_URL` environment variable is set in your hosting environment.

---

## 📄 License

This project is private. All rights reserved.

---

## 👤 Author

**John Phillip Lacorte**
📧 jaypeelacorte28@gmail.com
