#!/usr/bin/env node

/**
 * Enable Organizations feature for Auth0 Application
 * 
 * This script:
 * 1. Updates the application to require organization parameter
 * 2. Adds the application to all 5 retail brand organizations
 * 
 * Usage:
 *   node scripts/enable-organizations.js YOUR_MANAGEMENT_API_TOKEN
 * 
 * Get your Management API token from:
 * https://manage.auth0.com/#/apis/management/explorer
 */

const https = require('https');

// Configuration
const DOMAIN = 'retailzero-demo.au.auth0.com';
const CLIENT_ID = 'xERyHPEBariMBWqKdMV2we1qFyhi3So6';

const ORGANIZATIONS = [
  { name: 'AutoZero', id: 'org_hC536v5MhZj2GMtF' },
  { name: 'CampNation', id: 'org_BR45iMQDE2iNKP8R' },
  { name: 'BBQ1', id: 'org_ubS05VW6UFh2xI1W' },
  { name: 'OfficeZero', id: 'org_TxqSP6gqpe4cE0Tf' },
  { name: 'CandyZero', id: 'org_bt36R0WKuJ3rtiuM' }
];

// Get token from command line
const token = process.argv[2];

if (!token) {
  console.error('❌ Error: Management API token is required');
  console.log('\nUsage:');
  console.log('  node scripts/enable-organizations.js YOUR_TOKEN\n');
  console.log('Get your token from:');
  console.log('  https://manage.auth0.com/#/apis/management/explorer\n');
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

// Step 1: Update application to require organization
async function updateApplication() {
  console.log('\n📝 Step 1: Updating application to require organization...');
  
  try {
    // Get current application settings
    const app = await makeRequest('GET', `/clients/${CLIENT_ID}`);
    console.log(`   Found application: ${app.name || CLIENT_ID}`);
    
    // Update application with organization settings
    const updates = {
      organization_usage: 'require',
      organization_require_behavior: 'no_prompt'
    };
    
    await makeRequest('PATCH', `/clients/${CLIENT_ID}`, updates);
    console.log('   ✅ Application updated to require organization parameter');
    
    return true;
  } catch (error) {
    console.error(`   ❌ Failed to update application: ${error.message}`);
    return false;
  }
}

// Step 2: Enable application in each organization
async function enableApplicationInOrganization(org) {
  try {
    // Check if application is already enabled
    const existingApps = await makeRequest('GET', `/organizations/${org.id}/enabled_connections`);
    
    // Enable application for this organization
    const data = {
      client_id: CLIENT_ID
    };
    
    await makeRequest('POST', `/organizations/${org.id}/enabled_connections/${CLIENT_ID}`, data);
    console.log(`   ✅ ${org.name} (${org.id})`);
    return true;
  } catch (error) {
    if (error.message.includes('409') || error.message.includes('already exists')) {
      console.log(`   ✓  ${org.name} (already enabled)`);
      return true;
    }
    console.error(`   ❌ ${org.name}: ${error.message}`);
    return false;
  }
}

// Step 3: Add application to all organizations
async function addApplicationToOrganizations() {
  console.log('\n📝 Step 2: Adding application to organizations...');
  
  let successCount = 0;
  
  for (const org of ORGANIZATIONS) {
    const success = await enableApplicationInOrganization(org);
    if (success) successCount++;
  }
  
  console.log(`\n   Added to ${successCount}/${ORGANIZATIONS.length} organizations`);
  return successCount === ORGANIZATIONS.length;
}

// Main execution
async function main() {
  console.log('🚀 Enabling Organizations for RetailZero Application');
  console.log('================================================\n');
  console.log(`Domain: ${DOMAIN}`);
  console.log(`Client ID: ${CLIENT_ID}`);
  console.log(`Organizations: ${ORGANIZATIONS.length}`);
  
  try {
    // Step 1: Update application settings
    const appUpdated = await updateApplication();
    
    if (!appUpdated) {
      console.log('\n⚠️  Could not update application settings');
      console.log('Please enable Organizations manually in Auth0 Dashboard');
      process.exit(1);
    }
    
    // Step 2: Add application to organizations
    const orgsEnabled = await addApplicationToOrganizations();
    
    if (orgsEnabled) {
      console.log('\n✅ SUCCESS! Organizations enabled for your application');
      console.log('\n📋 Next steps:');
      console.log('   1. Uncomment the organization parameter in src/index.js');
      console.log('   2. Restart your app: npm start');
      console.log('   3. Test login with organization-scoped authentication');
      console.log('\nYour application is now ready for multi-brand authentication! 🎉\n');
    } else {
      console.log('\n⚠️  Some organizations could not be configured');
      console.log('Please check the errors above and try again\n');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
