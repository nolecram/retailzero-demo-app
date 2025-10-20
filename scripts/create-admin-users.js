const https = require('https');

const DOMAIN = 'retailzero-demo.au.auth0.com';
const TOKEN = process.argv[2];
const RETAILZERO_ORG_ID = 'org_K6sjZprHVLfXgIzs';

if (!TOKEN) {
  console.error('❌ Error: Management API token required');
  console.error('Usage: node create-admin-users.js YOUR_MANAGEMENT_API_TOKEN');
  process.exit(1);
}

const ADMINS = [
  { email: 'admin1@retailzero.com', name: 'Admin One' },
  { email: 'admin2@retailzero.com', name: 'Admin Two' },
  { email: 'admin3@retailzero.com', name: 'Admin Three' },
  { email: 'admin4@retailzero.com', name: 'Admin Four' },
  { email: 'admin5@retailzero.com', name: 'Admin Five' }
];

const PASSWORD = 'Melbourne.2025';

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

async function createAdminUsers() {
  console.log('👥 Creating Admin Users for RetailZero');
  console.log('======================================\n');

  try {
    // Get admin role ID
    console.log('📝 Step 1: Getting admin role ID...');
    const roles = await makeRequest('GET', '/api/v2/roles');
    const adminRole = roles.find(r => r.name === 'admin');
    
    if (!adminRole) {
      throw new Error('Admin role not found. Please run update-roles.js first.');
    }
    console.log(`   ✅ Admin role found: ${adminRole.id}\n`);

    const createdUsers = [];

    // Create each admin user
    for (let i = 0; i < ADMINS.length; i++) {
      const admin = ADMINS[i];
      console.log(`📝 Step ${i + 2}: Creating ${admin.email}...`);
      
      try {
        // Create user
        const user = await makeRequest('POST', '/api/v2/users', {
          email: admin.email,
          name: admin.name,
          password: PASSWORD,
          connection: 'Username-Password-Authentication',
          email_verified: true
        });
        console.log(`   ✅ User created: ${user.user_id}`);

        // Assign admin role
        await makeRequest('POST', `/api/v2/users/${user.user_id}/roles`, {
          roles: [adminRole.id]
        });
        console.log(`   ✅ Admin role assigned`);

        // Add to RetailZero organization
        await makeRequest('POST', `/api/v2/organizations/${RETAILZERO_ORG_ID}/members`, {
          members: [user.user_id]
        });
        console.log(`   ✅ Added to RetailZero organization\n`);

        createdUsers.push({ email: admin.email, user_id: user.user_id });
      } catch (error) {
        if (error.message.includes('409') || error.message.includes('user already exists')) {
          console.log(`   ⚠️  User already exists, skipping...\n`);
        } else {
          console.log(`   ❌ Error: ${error.message}\n`);
        }
      }
    }

    console.log('✅ SUCCESS! Admin users created\n');
    console.log('📋 Summary:');
    console.log(`   Total users processed: ${ADMINS.length}`);
    console.log(`   Successfully created: ${createdUsers.length}`);
    console.log(`   Organization: RetailZero (${RETAILZERO_ORG_ID})`);
    console.log(`   Role: admin (${adminRole.id})`);
    console.log(`   Password: ${PASSWORD}`);
    
    console.log('\n📝 Created Users:');
    createdUsers.forEach(user => {
      console.log(`   • ${user.email}`);
    });

    console.log('\n📝 Next steps:');
    console.log('   1. Users can log in at /employee-login');
    console.log('   2. They will have access to all brand admin portals');
    console.log('   3. Test login with any of the created admin accounts');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

createAdminUsers();
