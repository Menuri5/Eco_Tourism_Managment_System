/**
 * Mock analytics data for admin and manager dashboard charts.
 * Used with Recharts for visualization.
 */

// Monthly visitor data for the last 12 months
export const visitorTrends = [
  { month: 'Sep', visitors: 2400, revenue: 12000 },
  { month: 'Oct', visitors: 3200, revenue: 16500 },
  { month: 'Nov', visitors: 4100, revenue: 21000 },
  { month: 'Dec', visitors: 5800, revenue: 32000 },
  { month: 'Jan', visitors: 6200, revenue: 35000 },
  { month: 'Feb', visitors: 5900, revenue: 31000 },
  { month: 'Mar', visitors: 5100, revenue: 27000 },
  { month: 'Apr', visitors: 4300, revenue: 22000 },
  { month: 'May', visitors: 3800, revenue: 19000 },
  { month: 'Jun', visitors: 3100, revenue: 15500 },
  { month: 'Jul', visitors: 4500, revenue: 24000 },
  { month: 'Aug', visitors: 5200, revenue: 28000 },
];

// Category popularity breakdown
export const categoryPopularity = [
  { category: 'Wildlife Safari', bookings: 1250, percentage: 28 },
  { category: 'Cultural Heritage', bookings: 1100, percentage: 24 },
  { category: 'Marine & Coastal', bookings: 890, percentage: 20 },
  { category: 'Rainforest Trails', bookings: 560, percentage: 12 },
  { category: 'Adventure Sports', bookings: 450, percentage: 10 },
  { category: 'Wellness & Ayurveda', bookings: 270, percentage: 6 },
];

// Geographic distribution of tourists
export const touristOrigins = [
  { country: 'United Kingdom', visitors: 3200, percentage: 22 },
  { country: 'Germany', visitors: 2800, percentage: 19 },
  { country: 'Australia', visitors: 2100, percentage: 14 },
  { country: 'France', visitors: 1800, percentage: 12 },
  { country: 'United States', visitors: 1500, percentage: 10 },
  { country: 'Japan', visitors: 1200, percentage: 8 },
  { country: 'India', visitors: 1000, percentage: 7 },
  { country: 'Other', visitors: 1100, percentage: 8 },
];

// Dashboard summary stats
export const dashboardStats = {
  totalUsers: 14520,
  activeDestinations: 48,
  totalBookings: 4520,
  totalRevenue: 283500,
  activeCampaigns: 5,
  totalDonations: 145200,
  activeGuides: 32,
  averageRating: 4.6,
};

// Daily active users (last 7 days)
export const dailyActiveUsers = [
  { day: 'Mon', users: 420 },
  { day: 'Tue', users: 380 },
  { day: 'Wed', users: 510 },
  { day: 'Thu', users: 490 },
  { day: 'Fri', users: 620 },
  { day: 'Sat', users: 780 },
  { day: 'Sun', users: 850 },
];

// System health data (for manager)
export const systemHealth = {
  uptime: '99.97%',
  avgResponseTime: '145ms',
  errorRate: '0.03%',
  activeConnections: 234,
  cpuUsage: 42,
  memoryUsage: 68,
  diskUsage: 35,
  services: [
    { name: 'Web Server', status: 'healthy', responseTime: '45ms' },
    { name: 'Database', status: 'healthy', responseTime: '12ms' },
    { name: 'Auth Service', status: 'healthy', responseTime: '38ms' },
    { name: 'Image CDN', status: 'healthy', responseTime: '85ms' },
    { name: 'Email Service', status: 'degraded', responseTime: '320ms' },
    { name: 'Weather API', status: 'healthy', responseTime: '200ms' },
    { name: 'Maps API', status: 'healthy', responseTime: '150ms' },
    { name: 'Payment Gateway', status: 'healthy', responseTime: '110ms' },
  ],
};

// API call volume (for manager analytics)
export const apiCallVolume = [
  { hour: '00:00', calls: 120 },
  { hour: '02:00', calls: 80 },
  { hour: '04:00', calls: 45 },
  { hour: '06:00', calls: 150 },
  { hour: '08:00', calls: 380 },
  { hour: '10:00', calls: 520 },
  { hour: '12:00', calls: 610 },
  { hour: '14:00', calls: 580 },
  { hour: '16:00', calls: 490 },
  { hour: '18:00', calls: 420 },
  { hour: '20:00', calls: 350 },
  { hour: '22:00', calls: 200 },
];

export default {
  visitorTrends,
  categoryPopularity,
  touristOrigins,
  dashboardStats,
  dailyActiveUsers,
  systemHealth,
  apiCallVolume,
};
