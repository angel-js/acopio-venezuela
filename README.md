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
