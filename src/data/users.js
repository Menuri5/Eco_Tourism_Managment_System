/**
 * Mock user accounts for authentication context.
 * Includes one user per role: tourist, admin, system manager.
 */
export const users = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    password: 'tourist123',
    role: 'tourist',
    avatar: 'https://picsum.photos/seed/sarah-user/200/200',
    bio: 'Eco-travel enthusiast from Melbourne, passionate about marine conservation and sustainable tourism.',
    preferences: ['Marine & Coastal', 'Wildlife Safari', 'Adventure Sports'],
    favourites: [1, 4, 6, 10],
    joinDate: '2026-03-15',
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@ecolanka.lk',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://picsum.photos/seed/admin-user/200/200',
    bio: 'EcoLanka system administrator',
    preferences: [],
    favourites: [],
    joinDate: '2025-01-01',
  },
  {
    id: 3,
    name: 'System Manager',
    email: 'manager@ecolanka.lk',
    password: 'manager123',
    role: 'manager',
    avatar: 'https://picsum.photos/seed/manager-user/200/200',
    bio: 'EcoLanka systems and infrastructure manager',
    preferences: [],
    favourites: [],
    joinDate: '2025-01-01',
  },
];

export default users;
