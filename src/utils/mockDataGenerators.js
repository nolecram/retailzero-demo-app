/**
 * Mock Data Generators
 * Provides realistic mock data for admin dashboard components
 */

import { BRANDS } from '../config/brands';

/**
 * Generate mock security/login data
 * @returns {Array} Array of login events with timestamps, locations, and status
 */
export const generateMockSecurityData = () => {
  const now = new Date();
  const locations = ['Sydney, AU', 'Melbourne, AU', 'Brisbane, AU', 'Perth, AU', 'Auckland, NZ', 'Singapore, SG'];
  const statuses = ['success', 'success', 'success', 'success', 'failed']; // 80% success rate
  
  const recentLogins = [];
  for (let i = 0; i < 15; i++) {
    const brand = Object.values(BRANDS)[Math.floor(Math.random() * 5)];
    const minutesAgo = Math.floor(Math.random() * 1440); // Last 24 hours
    const timestamp = new Date(now - minutesAgo * 60000);
    
    recentLogins.push({
      id: i,
      email: `user${i + 1}@${brand.domain}`,
      organization: brand.name,
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: timestamp.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return recentLogins.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

/**
 * Generate mock user data
 * @returns {Array} Array of user objects with various roles and statuses
 */
export const generateMockUsers = () => {
  const brands = Object.values(BRANDS);
  const roles = ['customer', 'customer', 'customer', 'employee', 'admin']; // More customers
  const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Emily', 'Robert', 'Jessica', 'Daniel', 'Olivia', 'Chris', 'Sophia', 'Matthew'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore'];
  const statuses = ['active', 'active', 'active', 'active', 'blocked']; // 80% active
  
  const users = [];
  for (let i = 0; i < 30; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${brand.domain}`;
    const daysAgo = Math.floor(Math.random() * 30);
    const lastLogin = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    
    users.push({
      id: `user_${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: email,
      organization: brand.name,
      orgId: brand.orgId,
      role: role,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      mfaEnabled: Math.random() > 0.3, // 70% have MFA
      lastLogin: lastLogin.toISOString(),
      createdAt: new Date(lastLogin - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return users.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
};
