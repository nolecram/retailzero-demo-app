const https = require('https');
require('dotenv').config();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUDIENCE = process.env.AUTH0_MANAGEMENT_API_AUDIENCE;

// Organization IDs from brands.js
const BRANDS = {
  'autozero': 'org_hC536v5MhZj2GMtF',
  'campnation': 'org_BR45iMQDE2iNKP8R',
  'bbq1': 'org_a9v2qExc7Y5e8lhR',
  'officezero': 'org_8QhwRXLh3r4P40x8',
  'candyzero': 'org_W7thtc67bKQfTpjl'
};

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
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
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

async function getOrgUsers(token, orgId) {
  const result = await makeRequest('GET', `/api/v2/organizations/${orgId}/members`, null, token);
  // Auth0 returns an array directly for organization members
  return Array.isArray(result) ? result : (result.members || []);
}

async function updateUserPassword(token, userId, password) {
  const data = { password, connection: 'Username-Password-Authentication' };
  return await makeRequest('PATCH', `/api/v2/users/${encodeURIComponent(userId)}`, data, token);
}

async function main() {
  console.log('🔐 Standardizing customer passwords to Melbourne.2025\n');
  
  const token = await getManagementToken();
  
  for (const [brandName, orgId] of Object.entries(BRANDS)) {
    console.log(`\n📦 Processing ${brandName.toUpperCase()}...`);
    
    const users = await getOrgUsers(token, orgId);
    
    if (users.length === 0) {
      console.log(`  ⚠️  No users found`);
      continue;
    }
    
    console.log(`  Found ${users.length} users:`);
    
    for (const user of users) {
      console.log(`    - ${user.email} (${user.name})`);
      
      // Update password to Melbourne.2025
      try {
        await updateUserPassword(token, user.user_id, 'Melbourne.2025');
        console.log(`      ✓ Password updated to Melbourne.2025`);
      } catch (error) {
        console.log(`      ✗ Failed to update password: ${error.message}`);
      }
    }
  }
  
  console.log('\n✅ All customer passwords standardized to Melbourne.2025');
}

main().catch(console.error);
