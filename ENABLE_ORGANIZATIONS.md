# How to Enable Organizations Feature in Auth0

## Current Issue

The application is getting this error:
```
parameter organization is not allowed for this client
```

This means the Auth0 application needs to be configured to support the Organizations feature.

## Solution: Enable Organizations in Auth0

### Step 1: Go to Auth0 Dashboard

1. Navigate to [Auth0 Dashboard](https://manage.auth0.com)
2. Select your tenant: `retailzero-demo.au.auth0.com`

### Step 2: Enable Organizations for Your Application

1. Go to **Applications** → **Applications**
2. Select your application: `retailzero-demo` (Client ID: `xERyHPEBariMBWqKdMV2we1qFyhi3So6`)
3. Scroll down to **Application Properties** section
4. Find **Organization Usage** setting
5. Select one of these options:
   - **"Prompt for Organizations"** - User selects which organization to log in to
   - **"Require Organization"** - Organization parameter is required (recommended for our app)
   - **"No Prompt"** - Works with or without organization parameter

**Recommended Setting**: Choose **"Require Organization"** or **"Prompt for Organizations"**

6. Click **Save Changes** at the bottom

### Step 3: Configure Organizations

Make sure your 5 organizations exist in Auth0:

1. Go to **Organizations** in the left sidebar
2. Verify these organizations exist:
   - **AutoZero** - `org_hC536v5MhZj2GMtF`
   - **CampNation** - `org_BR45iMQDE2iNKP8R`
   - **BBQ1** - `org_ubS05VW6UFh2xI1W`
   - **OfficeZero** - `org_TxqSP6gqpe4cE0Tf`
   - **CandyZero** - `org_bt36R0WKuJ3rtiuM`

If they don't exist, see `QUICK_SETUP.md` for how to create them.

### Step 4: Enable Application for Each Organization

For each organization:

1. Go to **Organizations** → Select organization
2. Click **Applications** tab
3. Click **+ Add Application**
4. Select your application: `retailzero-demo`
5. Click **Add Application**
6. Repeat for all 5 organizations

### Step 5: Enable Organization Parameter in Code

Once Auth0 is configured, uncomment the organization parameter in `src/index.js`:

```javascript
// Change this:
// organization: currentBrand.orgId, // Temporarily disabled

// To this:
organization: currentBrand.orgId,
```

### Step 6: Test the Application

1. Restart your dev server (if running): `npm start`
2. Click "Get Started" button
3. You should now log in successfully with organization-scoped authentication

---

## Temporary Workaround (Current Configuration)

The organization parameter is currently **commented out** in `src/index.js` so the app works without Organizations feature enabled.

**What this means:**
- ✅ Authentication works
- ✅ All pages are accessible
- ❌ Users are not scoped to specific organizations
- ❌ Multi-tenant isolation is not enforced

**To enable full multi-brand architecture:**
Follow steps 1-6 above to enable Organizations in Auth0.

---

## Verification Checklist

After enabling Organizations:

- [ ] Auth0 application has Organization Usage set to "Require Organization" or "Prompt"
- [ ] All 5 organizations exist in Auth0
- [ ] Your application is added to all 5 organizations
- [ ] Organization parameter is uncommented in `src/index.js`
- [ ] App restarts successfully
- [ ] Login works without errors
- [ ] Users are scoped to their organization

---

## Troubleshooting

**Error: "parameter organization is not allowed"**
- Solution: Enable Organizations in Auth0 application settings (Step 2)

**Error: "organization does not exist"**
- Solution: Create the organizations in Auth0 (Step 3)

**Error: "application is not enabled for organization"**
- Solution: Add application to organization (Step 4)

**Login redirects to wrong URL**
- Check that `http://localhost:3000` is in:
  - Allowed Callback URLs
  - Allowed Logout URLs
  - Allowed Web Origins

---

## Reference

- **Auth0 Organizations Documentation**: https://auth0.com/docs/manage-users/organizations
- **Organization Parameter**: https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-organizations-applications
- **Multi-Tenant Architecture**: https://auth0.com/docs/manage-users/organizations/organizations-overview
