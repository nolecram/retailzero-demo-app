# 🚀 Quick Start: Multi-Brand Setup

## What Was Built

Your RetailZero app now supports **5 different brands** using **Auth0 Organizations**:

✅ **Brand A, B, C, D, E** - Each with unique colors and branding  
✅ **Dynamic brand switching** - Users see their brand's theme  
✅ **Organization-based authentication** - Each brand is an Auth0 Organization  
✅ **Brand-aware pages** - Landing, Dashboard, and Admin pages show brand context  
✅ **Admin overview** - Admins can see all 5 brands at once  

## How It Works

### 🎨 Brand Detection
1. App detects brand from subdomain (e.g., `brand-a.retailzero.com`)
2. Falls back to Brand A if no subdomain
3. Demo mode: Use dropdown to switch brands

### 🔐 Auth0 Organizations
Each brand maps to an Auth0 Organization:
- **Brand A** → `org_brandA123`
- **Brand B** → `org_brandB456`
- **Brand C** → `org_brandC789`
- **Brand D** → `org_brandD012`
- **Brand E** → `org_brandE345`

When users log in, they're scoped to their brand's organization.

## 📋 Setup Checklist

### [ ] 1. Create Auth0 Organizations

In your Auth0 Dashboard:

1. Go to **Organizations** → **Create Organization**
2. Create 5 organizations:
   - Name: Brand A, Brand B, Brand C, Brand D, Brand E
3. Note the Organization IDs (format: `org_xxxxx`)
4. Update `src/config/brands.js` with real Organization IDs

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

- **Brand A**: Red/Teal (#FF6B6B / #4ECDC4)
- **Brand B**: Mint Green (#95E1D3 / #38ADA9)
- **Brand C**: Pink/Purple (#F38181 / #AA96DA)
- **Brand D**: Pink/Yellow (#FCBAD3 / #FFFFD2)
- **Brand E**: Blue/Purple (#A8D8EA / #AA96DA)

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
