/**
 * i18n — Centralized UI string translations.
 *
 * This file enables the template to support multiple languages without
 * hardcoding text in components. Add new languages by extending the
 * `translations` object and setting `site.lang` in site-config.ts.
 *
 * Usage in components:
 *   import { t } from '@/i18n';
 *   t('nav.home')       → "Inicio" / "Home" / "Strona główna"
 *   t('contact.send')   → "Enviar Mensaje" / "Send Message" / "Wyślij wiadomość"
 */

import { siteConfig } from './site-config';

export type TranslationKey = keyof typeof translations.es;
export type SupportedLocale = 'es' | 'en' | 'pl';

export function t(key: TranslationKey): string {
  // Reads language from site-config.ts (site.lang)
  const currentLocale = siteConfig.site.lang as SupportedLocale;
  return translations[currentLocale]?.[key] || translations.en[key] || key;
}

export const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.services': 'Servicios',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.menu_open': 'Abrir menú',
    'nav.menu_close': 'Cerrar menú',
    'nav.mobile_menu': 'Menú de navegación',

    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.title': 'Diseño y Programo',
    'hero.title_highlight': 'Productos Minimalistas',
    'hero.image_alt': 'trabajando en su escritorio',
    'hero.cta.projects': 'Ver Proyectos',
    'hero.cta.contact': 'Escríbeme',

    // CTA Section
    'cta.title': '¿Tienes un proyecto en mente?',
    'cta.description': 'Hablemos sobre cómo podemos convertir tu idea en un producto digital elegante, rápido y funcional.',
    'cta.start': 'Comenzar Proyecto',
    'cta.schedule': 'Agendar Llamada',

    // Stack Section
    'stack.title': 'Stack de Tecnologías',
    'stack.subtitle': 'Herramientas que utilizo para dar vida a los proyectos.',

    // Experience Section
    'experience.title': 'Trayectoria',
    'experience.subtitle': 'Mi camino construyendo productos digitales.',
    'experience.present': 'actualidad',
    'experience.item1_desc': 'Liderazgo técnico en proyectos basados en Astro y optimización de rendimiento en Cloudflare.',
    'experience.item2_desc': 'Desarrollo de sistemas de diseño y componentes reactivos para plataformas SaaS.',
    'experience.item3_desc': 'Creación de identidades visuales y desarrollo de sitios web para startups emergentes.',

    // Expertise Section
    'expertise.title': 'Especialidades',
    'expertise.subtitle': 'Enfoque integral para construir productos digitales que destacan por su simplicidad y potencia.',

    // Recent Projects Section
    'projects.recent_title': 'Proyectos Recientes',
    'projects.recent_subtitle': 'Una selección de lo último en lo que he participado.',
    'projects.working_on_it': 'Trabajando en algo increíble...',

    // Projects index page
    'projects.title_main': 'Proyectos',
    'projects.title_highlight': '& Trabajos',
    'projects.description': 'Una colección de experimentos, interfaces y aplicaciones construidas con un enfoque en la simplicidad y el rendimiento.',
    'projects.no_page': 'No hay proyectos en esta página...',

    // Project detail page
    'projects.launch': 'Lanzamiento',
    'projects.technologies': 'Tecnologías',
    'projects.links': 'Enlaces',
    'projects.cta_title': '¿Listo para llevar tu idea al siguiente nivel?',
    'projects.cta_desc': 'Hablemos sobre cómo podemos construir algo increíble juntos.',
    'projects.cta_btn': 'Iniciar Proyecto',

    // Testimonials
    'testimonials.prev': 'Testimonio anterior',
    'testimonials.next': 'Siguiente testimonio',
    'testimonials.goto': 'Ir al testimonio',

    // Newsletter Wide
    'newsletter_wide.title': '¿Te resultó útil este contenido?',
    'newsletter_wide.description': 'Escribo sobre diseño minimalista y desarrollo moderno. Únete a otros desarrolladores para no perderte las novedades.',
    'newsletter_wide.cta': 'Hablemos del Proyecto',

    // Service Sidebar
    'sidebar.title': 'Solicitar esta especialidad',
    'sidebar.description': '¿Tienes un proyecto que encaja con esta especialidad? Hablemos sobre cómo puedo ayudarte a lograr tus objetivos.',
    'sidebar.cta': 'Iniciar Proyecto',
    'sidebar.guarantees_title': 'Certificación de Entrega',
    'sidebar.guarantee_1': 'Mejoras iterativas',
    'sidebar.guarantee_2': 'Soporte post-entrega',
    'sidebar.guarantee_3': 'Código limpio y Escalable',

    // Blog index page
    'blog.title_main': 'Bitácora de',
    'blog.title_highlight': 'Desarrollo',
    'blog.description': 'Reflexiones sobre tecnología, diseño y el proceso de construcción de productos digitales.',
    'blog.no_posts': 'Aún no hay publicaciones...',

    // Pagination
    'pagination.prev': 'Anterior',
    'pagination.next': 'Siguiente',
    'pagination.label': 'Paginación',
    'pagination.page': 'Página',
    'pagination.of': 'de',

    // Cards
    'card.post_label': 'Post',
    'card.read_article': 'Leer artículo completo',
    'card.service_details': 'Ver detalles del servicio',
    'card.service_details_short': 'Ver detalles',

    // Post reading time
    'post.reading_suffix': 'lectura',

    // Theme Picker
    'theme.selector_label': 'Selector de temas',
    'theme.open': 'Abrir selector de temas',
    'theme.close': 'Cerrar panel de temas',
    'theme.reset': 'Restablecer color inicial',
    'theme.copy': 'Copiar configuración de colores',
    'theme.copy_hint': 'Copiar configuración para site-config.ts',
    'theme.select_prefix': 'Seleccionar tema',
    'theme.default': 'Default',
    'theme.copied': '¡Copiado!',

    // Common back links
    'common.back_home': 'Volver al Inicio',
    'common.back_projects': 'Volver a Proyectos',
    'common.back_blog': 'Volver al Blog',
    'common.back_services': 'Volver a Servicios',
    'common.read_more': 'Leer más',
    'common.view_all': 'Ver todo',

    // Contact form
    'contact.title': '¿Tienes una idea?',
    'contact.description': 'Cuéntame sobre tu proyecto, desafíos o simplemente saluda. Estoy siempre abierto a nuevas colaboraciones y oportunidades creativas.',
    'contact.form.name': 'Nombre Completo',
    'contact.form.name_placeholder': 'Juan Pérez',
    'contact.form.subject': 'Asunto',
    'contact.form.subject_placeholder': '¿En qué puedo ayudarte?',
    'contact.form.message': 'Mensaje',
    'contact.form.message_placeholder': 'Cuéntame sobre tu proyecto...',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.sent': '¡Mensaje Recibido!',
    'contact.sent_desc': 'Gracias por contactar. Te responderé lo antes posible (normalmente en menos de 24 horas).',
    'contact.reset': 'Enviar otro mensaje',
    'contact.error': 'Error al Enviar',
    'contact.error_desc': 'Algo salió mal. Por favor, intenta de nuevo o escríbeme directamente a',
    'contact.retry': 'Intentar de nuevo',

    // Footer / Newsletter
    'footer.newsletter': 'Mantente al día',
    'footer.newsletter_desc': 'Recibe artículos sobre diseño, desarrollo y minimalismo directamente en tu bandeja de entrada.',
    'footer.newsletter_placeholder': 'tu@email.com',
    'footer.subscribe': 'Suscribirse',
    'footer.subscribed': '¡Gracias por suscribirte!',

    // Legal links
    'legal.privacy': 'Privacidad',
    'legal.terms': 'Términos',
    'legal.changelog': 'Changelog',

    // Services page
    'services.title': 'Mis Especialidades',
    'services.description': 'Soluciones digitales a medida, desde la conceptualización de la interfaz hasta el despliegue de sistemas complejos. Mi enfoque combina estética minimalista con ingeniería de alto rendimiento.',
    'services.other': 'Otras Especialidades',

    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Todo lo que necesitas saber antes de empezar a trabajar juntos.',

    // 404
    '404.title': 'Perdido en el minimalismo',
    '404.description': 'La página que buscas ha sido simplificada hasta desaparecer, o simplemente nunca existió.',
    '404.back': 'Volver al Inicio',
    '404.contact': 'Contactar Soporte',

    // 500
    '500.title': 'Sobrecarga en el servidor',
    '500.description': 'Algo inesperado ocurrió procesando tu solicitud. Por favor intenta de nuevo en unos momentos.',
    '500.back': 'Volver al Inicio',
    '500.report': 'Reportar Problema',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.menu_open': 'Open menu',
    'nav.menu_close': 'Close menu',
    'nav.mobile_menu': 'Navigation menu',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.title': 'Design and Build',
    'hero.title_highlight': 'Minimalist Products',
    'hero.image_alt': 'working at their desk',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Drop Me a Line',

    // CTA Section
    'cta.title': 'Got a project in mind?',
    'cta.description': "Let's talk about how we can turn your idea into an elegant, fast and functional digital product.",
    'cta.start': 'Start Project',
    'cta.schedule': 'Schedule a Call',

    // Stack Section
    'stack.title': 'Technology Stack',
    'stack.subtitle': 'Tools I use to bring projects to life.',

    // Experience Section
    'experience.title': 'Experience',
    'experience.subtitle': 'My journey building digital products.',
    'experience.present': 'present',
    'experience.item1_desc': 'Technical leadership on Astro-based projects and performance optimization on Cloudflare.',
    'experience.item2_desc': 'Building design systems and reactive components for SaaS platforms.',
    'experience.item3_desc': 'Creating visual identities and developing websites for emerging startups.',

    // Expertise Section
    'expertise.title': 'Specialties',
    'expertise.subtitle': 'Comprehensive approach to building digital products that stand out for their simplicity and power.',

    // Recent Projects Section
    'projects.recent_title': 'Recent Projects',
    'projects.recent_subtitle': 'A selection of my latest work.',
    'projects.working_on_it': 'Working on something incredible...',

    // Projects index page
    'projects.title_main': 'Projects',
    'projects.title_highlight': '& Work',
    'projects.description': 'A collection of experiments, interfaces and applications built with a focus on simplicity and performance.',
    'projects.no_page': 'No projects on this page...',

    // Project detail page
    'projects.launch': 'Launch',
    'projects.technologies': 'Technologies',
    'projects.links': 'Links',
    'projects.cta_title': 'Ready to take your idea to the next level?',
    'projects.cta_desc': "Let's talk about how we can build something incredible together.",
    'projects.cta_btn': 'Start Project',

    // Testimonials
    'testimonials.prev': 'Previous testimonial',
    'testimonials.next': 'Next testimonial',
    'testimonials.goto': 'Go to testimonial',

    // Newsletter Wide
    'newsletter_wide.title': 'Did you find this content useful?',
    'newsletter_wide.description': "I write about minimalist design and modern development. Join other developers so you don't miss the updates.",
    'newsletter_wide.cta': "Let's Talk About Your Project",

    // Service Sidebar
    'sidebar.title': 'Request this specialty',
    'sidebar.description': "Got a project that fits this specialty? Let's talk about how I can help you achieve your goals.",
    'sidebar.cta': 'Start Project',
    'sidebar.guarantees_title': 'Delivery Certification',
    'sidebar.guarantee_1': 'Iterative improvements',
    'sidebar.guarantee_2': 'Post-delivery support',
    'sidebar.guarantee_3': 'Clean and Scalable Code',

    // Blog index page
    'blog.title_main': 'Development',
    'blog.title_highlight': 'Log',
    'blog.description': 'Reflections on technology, design and the process of building digital products.',
    'blog.no_posts': 'No posts yet...',

    // Pagination
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',
    'pagination.label': 'Pagination',
    'pagination.page': 'Page',
    'pagination.of': 'of',

    // Cards
    'card.post_label': 'Post',
    'card.read_article': 'Read full article',
    'card.service_details': 'View service details',
    'card.service_details_short': 'View details',

    // Post reading time
    'post.reading_suffix': 'read',

    // Theme Picker
    'theme.selector_label': 'Theme selector',
    'theme.open': 'Open theme selector',
    'theme.close': 'Close theme panel',
    'theme.reset': 'Reset to default color',
    'theme.copy': 'Copy color settings',
    'theme.copy_hint': 'Copy settings for site-config.ts',
    'theme.select_prefix': 'Select theme',
    'theme.default': 'Default',
    'theme.copied': 'Copied!',

    // Common back links
    'common.back_home': 'Back to Home',
    'common.back_projects': 'Back to Projects',
    'common.back_blog': 'Back to Blog',
    'common.back_services': 'Back to Services',
    'common.read_more': 'Read more',
    'common.view_all': 'View all',

    // Contact form
    'contact.title': 'Got an idea?',
    'contact.description': "Tell me about your project, challenges, or just say hi. I'm always open to new collaborations and creative opportunities.",
    'contact.form.name': 'Full Name',
    'contact.form.name_placeholder': 'John Doe',
    'contact.form.subject': 'Subject',
    'contact.form.subject_placeholder': 'How can I help you?',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Tell me about your project...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.sent': 'Message Received!',
    'contact.sent_desc': "Thanks for reaching out. I'll get back to you as soon as possible (usually within 24 hours).",
    'contact.reset': 'Send another message',
    'contact.error': 'Failed to Send',
    'contact.error_desc': 'Something went wrong. Please try again or contact me directly at',
    'contact.retry': 'Try Again',

    // Footer / Newsletter
    'footer.newsletter': 'Stay in the loop',
    'footer.newsletter_desc': 'Get articles on design, development and minimalism delivered straight to your inbox.',
    'footer.newsletter_placeholder': 'you@email.com',
    'footer.subscribe': 'Subscribe',
    'footer.subscribed': 'Thanks for subscribing!',

    // Legal links
    'legal.privacy': 'Privacy',
    'legal.terms': 'Terms',
    'legal.changelog': 'Changelog',

    // Services page
    'services.title': 'My Specialties',
    'services.description': 'Tailored digital solutions, from UI conceptualization to complex system deployment. My approach combines minimalist aesthetics with high-performance engineering.',
    'services.other': 'Other Specialties',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know before we start working together.',

    // 404
    '404.title': 'Lost in minimalism',
    '404.description': "The page you're looking for has been simplified out of existence, or it never existed in the first place.",
    '404.back': 'Back to Home',
    '404.contact': 'Contact Support',

    // 500
    '500.title': 'Server Overload',
    '500.description': 'Something unexpected happened while processing your request. Please try again in a moment.',
    '500.back': 'Back to Home',
    '500.report': 'Report Issue',
  },

  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.projects': 'Projekty',
    'nav.services': 'Usługi',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'nav.menu_open': 'Otwórz menu',
    'nav.menu_close': 'Zamknij menu',
    'nav.mobile_menu': 'Menu nawigacyjne',

    // Hero
    'hero.greeting': 'Cześć, jestem',
    'hero.title': 'Projektuję i programuję',
    'hero.title_highlight': 'Minimalistyczne produkty',
    'hero.image_alt': 'pracujący przy biurku',
    'hero.cta.projects': 'Zobacz projekty',
    'hero.cta.contact': 'Napisz do mnie',

    // CTA Section
    'cta.title': 'Masz projekt na myśli?',
    'cta.description': 'Porozmawiajmy o tym, jak możemy przekształcić Twój pomysł w elegancki, szybki i funkcjonalny produkt cyfrowy.',
    'cta.start': 'Rozpocznij projekt',
    'cta.schedule': 'Umów rozmowę',

    // Stack Section
    'stack.title': 'Stos Technologiczny',
    'stack.subtitle': 'Narzędzia, których używam, aby ożywić projekty.',

    // Experience Section
    'experience.title': 'Doświadczenie',
    'experience.subtitle': 'Moja droga tworzenia produktów cyfrowych.',
    'experience.present': 'obecnie',
    'experience.item1_desc': 'Przywództwo techniczne w projektach opartych na Astro i optymalizacja wydajności na Cloudflare.',
    'experience.item2_desc': 'Tworzenie systemów projektowych i reaktywnych komponentów dla platform SaaS.',
    'experience.item3_desc': 'Tworzenie tożsamości wizualnych i stron internetowych dla wschodzących startupów.',

    // Expertise Section
    'expertise.title': 'Specjalizacje',
    'expertise.subtitle': 'Kompleksowe podejście do budowania produktów cyfrowych wyróżniających się prostotą i mocą.',

    // Recent Projects Section
    'projects.recent_title': 'Ostatnie Projekty',
    'projects.recent_subtitle': 'Wybór moich najnowszych prac.',
    'projects.working_on_it': 'Pracuję nad czymś niesamowitym...',

    // Projects index page
    'projects.title_main': 'Projekty',
    'projects.title_highlight': '& Prace',
    'projects.description': 'Kolekcja eksperymentów, interfejsów i aplikacji zbudowanych z naciskiem na prostotę i wydajność.',
    'projects.no_page': 'Brak projektów na tej stronie...',

    // Project detail page
    'projects.launch': 'Premiera',
    'projects.technologies': 'Technologie',
    'projects.links': 'Linki',
    'projects.cta_title': 'Gotowy, by zabrać swój pomysł na wyższy poziom?',
    'projects.cta_desc': 'Porozmawiajmy o tym, jak możemy razem zbudować coś niesamowitego.',
    'projects.cta_btn': 'Rozpocznij projekt',

    // Testimonials
    'testimonials.prev': 'Poprzednia opinia',
    'testimonials.next': 'Następna opinia',
    'testimonials.goto': 'Przejdź do opinii',

    // Newsletter Wide
    'newsletter_wide.title': 'Czy ta treść była dla Ciebie pomocna?',
    'newsletter_wide.description': 'Piszę o minimalistycznym designie i nowoczesnym programowaniu. Dołącz do innych deweloperów, aby nie przegapić nowości.',
    'newsletter_wide.cta': 'Porozmawiajmy o Projekcie',

    // Service Sidebar
    'sidebar.title': 'Poproś o tę specjalizację',
    'sidebar.description': 'Masz projekt pasujący do tej specjalizacji? Porozmawiajmy o tym, jak mogę Ci pomóc osiągnąć Twoje cele.',
    'sidebar.cta': 'Rozpocznij projekt',
    'sidebar.guarantees_title': 'Certyfikat Dostawy',
    'sidebar.guarantee_1': 'Iteracyjne ulepszenia',
    'sidebar.guarantee_2': 'Wsparcie po dostawie',
    'sidebar.guarantee_3': 'Czysty i skalowalny kod',

    // Blog index page
    'blog.title_main': 'Blog',
    'blog.title_highlight': 'Deweloperski',
    'blog.description': 'Refleksje na temat technologii, designu i procesu tworzenia produktów cyfrowych.',
    'blog.no_posts': 'Brak wpisów...',

    // Pagination
    'pagination.prev': 'Poprzedni',
    'pagination.next': 'Następny',
    'pagination.label': 'Paginacja',
    'pagination.page': 'Strona',
    'pagination.of': 'z',

    // Cards
    'card.post_label': 'Post',
    'card.read_article': 'Przeczytaj cały artykuł',
    'card.service_details': 'Zobacz szczegóły usługi',
    'card.service_details_short': 'Zobacz szczegóły',

    // Post reading time
    'post.reading_suffix': 'czytania',

    // Theme Picker
    'theme.selector_label': 'Selektor motywów',
    'theme.open': 'Otwórz selektor motywów',
    'theme.close': 'Zamknij panel motywów',
    'theme.reset': 'Przywróć domyślny kolor',
    'theme.copy': 'Kopiuj ustawienia kolorów',
    'theme.copy_hint': 'Kopiuj ustawienia do site-config.ts',
    'theme.select_prefix': 'Wybierz motyw',
    'theme.default': 'Domyślny',
    'theme.copied': 'Skopiowano!',

    // Common back links
    'common.back_home': 'Wróć do strony głównej',
    'common.back_projects': 'Wróć do projektów',
    'common.back_blog': 'Wróć do bloga',
    'common.back_services': 'Wróć do usług',
    'common.read_more': 'Czytaj więcej',
    'common.view_all': 'Zobacz wszystkie',

    // Contact form
    'contact.title': 'Masz pomysł?',
    'contact.description': 'Opowiedz mi o swoim projekcie, wyzwaniach lub po prostu powiedz cześć. Zawsze jestem otwarty na nowe współprace i kreatywne możliwości.',
    'contact.form.name': 'Imię i Nazwisko',
    'contact.form.name_placeholder': 'Jan Kowalski',
    'contact.form.subject': 'Temat',
    'contact.form.subject_placeholder': 'W czym mogę Ci pomóc?',
    'contact.form.message': 'Wiadomość',
    'contact.form.message_placeholder': 'Opowiedz mi o swoim projekcie...',
    'contact.send': 'Wyślij wiadomość',
    'contact.sending': 'Wysyłanie...',
    'contact.sent': 'Wiadomość odebrana!',
    'contact.sent_desc': 'Dziękuję za kontakt. Odezwę się jak najszybciej (zwykle w ciągu 24 godzin).',
    'contact.reset': 'Wyślij kolejną wiadomość',
    'contact.error': 'Błąd wysyłania',
    'contact.error_desc': 'Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na',
    'contact.retry': 'Spróbuj ponownie',

    // Footer / Newsletter
    'footer.newsletter': 'Bądź na bieżąco',
    'footer.newsletter_desc': 'Otrzymuj artykuły o designie, programowaniu i minimalizmie prosto do skrzynki.',
    'footer.newsletter_placeholder': 'ty@email.com',
    'footer.subscribe': 'Zapisz się',
    'footer.subscribed': 'Dziękujemy za subskrypcję!',

    // Legal links
    'legal.privacy': 'Prywatność',
    'legal.terms': 'Warunki',
    'legal.changelog': 'Changelog',

    // Services page
    'services.title': 'Moje Specjalizacje',
    'services.description': 'Rozwiązania cyfrowe na miarę — od konceptualizacji interfejsu po wdrożenie złożonych systemów. Łączę minimalistyczną estetykę z wydajną inżynierią.',
    'services.other': 'Inne Specjalizacje',

    // FAQ
    'faq.title': 'Często zadawane pytania',
    'faq.subtitle': 'Wszystko, co musisz wiedzieć zanim zaczniemy współpracę.',

    // 404
    '404.title': 'Zagubiony w minimalizmie',
    '404.description': 'Strona, której szukasz, została uproszczona do granic możliwości lub po prostu nigdy nie istniała.',
    '404.back': 'Wróć do strony głównej',
    '404.contact': 'Skontaktuj się',

    // 500
    '500.title': 'Błąd serwera',
    '500.description': 'Coś nieoczekiwanego wydarzyło się podczas przetwarzania żądania. Spróbuj ponownie za chwilę.',
    '500.back': 'Wróć do strony głównej',
    '500.report': 'Zgłoś problem',
  },
} as const;
