# Create Auth0 Organizations for RetailZero Brands

## Step 1: Create Organizations in Auth0 Dashboard

### Option A: Using Auth0 Dashboard (Manual)

1. **Go to Auth0 Dashboard**: https://manage.auth0.com
2. **Navigate to Organizations** (in the left sidebar)
3. **Create each organization**:

#### Organization 1: AutoZero
- Click **"Create Organization"**
- **Name**: `autozero`
- **Display Name**: `AutoZero`
- Click **Create**
- **Copy the Organization ID** (format: `org_XXXXXXXXXXXX`)

#### Organization 2: CampNation
- Click **"Create Organization"**
- **Name**: `campnation`
- **Display Name**: `CampNation`
- Click **Create**
- **Copy the Organization ID**

#### Organization 3: BBQ1
- Click **"Create Organization"**
- **Name**: `bbq1`
- **Display Name**: `BBQ1`
- Click **Create**
- **Copy the Organization ID**

#### Organization 4: OfficeZero
- Click **"Create Organization"**
- **Name**: `officezero`
- **Display Name**: `OfficeZero`
- Click **Create**
- **Copy the Organization ID**

#### Organization 5: CandyZero
- Click **"Create Organization"**
- **Name**: `candyzero`
- **Display Name**: `CandyZero`
- Click **Create**
- **Copy the Organization ID**

---

### Option B: Using Auth0 Management API (Automated)

You can use the Auth0 MCP server or Management API to create organizations programmatically.

#### Using cURL:

First, get a Management API token from your Auth0 Dashboard, then run:

```bash
# Set your variables
DOMAIN="retailzero-demo.au.auth0.com"
TOKEN="YOUR_MANAGEMENT_API_TOKEN"

# Create AutoZero
curl -X POST "https://${DOMAIN}/api/v2/organizations" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "autozero",
    "display_name": "AutoZero"
  }'

# Create CampNation
curl -X POST "https://${DOMAIN}/api/v2/organizations" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "campnation",
    "display_name": "CampNation"
  }'

# Create BBQ1
curl -X POST "https://${DOMAIN}/api/v2/organizations" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "bbq1",
    "display_name": "BBQ1"
  }'

# Create OfficeZero
curl -X POST "https://${DOMAIN}/api/v2/organizations" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "officezero",
    "display_name": "OfficeZero"
  }'

# Create CandyZero
curl -X POST "https://${DOMAIN}/api/v2/organizations" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "candyzero",
    "display_name": "CandyZero"
  }'
```

#### Using Node.js Script:

```javascript
const axios = require('axios');

const DOMAIN = 'retailzero-demo.au.auth0.com';
const TOKEN = 'YOUR_MANAGEMENT_API_TOKEN';

const organizations = [
  { name: 'autozero', display_name: 'AutoZero' },
  { name: 'campnation', display_name: 'CampNation' },
  { name: 'bbq1', display_name: 'BBQ1' },
  { name: 'officezero', display_name: 'OfficeZero' },
  { name: 'candyzero', display_name: 'CandyZero' }
];

async function createOrganizations() {
  for (const org of organizations) {
    try {
      const response = await axios.post(
        `https://${DOMAIN}/api/v2/organizations`,
        org,
        {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`✓ Created ${org.display_name}: ${response.data.id}`);
    } catch (error) {
      console.error(`✗ Failed to create ${org.display_name}:`, error.response?.data || error.message);
    }
  }
}

createOrganizations();
```

---

## Step 2: Update Brand Configuration

After creating the organizations, update `src/config/brands.js` with the **real Organization IDs**:

```javascript
export const BRANDS = {
  AUTO_ZERO: {
    id: 'autozero',
    name: 'AutoZero',
    orgId: 'org_XXXXXXXXXXXXXX', // ← Replace with actual ID from Auth0
    theme: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      logo: '/logos/autozero.png'
    },
    domain: 'autozero.retailzero.com'
  },
  CAMP_NATION: {
    id: 'campnation',
    name: 'CampNation',
    orgId: 'org_XXXXXXXXXXXXXX', // ← Replace with actual ID from Auth0
    theme: {
      primary: '#95E1D3',
      secondary: '#38ADA9',
      logo: '/logos/campnation.png'
    },
    domain: 'campnation.retailzero.com'
  },
  BBQ1: {
    id: 'bbq1',
    name: 'BBQ1',
    orgId: 'org_XXXXXXXXXXXXXX', // ← Replace with actual ID from Auth0
    theme: {
      primary: '#F38181',
      secondary: '#AA96DA',
      logo: '/logos/bbq1.png'
    },
    domain: 'bbq1.retailzero.com'
  },
  OFFICE_ZERO: {
    id: 'officezero',
    name: 'OfficeZero',
    orgId: 'org_XXXXXXXXXXXXXX', // ← Replace with actual ID from Auth0
    theme: {
      primary: '#FCBAD3',
      secondary: '#FFFFD2',
      logo: '/logos/officezero.png'
    },
    domain: 'officezero.retailzero.com'
  },
  CANDY_ZERO: {
    id: 'candyzero',
    name: 'CandyZero',
    orgId: 'org_XXXXXXXXXXXXXX', // ← Replace with actual ID from Auth0
    theme: {
      primary: '#A8D8EA',
      secondary: '#AA96DA',
      logo: '/logos/candyzero.png'
    },
    domain: 'candyzero.retailzero.com'
  }
};
```

---

## Step 3: Enable Organization Parameter

Uncomment the organization parameter in `src/index.js`:

```javascript
authorizationParams={{ 
  redirect_uri: window.location.origin,
  organization: currentBrand.orgId, // ← Uncomment this line
  audience: 'https://api.retailzero.com', // ← Optional: uncomment if using API
}}
```

---

## Step 4: Configure Application for Organizations

1. **In Auth0 Dashboard**, go to **Applications** → Select your application
2. **Navigate to Settings** → **Advanced Settings** → **Organization Settings**
3. **Enable**: ✓ "Accept specified organization" or "Prompt for organization"
4. **Set**: Business-to-Business (B2B) mode

---

## Step 5: Add Test Users to Organizations

For each organization, add test users:

1. Go to **Organizations** → Select an organization
2. Click **"Members"** tab
3. Click **"Add Members"**
4. Add existing users or invite new ones

**Example users you might create:**
- `john@autozero.com` → Add to AutoZero organization
- `sarah@campnation.com` → Add to CampNation organization
- `mike@bbq1.com` → Add to BBQ1 organization
- `lisa@officezero.com` → Add to OfficeZero organization
- `alex@candyzero.com` → Add to CandyZero organization

---

## Step 6: Set Up Auth0 Action for Roles (Optional)

To enable admin access, create an Auth0 Action:

1. Go to **Actions** → **Flows** → **Login**
2. Click **"+"** to create a custom action
3. Name it "Add Organization and Roles"
4. Add this code:

```javascript
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://retailzero.com';
  
  // Add roles from app_metadata
  if (event.user.app_metadata?.roles) {
    api.idToken.setCustomClaim(`${namespace}/roles`, event.user.app_metadata.roles);
  }
  
  // Add organization info
  if (event.organization) {
    api.idToken.setCustomClaim(`${namespace}/org_id`, event.organization.id);
    api.idToken.setCustomClaim(`${namespace}/org_name`, event.organization.name);
  }
};
```

5. **Deploy** the action
6. **Add to Login flow** by dragging it into the flow

---

## Step 7: Test the Setup

1. Start your app: `npm start`
2. Visit `http://localhost:3000`
3. Switch to a brand using the dropdown
4. Click "Log In"
5. Select the corresponding organization (if prompted)
6. Verify:
   - Landing page shows correct brand colors
   - Dashboard shows organization info
   - Admin panel displays all 5 brands

---

## Verification Checklist

- [ ] 5 Organizations created in Auth0
- [ ] Organization IDs copied and saved
- [ ] `src/config/brands.js` updated with real IDs
- [ ] Organization parameter uncommented in `src/index.js`
- [ ] Application configured for organizations in Auth0
- [ ] Test users added to each organization
- [ ] Auth0 Action created and deployed (optional)
- [ ] App tested with login flow
- [ ] Brand theming works correctly
- [ ] Organization isolation verified

---

## Troubleshooting

### "organization must be an organization id" error
- Verify Organization IDs are correct in `src/config/brands.js`
- Check that organizations exist in Auth0 Dashboard

### Users can't log in to specific brands
- Ensure user is a member of the organization
- Add user through Auth0 Dashboard → Organizations → Members

### Application not showing in organization
- Enable the application for organizations in Auth0 Dashboard
- Applications → Your App → Organizations → Enable

---

## Quick Reference

**Auth0 Dashboard URLs:**
- Organizations: https://manage.auth0.com/dashboard/us/retailzero-demo/organizations
- Applications: https://manage.auth0.com/dashboard/us/retailzero-demo/applications
- Actions: https://manage.auth0.com/dashboard/us/retailzero-demo/actions

**Your Auth0 Tenant:**
- Domain: `retailzero-demo.au.auth0.com`
- Client ID: `xERyHPEBariMBWqKdMV2we1qFyhi3So6`

---

## Need Help?

If you encounter issues, you can ask your Claude/AI assistant with the Auth0 MCP server:
- "List all my Auth0 organizations"
- "Get details for the AutoZero organization"
- "List members of the CampNation organization"
- "Show me all applications that support organizations"
