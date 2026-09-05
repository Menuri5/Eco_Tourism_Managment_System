import wildlife from '../assets/wildlife.jpg';
import coastal from '../assets/coastal.jpg';
import rainforest from '../assets/rainforest.jpg';
import cultural from '../assets/cultural.jpg';
import adventure from '../assets/adventure.jpg';
import wellness from '../assets/wellness.jpg';

/**
 * Eco-tourism categories for Sri Lanka.
 * Used across category cards, filters, and destination classification.
 */
export const categories = [
  {
    id: 1,
    name: 'Wildlife Safari',
    slug: 'wildlife',
    image: wildlife ,
    count: 24,
    icon: '🦁',
    description: 'Explore Sri Lanka\'s incredible wildlife in their natural habitats, from leopards to elephants.',
  },
  {
    id: 2,
    name: 'Marine & Coastal',
    slug: 'marine',
    image: coastal,
    count: 18,
    icon: '🐋',
    description: 'Discover pristine beaches, vibrant coral reefs, and world-class whale watching.',
  },
  {
    id: 3,
    name: 'Rainforest Trails',
    slug: 'rainforest',
    image: rainforest,
    count: 15,
    icon: '🌿',
    description: 'Trek through lush tropical rainforests and discover endemic flora and fauna.',
  },
  {
    id: 4,
    name: 'Cultural Heritage',
    slug: 'cultural',
    image: cultural,
    count: 32,
    icon: '🏛️',
    description: 'Experience ancient temples, UNESCO World Heritage sites, and traditional crafts.',
  },
  {
    id: 5,
    name: 'Adventure Sports',
    slug: 'adventure',
    image: adventure,
    count: 12,
    icon: '🏄',
    description: 'Surf, hike, white-water raft, and explore the thrill of Sri Lanka\'s terrain.',
  },
  {
    id: 6,
    name: 'Wellness & Ayurveda',
    slug: 'wellness',
    image: wellness,
    count: 10,
    icon: '🧘',
    description: 'Rejuvenate with traditional Ayurvedic treatments and meditation retreats.',
  },
];

export default categories;
