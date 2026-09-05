/**
 * Canned AI chatbot responses for the demo.
 * Maps keywords/intents to bot replies for a realistic chat experience.
 */
export const chatResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    response: 'Hello! 🌿 Welcome to EcoLanka. I\'m your eco-tourism assistant. How can I help you explore sustainable travel in Sri Lanka today?',
  },
  {
    keywords: ['destination', 'where', 'visit', 'go', 'place', 'recommend'],
    response: 'Sri Lanka has amazing eco-destinations! 🏝️ Here are my top picks:\n\n• **Yala National Park** — Best for leopard safaris\n• **Sinharaja Rainforest** — UNESCO biodiversity hotspot\n• **Horton Plains** — Stunning cloud forest hikes\n• **Mirissa** — World-class whale watching\n\nWould you like details on any of these?',
  },
  {
    keywords: ['wildlife', 'animal', 'leopard', 'elephant', 'safari'],
    response: 'Sri Lanka is a wildlife paradise! 🦁\n\n• **Leopards** — Yala has the highest density in the world\n• **Elephants** — Best seen at Udawalawe or Minneriya\n• **Whales** — Blue whales off Mirissa coast\n• **Birds** — 450+ species, 33 endemic!\n\nI recommend booking with certified eco-guides for responsible viewing.',
  },
  {
    keywords: ['weather', 'rain', 'season', 'best time', 'when'],
    response: 'Sri Lanka has two monsoon seasons ☀️🌧️:\n\n• **West/South coast & hill country**: Best Dec–Mar\n• **East coast**: Best Apr–Sep\n• **Cultural Triangle**: Best Jan–Sep\n• **Wildlife safaris**: Best Feb–Jul\n\nThe island is always warm (27-30°C in lowlands), so there\'s always something to do!',
  },
  {
    keywords: ['sustainable', 'eco', 'green', 'responsible', 'conservation'],
    response: 'Great question! 🌱 EcoLanka promotes sustainable tourism through:\n\n• **Certified eco-guides** who follow low-impact practices\n• **Conservation campaigns** you can donate to directly\n• **Carbon footprint tracking** for each destination\n• **Community-based tourism** supporting local livelihoods\n\nCheck our Active Campaigns page to contribute!',
  },
  {
    keywords: ['price', 'cost', 'budget', 'cheap', 'expensive', 'money'],
    response: 'Sri Lanka is great value for eco-travel! 💰\n\n• **Budget**: \\$30-50/day (hostels, local food, buses)\n• **Mid-range**: \\$80-150/day (eco-lodges, private guides)\n• **Comfort**: \\$200+/day (boutique eco-resorts)\n\nMany activities like hiking Ella Rock or walking Galle Fort are free!',
  },
  {
    keywords: ['guide', 'tour', 'local', 'hire'],
    response: 'Our certified local guides make your trip special! 🧭\n\nBrowse guides by specialization:\n• Wildlife & Safari guides\n• Marine biologists\n• Cultural heritage experts\n• Trekking & adventure guides\n\nVisit the Guides page to find your perfect match and read reviews.',
  },
  {
    keywords: ['help', 'support', 'problem', 'issue', 'contact'],
    response: 'I\'m here to help! 🤝\n\nFor general questions, just ask me here. For specific issues:\n• Visit our **Help Center** at /help for FAQs\n• Submit a **Support Ticket** at /support\n• Email us at support@ecolanka.lk\n\nWhat can I assist you with?',
  },
  {
    keywords: ['campaign', 'donate', 'donation', 'conservation fund'],
    response: 'Your donations make a real difference! 🐢\n\nActive campaigns:\n• **Save the Sea Turtles** — 75% funded\n• **Elephant Corridor Restoration** — 64% funded\n• **Coral Reef Regeneration** — 35% funded\n• **Mangrove Reforestation** — 95% funded!\n\nVisit the Campaigns page to contribute.',
  },
  {
    keywords: ['thank', 'thanks', 'awesome', 'great', 'perfect'],
    response: 'You\'re welcome! 😊 Enjoy exploring Sri Lanka sustainably. Feel free to ask me anything else about eco-destinations, guides, or conservation campaigns!',
  },
];

/**
 * Default/fallback response when no keyword match is found.
 */
export const defaultResponse = 'I\'m not sure I understand that fully, but I\'d love to help! 🌿 Try asking me about:\n\n• Destination recommendations\n• Wildlife & activities\n• Best travel seasons\n• Conservation campaigns\n• Local guides\n\nOr type "help" for more options.';

export default chatResponses;
