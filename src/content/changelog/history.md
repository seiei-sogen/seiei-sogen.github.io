---
title: 'Changelog'
---

# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [2.9.1] - 2026-04-21 (Mobile Reveal Fix)

### Corregido

- **Contenido Invisible en Móvil**: Todo el contenido de las páginas quedaba en `opacity: 0` en navegadores móviles porque `<main>` tenía la clase `.reveal`, lo que significaba que el wrapper principal de cada página arrancaba oculto y dependía del Intersection Observer para hacerse visible. Eliminada la clase `.reveal` del `<main>` en `BaseLayout.astro` — las animaciones reveal a nivel de sección no se ven afectadas
- **Race Condition en Reveal**: `initReveal()` ahora verifica si un elemento `.reveal` ya está en el viewport al inicializarse y aplica la clase `active` inmediatamente, en lugar de depender únicamente del Intersection Observer diferido. Evita que el contenido quede invisible cuando el observer se inicializa después de que los elementos ya son visibles

---

## [2.9.0] - 2026-04-20 (Customer Feedback & Polish)

### Añadido

- **Logo Configurable en Header**: Nueva sección `header` en `site-config.ts` con soporte para `logoType: 'text' | 'svg' | 'image'`, permitiendo usar un logo SVG o imagen en lugar del nombre de texto
- **Logo Configurable en Footer**: Nueva sección `footer` en `site-config.ts` con soporte para `logoType: 'text' | 'svg' | 'image'`, `logoSvg`, `logoImage`, `logoAlt` y `text`. El componente `Footer.astro` ahora renderiza condicionalmente SVG, imagen o texto según la configuración, en paridad total con el header
- **Toggle de Patrón de Fondo**: Nueva opción `ui.showBackgroundPattern` en `site-config.ts` para activar/desactivar el patrón de puntos (dot grid) del fondo. Establecer en `false` para un fondo blanco limpio
- **Toggle de Orbes (Aurora)**: Nueva opción `ui.showBackgroundOrbs` en `site-config.ts` para activar/desactivar los orbes de color del fondo. Combinar con `showBackgroundPattern: false` para un fondo completamente limpio y blanco
- **Control de Tema (Dark/Light)**: Nueva sección `theme` en `site-config.ts` con `allowToggle` (boolean) y `defaultMode` ('light' | 'dark'). Permite bloquear el tema y forzar un modo específico, ignorando las preferencias del navegador del usuario

### Corregido

- **Visibilidad del Autor en Testimonios**: Eliminadas las clases CSS `translate-y-4 opacity-0` que ocultaban el footer de testimonios. El autor, rol y empresa ahora son visibles inmediatamente sin depender de animaciones externas
- **Refactor enableDarkMode**: Reemplazada la opción `ui.enableDarkMode` por la nueva sección `theme` con controles más granulares (`allowToggle` y `defaultMode`)
- **i18n Completa — Cobertura Total del Sitio**: El sistema de traducción ahora cubre el 100% de los strings de UI visibles. Se corrigieron más de 80 strings hardcodeados en español distribuidos en 30+ archivos. Componentes actualizados: `Hero`, `ContactForm`, `FAQ`, `Newsletter`, `NewsletterWide`, `ContactCTA`, `Stack`, `Experience`, `Expertise`, `RecentProjects`, `Testimonials`, `ServiceSidebar`, `PostAuthor`, `PostCard`, `ServiceCard`, `ServiceCardSmall`, `ThemePicker`, `ContentPagination`, `Header`, `Footer`. Páginas: `404`, `500`, `contact`, `services/index`, `services/[slug]`, `blog/index`, `blog/page/[page]`, `projects/index`, `projects/page/[page]`, `projects/[slug]`, `blog/[slug]`. Los `navigation` y `legal` en `site-config.ts` ahora usan claves i18n. Fechas localizadas con `siteConfig.site.locale` en lugar de `'es-ES'` hardcodeado. Strings de scripts inline (enviando formulario, tema copiado) pasan por `data-*` attributes. Más de 100 claves nuevas añadidas a `src/i18n.ts` para ES/EN/PL

### Cambiado

- **Comentarios Internacionalizados**: Todos los comentarios en `site-config.ts` traducidos del español al inglés para mejor accesibilidad a clientes globales
- **Documentación Mejorada**: Agregada nota de prerrequisito sobre instalar `pnpm` antes de ejecutar comandos en el portal de documentación
- **Soporte i18n Polaco**: Agregadas traducciones al polaco (pl) en `src/i18n.ts`. El idioma se determina automáticamente por la configuración `site.lang`, soportando español, inglés y polaco
- **Documentación Bilingüe**: El portal de documentación (`_docs/`) ahora soporta español e inglés con un selector de idioma en `index.html` y `guide.html`. La preferencia de idioma se guarda en localStorage

---

## [2.8.1] - 2026-04-11 (PostAuthor Avatar Fallback)

### Corregido

- **Fallback de Avatar en PostAuthor**: Añadido handler `onerror` para mostrar las iniciales cuando la imagen del avatar no existe o falla al cargar (404)

---

## [2.8.0] - 2026-04-11 (Full Config Activation & A11y Hardening)

### Añadido

- **Content Pagination (Modo Página)**: `ContentPagination` ahora soporta navegación numérica además de anterior/siguiente, con `aria-current="page"` para accesibilidad
- **Rutas Paginadas**: `/projects/page/[page]` y `/blog/page/[page]` generadas vía `getStaticPaths`
- **Optimización GEO**: `public/llms.txt` para descubrimiento por motores de búsqueda con IA
- **Base i18n**: `src/i18n.ts` con diccionarios ES/EN y función helper `t()`
- **Configuración de Entorno**: `.env.example` con variables documentadas para formularios y analytics
- **Generador de Iconos PWA**: `scripts/generate-pwa-icons.mjs` para producir PNGs desde favicon SVG
- **CHANGELOG.md en raíz**: Formato Keep-a-Changelog para visibilidad en GitHub

### Cambiado

- **Activación de `profile.bio`**: Ahora se renderiza como párrafo descriptivo del Hero en lugar de texto hardcodeado
- **Activación de `content.projectsPerPage`**: Controla el slicing y paginación en `/projects`
- **Activación de `content.postsPerPage`**: Controla el slicing y paginación en `/blog`
- **Activación de `ui.enableViewTransitions`**: `<ClientRouter />` ahora se renderiza condicionalmente
- **Activación de `ui.enableDarkMode`**: El botón de tema se oculta completamente cuando es `false`
- **ContactForm con Backend Real**: Envío vía `fetch()` a Formspree/Cloudflare Forms, con honeypot anti-spam, overlay de error e indicación de configuración
- **Validación de Newsletter**: Verificación de formato email con feedback visual de error (anillo rojo)
- **Alt Text de Hero**: Ahora descriptivo — incluye nombre, rol y contexto para SEO/A11y

### Corregido

- **robots.txt duplicado**: Eliminado `public/robots.txt` estático, manteniendo solo la ruta API dinámica
- **Zod Alpha**: Migrado de `4.0.0-alpha.1` a `3.24.2` estable con API de schemas actualizada
- **`substr()` obsoleto**: Reemplazado por `substring()` en componentes Input y Textarea
- **Hints de JSON-LD**: Añadido `is:inline` explícito para silenciar warnings de Astro
- **A11y de Header Socials**: Añadido `<span class="sr-only">` para coincidir con patrón del Footer
- **Tipado en `Button.astro`**: Reemplazado `[x: string]: any` por `[x: string]: unknown`
- **Documentación de `debug-mock.js`**: Añadido JSDoc explicando su propósito y cómo reemplazarlo

### Seguridad

- **`security.txt` actualizado**: URLs canónicas corregidas, expiración extendida a 2027-12-31

---

## [2.7.0] - 2026-04-07 (Security & SEO Infrastructure)

### Añadido

- **Cloudflare Security Headers**: Implementación de archivo `_headers` nativo para Cloudflare Pages, incluyendo HSTS, CSP (Content Security Policy), X-Frame-Options y Permissions-Policy.
- **Security Standards (Security.txt)**: Incorporación de `security.txt` en `.well-known/` para seguir los estándares de reporte de vulnerabilidades.
- **Robustez de Metadatos**: Estandarización de placeholders sociales en `site-config.ts` para una personalización más intuitiva y profesional por parte del usuario final.

### Mejorado

- **SEO Core Hardening**: Actualización de `robots.txt` con referencias de sitemap generalizadas y optimización de meta-tags en el componente SEO para evitar duplicidades de símbolos.

## [2.6.0] - 2026-04-04 (Minimalist Master Update)

### Añadido

- **Rediseño de Contacto v2**: Transformación total de la página de contacto a un esquema de columna única ultra-limpio.
- **Minimalismo Extremo**: Eliminación de "ruido visual" (bordes de contenedores, sombras pesadas y fondos secundarios) para una experiencia más "página en blanco" profesional.
- **Enlaces de Texto Puros**: Sustitución de cajas de iconos por una fila de enlaces rápidos (Email · LinkedIn · Calendario) con micro-interacciones sutiles.

### Mejorado

- **Arquitectura de Botones**: Nueva variante `secondary` incorporada al componente `Button.astro` para mayor flexibilidad en llamadas a la acción.
- **Build Core Integrity**: Resolución de errores críticos de TypeScript relacionados con `exactOptionalPropertyTypes` en `ContentHeader` y `BaseLayout`.

## [2.5.0] - 2026-04-04 (Services Experience Update)

### Añadido

- **Página de Índice de Servicios**: Creación de la ruta `/services` (index.astro) para centralizar la oferta de valor y mejorar el SEO jerárquico.
- **Componente ServiceCard**: Extracción de la lógica visual de especialidades a un componente independiente y reutilizable con animaciones premium.

### Mejorado

- **Estructura de Navegación**: Migración del enlace "Servicios" de un ancla interna (`/#services`) a una página real (`/services`) para un flujo de usuario más robusto.
- **Conversión de Negocio**: Nueva sección de CTA (Call to Action) estratégica al final del listado de servicios.

## [2.4.0] - 2026-04-04 (Architecture & Modularity Update)

### Añadido

- **ContentHeader Maestro**: Sistema unificado de cabeceras para Blog, Proyectos y Servicios. Controla títulos, descripciones y navegación "back-to" desde un solo átomo visual.
- **FAQ & Testimonial Atoms**: Fragmentación de secciones complejas en `FAQItem` y `TestimonialItem` para una edición 100% modular y limpia.
- **Reading Progress Pro**: Componente dedicado para la barra de progreso de lectura superior con lógica de scroll optimizada.

### Mejorado

- **Cero Código Hardcodeado**: Eliminación de los últimos vestigios de UI inline en páginas de detalle, moviendo todo a widgets reutilizables (`ServiceSidebar`, `PostAuthor`, etc.).
- **Unificación de Navegación**: Componente `ContentPagination` que centraliza los botones "Siguiente/Anterior" para todo el contenido dinámico del sitio.
- **Optimización de Iconos**: Sustitución de SVGs en línea por el motor de `astro-icon` en Testimonios y Navegación para una personalización más ágil.

## [2.3.0] - 2026-04-04 (Structural Rebirth)

### Añadido

- **Organización Enterprise**: Nueva estructura de carpetas: `/ui` (primitivas), `/cards` (datos), `/sections` (bloques) y `/navigation` (estructura global).
- **Extraídos**: Componentes `PostCard`, `Footer` y `ExperienceItem` para desvincular la lógica de layout de las páginas.

## [2.2.0] - 2026-04-04 (Elite Experience Update)

### Añadido

- **Custom Cursor Pro**: Nuevo sistema de puntero inteligente que reacciona a elementos interactivos con estados de expansión y halo. Desactivable desde `site-config.ts`.
- **Magnetic Buttons**: Implementado efecto de atracción magnética para botones principales, mejorando enormemente la sensación táctil y premium del sitio.
- **Project SEO (Deep Schema)**: Integración de esquemas `Schema.org/CreativeWork` específicos para cada proyecto, permitiendo a los buscadores entender cada trabajo como una entidad única.

### Mejorado

- **Retina Optimization**: Implementada la generación automática de imágenes a doble densidad (`densities={[1, 2]}`) en tarjetas de proyectos y hero para una nitidez absoluta en pantallas de alta gama.
- **Form UX Polish**: Rediseño de los campos `Input` y `Textarea` con sombras internas, estados de foco con anillos suaves y una base de color secundaria para mayor profundidad.
- **Performance LCP**: Forzada la carga temprana (`loading="eager"`) de la imagen principal del Hero para mejorar las métricas de Core Web Vitals.

## [2.1.0] - 2026-04-04 (Core Polish Update)

### Añadido

- **Advanced SEO Engine**: Inyección automática de esquemas `JSON-LD` (`FAQPage` y `Service`) en las páginas correspondientes para mejorar la visibilidad en buscadores.
- **Reveal Animations**: Sistema ligero basado en `Intersection Observer` que permite que las secciones aparezcan con un suave fundido al hacer scroll.
- **Public Assets**: Incorporación de un archivo `robots.txt` optimizado y configurado por defecto.

### Mejorado

- **Web Accessibility (WCAG)**: Refuerzo integral de etiquetas ARIA y gestión de foco en los componentes `ThemePicker` (soporte para tecla _Escape_) y `Header` (menú móvil accesible).
- **Privacy & Perf (Fontsource)**: Migración de fuentes externas (Google Fonts) a fuentes locales servidas por el proyecto para mayor velocidad y cumplimiento de normativas de privacidad.
- **Glassmorphism 2.0**: Refinamiento estético de las capas de cristal y bordes HSL con sombras sutiles para una sensación más premium.

### Corregido

- **Pnpm Protocol**: Migración forzada de comandos de construcción de `npm` a `pnpm` para garantizar la consistencia en el despliegue a Cloudflare.

## [2.0.0] - 2026-03-31 (Enterprise Protocol Update)

### Añadido

- **Documentation Hub**: Nuevo portal de documentación (`_docs/index.html`) que centraliza _The Guide_ y _The Setup Bible_ en una interfaz unificada.
- **Visual Pedagogy**: Inyección completa e interactiva de capturas de pantalla de la UI dentro del manual de usuario para acelerar la comprensión del código (`guide.html`).
- **Dynamic Projects Layout**: Soporte oficial escalado de imágenes en componentes Astro `absolute inset-0 w-full h-full` para las tarjetas de proyectos y el detalle profundo, garantizando que abarcan el 100% de la caja `16:9` sin letterboxing residual.
- **Enterprise Licensing**: Menciones oficiales a la factoría "Zutra.agency" en el ecosistema base, incluyendo `package.json` y el footer del Layout principal, cerrando el estado comercial.

### Corregido

- **View Transitions Engine**: Estabilización estricta del pase de atributos `transition:name` emparejando los contenedores de origen (`Card`) con los de destino (`Slug`), garantizando una animación 3D de expansión hiper-fluida.
- **JSX Compilation Syntax**: Purga de errores de parseo (JSX inline comments) en el árbol virtual de etiquetas de `ProjectCard` y `[slug].astro`.

## [1.2.0] - 2026-03-31 (Adaptive Pro Update)

### Añadido

- **ThemePicker Pro**: Selector de colores flotante con +12 paletas premium calibradas a mano.
- **Adaptive Color System**: Soporte nativo para colores de marca duales (Light/Dark) que garantiza contraste perfecto en cualquier modo.
- **Developer Tools**: Nuevos botones en el ThemePicker para `Reset` (volver a la configuración original) y `Copy` (copiar el objeto HSL directamente al portapapeles).
- **Centralized Brand Config**: La propiedad `brandColor` en `site-config.ts` ahora soporta definiciones separadas para luz y oscuridad.

### Mejorado

- **Contraste WCAG**: Refinamiento global de la paleta de colores para cumplir con estándares de accesibilidad AA en ambos temas.
- **UX de Personalización**: Script de inyección mejorado para evitar cualquier parpadeo de color (FOUC) al usar temas personalizados.
- **Documentación Pro**: Guía de configuración actualizada con instrucciones para el nuevo sistema de colores.

### Corregido

- **TypeScript Strictness**: Corregidos múltiples errores de tipado en componentes de UI y scripts de persistencia.
- **Estructura CSS**: Limpieza de reglas duplicadas y optimización de la jerarquía de variables en `global.css`.

---

### Añadido

- **Páginas Legales**: Incorporación de plantillas para `Privacidad` y `Términos de Servicio` con soporte MDX/Prose.
- **Sistema de Textura**: Nuevo patrón de puntos (Dot Grid) en el fondo para un acabado arquitectónico.
- **Social CTA**: El componente `ContactCTA` ahora incluye un botón dinámico para agendar llamadas (Cal.com).
- **Opciones de Color**: Añadidas paletas de colores Indigo, Esmeralda y Ámbar en los comentarios de `global.css`.

### Mejorado

- **Layout Global**: Unificado el ancho máximo de los contenedores a `max-w-6xl` (72rem) para una estética más "Widescreen" y premium.
- **Hero Section**: Rediseño completo a 2 columnas con imagen de perfil estilizada, filtros de contraste dinámicos y hover effects.
- **Background Aurora**: Lógica de blend-modes mejorada (`multiply` en claro / `screen` en oscuro) para legibilidad perfecta.
- **Accesibilidad**: Corrección crítica de contrastes en modo claro (WCAG AA) eliminando el forzado de `prose-invert`.
- **Responsive**: Mejorada la alineación y el espaciado en dispositivos móviles en todas las secciones principales.

### Corregido

- **Imágenes Astro**: Eliminadas las barras negras (letterboxing) en imágenes transparentes al optimizar las dimensiones del componente `<Image />`.
- **Contraste**: Corregida la visibilidad de textos secundarios que se perdían en el fondo claro.

---

## [1.0.0] - 2026-03-15

### Añadido

- Lanzamiento inicial de la plantilla Portfolio Minimalista.
- Integración nativa de Astro 6 + Tailwind CSS.
- soporte para Colecciones de Contenido (Proyectos, Blog, Servicios).
- Adaptador de Cloudflare Pages incluido.
