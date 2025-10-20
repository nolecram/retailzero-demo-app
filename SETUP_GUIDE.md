# 🚀 Quick Start: Multi-Brand Setup

## What Was Built

Your RetailZero app now supports **5 different brands** using **Auth0 Organizations**:

✅ **AutoZero, CampNation, BBQ1, OfficeZero, CandyZero** - Each with unique colors and branding  
✅ **Dynamic brand switching** - Users see their brand's theme  
✅ **Organization-based authentication** - Each brand is an Auth0 Organization  
✅ **Brand-aware pages** - Landing, Dashboard, and Admin pages show brand context  
✅ **Admin overview** - Admins can see all 5 brands at once  

## How It Works

### 🎨 Brand Detection
1. App detects brand from subdomain (e.g., `autozero.retailzero.com`)
2. Falls back to AutoZero if no subdomain
3. Demo mode: Use dropdown to switch brands

### 🔐 Auth0 Organizations
Each brand maps to an Auth0 Organization:
- **AutoZero** → `org_hC536v5MhZj2GMtF`
- **CampNation** → `org_BR45iMQDE2iNKP8R`
- **BBQ1** → `org_ubS05VW6UFh2xI1W`
- **OfficeZero** → `org_TxqSP6gqpe4cE0Tf`
- **CandyZero** → `org_bt36R0WKuJ3rtiuM`

When users log in, they're scoped to their brand's organization.

## 📋 Setup Checklist

### [ ] 1. Create Auth0 Organizations

✅ **COMPLETED** - Organizations already created in Auth0:

1. **AutoZero** - `org_hC536v5MhZj2GMtF`
2. **CampNation** - `org_BR45iMQDE2iNKP8R`
3. **BBQ1** - `org_ubS05VW6UFh2xI1W`
4. **OfficeZero** - `org_TxqSP6gqpe4cE0Tf`
5. **CandyZero** - `org_bt36R0WKuJ3rtiuM`

Organization IDs have been updated in `src/config/brands.js`.

### [ ] 2. Configure Application for Organizations

1. Go to **Applications** → Select your app
2. **Settings** → **Advanced Settings** → **Organization Settings**
3. Enable: **Prompt for organization**
4. Set Business-to-Business (B2B) mode

### [ ] 3. Add Test Users

For each organization:
1. Go to **Organizations** → Select organization
2. Click **Members** → **Add Members**
3. Create or invite users
4. Assign roles (optional: add `admin` to app_metadata.roles)

### [ ] 4. Set Up Auth0 Action for Roles

Create an Action in Auth0 Dashboard:

```javascript
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://retailzero.com';
  
  // Add roles to token
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

### [ ] 5. Test the Application

```bash
npm start
```

Then:
- Visit `http://localhost:3000`
- Switch brands using the dropdown
- Log in with users from different organizations
- Verify brand-specific theming
- Test admin access

## 🎯 Key Files Modified

| File | Purpose |
|------|---------|
| `src/config/brands.js` | Brand configuration (5 brands) |
| `src/context/BrandContext.js` | Brand state management |
| `src/components/BrandSelector.js` | Brand switching UI |
| `src/index.js` | Auth0Provider with organization parameter |
| `src/App.js` | Brand-aware navigation and routing |
| `src/pages/*.js` | Brand-specific page content |
| `src/App.css` | Brand-themed styles |

## 🔧 Current Configuration

**Auth0 Tenant:** `retailzero-demo.au.auth0.com`  
**Client ID:** `xERyHPEBariMBWqKdMV2we1qFyhi3So6`  

⚠️ **Note:** These are currently hardcoded. For production:
1. Create a `.env` file
2. Add:
   ```
   REACT_APP_AUTH0_DOMAIN=retailzero-demo.au.auth0.com
   REACT_APP_AUTH0_CLIENT_ID=xERyHPEBariMBWqKdMV2we1qFyhi3So6
   ```
3. Update `src/index.js` to use environment variables

## 🎨 Brand Themes

Each brand has unique colors that are applied automatically:

- **AutoZero**: Orange/Blue (#FF6B35 / #004E89)
- **CampNation**: Green (#2D6A4F / #52B788)
- **BBQ1**: Red/Dark Red (#D00000 / #370617)
- **OfficeZero**: Blue/Purple (#4361EE / #3F37C9)
- **CandyZero**: Pink/Purple (#F72585 / #7209B7)

## 📱 Pages Overview

### Landing Page (`/`)
- Public access
- Brand-specific welcome message
- "Get Started" button for authentication
- Feature list

### Dashboard (`/dashboard`)
- Protected: Requires authentication
- Shows user profile
- Displays current organization
- Brand-themed widgets

### Admin Panel (`/admin`)
- Protected: Requires admin role
- Overview of current brand
- Shows all 5 brands
- User management placeholder

## 🚀 Next Steps

1. ✅ Create Auth0 Organizations
2. ✅ Update organization IDs in config
3. ✅ Add test users to each organization
4. ✅ Set up Auth0 Actions for roles
5. ⬜ Add brand-specific APIs
6. ⬜ Implement real user management
7. ⬜ Add analytics per brand
8. ⬜ Configure custom domains

## 📚 Documentation

- **MULTI_BRAND_ARCHITECTURE.md** - Detailed architecture explanation
- **README.md** - General project information

## 🆘 Troubleshooting

### Users can't log in to specific brands
- Check organization is created in Auth0
- Verify user is a member of the organization
- Check organization ID matches config

### Brand themes not applying
- Check browser console for errors
- Verify BrandContext is wrapping the app
- Check CSS variables in App.css

### Admin page shows "Access denied"
- Ensure user has admin role in app_metadata
- Verify Auth0 Action is adding roles to token
- Check role claim namespace matches

## 💡 Tips for Demo

1. **Use the brand selector** to show different brands without logging out
2. **Log in with different users** to show organization isolation
3. **Show admin panel** to demonstrate all 5 brands overview
4. **Highlight color theming** changes when switching brands
5. **Explain organization parameter** in Auth0 login flow
