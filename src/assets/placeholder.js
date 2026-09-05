/**
 * Placeholder image URLs using picsum.photos for consistent demo imagery.
 * Each URL generates a unique, deterministic image based on the seed parameter.
 * Replace these with real images in production.
 */

const PICSUM = 'https://picsum.photos/seed';

export const placeholders = {
  // Destination images (landscape ratio)
  destinations: [
    `${PICSUM}/sigiriya/800/500`,
    `${PICSUM}/ella-rock/800/500`,
    `${PICSUM}/galle-fort/800/500`,
    `${PICSUM}/yala-park/800/500`,
    `${PICSUM}/kandy-temple/800/500`,
    `${PICSUM}/mirissa-beach/800/500`,
    `${PICSUM}/trincomalee/800/500`,
    `${PICSUM}/anuradhapura/800/500`,
    `${PICSUM}/adams-peak/800/500`,
    `${PICSUM}/horton-plains/800/500`,
    `${PICSUM}/udawalawe/800/500`,
    `${PICSUM}/nuwara-eliya/800/500`,
  ],

  // Category images (4:3 ratio)
  categories: [
    `${PICSUM}/wildlife-cat/600/400`,
    `${PICSUM}/marine-cat/600/400`,
    `${PICSUM}/rainforest-cat/600/400`,
    `${PICSUM}/cultural-cat/600/400`,
    `${PICSUM}/adventure-cat/600/400`,
    `${PICSUM}/wellness-cat/600/400`,
  ],

  // Guide avatar images
  avatars: Array.from({ length: 8 }, (_, i) => `${PICSUM}/guide-avatar-${i}/200/200`),

  // Hero banner
  hero: `${PICSUM}/srilanka-hero/1920/800`,

  // Campaign images
  campaigns: [
    `${PICSUM}/sea-turtle/800/500`,
    `${PICSUM}/elephant-home/800/500`,
    `${PICSUM}/coral-reef/800/500`,
    `${PICSUM}/mangrove-eco/800/500`,
    `${PICSUM}/leopard-save/800/500`,
    `${PICSUM}/reforest/800/500`,
  ],
};

export default placeholders;
