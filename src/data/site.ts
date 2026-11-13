// Shared site data: design styles, page list, fonts and the treatments mega-menu.
export type StyleId = 1 | 2 | 3;
export type PageId = 'index' | 'hydrafacial' | 'environ';

/** File suffix per design style: index.html, index-v2.html, index-v3.html */
export const SUFFIX: Record<StyleId, string> = { 1: '', 2: '-v2', 3: '-v3' };

export const PAGES: { id: PageId; label: string }[] = [
  { id: 'index', label: 'Home' },
  { id: 'hydrafacial', label: 'HydraFacial' },
  { id: 'environ', label: 'Environ' },
];

export const href = (page: PageId, style: StyleId) => `${page}${SUFFIX[style]}.html`;

/** Google Fonts per style */
export const FONTS: Record<StyleId, string> = {
  1: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap',
  2: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500&display=swap',
  3: 'https://fonts.googleapis.com/css2?family=Ovo&family=Karla:wght@400;500;700&display=swap',
};

/** Extra stylesheet per style, loaded after the shared css/style.css */
export const STYLE_CSS: Record<StyleId, string | null> = { 1: null, 2: 'css/home-v2.css', 3: 'css/home-v3.css' };

/** Treatments mega-menu. `page` links to a built page; everything else is "#" until it exists. */
export const MENU: { title: string; items: { label: string; page?: PageId }[] }[] = [
  { title: 'Facials & Skin', items: [
    { label: 'HydraFacial', page: 'hydrafacial' }, { label: 'Environ', page: 'environ' },
    { label: 'CACI' }, { label: 'Dermalogica' }, { label: 'Elemis' }, { label: 'Dermalux LED' },
  ] },
  { title: 'Massage', items: [{ label: 'Massages' }, { label: 'Lymphatic' }] },
  { title: 'Body', items: [{ label: 'CACI Bottoms Up' }, { label: 'Elemis body' }, { label: 'Salt scrub' }, { label: 'Moroccan tan' }, { label: 'Bioslimming' }] },
  { title: 'Hair Removal', items: [{ label: 'Laser' }, { label: 'Waxing' }] },
  { title: 'Hands & Feet', items: [{ label: 'Manicure' }, { label: 'Pedicure' }] },
];

export const CONTACT = {
  phone: '020 8567 5159',
  phoneHref: 'tel:+442085675159',
  whatsapp: '07592 792460',
  whatsappHref: 'https://wa.me/447592792460',
};
