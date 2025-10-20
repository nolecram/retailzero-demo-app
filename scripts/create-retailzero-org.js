#!/usr/bin/env node

/**
 * Create RetailZero Central Organization for Employees & Admins
 * 
 * This script creates a central organization where all employees and admins
 * will be managed, regardless of which brand they work with.
 * 
 * Usage:
 *   node scripts/create-retailzero-org.js YOUR_MANAGEMENT_API_TOKEN
 */

const https = require('https');

// Configuration
const DOMAIN = 'retailzero-demo.au.auth0.com';
const CLIENT_ID = 'xERyHPEBariMBWqKdMV2we1qFyhi3So6';

const ORG_CONFIG = {
  name: 'retailzero',
  display_name: 'RetailZero',
  branding: {
    logo_url: 'https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/retailzero.png',
    colors: {
      primary: '#667eea',
      page_background: '#ffffff'
    }
  },
  metadata: {
    type: 'internal',
    description: 'Central organization for all RetailZero employees and administrators'
  }
};

// Get token from command line
const token = process.argv[2];

if (!token) {
  console.error('❌ Error: Management API token is required');
  console.log('\nUsage:');
  console.log('  node scripts/create-retailzero-org.js YOUR_TOKEN\n');
  process.exit(1);
}

// Helper function to make API requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: DOMAIN,
      path: `/api/v2${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch (e) {
            resolve({});
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function main() {
  console.log('🚀 Creating RetailZero Central Organization');
  console.log('==========================================\n');
  
  try {
    // Step 1: Check if organization already exists
    console.log('📝 Step 1: Checking for existing organization...');
    try {
      const existingOrgs = await makeRequest('GET', '/organizations');
      const existing = existingOrgs.find(org => org.name === 'retailzero');
      
      if (existing) {
        console.log(`   ✓  Organization already exists: ${existing.id}`);
        console.log(`\n✅ Organization ID: ${existing.id}`);
        console.log('\n📋 Next steps:');
        console.log(`   1. Update src/config/brands.js with: orgId: '${existing.id}'`);
        console.log('   2. Add this organization to the application');
        console.log('   3. Employees and admins will authenticate through this org\n');
        return;
      }
    } catch (error) {
      console.log('   No existing organization found, creating new one...');
    }

    // Step 2: Create the organization
    console.log('\n📝 Step 2: Creating RetailZero organization...');
    const org = await makeRequest('POST', '/organizations', ORG_CONFIG);
    console.log(`   ✅ Created: ${org.display_name} (${org.id})`);

    // Step 3: Get connection ID for enabling
    console.log('\n📝 Step 3: Enabling authentication connection...');
    const connections = await makeRequest('GET', '/connections?name=Username-Password-Authentication');
    
    if (connections && connections.length > 0) {
      const connectionId = connections[0].id;
      
      // Enable the connection for this organization
      const connData = {
        connection_id: connectionId,
        assign_membership_on_login: false
      };
      
      await makeRequest('POST', `/organizations/${org.id}/enabled_connections`, connData);
      console.log('   ✅ Authentication connection enabled');
    }

    // Step 4: Success message
    console.log('\n✅ SUCCESS! RetailZero organization created');
    console.log('\n📋 Organization Details:');
    console.log(`   Name: ${org.name}`);
    console.log(`   Display Name: ${org.display_name}`);
    console.log(`   ID: ${org.id}`);
    
    console.log('\n📝 Next steps:');
    console.log(`   1. Update src/config/brands.js:`);
    console.log(`      orgId: '${org.id}'`);
    console.log('   2. Restart your app');
    console.log('   3. Employees/Admins will authenticate through this organization');
    console.log('   4. Assign roles (employee, admin) to users in Auth0 Dashboard\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
