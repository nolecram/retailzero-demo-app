# Auth0 Setup Instructions for Multi-Brand Architecture

## Current Issue
## Issue: "organization must be an organization id"

✅ **RESOLVED** - Organization IDs have been updated with real Auth0 Organization IDs:

- **AutoZero**: `org_hC536v5MhZj2GMtF`
- **CampNation**: `org_BR45iMQDE2iNKP8R`
- **BBQ1**: `org_ubS05VW6UFh2xI1W`
- **OfficeZero**: `org_TxqSP6gqpe4cE0Tf`
- **CandyZero**: `org_bt36R0WKuJ3rtiuM`

The organization parameter has been enabled in `src/index.js` and users will now be properly scoped to their brand's organization.

## Solution: Create Auth0 Organizations

### Step 1: Create Organizations in Auth0 Dashboard

1. **Login to Auth0 Dashboard**
   - Go to: https://manage.auth0.com
   - Login with your Auth0 credentials

2. **Navigate to Organizations**
   - Click on "Organizations" in the left sidebar
   - If you don't see it, you may need to enable it in your tenant settings

3. **Create 5 Organizations** (one for each brand)

   For each brand, click **"Create Organization"** and enter:
   
   | Brand | Name | Display Name |
   |-------|------|--------------|
   | Brand A | `brand-a` | Brand A |
   | Brand B | `brand-b` | Brand B |
   | Brand C | `brand-c` | Brand C |
   | Brand D | `brand-d` | Brand D |
   | Brand E | `brand-e` | Brand E |

4. **Copy Organization IDs**
   
   After creating each organization:
   - Click on the organization
   - Copy the **Organization ID** (format: `org_XXXXXXXXXXXX`)
   - Keep these IDs - you'll need them in the next step

### Step 2: Update Brand Configuration

Once you have the 5 real Organization IDs, update `src/config/brands.js`:

```javascript
export const BRANDS = {
  BRAND_A: {
    id: 'brand-a',
    name: 'Brand A',
    orgId: 'org_REAL_ID_HERE', // ← Replace with real Auth0 Organization ID
    theme: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      logo: '/logos/brand-a.png'
    },
    domain: 'brand-a.retailzero.com'
  },
  BRAND_B: {
    id: 'brand-b',
    name: 'Brand B',
    orgId: 'org_REAL_ID_HERE', // ← Replace with real Auth0 Organization ID
    // ... rest of config
  },
  // ... continue for all 5 brands
};
```

### Step 3: Enable Organization Parameter

After updating the Organization IDs, uncomment the organization parameter in `src/index.js`:

```javascript
authorizationParams={{ 
  redirect_uri: window.location.origin,
  organization: currentBrand.orgId, // ← Uncomment this line
  audience: 'https://api.retailzero.com', // ← Uncomment if using API
}}
```

### Step 4: Configure Application for Organizations

1. **In Auth0 Dashboard**, go to **Applications** → Select your application
2. **Navigate to Settings** → **Advanced Settings** → **Organization Settings**
3. **Enable**: ✓ "Prompt for organization" or "Accept specified organization"
4. **Set**: Business-to-Business (B2B) mode

### Step 5: Add Test Users to Organizations

For each organization:

1. Go to **Organizations** → Select an organization
2. Click **"Members"** tab
3. Click **"Add Members"**
4. Either:
   - Select existing users from your Auth0 database
   - Or invite new users via email

### Step 6: Set Up Roles (Optional)

To enable admin access, create an **Auth0 Action**:

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

### Step 7: Assign Admin Role to Users

For users who should have admin access:

1. Go to **User Management** → **Users**
2. Select a user
3. Scroll to **Metadata** section
4. Add to `app_metadata`:
   ```json
   {
     "roles": ["admin"]
   }
   ```
5. Click **Save**

## Testing the Setup

1. **Start the app**: `npm start`
2. **Visit**: http://localhost:3000
3. **Switch to a brand** using the brand selector
4. **Click "Log In"**
5. **Select an organization** when prompted (or it will auto-select if configured)
6. **Login with a user** that's a member of that organization
7. **Verify**:
   - Landing page shows correct brand colors
   - Dashboard shows organization info
   - Admin panel is accessible (if user has admin role)

## Troubleshooting

### Error: "organization must be an organization id"
- You're using placeholder organization IDs
- Follow Step 1-2 above to create real organizations and update the config

### Error: "Organization not found"
- Organization ID is incorrect
- Double-check the ID in Auth0 Dashboard matches the one in your config

### User can't log in to specific brand
- User is not a member of that organization
- Add the user to the organization in Auth0 Dashboard (Step 5)

### Admin page shows "Access denied"
- User doesn't have admin role in app_metadata
- Follow Step 7 to add admin role
- Ensure Auth0 Action is deployed and added to login flow (Step 6)

## Current Status (Temporary)

✅ The organization parameter is **commented out** in `src/index.js`  
✅ The app will work **without** organization isolation  
✅ All users can log in regardless of brand  
⚠️ Brand theming works, but no true multi-tenancy yet  

**To enable full multi-brand architecture**, follow steps 1-7 above.

## Quick Test Mode (No Organizations)

If you want to test the app without setting up organizations:

1. Keep the organization parameter commented out (current state)
2. Login will work with any Auth0 user
3. Brand switching and theming will work
4. Organization info on dashboard will show placeholder IDs
5. All authenticated users can access all brands

This is useful for:
- Testing UI and brand theming
- Demo purposes without full Auth0 setup
- Development before production deployment

## Production Setup

For production with real multi-brand isolation:

1. ✅ Complete all steps above
2. ✅ Set up custom domains for each brand
3. ✅ Update Auth0 allowed callbacks for each domain
4. ✅ Deploy to production environment
5. ✅ Test login flow for each brand
6. ✅ Verify organization isolation

## Resources

- [Auth0 Organizations Docs](https://auth0.com/docs/manage-users/organizations)
- [Auth0 Actions Docs](https://auth0.com/docs/customize/actions)
- [B2B Identity Guide](https://auth0.com/docs/get-started/architecture-scenarios/business-to-business-identity-and-access-management)
