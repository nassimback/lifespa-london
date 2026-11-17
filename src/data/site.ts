// Shared site data: page list, treatments mega-menu and contact details.
export type PageId = 'index' | 'hydrafacial' | 'environ';

export const href = (page: PageId) => `${page}.html`;

export const FONTS =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500&display=swap';

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
  email: 'bookings@lifespalondon.co.uk',
  addressLines: ['Unit 2, 35–39 South Ealing Road', 'London W5 4QT'],
  mapsHref: 'https://maps.google.com/?q=35-39+South+Ealing+Road,+London+W5+4QT',
};

export const HOURS: [string, string][] = [
  ['Monday', '10am–6pm'],
  ['Tuesday–Friday', '10am–8pm'],
  ['Saturday', '10am–6pm'],
  ['Sunday', 'Closed'],
];
