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
  label: string;
  short: string;
  intro: string;
  focusTitle: string;
  focusIntro: string;
  areas: { title: string; description: string }[];
  factors: string[];
  guidance: string;
  questions: { question: string; answer: string }[];
  nextTitle: string;
  nextText: string;
  image?: string;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    slug: 'residential-electrical', title: 'Residential electrical', label: 'For your home',
    short: 'Repairs, lighting, renovations, wiring, and new electrical demands at home.',
    intro: 'A home can need anything from one troublesome switch to the electrical work behind a full renovation. Tell us what is happening now and what you want the space to do next.',
    focusTitle: 'Electrical work that fits the way you live.',
    focusIntro: 'Small fixes and larger plans often connect to the same underlying system. These are common starting points for a residential project.',
    areas: [
      { title: 'Repairs & troubleshooting', description: 'Outlets, switches, lights, or circuits behaving unexpectedly? Describe the symptoms, where they occur, and when you first noticed them.' },
      { title: 'Lighting & fixtures', description: 'Plan lighting for everyday use or a new look, from kitchens and living spaces to entries, pathways, and exterior areas.' },
      { title: 'Renovations & wiring', description: 'Bring electrical planning into a remodel or new build early, while room layouts, appliance locations, and finished surfaces are still being decided.' },
      { title: 'Panels, circuits & new loads', description: 'Adding equipment or changing how a space is used may call for a review of existing circuits and available electrical capacity.' },
    ],
    factors: ['The age and condition of the existing installation', 'The rooms, appliances, and fixtures involved', 'Access to wiring and coordination with other renovation work'],
    guidance: 'Tell us which rooms are involved, what needs attention, and whether the work is a repair or part of a larger project. Photos, plans, and fixture or appliance details are useful if you have them.',
    questions: [
      { question: 'Can I ask about a small electrical repair?', answer: 'Yes. A single problem is a useful place to start. Tell us what is happening, where it happens, and whether it is intermittent or ongoing.' },
      { question: 'Do I need finished renovation plans first?', answer: 'No. A rough layout and a list of the lighting, outlets, or equipment you want can help start the conversation. More detail can follow as the project develops.' },
      { question: 'Will new equipment require a panel upgrade?', answer: 'That depends on the existing electrical setup and the equipment being added. Share the model or power requirements if known so the right capacity questions can be reviewed.' },
    ],
    nextTitle: 'Tell us what is changing at home.',
    nextText: 'A short description is enough to begin. Include the address or neighbourhood, the affected rooms, and any plans or photos you already have.',
    image: '/images/work-1007.jpg', imageAlt: 'Pendant lighting above a residential stairwell',
  },
  {
    slug: 'commercial-electrical', title: 'Commercial electrical', label: 'For your business',
    short: 'Electrical work for workplaces, renovations, equipment, and upkeep.',
    intro: 'The electrical needs of a business are shaped by the space, the equipment inside it, and the people who use it. Start with the work you need and the practical constraints of the property.',
    focusTitle: 'Built around the space and its operations.',
    focusIntro: 'From an existing workplace to a new fit-out, the clearest plan begins with how the space is used and what needs to change.',
    areas: [
      { title: 'New spaces & alterations', description: 'Discuss electrical work for a new layout, tenant improvement, or renovation alongside the plans and trades already involved.' },
      { title: 'Lighting for workspaces', description: 'Consider task lighting, general lighting, and exterior areas in relation to the space, its hours, and how people move through it.' },
      { title: 'Equipment & power needs', description: 'New equipment can change circuit and capacity requirements. Share equipment specifications and where the connections are needed.' },
      { title: 'Repairs & ongoing upkeep', description: 'Describe recurring faults, damaged components, or changes needed in an occupied space so the affected areas can be understood.' },
    ],
    factors: ['Business use, occupancy, and operating hours', 'Existing panels, circuits, and equipment requirements', 'Access, drawings, other trades, and project schedule'],
    guidance: 'Share the property type, current use, and the area or equipment involved. Drawings, equipment specifications, access details, and a target schedule can help frame the enquiry.',
    questions: [
      { question: 'Can work be discussed for an operating business?', answer: 'Yes. Include your business hours, site access rules, and any areas that need to stay in use so those constraints can be considered when discussing the work.' },
      { question: 'What should I send for a tenant improvement?', answer: 'A floor plan, proposed equipment, lighting ideas, and your target schedule are useful. You can still reach out if the drawings are in progress.' },
      { question: 'Can I combine several electrical changes in one enquiry?', answer: 'Yes. List each area or issue, then note which items are urgent and which are part of a later phase.' },
    ],
    nextTitle: 'Describe the space and the work ahead.',
    nextText: 'Tell us how the property is used, what is changing, and any access or timing constraints. Plans and equipment details are welcome if available.',
    image: '/images/service-commercial.webp', imageAlt: 'Commercial workspace with overhead lighting',
  },
  {
    slug: 'ev-chargers', title: 'EV charger installation', label: 'For your vehicle',
    short: 'Plan a charging setup around your parking space and electrical supply.',
    intro: 'A good charging setup starts with more than the charger itself. Parking location, the route back to the electrical panel, and the property’s available capacity all shape the installation.',
    focusTitle: 'Plan the route from panel to parking.',
    focusIntro: 'Whether charging is for a home or a business, a few site details make the first conversation far more useful.',
    areas: [
      { title: 'Charger location', description: 'Choose a practical position for the vehicle, charging cable, and day-to-day access, whether the space is indoors or outside.' },
      { title: 'Wiring route', description: 'The distance and path from the electrical supply to the parking spot affect how the installation can be approached.' },
      { title: 'Electrical capacity', description: 'The existing panel and other electrical loads need to be considered before the charging setup is confirmed.' },
      { title: 'Equipment selection', description: 'If you have a charger in mind, its model and electrical requirements help define the scope. If you have not chosen one yet, start with your vehicle and parking setup.' },
    ],
    factors: ['The vehicle and charger model, if selected', 'Parking position and possible wiring route', 'Existing panel, service, and other electrical loads'],
    guidance: 'Tell us where the vehicle parks, where the electrical panel is, and whether you have selected a charger. A photo of the parking area and panel can help start the discussion.',
    questions: [
      { question: 'Do I need to buy a charger before reaching out?', answer: 'No. If you already have a model in mind, include it. Otherwise, tell us about the vehicle, parking location, and the type of charging you are considering.' },
      { question: 'Will my electrical panel need an upgrade?', answer: 'It is not possible to tell from the charger alone. Available capacity depends on the existing installation and other loads, so that question needs a property-specific review.' },
      { question: 'What if the parking spot is far from the panel?', answer: 'The route still matters. Photos or a rough sketch of the panel and parking location can help identify the questions to address before installation.' },
    ],
    nextTitle: 'Start with your parking setup.',
    nextText: 'Share your vehicle or charger details, a photo of the parking area, and anything you know about the panel. The remaining details can be worked through from there.',
    image: '/images/service-ev-chargers.webp', imageAlt: 'Electric vehicle connected to a charger beside a home',
  },
  {
    slug: 'electrical-restoration', title: 'Electrical restoration', label: 'After property damage',
    short: 'Assess and plan electrical repairs after damage to a property.',
    intro: 'After property damage, electrical questions may remain even when the visible cleanup has begun. Explain what happened, which areas were affected, and the current condition of the site.',
    focusTitle: 'Understand what the damage may have affected.',
    focusIntro: 'Restoration work starts with the affected systems and the condition of the property, then fits into the wider repair plan.',
    areas: [
      { title: 'Affected electrical areas', description: 'Identify the rooms, fixtures, outlets, circuits, or equipment that were exposed to damage or are no longer working as expected.' },
      { title: 'Assessment & troubleshooting', description: 'The cause, extent of damage, and current site conditions help determine what needs a closer electrical assessment.' },
      { title: 'Repair planning', description: 'Where components need attention, discuss the electrical work alongside wall access, rebuilding plans, and other repairs.' },
      { title: 'Project coordination', description: 'Restoration often involves several people. Share who manages the property and which other trades or restoration teams are already involved.' },
    ],
    factors: ['What happened and which areas were affected', 'Whether the site is accessible and any restrictions in place', 'The status of cleanup, rebuilding, and other trades'],
    guidance: 'Explain the type of damage, affected rooms, whether power is currently on, and who is coordinating the broader project. Photos are helpful only if the area is safe to access.',
    questions: [
      { question: 'What information helps with a restoration enquiry?', answer: 'The cause of the damage, affected areas, current power status, site access, and the contact for the wider restoration project are good starting points.' },
      { question: 'Can electrical work be planned alongside rebuilding?', answer: 'Yes. Share what demolition or repairs are already planned so the electrical work can be discussed in the context of the full project.' },
      { question: 'Should damaged electrical equipment be turned back on?', answer: 'If wiring or equipment has been affected by fire, flooding, or similar damage, leave it off until it has been assessed by a qualified electrical professional. Follow the direction of the relevant authorities for site access.' },
    ],
    nextTitle: 'Tell us what happened and what comes next.',
    nextText: 'Describe the affected areas, current site access, and any restoration team already involved. The first conversation can begin before the full repair plan is settled.',
    image: '/images/service-restoration.webp', imageAlt: 'Electrician testing an outlet in a home',
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
