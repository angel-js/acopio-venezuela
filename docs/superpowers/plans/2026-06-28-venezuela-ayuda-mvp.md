# Venezuela Ayuda — MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, bilingual (ES/EN) humanitarian aid landing page that centralizes information about missing persons, verified donations, and collection centers for Venezuela, with geolocation-based filtering, a contact form, and a social media directory.

**Architecture:** Next.js 14 App Router with static data files (no database). Internationalization via next-intl with locale-based routing (`/es/*`, `/en/*`). Vercel Edge geolocation for country detection. All content managed via TypeScript files in `/data`. Contact form submissions sent via a serverless API route.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 3, next-intl, DM Serif Display + Inter fonts (Google Fonts via next/font), Vercel deployment.

---

## File Structure

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx            ← Root layout with fonts, metadata, nav
│   │   └── page.tsx              ← Main landing page assembling all sections
│   ├── api/
│   │   ├── geo/route.ts          ← Country detection via Vercel headers
│   │   └── contact/route.ts      ← Contact form submission handler
│   ├── layout.tsx                ← Root HTML shell (no content, just <html>)
│   └── not-found.tsx             ← 404 page
├── components/
│   ├── ui/
│   │   ├── Button.tsx            ← Reusable button (primary, secondary, outline)
│   │   ├── Card.tsx              ← Card container with Venezuela flag stripe
│   │   └── Badge.tsx             ← Small label (payment methods, categories)
│   ├── Navbar.tsx                ← Top nav with logo, section links, lang switcher
│   ├── Hero.tsx                  ← Hero banner with CTA
│   ├── DesaparecidosSection.tsx  ← Missing persons platforms listing
│   ├── DonacionesSection.tsx     ← Verified donation orgs listing
│   ├── AcopioSection.tsx         ← Collection centers with country filter
│   ├── ContactSection.tsx        ← Contact form for suggestions
│   ├── SocialSection.tsx         ← Social media links for orgs/foundations
│   ├── Footer.tsx                ← Credits, last updated, social links
│   └── LanguageSwitcher.tsx      ← ES/EN toggle component
├── data/
│   ├── desaparecidos.ts          ← Missing persons platform data + types
│   ├── donaciones.ts             ← Donation org data + types
│   ├── acopio.ts                 ← Collection center data + types
│   └── social.ts                 ← Social media accounts data + types
├── lib/
│   └── utils.ts                  ← Shared utilities (cn helper, country names)
├── messages/
│   ├── es.json                   ← All Spanish UI text
│   └── en.json                   ← All English UI text
├── i18n/
│   ├── request.ts                ← next-intl server config
│   └── routing.ts                ← Locale routing config
├── public/
│   └── og-image.png              ← Open Graph preview image (placeholder)
├── middleware.ts                  ← next-intl locale redirect middleware
├── tailwind.config.ts             ← Custom colors, fonts, design tokens
├── next.config.ts                 ← Next.js config with next-intl plugin
└── .env.example                   ← Documented env vars
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`

- [ ] **Step 1: Scaffold Next.js 14 with create-next-app**

```bash
cd /Users/aserrano/Documents/acopio-venezuela
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted about overwriting files, accept. This creates the base Next.js project in the current directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl
npm install -D @types/node
```

- [ ] **Step 3: Verify the dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000` with no errors. Kill the server after verifying.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with TypeScript and Tailwind"
```

---

## Task 2: Configure Tailwind Design Tokens and Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts with Venezuela design tokens**

Replace the entire contents of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        venezuela: {
          red: "#CF142B",
          blue: "#00247D",
          cream: "#F5F0E8",
          dark: "#1A1A1A",
          green: "#4CAF50",
        },
      },
      fontFamily: {
        display: ["var(--font-dm-serif)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Update app/globals.css**

Replace the entire contents of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-venezuela-cream text-venezuela-dark font-body antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-display;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: configure Tailwind with Venezuela design tokens and typography"
```

---

## Task 3: Configure next-intl Internationalization

**Files:**
- Create: `i18n/routing.ts`
- Create: `i18n/request.ts`
- Create: `messages/es.json`
- Create: `messages/en.json`
- Create: `middleware.ts`
- Modify: `next.config.ts`
- Modify: `app/layout.tsx`
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Create i18n/routing.ts**

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
});
```

- [ ] **Step 2: Create i18n/request.ts**

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "es" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create middleware.ts at the project root**

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};
```

- [ ] **Step 4: Update next.config.ts**

Replace the entire contents:

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Create messages/es.json**

```json
{
  "metadata": {
    "title": "Venezuela Ayuda — Información de ayuda humanitaria",
    "description": "Centraliza información sobre búsqueda de desaparecidos, donaciones verificadas y centros de acopio para Venezuela."
  },
  "nav": {
    "desaparecidos": "Desaparecidos",
    "donaciones": "Donaciones",
    "acopio": "Centros de acopio",
    "contacto": "Contacto",
    "redes": "Redes sociales"
  },
  "hero": {
    "title": "Venezuela necesita tu ayuda",
    "subtitle": "Información centralizada para buscar desaparecidos, donar y llevar insumos. Todo verificado, todo en un lugar.",
    "cta_desaparecidos": "Buscar personas",
    "cta_donar": "Donar ahora",
    "cta_acopio": "Centros de acopio"
  },
  "desaparecidos": {
    "title": "Búsqueda de personas desaparecidas",
    "description": "Plataformas verificadas donde puedes buscar información sobre personas desaparecidas.",
    "warning": "Verifica siempre la fuente antes de compartir información personal.",
    "visit": "Ir al sitio",
    "types": {
      "base_de_datos": "Base de datos",
      "red_social": "Red social",
      "ong": "ONG",
      "gobierno": "Gobierno"
    }
  },
  "donaciones": {
    "title": "Donaciones monetarias",
    "description": "Organizaciones verificadas que reciben donaciones para Venezuela. Todos los links abren en una nueva pestaña.",
    "donate": "Donar",
    "verified": "Verificada",
    "payment_methods": {
      "paypal": "PayPal",
      "transferencia": "Transferencia",
      "cripto": "Cripto",
      "tarjeta": "Tarjeta"
    }
  },
  "acopio": {
    "title": "Centros de acopio",
    "description": "Lugares físicos donde puedes llevar donaciones de insumos. Selecciona tu país para ver los centros más cercanos.",
    "filter_country": "Filtrar por país",
    "all_countries": "Todos los países",
    "no_centers": "No hay centros registrados en tu país aún. Puedes ayudar enviando donaciones monetarias.",
    "schedule": "Horario",
    "phone": "Teléfono",
    "email": "Correo",
    "accepts": "Acepta",
    "detected_country": "Mostrando centros en {country}",
    "supplies": {
      "alimentos": "Alimentos",
      "medicamentos": "Medicamentos",
      "ropa": "Ropa",
      "higiene": "Higiene"
    }
  },
  "contact": {
    "title": "Contacto",
    "description": "¿Conoces un centro de acopio, organización o recurso que debería estar aquí? Envíanos la información.",
    "name": "Nombre",
    "email": "Correo electrónico",
    "message": "Mensaje",
    "placeholder_name": "Tu nombre",
    "placeholder_email": "tu@email.com",
    "placeholder_message": "Describe qué recurso quieres agregar o sugerir...",
    "submit": "Enviar solicitud",
    "success": "¡Gracias! Revisaremos tu solicitud pronto.",
    "error": "Hubo un error. Por favor intenta de nuevo."
  },
  "social": {
    "title": "Redes sociales",
    "description": "Sigue estas cuentas para estar al día con la situación en Venezuela y las iniciativas de ayuda.",
    "follow": "Seguir",
    "platforms": {
      "instagram": "Instagram",
      "twitter": "X (Twitter)",
      "facebook": "Facebook",
      "tiktok": "TikTok",
      "youtube": "YouTube"
    }
  },
  "footer": {
    "updated": "Datos actualizados por última vez: {date}",
    "disclaimer": "Esta plataforma es informativa. Verifica siempre directamente con las organizaciones antes de actuar.",
    "made_with": "Hecho con ❤️ por venezolanos para Venezuela",
    "suggest": "¿Falta algo? Escríbenos"
  }
}
```

- [ ] **Step 6: Create messages/en.json**

```json
{
  "metadata": {
    "title": "Venezuela Ayuda — Humanitarian Aid Information",
    "description": "Centralized information about missing persons search, verified donations, and collection centers for Venezuela."
  },
  "nav": {
    "desaparecidos": "Missing Persons",
    "donaciones": "Donations",
    "acopio": "Collection Centers",
    "contacto": "Contact",
    "redes": "Social Media"
  },
  "hero": {
    "title": "Venezuela needs your help",
    "subtitle": "Centralized information to find missing people, donate, and deliver supplies. All verified, all in one place.",
    "cta_desaparecidos": "Find people",
    "cta_donar": "Donate now",
    "cta_acopio": "Collection centers"
  },
  "desaparecidos": {
    "title": "Missing Persons Search",
    "description": "Verified platforms where you can search for information about missing people.",
    "warning": "Always verify the source before sharing personal information.",
    "visit": "Visit site",
    "types": {
      "base_de_datos": "Database",
      "red_social": "Social Media",
      "ong": "NGO",
      "gobierno": "Government"
    }
  },
  "donaciones": {
    "title": "Monetary Donations",
    "description": "Verified organizations that accept donations for Venezuela. All links open in a new tab.",
    "donate": "Donate",
    "verified": "Verified",
    "payment_methods": {
      "paypal": "PayPal",
      "transferencia": "Wire Transfer",
      "cripto": "Crypto",
      "tarjeta": "Credit Card"
    }
  },
  "acopio": {
    "title": "Collection Centers",
    "description": "Physical locations where you can deliver supply donations. Select your country to see the nearest centers.",
    "filter_country": "Filter by country",
    "all_countries": "All countries",
    "no_centers": "No registered centers in your country yet. You can help by sending monetary donations.",
    "schedule": "Schedule",
    "phone": "Phone",
    "email": "Email",
    "accepts": "Accepts",
    "detected_country": "Showing centers in {country}",
    "supplies": {
      "alimentos": "Food",
      "medicamentos": "Medicine",
      "ropa": "Clothing",
      "higiene": "Hygiene"
    }
  },
  "contact": {
    "title": "Contact",
    "description": "Do you know a collection center, organization, or resource that should be listed here? Send us the information.",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "placeholder_name": "Your name",
    "placeholder_email": "you@email.com",
    "placeholder_message": "Describe the resource you want to add or suggest...",
    "submit": "Submit request",
    "success": "Thank you! We'll review your request soon.",
    "error": "There was an error. Please try again."
  },
  "social": {
    "title": "Social Media",
    "description": "Follow these accounts to stay updated on the situation in Venezuela and aid initiatives.",
    "follow": "Follow",
    "platforms": {
      "instagram": "Instagram",
      "twitter": "X (Twitter)",
      "facebook": "Facebook",
      "tiktok": "TikTok",
      "youtube": "YouTube"
    }
  },
  "footer": {
    "updated": "Data last updated: {date}",
    "disclaimer": "This platform is informational. Always verify directly with organizations before taking action.",
    "made_with": "Made with ❤️ by Venezuelans for Venezuela",
    "suggest": "Something missing? Write to us"
  }
}
```

- [ ] **Step 7: Delete default app/page.tsx, create app/[locale]/layout.tsx**

Delete `app/page.tsx` (the default one from create-next-app).

Update `app/layout.tsx` to be a minimal root shell:

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Venezuela Ayuda",
  description: "Información de ayuda humanitaria para Venezuela",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

Create `app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DM_Serif_Display, Inter } from "next/font/google";
import { getMessages } from "next-intl/server";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${dmSerif.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Create app/[locale]/page.tsx placeholder**

```typescript
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-display text-venezuela-blue p-8">
        {t("title")}
      </h1>
      <p className="text-lg px-8">{t("subtitle")}</p>
    </main>
  );
}
```

- [ ] **Step 9: Verify dev server works with i18n**

```bash
npm run dev
```

Visit `http://localhost:3000` — should redirect to `/es`. Visit `/en` — should show English text. Kill the server.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: configure next-intl with ES/EN locales, messages, and routing"
```

---

## Task 4: Create Data Files with Types and Sample Data

**Files:**
- Create: `data/desaparecidos.ts`
- Create: `data/donaciones.ts`
- Create: `data/acopio.ts`
- Create: `data/social.ts`

- [ ] **Step 1: Create data/desaparecidos.ts**

```typescript
export interface PlataformaDesaparecidos {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  url: string;
  tipo: "base_de_datos" | "red_social" | "ong" | "gobierno";
  activo: boolean;
  logoUrl?: string;
}

export const plataformasDesaparecidos: PlataformaDesaparecidos[] = [
  {
    id: "foro-penal",
    nombre: "Foro Penal",
    descripcion: {
      es: "ONG venezolana que documenta y asiste a presos políticos y desaparecidos. Tienen una base de datos de detenidos.",
      en: "Venezuelan NGO that documents and assists political prisoners and missing persons. They maintain a detainee database.",
    },
    url: "https://foropenal.com",
    tipo: "ong",
    activo: true,
  },
  {
    id: "provea",
    nombre: "PROVEA",
    descripcion: {
      es: "Programa Venezolano de Educación-Acción en Derechos Humanos. Documenta violaciones de DDHH incluyendo desapariciones.",
      en: "Venezuelan Program of Education-Action in Human Rights. Documents human rights violations including disappearances.",
    },
    url: "https://provea.org",
    tipo: "ong",
    activo: true,
  },
  {
    id: "cofavic",
    nombre: "COFAVIC",
    descripcion: {
      es: "Comité de Familiares de las Víctimas. Brinda acompañamiento jurídico y psicosocial a familiares de víctimas.",
      en: "Committee of Victims' Families. Provides legal and psychosocial support to families of victims.",
    },
    url: "https://cofavic.org",
    tipo: "ong",
    activo: true,
  },
];
```

- [ ] **Step 2: Create data/donaciones.ts**

```typescript
export interface OrganizacionDonacion {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  url: string;
  metodoPago: ("paypal" | "transferencia" | "cripto" | "tarjeta")[];
  verificada: boolean;
  pais: string;
  logoUrl?: string;
}

export const organizacionesDonacion: OrganizacionDonacion[] = [
  {
    id: "alimenta-la-solidaridad",
    nombre: "Alimenta la Solidaridad",
    descripcion: {
      es: "Red de comedores comunitarios que alimenta a niños en situación de vulnerabilidad en Venezuela.",
      en: "Network of community kitchens feeding vulnerable children in Venezuela.",
    },
    url: "https://alimentalasolidaridad.org",
    metodoPago: ["paypal", "transferencia", "tarjeta"],
    verificada: true,
    pais: "VE",
  },
  {
    id: "prepara-familia",
    nombre: "Prepara Familia",
    descripcion: {
      es: "Organización que atiende a niños hospitalizados y sus familias, proporcionando alimentación y medicamentos.",
      en: "Organization that assists hospitalized children and their families, providing food and medicine.",
    },
    url: "https://preparafamilia.org",
    metodoPago: ["paypal", "tarjeta"],
    verificada: true,
    pais: "VE",
  },
  {
    id: "acnur",
    nombre: "ACNUR Venezuela",
    descripcion: {
      es: "Agencia de la ONU para los refugiados. Ayuda a venezolanos desplazados y refugiados en la región.",
      en: "UN Refugee Agency. Helps displaced Venezuelans and refugees in the region.",
    },
    url: "https://www.acnur.org/venezuela",
    metodoPago: ["tarjeta", "transferencia"],
    verificada: true,
    pais: "INT",
  },
];
```

- [ ] **Step 3: Create data/acopio.ts**

```typescript
export interface CentroAcopio {
  id: string;
  nombre: string;
  organizacion: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono?: string;
  email?: string;
  horario?: string;
  insumos: string[];
  activo: boolean;
  coordenadas?: { lat: number; lng: number };
}

export const centrosAcopio: CentroAcopio[] = [
  {
    id: "acopio-santiago-1",
    nombre: "Centro de Acopio Solidaridad Venezuela",
    organizacion: "Venezolanos en Chile",
    direccion: "Av. Providencia 1234, Oficina 56",
    ciudad: "Santiago",
    pais: "CL",
    telefono: "+56 9 1234 5678",
    email: "acopio@vzlachile.org",
    horario: "Lunes a Viernes 9:00 - 18:00",
    insumos: ["alimentos", "medicamentos", "higiene"],
    activo: true,
  },
  {
    id: "acopio-madrid-1",
    nombre: "Punto de Recogida Venezuela",
    organizacion: "Venezolanos en España",
    direccion: "Calle Gran Vía 45, Local 3",
    ciudad: "Madrid",
    pais: "ES",
    telefono: "+34 612 345 678",
    horario: "Lunes a Sábado 10:00 - 20:00",
    insumos: ["alimentos", "medicamentos", "ropa", "higiene"],
    activo: true,
  },
  {
    id: "acopio-miami-1",
    nombre: "Venezuela Aid Collection Center",
    organizacion: "Venezuelan American Association",
    direccion: "8500 NW 25th St, Suite 100",
    ciudad: "Miami",
    pais: "US",
    telefono: "+1 (305) 555-0199",
    email: "aid@vzlamiami.org",
    horario: "Monday to Friday 9:00 AM - 5:00 PM",
    insumos: ["medicamentos", "ropa", "higiene"],
    activo: true,
  },
  {
    id: "acopio-bogota-1",
    nombre: "Centro Humanitario Venezuela",
    organizacion: "Fundación Venezolanos en Colombia",
    direccion: "Carrera 7 #45-12",
    ciudad: "Bogotá",
    pais: "CO",
    telefono: "+57 301 234 5678",
    horario: "Lunes a Viernes 8:00 - 17:00",
    insumos: ["alimentos", "medicamentos", "ropa"],
    activo: true,
  },
  {
    id: "acopio-lima-1",
    nombre: "Acopio Hermanos Venezolanos",
    organizacion: "Unión Venezolana en Perú",
    direccion: "Av. Arequipa 3456",
    ciudad: "Lima",
    pais: "PE",
    email: "acopio@vzlaperu.org",
    horario: "Lunes a Viernes 9:00 - 17:00",
    insumos: ["alimentos", "higiene"],
    activo: true,
  },
];
```

- [ ] **Step 4: Create data/social.ts**

```typescript
export interface RedSocial {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  plataforma: "instagram" | "twitter" | "facebook" | "tiktok" | "youtube";
  url: string;
  handle: string;
  activo: boolean;
}

export const redesSociales: RedSocial[] = [
  {
    id: "foro-penal-ig",
    nombre: "Foro Penal",
    descripcion: {
      es: "Actualizaciones sobre presos políticos y derechos humanos en Venezuela.",
      en: "Updates on political prisoners and human rights in Venezuela.",
    },
    plataforma: "instagram",
    url: "https://instagram.com/foropenal",
    handle: "@foropenal",
    activo: true,
  },
  {
    id: "provea-tw",
    nombre: "PROVEA",
    descripcion: {
      es: "Reportes de derechos humanos y documentación de la crisis venezolana.",
      en: "Human rights reports and documentation of the Venezuelan crisis.",
    },
    plataforma: "twitter",
    url: "https://x.com/Aborea",
    handle: "@provea",
    activo: true,
  },
  {
    id: "alimenta-ig",
    nombre: "Alimenta la Solidaridad",
    descripcion: {
      es: "Comedores comunitarios y nutrición infantil en Venezuela.",
      en: "Community kitchens and child nutrition in Venezuela.",
    },
    plataforma: "instagram",
    url: "https://instagram.com/alimentalasolidaridad",
    handle: "@alimentalasolidaridad",
    activo: true,
  },
];
```

- [ ] **Step 5: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add data/
git commit -m "feat: add data files with TypeScript types and sample data"
```

---

## Task 5: Create Shared Utility and UI Components

**Files:**
- Create: `lib/utils.ts`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Badge.tsx`

- [ ] **Step 1: Create lib/utils.ts**

```typescript
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const countryNames: Record<string, { es: string; en: string }> = {
  CL: { es: "Chile", en: "Chile" },
  ES: { es: "España", en: "Spain" },
  US: { es: "Estados Unidos", en: "United States" },
  CO: { es: "Colombia", en: "Colombia" },
  PE: { es: "Perú", en: "Peru" },
  MX: { es: "México", en: "Mexico" },
  AR: { es: "Argentina", en: "Argentina" },
  EC: { es: "Ecuador", en: "Ecuador" },
  BR: { es: "Brasil", en: "Brazil" },
  PA: { es: "Panamá", en: "Panama" },
  VE: { es: "Venezuela", en: "Venezuela" },
  INT: { es: "Internacional", en: "International" },
};
```

- [ ] **Step 2: Create components/ui/Button.tsx**

```typescript
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-venezuela-red text-white hover:bg-red-700 focus:ring-venezuela-red",
    secondary:
      "bg-venezuela-blue text-white hover:bg-blue-900 focus:ring-venezuela-blue",
    outline:
      "border-2 border-venezuela-blue text-venezuela-blue hover:bg-venezuela-blue hover:text-white focus:ring-venezuela-blue",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Create components/ui/Card.tsx**

```typescript
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  flagStripe?: boolean;
}

export function Card({ children, className, flagStripe = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow",
        className
      )}
    >
      {flagStripe && (
        <div className="flex h-[3px]">
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-venezuela-blue" />
          <div className="flex-1 bg-venezuela-red" />
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
```

- [ ] **Step 4: Create components/ui/Badge.tsx**

```typescript
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "blue" | "red";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add lib/ components/
git commit -m "feat: add shared utils and UI components (Button, Card, Badge)"
```

---

## Task 6: Build Navbar and Language Switcher

**Files:**
- Create: `components/LanguageSwitcher.tsx`
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/LanguageSwitcher.tsx**

```typescript
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1 bg-white/80 rounded-full px-1 py-0.5 border border-gray-200">
      <button
        onClick={() => switchLocale("es")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          locale === "es"
            ? "bg-venezuela-blue text-white"
            : "text-gray-600 hover:text-venezuela-blue"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          locale === "en"
            ? "bg-venezuela-blue text-white"
            : "text-gray-600 hover:text-venezuela-blue"
        }`}
      >
        EN
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create components/Navbar.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState } from "react";

export function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { key: "desaparecidos", href: "#desaparecidos" },
    { key: "donaciones", href: "#donaciones" },
    { key: "acopio", href: "#acopio" },
    { key: "contacto", href: "#contacto" },
    { key: "redes", href: "#redes" },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-display text-xl text-venezuela-blue">
            Venezuela Ayuda
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-venezuela-blue transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-600 hover:text-venezuela-blue"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-2 text-sm font-medium text-gray-600 hover:text-venezuela-blue transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx components/LanguageSwitcher.tsx
git commit -m "feat: add Navbar with mobile menu and language switcher"
```

---

## Task 7: Build Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create components/Hero.tsx**

```typescript
import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-venezuela-blue/5 via-transparent to-venezuela-red/5" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-display text-venezuela-blue leading-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="#desaparecidos" variant="primary" size="lg">
            {t("cta_desaparecidos")}
          </Button>
          <Button href="#donaciones" variant="secondary" size="lg">
            {t("cta_donar")}
          </Button>
          <Button href="#acopio" variant="outline" size="lg">
            {t("cta_acopio")}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with CTAs"
```

---

## Task 8: Build Desaparecidos Section

**Files:**
- Create: `components/DesaparecidosSection.tsx`

- [ ] **Step 1: Create components/DesaparecidosSection.tsx**

```typescript
import { useTranslations, useLocale } from "next-intl";
import { plataformasDesaparecidos } from "@/data/desaparecidos";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export function DesaparecidosSection() {
  const t = useTranslations("desaparecidos");
  const locale = useLocale() as "es" | "en";

  const activePlatforms = plataformasDesaparecidos.filter((p) => p.activo);

  return (
    <section id="desaparecidos" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-amber-800 text-sm font-medium">⚠️ {t("warning")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activePlatforms.map((platform) => (
            <Card key={platform.id}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-venezuela-dark">
                    {platform.nombre}
                  </h3>
                  <Badge variant="blue">
                    {t(`types.${platform.tipo}`)}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {platform.descripcion[locale]}
                </p>
                <Button href={platform.url} external variant="outline" size="sm">
                  {t("visit")} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/DesaparecidosSection.tsx
git commit -m "feat: add Desaparecidos section with platform cards"
```

---

## Task 9: Build Donaciones Section

**Files:**
- Create: `components/DonacionesSection.tsx`

- [ ] **Step 1: Create components/DonacionesSection.tsx**

```typescript
import { useTranslations, useLocale } from "next-intl";
import { organizacionesDonacion } from "@/data/donaciones";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export function DonacionesSection() {
  const t = useTranslations("donaciones");
  const locale = useLocale() as "es" | "en";

  const verified = organizacionesDonacion.filter((o) => o.verificada);

  return (
    <section id="donaciones" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {verified.map((org) => (
            <Card key={org.id}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-venezuela-dark">
                    {org.nombre}
                  </h3>
                  <Badge variant="green">{t("verified")} ✓</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {org.descripcion[locale]}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {org.metodoPago.map((method) => (
                    <Badge key={method}>
                      {t(`payment_methods.${method}`)}
                    </Badge>
                  ))}
                </div>
                <Button href={org.url} external variant="primary" size="sm">
                  {t("donate")} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/DonacionesSection.tsx
git commit -m "feat: add Donaciones section with verified org cards"
```

---

## Task 10: Build Acopio Section with Country Filter

**Files:**
- Create: `components/AcopioSection.tsx`

- [ ] **Step 1: Create components/AcopioSection.tsx**

```typescript
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { centrosAcopio } from "@/data/acopio";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { countryNames } from "@/lib/utils";

export function AcopioSection() {
  const t = useTranslations("acopio");
  const locale = useLocale() as "es" | "en";
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  const activeCenters = centrosAcopio.filter((c) => c.activo);

  const availableCountries = [
    ...new Set(activeCenters.map((c) => c.pais)),
  ].sort();

  useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        if (data.country && availableCountries.includes(data.country)) {
          setSelectedCountry(data.country);
          setDetectedCountry(data.country);
        }
      })
      .catch(() => {});
  }, []);

  const filtered =
    selectedCountry === "ALL"
      ? activeCenters
      : activeCenters.filter((c) => c.pais === selectedCountry);

  return (
    <section id="acopio" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <label
            htmlFor="country-filter"
            className="text-sm font-medium text-gray-700"
          >
            {t("filter_country")}:
          </label>
          <select
            id="country-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-venezuela-blue"
          >
            <option value="ALL">{t("all_countries")}</option>
            {availableCountries.map((code) => (
              <option key={code} value={code}>
                {countryNames[code]?.[locale] ?? code}
              </option>
            ))}
          </select>
        </div>

        {detectedCountry && selectedCountry === detectedCountry && (
          <p className="text-center text-sm text-venezuela-blue mb-6">
            📍{" "}
            {t("detected_country", {
              country: countryNames[detectedCountry]?.[locale] ?? detectedCountry,
            })}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">{t("no_centers")}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((center) => (
              <Card key={center.id}>
                <h3 className="font-display text-xl text-venezuela-dark mb-1">
                  {center.nombre}
                </h3>
                <p className="text-sm text-venezuela-blue font-medium mb-3">
                  {center.organizacion}
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>📍 {center.direccion}, {center.ciudad}</p>
                  {center.horario && (
                    <p>🕐 {t("schedule")}: {center.horario}</p>
                  )}
                  {center.telefono && (
                    <p>📞 {t("phone")}: {center.telefono}</p>
                  )}
                  {center.email && (
                    <p>
                      ✉️ {t("email")}:{" "}
                      <a
                        href={`mailto:${center.email}`}
                        className="text-venezuela-blue hover:underline"
                      >
                        {center.email}
                      </a>
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-gray-500 mr-1">
                    {t("accepts")}:
                  </span>
                  {center.insumos.map((insumo) => (
                    <Badge key={insumo} variant="blue">
                      {t(`supplies.${insumo}`)}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/AcopioSection.tsx
git commit -m "feat: add Acopio section with country filter and geo detection"
```

---

## Task 11: Build Contact Section

**Files:**
- Create: `components/ContactSection.tsx`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create app/api/contact/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // For MVP: log the submission. In production, integrate with
    // an email service (Resend, SendGrid) or store in a sheet.
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create components/ContactSection.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "./ui/Button";

export function ContactSection() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600">{t("description")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("name")}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder={t("placeholder_name")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-venezuela-blue focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("email")}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder={t("placeholder_email")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-venezuela-blue focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("message")}
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder={t("placeholder_message")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-venezuela-blue focus:border-transparent text-sm resize-none"
            />
          </div>

          {status === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">{t("success")}</p>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{t("error")}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : t("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ContactSection.tsx app/api/contact/route.ts
git commit -m "feat: add contact form section with API route"
```

---

## Task 12: Build Social Media Section

**Files:**
- Create: `components/SocialSection.tsx`

- [ ] **Step 1: Create components/SocialSection.tsx**

```typescript
import { useTranslations, useLocale } from "next-intl";
import { redesSociales } from "@/data/social";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

const platformIcons: Record<string, string> = {
  instagram: "📷",
  twitter: "🐦",
  facebook: "📘",
  tiktok: "🎵",
  youtube: "🎬",
};

export function SocialSection() {
  const t = useTranslations("social");
  const locale = useLocale() as "es" | "en";

  const active = redesSociales.filter((r) => r.activo);

  return (
    <section id="redes" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {active.map((account) => (
            <Card key={account.id} flagStripe={false}>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">
                    {platformIcons[account.plataforma]}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-venezuela-dark">
                      {account.nombre}
                    </h3>
                    <p className="text-xs text-gray-500">{account.handle}</p>
                  </div>
                  <Badge className="ml-auto">
                    {t(`platforms.${account.plataforma}`)}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {account.descripcion[locale]}
                </p>
                <Button
                  href={account.url}
                  external
                  variant="outline"
                  size="sm"
                >
                  {t("follow")} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SocialSection.tsx
git commit -m "feat: add social media section with foundation accounts"
```

---

## Task 13: Build Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```typescript
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-venezuela-blue text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-xl mb-2">Venezuela Ayuda</p>
            <p className="text-blue-200 text-sm">
              {t("made_with")}
            </p>
          </div>

          <div className="text-center md:text-right text-sm text-blue-200 space-y-1">
            <p>{t("updated", { date: "Junio 2026" })}</p>
            <a
              href="#contacto"
              className="hover:text-white transition-colors underline"
            >
              {t("suggest")}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-700">
          <p className="text-center text-xs text-blue-300">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with credits and disclaimer"
```

---

## Task 14: Build Geo API Route

**Files:**
- Create: `app/api/geo/route.ts`

- [ ] **Step 1: Create app/api/geo/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { countryNames } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ?? "UNKNOWN";

  const countryName =
    countryNames[country]?.en ?? country;

  return NextResponse.json({ country, countryName });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/geo/route.ts
git commit -m "feat: add geo detection API route using Vercel headers"
```

---

## Task 15: Assemble Main Page

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Update app/[locale]/page.tsx to assemble all sections**

Replace the entire contents:

```typescript
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DesaparecidosSection } from "@/components/DesaparecidosSection";
import { DonacionesSection } from "@/components/DonacionesSection";
import { AcopioSection } from "@/components/AcopioSection";
import { ContactSection } from "@/components/ContactSection";
import { SocialSection } from "@/components/SocialSection";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "es" ? "es_VE" : "en_US",
    },
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DesaparecidosSection />
        <DonacionesSection />
        <AcopioSection />
        <ContactSection />
        <SocialSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Clean up app/layout.tsx**

Ensure `app/layout.tsx` is the minimal root shell (no duplicate `<html>` or `<body>` — those are in `app/[locale]/layout.tsx`):

```typescript
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 3: Delete leftover default files from create-next-app**

Delete these if they exist:
- `app/page.tsx` (we use `app/[locale]/page.tsx` instead)
- `app/favicon.ico` can stay
- `public/next.svg`, `public/vercel.svg` — delete

- [ ] **Step 4: Verify the dev server builds and renders**

```bash
npm run dev
```

Visit `http://localhost:3000` — should redirect to `/es` and show the full landing page with all sections. Visit `/en` — should show English version. Verify:
- Navbar links scroll to sections
- Language switcher works
- All cards render with data
- Contact form shows fields
- Mobile menu opens/closes

- [ ] **Step 5: Run the production build**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: assemble main landing page with all sections"
```

---

## Task 16: Create .env.example and Update README

**Files:**
- Create: `.env.example`
- Modify: `README.md`

- [ ] **Step 1: Create .env.example**

```bash
# No required env vars for MVP.
# Vercel geolocation headers are automatic on Vercel deploys.
#
# Future:
# RESEND_API_KEY=re_xxxxx    # For contact form email delivery
# PLAUSIBLE_DOMAIN=venezuelaayuda.org
```

- [ ] **Step 2: Update README.md**

```markdown
# Venezuela Ayuda 🇻🇪

Plataforma informativa que centraliza información de ayuda humanitaria para Venezuela: búsqueda de desaparecidos, donaciones verificadas y centros de acopio.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **i18n:** next-intl (Español / English)
- **Deploy:** Vercel

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Cómo agregar contenido

### Agregar un centro de acopio

1. Abre `data/acopio.ts`
2. Agrega un objeto siguiendo la interfaz `CentroAcopio`
3. Commit: `git commit -m "data: add centro de acopio [ciudad, país]"`
4. Push a main → Vercel despliega automáticamente

### Agregar una organización de donaciones

1. Abre `data/donaciones.ts`
2. Agrega un objeto siguiendo la interfaz `OrganizacionDonacion`
3. Asegúrate de que `verificada: true` solo si la organización está verificada

### Agregar una plataforma de desaparecidos

1. Abre `data/desaparecidos.ts`
2. Agrega un objeto siguiendo la interfaz `PlataformaDesaparecidos`

### Agregar una red social

1. Abre `data/social.ts`
2. Agrega un objeto siguiendo la interfaz `RedSocial`

## Estructura del proyecto

```
app/[locale]/    → Páginas con i18n
components/      → Componentes React
data/            → Datos estáticos (TypeScript)
messages/        → Traducciones ES/EN
i18n/            → Configuración de next-intl
```

## Convenciones

- **Branches:** `feat/nombre`, `fix/descripcion`, `data/actualizacion`
- **Commits:** inglés, prefijo: `feat:`, `fix:`, `data:`, `style:`, `docs:`
- **Código:** inglés
- **Contenido:** español primario, inglés en `messages/en.json`
```

- [ ] **Step 3: Commit**

```bash
git add .env.example README.md
git commit -m "docs: update README with setup instructions and content guide"
```

---

## Task 17: Create 404 Page

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create app/not-found.tsx**

```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="es">
      <body className="bg-[#F5F0E8] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#00247D] mb-4">404</h1>
          <p className="text-lg text-gray-700 mb-8">
            Página no encontrada / Page not found
          </p>
          <Link
            href="/es"
            className="inline-flex px-6 py-3 bg-[#CF142B] text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Ir al inicio / Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add 404 page"
```

---

## Task 18: Final Build Verification

- [ ] **Step 1: Run type check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run linter**

```bash
npm run lint
```

Expected: No errors (or only non-critical warnings).

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Test the production build locally**

```bash
npm start
```

Visit `http://localhost:3000` and verify:
- `/es` loads with all sections in Spanish
- `/en` loads with all sections in English
- Language switcher toggles between locales
- Navbar links scroll to correct sections
- Mobile hamburger menu works
- Contact form submits (check server console for log)
- All external links open in new tabs
- Responsive layout works at mobile, tablet, desktop widths

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: final adjustments from build verification"
```
