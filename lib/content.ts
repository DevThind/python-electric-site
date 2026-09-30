export const site = {
  name: 'Python Electric',
  origin: 'https://www.pythonelectric.ca',
  location: 'Vancouver, British Columbia',
  shortLocation: 'Vancouver, BC',
  serviceAreas: ['Metro Vancouver', 'Lower Mainland', 'Vancouver Island', 'BC Interior', 'Squamish & Whistler'],
  instagram: 'https://www.instagram.com/python_electric?stkn=MTFuMzU3a2duazA2aw==',
  phone: null as string | null,
  emergencyPhones: [
    { display: '+1 778-237-7832', href: 'tel:+17782377832' },
    { display: '+1 (604) 442-4992', href: 'tel:+16044424992' },
  ],
  email: 'Pythonelectric07@gmail.com',
  licenceNumber: 'LEL00004146',
} as const;

export type Service = {
  slug: string;
  title: string;
  label: string;
  short: string;
  intro: string;
  heroBullets?: string[];
  focusTitle: string;
  focusIntro: string;
  areas: { title: string; description: string }[];
  factors: string[];
  guidance: string;
  questions: { question: string; answer: string }[];
  nextTitle: string;
  nextText: string;
  emergency?: boolean;
  image?: string;
  imageAlt?: string;
  photos?: GalleryPhoto[];
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
    nextText: 'A short description is enough to begin. Include the area and affected rooms. Photos or plans can be shared during follow-up.',
    image: '/images/08_living_room_lighting.png', imageAlt: 'Living room with recessed ceiling lighting and wall sconces beside a fireplace',
    photos: [
      { id: 'residential-chandelier', src: '/images/01_chandelier.png', alt: 'Circular chandelier with glass shades and warm bulbs in a home', caption: 'Chandelier installation', group: 'Interior lighting', width: 916, height: 1717 },
      { id: 'residential-tesla-charger', src: '/images/02_tesla_ev_charger.png', alt: 'Tesla wall connector mounted on an exterior post with its charging cable', caption: 'Tesla EV charger', group: 'EV charging', width: 916, height: 1717 },
      { id: 'residential-meter', src: '/images/04_utility_meter_pole.png', alt: 'Outdoor electrical meter with service conduits connected to overhead utility lines', caption: 'Outdoor electrical service', group: 'Meters & power supply', width: 916, height: 1717 },
      { id: 'residential-wall-charger', src: '/images/05_wall_ev_charger.png', alt: 'Wall-mounted EV charger with a coiled cable connected to a garage outlet', caption: 'Wall-mounted EV charger', group: 'EV charging', width: 916, height: 1717 },
      { id: 'residential-exterior', src: '/images/07_house_exterior_lighting.png', alt: 'House at night with warm lighting along the roofline, garage, and landscaping', caption: 'Exterior & landscape lighting', group: 'Exterior lighting', width: 916, height: 1717 },
      { id: 'residential-living-room', src: '/images/08_living_room_lighting.png', alt: 'Living room with recessed ceiling lights and wall sconces framing a fireplace', caption: 'Living room lighting', group: 'Interior lighting', width: 916, height: 1717 },
    ],
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
    nextText: 'Tell us how the property is used, what is changing, and any access or timing constraints. Plans and equipment details can be shared during follow-up.',
    image: '/images/03_commercial_interior.png', imageAlt: 'Commercial interior with ceiling-mounted track lighting and exposed beams',
    photos: [
      { id: 'commercial-interior', src: '/images/03_commercial_interior.png', alt: 'Commercial space under renovation with track lighting below an exposed ceiling', caption: 'Commercial interior lighting', group: 'Workspace lighting', width: 916, height: 1717 },
      { id: 'commercial-meter-panels', src: '/images/06_electrical_meter_panels.png', alt: 'Two electrical meters with adjacent disconnect enclosures and metal conduits', caption: 'Electrical meters & panels', group: 'Meters & power supply', width: 916, height: 1717 },
    ],
  },
  {
    slug: 'emergency-electrical', title: '24-Hour Emergency Services', label: 'Available 24 hours',
    short: 'Emergency electrical help for urgent faults, power loss, and damaged equipment, day or night.',
    intro: 'For urgent electrical problems at home or work, call our 24-hour emergency line. Tell us what is happening and where the property is so we can discuss the next steps.',
    focusTitle: 'Help starts with a call.',
    focusIntro: 'Electrical problems vary by property. These are common reasons to contact us for emergency service.',
    areas: [
      { title: 'Unexpected power loss', description: 'Tell us whether the whole property or only certain rooms, circuits, or equipment have lost power.' },
      { title: 'Urgent electrical faults', description: 'Describe repeated breaker trips, sparking, unusual smells, or equipment that has stopped working.' },
      { title: 'Damage to wiring or equipment', description: 'Fire, water, storms, or impact can affect electrical components. Share what happened and which areas are involved.' },
      { title: 'Business interruptions', description: 'For a workplace or commercial property, tell us which operations are affected and how we can access the site.' },
    ],
    factors: ['Where the issue is and what you have observed', 'Whether power is out across the property or in a specific area', 'The property address, site access, and any active damage'],
    guidance: 'Call with the property address and a brief description of the issue. Let us know whether power is on, which areas or equipment are affected, and how to access the site.',
    questions: [
      { question: 'How do I request emergency electrical service?', answer: 'Call our 24-hour emergency line at +1 778-237-7832 or +1 (604) 442-4992. Calling is the direct way to discuss an urgent issue.' },
      { question: 'Can I call outside regular business hours?', answer: 'Yes. The emergency line is available 24 hours.' },
      { question: 'What details should I have ready?', answer: 'Your property address, the affected area, whether power is on, and a short description of what happened are useful starting points.' },
    ],
    nextTitle: 'Need urgent electrical help?',
    nextText: 'Call the 24-hour emergency line and tell us what is happening at the property.',
    emergency: true,
    image: '/images/service-panels.webp', imageAlt: 'Electrician reviewing an electrical panel',
  },
  {
    slug: 'electrical-restoration', title: 'Electrical restoration', label: 'After property damage',
    short: 'Assess and plan electrical repairs after damage to a property.',
    intro: 'After property damage, electrical questions may remain even when the visible cleanup has begun. Explain what happened, which areas were affected, and the current condition of the site.',
    heroBullets: [
      'Electrical safety and assessment after fire, flood, or property damage',
      'Removal of damaged wiring, devices, and electrical components',
      'Restoring power to the property safely and efficiently',
      'Code-compliant restoration and replacement with required upgrades and modifications',
    ],
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
    image: '/images/restoration-panel-inspection.png', imageAlt: 'Electrician inspecting a fire-damaged electrical panel',
    photos: [
      { id: 'restoration-fire-damaged-wiring', src: '/images/restoration-fire-damaged-wiring.png', alt: 'Electrician examining charred wiring and an open electrical box', caption: 'Fire-damaged wiring assessment', group: 'Fire damage', width: 1536, height: 1024 },
      { id: 'restoration-water-damage-rewiring', src: '/images/restoration-water-damage-rewiring.png', alt: 'Electrician working on wiring in a room with exposed wall framing and water damage', caption: 'Wiring after water damage', group: 'Water damage', width: 1536, height: 1024 },
      { id: 'restoration-fire-damage-rebuild', src: '/images/restoration-fire-damage-rebuild.png', alt: 'Electrician working beside charred framing during a property rebuild', caption: 'Electrical work during rebuilding', group: 'Fire damage', width: 1536, height: 1024 },
      { id: 'restoration-overheated-outlet', src: '/images/restoration-overheated-outlet.png', alt: 'Overheated electrical outlet with a damaged plug and visible flames', caption: 'Damaged outlet', group: 'Electrical hazards', width: 1536, height: 1024 },
    ],
  },
];

export const formerServiceDestinations: Record<string, string> = {
  'ev-chargers': '/services',
  'construction-rewiring': '/services',
  'panels-circuits-upgrades': '/services',
  lighting: '/services',
  'repairs-maintenance': '/services',
};

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  group: string;
  width: number;
  height: number;
};

export type WorkPhoto = GalleryPhoto & {
  source: string;
  group: 'Interior lighting' | 'Exterior lighting';
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
