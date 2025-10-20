const https = require('https');

const DOMAIN = 'retailzero-demo.au.auth0.com';
const TOKEN = process.argv[2];

if (!TOKEN) {
  console.error('❌ Error: Management API token required');
  console.error('Usage: node update-roles.js YOUR_MANAGEMENT_API_TOKEN');
  process.exit(1);
}

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

async function updateRoles() {
  console.log('🔄 Updating Auth0 Roles');
  console.log('======================\n');

  try {
    // Step 1: Get all existing roles
    console.log('📝 Step 1: Fetching existing roles...');
    const roles = await makeRequest('GET', '/api/v2/roles');
    
    const userRole = roles.find(r => r.name === 'User' || r.name === 'user');
    const adminRole = roles.find(r => r.name === 'Admin' || r.name === 'admin');
    const employeeRole = roles.find(r => r.name === 'Employee' || r.name === 'employee');
    const customerRole = roles.find(r => r.name === 'Customer' || r.name === 'customer');

    console.log(`   Found roles: ${roles.map(r => r.name).join(', ')}\n`);

    // Step 2: Rename "User" to "Employee" if User role exists
    if (userRole && !employeeRole) {
      console.log('📝 Step 2: Renaming "User" role to "Employee"...');
      await makeRequest('PATCH', `/api/v2/roles/${userRole.id}`, {
        name: 'employee',
        description: 'Employee role for internal staff with access to employee portal and all brands'
      });
      console.log('   ✅ Role renamed: User → Employee\n');
    } else if (employeeRole) {
      console.log('📝 Step 2: Employee role already exists, skipping rename\n');
    } else {
      console.log('📝 Step 2: Creating Employee role...');
      const newEmployeeRole = await makeRequest('POST', '/api/v2/roles', {
        name: 'employee',
        description: 'Employee role for internal staff with access to employee portal and all brands'
      });
      console.log(`   ✅ Created: Employee (${newEmployeeRole.id})\n`);
    }

    // Step 3: Create "Customer" role if it doesn't exist
    if (!customerRole) {
      console.log('📝 Step 3: Creating "Customer" role...');
      const newCustomerRole = await makeRequest('POST', '/api/v2/roles', {
        name: 'customer',
        description: 'Customer role for regular users with access to customer portal'
      });
      console.log(`   ✅ Created: Customer (${newCustomerRole.id})\n`);
    } else {
      console.log('📝 Step 3: Customer role already exists\n');
    }

    // Step 4: Verify Admin role exists
    if (adminRole) {
      console.log('📝 Step 4: Admin role verified\n');
    } else {
      console.log('📝 Step 4: Creating Admin role...');
      const newAdminRole = await makeRequest('POST', '/api/v2/roles', {
        name: 'admin',
        description: 'Administrator role with full access to all portals and brand management'
      });
      console.log(`   ✅ Created: Admin (${newAdminRole.id})\n`);
    }

    // Final verification
    console.log('📝 Final Step: Verifying all roles...');
    const updatedRoles = await makeRequest('GET', '/api/v2/roles');
    const finalCustomer = updatedRoles.find(r => r.name === 'customer');
    const finalEmployee = updatedRoles.find(r => r.name === 'employee');
    const finalAdmin = updatedRoles.find(r => r.name === 'admin');

    console.log('\n✅ SUCCESS! Role structure updated\n');
    console.log('📋 Current Roles:');
    console.log(`   • Customer (${finalCustomer ? finalCustomer.id : 'NOT FOUND'})`);
    console.log(`     ${finalCustomer ? finalCustomer.description : ''}`);
    console.log(`   • Employee (${finalEmployee ? finalEmployee.id : 'NOT FOUND'})`);
    console.log(`     ${finalEmployee ? finalEmployee.description : ''}`);
    console.log(`   • Admin (${finalAdmin ? finalAdmin.id : 'NOT FOUND'})`);
    console.log(`     ${finalAdmin ? finalAdmin.description : ''}`);
    
    console.log('\n📝 Next steps:');
    console.log('   1. Assign roles to users in Auth0 Dashboard');
    console.log('   2. Update your app code to check for "customer" role instead of "user"');
    console.log('   3. Test access to Customer, Employee, and Admin portals');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

updateRoles();
