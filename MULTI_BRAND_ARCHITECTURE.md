# Multi-Brand Architecture for RetailZero

## Overview

This application demonstrates a **multi-brand retail platform** where a single codebase serves 5 different retail brands, each with its own branding, user base, and Auth0 Organization.

## Architecture Approach: Auth0 Organizations

### Why Auth0 Organizations?

Auth0 Organizations provide the perfect solution for multi-tenant B2B applications where:
- Each brand operates as a separate tenant
- Users belong to specific brands (organizations)
- Brand-specific authentication flows and branding
- Isolated user management per brand
- Centralized administration across all brands

## 5 RetailZero Brands

| Brand | Organization ID | Primary Color | Secondary Color | Domain |
|-------|----------------|---------------|-----------------|---------|
| AutoZero | `org_hC536v5MhZj2GMtF` | #FF6B35 | #004E89 | autozero.retailzero.com |
| CampNation | `org_BR45iMQDE2iNKP8R` | #2D6A4F | #52B788 | campnation.retailzero.com |
| BBQ1 | `org_ubS05VW6UFh2xI1W` | #D00000 | #370617 | bbq1.retailzero.com |
| OfficeZero | `org_TxqSP6gqpe4cE0Tf` | #4361EE | #3F37C9 | officezero.retailzero.com |
| CandyZero | `org_bt36R0WKuJ3rtiuM` | #F72585 | #7209B7 | candyzero.retailzero.com |

## Implementation Details

### 1. Brand Configuration (`src/config/brands.js`)
- Centralized configuration for all 5 brands
- Each brand has unique theme colors, logo, and organization ID
- Helper functions to detect brand from subdomain

### 2. Brand Context (`src/context/BrandContext.js`)
- React Context for brand state management
- Dynamic theme application based on current brand
- Brand switching capability for demo purposes

### 3. Auth0 Integration (`src/index.js`)
```javascript
<Auth0Provider
  domain="retailzero-demo.au.auth0.com"
  clientId="xERyHPEBariMBWqKdMV2we1qFyhi3So6"
  authorizationParams={{ 
    redirect_uri: window.location.origin,
    organization: currentBrand.orgId, // 🔑 Key: Organization parameter
  }}
>
```

The `organization` parameter ensures:
- Users can only log in to their assigned brand
- Authentication is scoped to the specific organization
- User metadata is brand-specific

### 4. Brand Detection
The app detects the current brand via:
1. **Subdomain**: `brand-a.retailzero.com` → Brand A
2. **Manual Selection**: Brand selector dropdown (demo only)
3. **Default**: Falls back to Brand A

### 5. Brand-Specific Features

#### Landing Page
- Branded welcome message
- Brand-specific colors and styling
- Customized call-to-action

#### Dashboard
- Shows user's organization info
- Brand-themed widgets
- Organization ID display

#### Admin Panel
- Overview of all 5 brands
- Brand-specific management
- Visual representation of brand themes

## Auth0 Setup Required

### Step 1: Create Organizations in Auth0

For each of the 5 brands, create an Organization:

1. Go to Auth0 Dashboard → **Organizations**
2. Click **Create Organization**
3. Set Organization details:
   - **Name**: Brand A (or B, C, D, E)
   - **Display Name**: Brand A
   - **Organization ID**: Will be auto-generated (use in config)

Repeat for all 5 brands.

### Step 2: Enable Organizations in Application

1. Go to **Applications** → Your Application
2. Navigate to **Settings** → **Advanced Settings** → **Organization Settings**
3. Enable: **✓ Prompt for organization**
4. Set: **Type of organizations**: Business-to-Business (B2B)

### Step 3: Add Users to Organizations

For each brand, add test users:

1. Go to **Organizations** → Select a brand
2. Click **Members** tab
3. Click **Add Members**
4. Add or invite users specific to that brand

### Step 4: Configure Organization Login

Users can log in by:
- **Direct Organization URL**: Include organization parameter
- **Organization Prompt**: User selects their organization during login
- **Home Realm Discovery**: Automatic detection based on email domain

### Step 5: Set Up Roles (Optional)

To implement admin roles:

1. Create an **Action** (Auth0 Dashboard → Actions → Flows → Login)
2. Add custom claims to include roles:

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

## Deployment Options

### Option 1: Subdomain-based (Production)
- Deploy to: `brand-a.retailzero.com`, `brand-b.retailzero.com`, etc.
- Each subdomain points to the same app
- App detects brand from subdomain
- Update Auth0 allowed callbacks for each subdomain

### Option 2: Path-based
- Deploy to: `retailzero.com/brand-a`, `retailzero.com/brand-b`, etc.
- Modify routing to include brand in path
- Single domain, multiple paths

### Option 3: Single App with Selector (Demo)
- Deploy to: `retailzero.com`
- Users select their brand via dropdown
- Good for demo/prototype purposes
- Current implementation

## Benefits of This Approach

### ✅ Scalability
- Add new brands by updating configuration
- No code duplication per brand
- Centralized authentication

### ✅ Security
- Users isolated per organization
- Can't access other brands' data
- Organization-level permissions

### ✅ Maintainability
- Single codebase for all brands
- Shared components with brand theming
- Easy to update all brands at once

### ✅ User Experience
- Brand-specific look and feel
- Familiar authentication flow
- Seamless brand switching for admins

## Alternative Approaches Considered

### 1. Separate Auth0 Tenants
- ❌ More complex setup
- ❌ Higher cost (5 tenants)
- ❌ Harder to manage centrally
- ✅ Complete isolation

### 2. Single Tenant with Metadata
- ✅ Simpler setup
- ❌ No organization-level controls
- ❌ Manual brand filtering required
- ❌ Less scalable

### 3. Separate Applications
- ❌ Code duplication
- ❌ Harder to maintain
- ❌ More deployment complexity
- ✅ Complete independence

## Next Steps

1. **Create 5 Auth0 Organizations** matching the brand configuration
2. **Update Organization IDs** in `src/config/brands.js` with real IDs
3. **Set up custom domains** for each brand (optional)
4. **Configure Auth0 Actions** for role management
5. **Add brand-specific features** to dashboard and admin
6. **Implement brand-specific APIs** with organization filtering
7. **Add brand analytics** and reporting

## Testing

To test multi-brand functionality:

1. **Create test users** in each organization
2. **Log in as Brand A user** → Should only access Brand A
3. **Log in as Brand B user** → Should only access Brand B
4. **Log in as admin** → Should access all brands
5. **Test brand switching** via dropdown (demo mode)

## Resources

- [Auth0 Organizations Documentation](https://auth0.com/docs/manage-users/organizations)
- [B2B Identity Best Practices](https://auth0.com/docs/authenticate/protocols/saml)
- [Multi-tenant Architecture Guide](https://auth0.com/docs/get-started/architecture-scenarios/multiple-organization-architecture)
