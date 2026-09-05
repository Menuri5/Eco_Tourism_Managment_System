import { placeholders } from '../assets/placeholder';

/**
 * Mock conservation / donation campaigns.
 * Used in campaign listings, dashboard active campaigns, and detail pages.
 */
export const campaigns = [
  {
    id: 1,
    title: 'Save the Sea Turtles of Rekawa',
    slug: 'save-sea-turtles',
    image: placeholders.campaigns[0],
    description: 'Help protect the nesting beaches of five species of sea turtles along Sri Lanka\'s southern coast. Funds support night patrols, hatchery maintenance, and community awareness programs.',
    goal: 25000,
    raised: 18750,
    donors: 312,
    daysLeft: 23,
    category: 'Marine Conservation',
    organizer: 'Sri Lanka Sea Turtle Conservation Project',
    isActive: true,
    updates: [
      { date: '2026-08-20', text: 'Released 150 hatchlings this week!' },
      { date: '2026-08-10', text: 'New patrol equipment purchased.' },
    ],
  },
  {
    id: 2,
    title: 'Elephant Corridor Restoration',
    slug: 'elephant-corridor',
    image: placeholders.campaigns[1],
    description: 'Restore critical elephant migration corridors between Udawalawe and Lunugamvehera national parks. Reducing human-elephant conflict through habitat connectivity.',
    goal: 50000,
    raised: 32000,
    donors: 489,
    daysLeft: 45,
    category: 'Wildlife Protection',
    organizer: 'Wildlife Conservation Society Sri Lanka',
    isActive: true,
    updates: [
      { date: '2026-08-18', text: '200 acres of corridor land secured.' },
    ],
  },
  {
    id: 3,
    title: 'Coral Reef Regeneration — Pigeon Island',
    slug: 'coral-reef-regen',
    image: placeholders.campaigns[2],
    description: 'Deploy coral nursery frames and transplant heat-resistant coral fragments to restore bleached reef sections around Pigeon Island National Park.',
    goal: 35000,
    raised: 12250,
    donors: 178,
    daysLeft: 60,
    category: 'Marine Conservation',
    organizer: 'Ocean Conservation Alliance',
    isActive: true,
    updates: [],
  },
  {
    id: 4,
    title: 'Mangrove Reforestation — Negombo Lagoon',
    slug: 'mangrove-reforestation',
    image: placeholders.campaigns[3],
    description: 'Plant 50,000 mangrove saplings along Negombo Lagoon to restore coastal ecosystems, protect fishing communities, and sequester carbon.',
    goal: 15000,
    raised: 14200,
    donors: 267,
    daysLeft: 8,
    category: 'Reforestation',
    organizer: 'Small Fishers Federation',
    isActive: true,
    updates: [
      { date: '2026-08-22', text: '42,000 saplings planted so far!' },
      { date: '2026-08-05', text: 'Community volunteers joined planting.' },
    ],
  },
  {
    id: 5,
    title: 'Leopard Conservation — Wilpattu',
    slug: 'leopard-conservation',
    image: placeholders.campaigns[4],
    description: 'Fund camera trap networks, anti-poaching patrols, and research into Sri Lankan leopard populations in Wilpattu National Park.',
    goal: 40000,
    raised: 8000,
    donors: 96,
    daysLeft: 90,
    category: 'Wildlife Protection',
    organizer: 'Leopard Trust Sri Lanka',
    isActive: true,
    updates: [],
  },
  {
    id: 6,
    title: 'Sinharaja Perimeter Restoration',
    slug: 'sinharaja-reforestation',
    image: placeholders.campaigns[5],
    location: 'Sinharaja Reserve',
    shortDescription: "A critical initiative to rebuild the vital buffer zone surrounding Sri Lanka's last viable area of primary tropical rainforest, protecting endemic flora and fauna from edge effects.",
    description: "The Sinharaja Forest Reserve is a biodiversity hotspot of global significance. However, its perimeter has suffered historical degradation due to agricultural encroachment. This project focuses on a comprehensive ecological restoration of a 50-hectare buffer zone along the southern border.\n\nBy meticulously selecting and re-planting indigenous canopy and sub-canopy species, we aim to extend the contiguous habitat required by endemic wildlife, including the Purple-faced Langur and the Sri Lanka Blue Magpie. Our approach relies heavily on local community stewardship, ensuring that restoration efforts are culturally integrated and economically supportive.",
    goal: 5000,
    raised: 2150,
    donors: 734,
    daysLeft: 12,
    category: 'ACTIVE CAMPAIGN',
    organizer: 'Rainforest Trust Sri Lanka',
    isActive: true,
    updates: [],
    projectLead: {
      name: 'Dr. Aruna Perera',
      role: 'Conservation Director',
      bio: 'Expert in tropical forest ecology with 15+ years of experience in Sri Lankan biodiversity conservation.',
      avatar: 'https://picsum.photos/seed/aruna/150/150',
      email: 'aruna.perera@eco-conservation.lk',
      phone: '+94 77 123 4567'
    },
    milestones: [
      { label: 'Indigenous Trees Planted', current: 2150, target: 5000 },
      { label: 'Hectares Restored', current: 15, target: 50 }
    ],
    onTheGroundImages: [
      'https://picsum.photos/seed/ground1/400/300',
      'https://picsum.photos/seed/ground2/400/300',
      'https://picsum.photos/seed/ground3/800/400'
    ]
  },
];

export default campaigns;
