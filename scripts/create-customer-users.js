const https = require('https');

const DOMAIN = 'retailzero-demo.au.auth0.com';
const TOKEN = process.argv[2];

if (!TOKEN) {
  console.error('❌ Error: Management API token required');
  console.error('Usage: node create-customer-users.js YOUR_MANAGEMENT_API_TOKEN');
  process.exit(1);
}

const BRANDS = [
  { name: 'AutoZero', orgId: 'org_hC536v5MhZj2GMtF' },
  { name: 'CampNation', orgId: 'org_BR45iMQDE2iNKP8R' },
  { name: 'BBQ1', orgId: 'org_ubS05VW6UFh2xI1W' },
  { name: 'OfficeZero', orgId: 'org_TxqSP6gqpe4cE0Tf' },
  { name: 'CandyZero', orgId: 'org_bt36R0WKuJ3rtiuM' }
];

const CUSTOMERS_PER_BRAND = [
  { email: 'customer1@goingtobuy.com', name: 'Customer One' },
  { email: 'customer2@goingtobuy.com', name: 'Customer Two' },
  { email: 'customer3@goingtobuy.com', name: 'Customer Three' },
  { email: 'customer4@goingtobuy.com', name: 'Customer Four' }
];

const PASSWORD = 'Melbourne.2005';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: DOMAIN,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : null);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function createCustomerUsers() {
  console.log('👥 Creating Customer Users for All Brands');
  console.log('=========================================\n');

  try {
    // Get customer role ID
    console.log('📝 Step 1: Getting customer role ID...');
    const roles = await makeRequest('GET', '/api/v2/roles');
    const customerRole = roles.find(r => r.name === 'customer');
    
    if (!customerRole) {
      throw new Error('Customer role not found. Please run update-roles.js first.');
    }
    console.log(`   ✅ Customer role found: ${customerRole.id}\n`);

    const allCreatedUsers = [];
    let step = 2;

    // Create customers for each brand
    for (const brand of BRANDS) {
      console.log(`\n🏢 Creating customers for ${brand.name} (${brand.orgId})`);
      console.log('─'.repeat(60));

      for (const customer of CUSTOMERS_PER_BRAND) {
        // Create unique email per brand
        const brandEmail = customer.email.replace('@', `+${brand.name.toLowerCase()}@`);
        console.log(`\n📝 Step ${step++}: Creating ${brandEmail}...`);
        
        try {
          // Create user
          const user = await makeRequest('POST', '/api/v2/users', {
            email: brandEmail,
            name: `${customer.name} (${brand.name})`,
            password: PASSWORD,
            connection: 'Username-Password-Authentication',
            email_verified: true
          });
          console.log(`   ✅ User created: ${user.user_id}`);

          // Assign customer role
          await makeRequest('POST', `/api/v2/users/${user.user_id}/roles`, {
            roles: [customerRole.id]
          });
          console.log(`   ✅ Customer role assigned`);

          // Add to brand organization
          await makeRequest('POST', `/api/v2/organizations/${brand.orgId}/members`, {
            members: [user.user_id]
          });
          console.log(`   ✅ Added to ${brand.name} organization`);

          allCreatedUsers.push({ 
            email: brandEmail, 
            brand: brand.name,
            user_id: user.user_id 
          });
        } catch (error) {
          if (error.message.includes('409') || error.message.includes('user already exists')) {
            console.log(`   ⚠️  User already exists, skipping...`);
          } else {
            console.log(`   ❌ Error: ${error.message}`);
          }
        }
      }
    }

    console.log('\n\n✅ SUCCESS! Customer users created\n');
    console.log('📋 Summary:');
    console.log(`   Total brands: ${BRANDS.length}`);
    console.log(`   Customers per brand: ${CUSTOMERS_PER_BRAND.length}`);
    console.log(`   Successfully created: ${allCreatedUsers.length}`);
    console.log(`   Role: customer (${customerRole.id})`);
    console.log(`   Password: ${PASSWORD}`);
    
    console.log('\n📝 Created Users by Brand:');
    BRANDS.forEach(brand => {
      const brandUsers = allCreatedUsers.filter(u => u.brand === brand.name);
      if (brandUsers.length > 0) {
        console.log(`\n   ${brand.name}:`);
        brandUsers.forEach(user => {
          console.log(`     • ${user.email}`);
        });
      }
    });

    console.log('\n📝 Next steps:');
    console.log('   1. Users can log in at their respective brand landing pages');
    console.log('   2. Select a brand from the RetailZero home page');
    console.log('   3. Click "Get Started" and login with brand-specific email');
    console.log('   4. They will have access to the customer portal for their brand');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

createCustomerUsers();
