// Brand configuration for RetailZero
export const BRANDS = {
  AUTO_ZERO: {
    id: 'autozero',
    name: 'AutoZero',
    displayName: 'AutoZero',
    orgId: 'org_hC536v5MhZj2GMtF',
    primaryColor: '#FF6B35',
    secondaryColor: '#004E89',
    description: 'Your trusted source for automotive parts and accessories',
    logo: '/logos/autozero.png',
    features: ['Quality Parts', 'Expert Support', 'Fast Shipping']
  },
  CAMP_NATION: {
    id: 'campnation',
    name: 'CampNation',
    displayName: 'CampNation',
    orgId: 'org_BR45iMQDE2iNKP8R',
    primaryColor: '#2D6A4F',
    secondaryColor: '#52B788',
    description: 'Outdoor adventure gear and camping equipment',
    logo: '/logos/campnation.png',
    features: ['Outdoor Gear', 'Expert Guides', 'Adventure Ready']
  },
  BBQ1: {
    id: 'bbq1',
    name: 'BBQ1',
    displayName: 'BBQ1',
    orgId: 'org_ubS05VW6UFh2xI1W',
    primaryColor: '#D00000',
    secondaryColor: '#370617',
    description: 'Premium BBQ equipment and grilling supplies',
    logo: '/logos/bbq1.png',
    features: ['Premium Grills', 'Expert Tips', 'Quality Meats']
  },
  OFFICE_ZERO: {
    id: 'officezero',
    name: 'OfficeZero',
    displayName: 'OfficeZero',
    orgId: 'org_TxqSP6gqpe4cE0Tf',
    primaryColor: '#4361EE',
    secondaryColor: '#3F37C9',
    description: 'Office supplies and furniture for modern workspaces',
    logo: '/logos/officezero.png',
    features: ['Office Essentials', 'Bulk Pricing', 'Fast Delivery']
  },
  CANDY_ZERO: {
    id: 'candyzero',
    name: 'CandyZero',
    displayName: 'CandyZero',
    orgId: 'org_bt36R0WKuJ3rtiuM',
    primaryColor: '#F72585',
    secondaryColor: '#7209B7',
    description: 'Sweet treats and confectionery delights',
    logo: '/logos/candyzero.png',
    features: ['Sweet Selection', 'Candy Favorites', 'Party Supplies']
  }
};

// Helper function to get brand by subdomain
export const getBrandFromHostname = (hostname) => {
  const subdomain = hostname.split('.')[0];
  return Object.values(BRANDS).find(brand => brand.id === subdomain) || BRANDS.AUTO_ZERO;
};

// Helper function to get brand by organization ID
export const getBrandByOrgId = (orgId) => {
  return Object.values(BRANDS).find(brand => brand.orgId === orgId);
};
