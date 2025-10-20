const https = require('https');

const DOMAIN = 'retailzero-demo.au.auth0.com';
const TOKEN = process.argv[2];
const RETAILZERO_ORG_ID = 'org_K6sjZprHVLfXgIzs';

if (!TOKEN) {
  console.error('❌ Error: Management API token required');
  console.error('Usage: node create-employee-users.js YOUR_MANAGEMENT_API_TOKEN');
  process.exit(1);
}

const EMPLOYEES = [
  { email: 'employee1@retailzero.com', name: 'Employee One' },
  { email: 'employee2@retailzero.com', name: 'Employee Two' },
  { email: 'employee3@retailzero.com', name: 'Employee Three' },
  { email: 'employee4@retailzero.com', name: 'Employee Four' }
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

async function createEmployeeUsers() {
  console.log('👥 Creating Employee Users for RetailZero');
  console.log('=========================================\n');

  try {
    // Get employee role ID
    console.log('📝 Step 1: Getting employee role ID...');
    const roles = await makeRequest('GET', '/api/v2/roles');
    const employeeRole = roles.find(r => r.name === 'employee');
    
    if (!employeeRole) {
      throw new Error('Employee role not found. Please run update-roles.js first.');
    }
    console.log(`   ✅ Employee role found: ${employeeRole.id}\n`);

    const createdUsers = [];

    // Create each employee user
    for (let i = 0; i < EMPLOYEES.length; i++) {
      const employee = EMPLOYEES[i];
      console.log(`📝 Step ${i + 2}: Creating ${employee.email}...`);
      
      try {
        // Create user
        const user = await makeRequest('POST', '/api/v2/users', {
          email: employee.email,
          name: employee.name,
          password: PASSWORD,
          connection: 'Username-Password-Authentication',
          email_verified: true
        });
        console.log(`   ✅ User created: ${user.user_id}`);

        // Assign employee role
        await makeRequest('POST', `/api/v2/users/${user.user_id}/roles`, {
          roles: [employeeRole.id]
        });
        console.log(`   ✅ Employee role assigned`);

        // Add to RetailZero organization
        await makeRequest('POST', `/api/v2/organizations/${RETAILZERO_ORG_ID}/members`, {
          members: [user.user_id]
        });
        console.log(`   ✅ Added to RetailZero organization\n`);

        createdUsers.push({ email: employee.email, user_id: user.user_id });
      } catch (error) {
        if (error.message.includes('409') || error.message.includes('user already exists')) {
          console.log(`   ⚠️  User already exists, skipping...\n`);
        } else {
          console.log(`   ❌ Error: ${error.message}\n`);
        }
      }
    }

    console.log('✅ SUCCESS! Employee users created\n');
    console.log('📋 Summary:');
    console.log(`   Total users processed: ${EMPLOYEES.length}`);
    console.log(`   Successfully created: ${createdUsers.length}`);
    console.log(`   Organization: RetailZero (${RETAILZERO_ORG_ID})`);
    console.log(`   Role: employee (${employeeRole.id})`);
    console.log(`   Password: ${PASSWORD}`);
    
    console.log('\n📝 Created Users:');
    createdUsers.forEach(user => {
      console.log(`   • ${user.email}`);
    });

    console.log('\n📝 Next steps:');
    console.log('   1. Users can log in at /employee-login');
    console.log('   2. They will have access to employee portal and all brands');
    console.log('   3. Test login with any of the created employee accounts');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

createEmployeeUsers();
