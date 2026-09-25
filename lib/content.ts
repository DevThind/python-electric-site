export const site = {
  name: 'Python Electric',
  origin: 'https://www.pythonelectric.ca',
  location: 'Vancouver, British Columbia',
  shortLocation: 'Vancouver, BC',
  instagram: 'https://www.instagram.com/python_electric?stkn=MTFuMzU3a2duazA2aw==',
  phone: null as string | null,
  email: null as string | null,
} as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  examples: string[];
  factors: string[];
  guidance: string;
  image?: string;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    slug: 'residential-electrical', title: 'Residential electrical',
    short: 'Home repairs, lighting, wiring, panel upgrades, and renovation electrical work.',
    intro: 'From a single repair to the electrical work in a new build or renovation, start with what your home needs. Lighting, wiring, panels, circuits, and everyday installations can all be discussed here.',
    examples: ['Repairs, troubleshooting, and maintenance', 'Interior and exterior lighting installations', 'Wiring for renovations and new construction', 'Panel, circuit, and capacity upgrades', 'New fixtures and other installations'],
    factors: ['The existing wiring, panel, and electrical setup', 'Which rooms, fixtures, or circuits are changing', 'Plans, equipment, and other trades involved'],
    guidance: 'Describe the property, the rooms involved, and what you would like to add, repair, or change. Include photos, fixture details, or renovation plans if you have them.',
    image: '/images/work-1007.jpg', imageAlt: 'Pendant lighting above a residential stairwell',
  },
  {
    slug: 'commercial-electrical', title: 'Commercial electrical',
    short: 'Business installations, wiring, lighting, repairs, and electrical upgrades.',
    intro: 'A commercial space has its own layout, equipment, access needs, and operating context. Whether the work involves a new installation, rewiring, lighting, a panel upgrade, or a repair, share how the property is used and what needs to change.',
    examples: ['Electrical installations and alterations', 'Wiring for construction and renovations', 'Interior and exterior lighting', 'Panel, circuit, and capacity upgrades', 'Troubleshooting, repairs, and maintenance'],
    factors: ['How the space is currently used', 'Existing equipment, panels, and electrical layout', 'Access requirements, drawings, and project timing'],
    guidance: 'Include the property type, its current use, the issue or planned installation, access requirements, and any drawings or schedule you have.',
  },
  {
    slug: 'ev-chargers', title: 'EV charger installation',
    short: 'Charger installation, circuit planning, and capacity review for your property.',
    intro: 'A charger installation depends on the equipment, parking location, and existing electrical capacity. Those details help establish what needs to be reviewed at the property.',
    examples: ['Home and business charger installation enquiries', 'Charger location and cable route planning', 'Dedicated circuits and panel capacity questions', 'Electrical upgrades linked to charging equipment'],
    factors: ['Vehicle and charger model', 'Parking location and cable route', 'Existing panel and available capacity'],
    guidance: 'Share the charger model if selected, where the vehicle parks, and what you know about the electrical panel.',
  },
  {
    slug: 'electrical-restoration', title: 'Electrical restoration',
    short: 'Electrical assessment, troubleshooting, and repair after property damage.',
    intro: 'Damage to a property can affect more than the visible finishes. Describe what happened and the state of the site so the electrical questions can be considered alongside the wider work.',
    examples: ['Electrical assessment after property damage', 'Troubleshooting affected circuits and fixtures', 'Repair or replacement planning', 'Coordination with a wider restoration project'],
    factors: ['The type and extent of damage', 'Current site access and safety restrictions', 'Other restoration work being coordinated'],
    guidance: 'Describe the damage, current access to the property, and who is coordinating the broader work.',
  },
];

export const formerServiceDestinations: Record<string, string> = {
  'construction-rewiring': '/services',
  'panels-circuits-upgrades': '/services',
  lighting: '/services',
  'repairs-maintenance': '/services',
};

export type WorkPhoto = {
  id: string;
  source: string;
  src: string;
  alt: string;
  caption: string;
  group: 'Interior lighting' | 'Exterior lighting';
  width: number;
  height: number;
  focal: string;
};

const portrait = { width: 1800, height: 3200 };
export const workPhotos: WorkPhoto[] = [
  { id:'1007', source:'IMG_1007.HEIC', src:'/images/work-1007.jpg', alt:'Pendant lights and illuminated stair treads in a residential interior', caption:'Pendant and stair lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1034', source:'IMG_1034.HEIC', src:'/images/work-1034.jpg', alt:'Recessed lights under the roofline of a home at dusk', caption:'Exterior roofline lighting', group:'Exterior lighting', focal:'centre', ...portrait },
  { id:'1011', source:'IMG_1011.HEIC', src:'/images/work-1011.jpg', alt:'Warm backlighting around a bathroom mirror', caption:'Integrated mirror lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1014', source:'IMG_1014.HEIC', src:'/images/work-1014.jpg', alt:'Wide vanity mirror with integrated backlighting and vertical wall lights', caption:'Bathroom mirror and wall lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1024', source:'IMG_1024.HEIC', src:'/images/work-1024.jpg', alt:'Wall mounted lights beside a bathroom mirror', caption:'Bathroom wall lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1033', source:'IMG_1033.HEIC', src:'/images/work-1033.jpg', alt:'Exterior entrance and steps illuminated after dark', caption:'Entrance and step lighting', group:'Exterior lighting', focal:'centre', ...portrait },
  { id:'0996', source:'IMG_0996.HEIC', src:'/images/work-0996.jpg', alt:'Illuminated architectural wall detail and built-in cabinetry', caption:'Architectural accent lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1010', source:'IMG_1010.HEIC', src:'/images/work-1010.jpg', alt:'Globe pendant lights hanging over a stair opening', caption:'Stairwell pendant lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1015', source:'IMG_1015.HEIC', src:'/images/work-1015.jpg', alt:'Dark pendant lamp illuminating a bedside area', caption:'Bedroom pendant lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1018', source:'IMG_1018.HEIC', src:'/images/work-1018.jpg', alt:'Bathroom with illuminated mirror, shower niche, and vanity', caption:'Layered bathroom lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1020', source:'IMG_1020.HEIC', src:'/images/work-1020.jpg', alt:'Illuminated shower niche in a stone-tiled bathroom', caption:'Shower niche lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1021', source:'IMG_1021.HEIC', src:'/images/work-1021.jpg', alt:'Closer view of a lit shower niche and shower fixture', caption:'Shower lighting detail', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1027', source:'IMG_1027.HEIC', src:'/images/work-1027.jpg', alt:'Three glowing pendants above a kitchen island', caption:'Kitchen pendant lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1028', source:'IMG_1028.HEIC', src:'/images/work-1028.jpg', alt:'Illuminated treads on a residential staircase', caption:'Stair tread lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1029', source:'IMG_1029.HEIC', src:'/images/work-1029.jpg', alt:'Two wall sconces illuminating a dark interior wall', caption:'Interior wall lighting', group:'Interior lighting', focal:'centre', ...portrait },
  { id:'1036', source:'IMG_1036.HEIC', src:'/images/work-1036.jpg', alt:'Vertical fixture illuminating an exterior stone wall', caption:'Exterior wall lighting', group:'Exterior lighting', focal:'centre', ...portrait },
];

export const homePhotos = ['1007', '1034', '1011', '1027', '1033'];
export const photoById = (id: string) => workPhotos.find((photo) => photo.id === id)!;
export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);
export const quoteHref = (slug?: string) => slug ? `/contact?service=${encodeURIComponent(slug)}` : '/contact';
