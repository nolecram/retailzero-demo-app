const https = require('https');
require('dotenv').config();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUDIENCE = process.env.AUTH0_MANAGEMENT_API_AUDIENCE;

const BRANDS = [
  { name: 'AutoZero', domain: 'autozero.com', orgId: 'org_hC536v5MhZj2GMtF' },
  { name: 'CampNation', domain: 'campnation.com', orgId: 'org_BR45iMQDE2iNKP8R' },
  { name: 'BBQ1', domain: 'bbq1.com', orgId: 'org_a9v2qExc7Y5e8lhR' },
  { name: 'OfficeZero', domain: 'officezero.com', orgId: 'org_8QhwRXLh3r4P40x8' },
  { name: 'CandyZero', domain: 'candyzero.com', orgId: 'org_W7thtc67bKQfTpjl' }
];

const PASSWORD = 'Melbourne.2025';

function makeRequest(method, path, data, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: AUTH0_DOMAIN,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(parsed.message || `HTTP ${res.statusCode}`));
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            reject(new Error(body || `HTTP ${res.statusCode}`));
          }
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function getManagementToken() {
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: AUDIENCE,
    grant_type: 'client_credentials'
  };

  const result = await makeRequest('POST', '/oauth/token', data);
  return result.access_token;
}

async function getCustomerRole(token) {
  const roles = await makeRequest('GET', '/api/v2/roles', null, token);
  return roles.find(r => r.name === 'customer');
}

async function createUser(token, email, name, password) {
  return await makeRequest('POST', '/api/v2/users', {
    email,
    name,
    password,
    connection: 'Username-Password-Authentication',
    email_verified: true
  }, token);
}

async function assignRole(token, userId, roleId) {
  return await makeRequest('POST', `/api/v2/users/${userId}/roles`, {
    roles: [roleId]
  }, token);
}

async function addToOrganization(token, orgId, userId) {
  return await makeRequest('POST', `/api/v2/organizations/${orgId}/members`, {
    members: [userId]
  }, token);
}

async function main() {
  console.log('👥 Creating 4 customers for each brand');
  console.log('📧 Email format: customer1-4@[brand].com');
  console.log('🔑 Password: Melbourne.2025\n');
  
  const token = await getManagementToken();
  const customerRole = await getCustomerRole(token);
  
  if (!customerRole) {
    console.error('❌ Customer role not found. Run update-roles.js first.');
    process.exit(1);
  }
  
  console.log(`✓ Customer role ID: ${customerRole.id}\n`);
  
  for (const brand of BRANDS) {
    console.log(`\n🏢 ${brand.name} (${brand.domain})`);
    console.log('─'.repeat(60));
    
    for (let i = 1; i <= 4; i++) {
      const email = `customer${i}@${brand.domain}`;
      const name = `Customer ${i}`;
      
      try {
        const user = await createUser(token, email, name, PASSWORD);
        console.log(`  ✓ Created ${email} (${user.user_id})`);
        
        await assignRole(token, user.user_id, customerRole.id);
        console.log(`    - Assigned customer role`);
        
        await addToOrganization(token, brand.orgId, user.user_id);
        console.log(`    - Added to ${brand.name} organization`);
        
      } catch (error) {
        if (error.message.includes('user already exists')) {
          console.log(`  ⚠️  ${email} already exists`);
        } else {
          console.log(`  ❌ Failed to create ${email}: ${error.message}`);
        }
      }
    }
  }
  
  console.log('\n\n✅ Done! All customers created with password: Melbourne.2025');
}

main().catch(console.error);
