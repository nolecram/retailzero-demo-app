# Quick Setup: Auth0 Organizations for RetailZero

## 🚀 Quick Start (3 Steps)

### Step 1: Get Management API Token

1. Go to: https://manage.auth0.com/dashboard/us/retailzero-demo/apis/management/explorer
2. Click **"API Explorer"** tab
3. Click **"Create & Authorize Test Application"**
4. Copy the **Token** that appears

### Step 2: Run the Script

```bash
# Option A: Pass token as argument
node scripts/create-organizations.js YOUR_TOKEN_HERE

# Option B: Use environment variable
export AUTH0_MGMT_TOKEN=your_token_here
node scripts/create-organizations.js
```

The script will create all 5 organizations and show you the Organization IDs.

### Step 3: Update Your Code

The script will output the exact code you need. Just copy and paste the Organization IDs into `src/config/brands.js`.

Then uncomment this line in `src/index.js`:
```javascript
organization: currentBrand.orgId, // ← Uncomment this
```

---

## 📋 What the Script Does

✅ Creates 5 Auth0 Organizations:
- **AutoZero** (`autozero`)
- **CampNation** (`campnation`)
- **BBQ1** (`bbq1`)
- **OfficeZero** (`officezero`)
- **CandyZero** (`candyzero`)

✅ Checks for existing organizations (won't duplicate)  
✅ Outputs Organization IDs ready to copy/paste  
✅ Shows you the exact next steps

---

## 🎯 After Running the Script

### 1. Update Brand Configuration

Copy the Organization IDs from the script output and update `src/config/brands.js`:

```javascript
export const BRANDS = {
  AUTO_ZERO: {
    id: 'autozero',
    name: 'AutoZero',
    orgId: 'org_PASTE_ID_HERE', // ← Paste the ID from script output
    // ... rest stays the same
  },
  // ... repeat for all 5 brands
};
```

### 2. Enable Organization Parameter

In `src/index.js`, uncomment:

```javascript
authorizationParams={{ 
  redirect_uri: window.location.origin,
  organization: currentBrand.orgId, // ← Uncomment this line
}}
```

### 3. Configure Application

1. Go to: https://manage.auth0.com/dashboard/us/retailzero-demo/applications
2. Click on your application: **RetailZero Demo App**
3. Go to **Settings** → **Advanced Settings** → **Organization Settings**
4. Enable: **✓ Accept specified organization**
5. Click **Save Changes**

### 4. Add Test Users

For each organization:
1. Go to: https://manage.auth0.com/dashboard/us/retailzero-demo/organizations
2. Click on the organization (e.g., AutoZero)
3. Click **Members** tab
4. Click **Add Members**
5. Add or invite users

**Example test users:**
```
john@autozero.com     → AutoZero
sarah@campnation.com  → CampNation
mike@bbq1.com         → BBQ1
lisa@officezero.com   → OfficeZero
alex@candyzero.com    → CandyZero
```

### 5. Test the Setup

```bash
npm start
```

Then:
1. Visit http://localhost:3000
2. Switch brands using the dropdown
3. Click "Log In"
4. Select organization (if prompted)
5. Verify brand colors and organization info

---

## ⚠️ Troubleshooting

### "Invalid token" or "Unauthorized"
- Token expired (get a new one from Auth0 Dashboard)
- Wrong tenant/domain
- Token doesn't have `create:organizations` scope

### Script shows "Already exists"
- Organizations were already created
- Use the IDs shown and update your code
- Script is idempotent (safe to run multiple times)

### Can't log in after setup
- Uncomment the organization parameter in `src/index.js`
- Configure application for organizations in Auth0
- Add user to the organization

---

## 📚 Documentation References

- [Complete Setup Guide](./create-auth0-organizations.md)
- [Auth0 Organizations Docs](https://auth0.com/docs/manage-users/organizations)
- [Multi-Brand Architecture](./MULTI_BRAND_ARCHITECTURE.md)
- [Setup Instructions](./AUTH0_SETUP_INSTRUCTIONS.md)

---

## ✅ Checklist

- [ ] Got Management API token
- [ ] Ran `create-organizations.js` script
- [ ] Updated `src/config/brands.js` with real Organization IDs
- [ ] Uncommented organization parameter in `src/index.js`
- [ ] Configured application in Auth0 Dashboard
- [ ] Added test users to organizations
- [ ] Tested login flow
- [ ] Verified brand isolation

---

**Need help?** Check the detailed guide: `create-auth0-organizations.md`
