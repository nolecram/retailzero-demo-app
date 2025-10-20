#!/usr/bin/env node

/**
 * Script to create Auth0 Organizations for RetailZero brands
 * 
 * Usage:
 *   node scripts/create-organizations.js YOUR_MANAGEMENT_API_TOKEN
 * 
 * Or set environment variable:
 *   export AUTH0_MGMT_TOKEN=your_token
 *   node scripts/create-organizations.js
 */

const https = require('https');

const DOMAIN = 'retailzero-demo.au.auth0.com';
const ORGANIZATIONS = [
  { name: 'autozero', display_name: 'AutoZero', metadata: { brand: 'auto', type: 'automotive' } },
  { name: 'campnation', display_name: 'CampNation', metadata: { brand: 'camp', type: 'outdoor' } },
  { name: 'bbq1', display_name: 'BBQ1', metadata: { brand: 'bbq', type: 'grilling' } },
  { name: 'officezero', display_name: 'OfficeZero', metadata: { brand: 'office', type: 'supplies' } },
  { name: 'candyzero', display_name: 'CandyZero', metadata: { brand: 'candy', type: 'confectionery' } }
];

// Get token from command line or environment
const TOKEN = process.argv[2] || process.env.AUTH0_MGMT_TOKEN;

if (!TOKEN) {
  console.error('❌ Error: Management API token is required');
  console.error('\nUsage:');
  console.error('  node scripts/create-organizations.js YOUR_TOKEN');
  console.error('  OR');
  console.error('  export AUTH0_MGMT_TOKEN=your_token');
  console.error('  node scripts/create-organizations.js');
  console.error('\n💡 Get your token from: https://manage.auth0.com/dashboard/us/retailzero-demo/apis/management/explorer');
  process.exit(1);
}

/**
 * Make HTTPS request to Auth0 API
 */
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: DOMAIN,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${response.message || body}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Create a single organization
 */
async function createOrganization(org) {
  try {
    const response = await makeRequest('POST', '/api/v2/organizations', org);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * List existing organizations
 */
async function listOrganizations() {
  try {
    const response = await makeRequest('GET', '/api/v2/organizations');
    return response;
  } catch (error) {
    console.error('Failed to list organizations:', error.message);
    return [];
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Creating Auth0 Organizations for RetailZero\n');
  console.log(`📍 Domain: ${DOMAIN}`);
  console.log(`🏢 Organizations to create: ${ORGANIZATIONS.length}\n`);

  // Check existing organizations
  console.log('📋 Checking existing organizations...');
  const existing = await listOrganizations();
  const existingNames = existing.map(org => org.name);
  console.log(`   Found ${existing.length} existing organizations\n`);

  const results = [];
  const orgIds = {};

  for (const org of ORGANIZATIONS) {
    process.stdout.write(`Creating ${org.display_name} (${org.name})... `);
    
    // Check if already exists
    if (existingNames.includes(org.name)) {
      const existingOrg = existing.find(o => o.name === org.name);
      console.log(`⏭️  Already exists (${existingOrg.id})`);
      orgIds[org.name] = existingOrg.id;
      results.push({ org: org.display_name, status: 'exists', id: existingOrg.id });
      continue;
    }

    const result = await createOrganization(org);
    
    if (result.success) {
      console.log(`✅ Created (${result.data.id})`);
      orgIds[org.name] = result.data.id;
      results.push({ org: org.display_name, status: 'created', id: result.data.id });
    } else {
      console.log(`❌ Failed: ${result.error}`);
      results.push({ org: org.display_name, status: 'failed', error: result.error });
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 Summary\n');
  
  const created = results.filter(r => r.status === 'created').length;
  const existed = results.filter(r => r.status === 'exists').length;
  const failed = results.filter(r => r.status === 'failed').length;

  console.log(`✅ Created: ${created}`);
  console.log(`⏭️  Already existed: ${existed}`);
  console.log(`❌ Failed: ${failed}\n`);

  if (Object.keys(orgIds).length > 0) {
    console.log('📝 Organization IDs:\n');
    console.log('Copy these IDs to update src/config/brands.js:\n');
    
    Object.entries(orgIds).forEach(([name, id]) => {
      const brand = ORGANIZATIONS.find(o => o.name === name);
      console.log(`// ${brand.display_name}`);
      console.log(`orgId: '${id}',\n`);
    });

    console.log('\n' + '='.repeat(80));
    console.log('\n📋 Next Steps:\n');
    console.log('1. Update src/config/brands.js with the Organization IDs above');
    console.log('2. Uncomment the organization parameter in src/index.js');
    console.log('3. Configure your Auth0 application for Organizations:');
    console.log('   https://manage.auth0.com/dashboard/us/retailzero-demo/applications');
    console.log('4. Add test users to each organization');
    console.log('5. Test the login flow with npm start\n');
  }

  if (failed > 0) {
    console.log('\n⚠️  Some organizations failed to create. Check the errors above.');
    process.exit(1);
  }

  process.exit(0);
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
