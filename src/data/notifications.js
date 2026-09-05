/**
 * Mock notifications for the tourist user.
 * Used in the notification dropdown and full notifications page.
 */
export const notifications = [
  {
    id: 1,
    type: 'campaign',
    title: 'Campaign Goal Almost Reached!',
    message: 'The "Mangrove Reforestation" campaign has reached 95% of its goal. Help push it over the line!',
    date: '2026-08-25T14:30:00',
    read: false,
    link: '/campaigns/4',
  },
  {
    id: 2,
    type: 'recommendation',
    title: 'New Destination Recommendation',
    message: 'Based on your interest in marine life, check out the newly listed "Trincomalee Coral Reefs" destination.',
    date: '2026-08-24T09:15:00',
    read: false,
    link: '/destinations/7',
  },
  {
    id: 3,
    type: 'alert',
    title: 'Weather Alert — Southern Coast',
    message: 'Heavy rainfall expected in Galle and Mirissa areas for the next 48 hours. Plan accordingly.',
    date: '2026-08-23T18:00:00',
    read: true,
    link: '/environmental-data',
  },
  {
    id: 4,
    type: 'review',
    title: 'Your Review Was Approved',
    message: 'Your review for "Yala National Park Safari" has been approved and is now visible to other travelers.',
    date: '2026-08-22T11:45:00',
    read: true,
    link: '/reviews',
  },
  {
    id: 5,
    type: 'conservation',
    title: 'Sea Turtle Nesting Season Update',
    message: '150 green sea turtle hatchlings were released in Rekawa this week! Thanks to your support.',
    date: '2026-08-21T08:30:00',
    read: true,
    link: '/campaigns/1',
  },
  {
    id: 6,
    type: 'system',
    title: 'Profile Update Reminder',
    message: 'Complete your travel preferences to get better destination recommendations.',
    date: '2026-08-20T16:00:00',
    read: true,
    link: '/profile',
  },
  {
    id: 7,
    type: 'guide',
    title: 'New Guide Available',
    message: 'Priya Rajapaksa, a community-based tourism specialist, has joined EcoLanka guides in the Jaffna region.',
    date: '2026-08-19T10:20:00',
    read: true,
    link: '/guides',
  },
];

export default notifications;
