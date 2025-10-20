# Quick Guide: Enable Organizations via API

## Step 1: Get Management API Token

### Option A: Using API Explorer (Easiest)

1. Go to: https://manage.auth0.com/#/apis/management/explorer
2. Click the **"API Explorer"** tab
3. The token is displayed at the top - copy it
4. This token expires in 24 hours

### Option B: Create a Machine-to-Machine Application (Permanent)

1. Go to **Applications** → **Applications** → **Create Application**
2. Name: "Management API Access"
3. Type: **Machine to Machine Applications**
4. Click **Create**
5. Select **Auth0 Management API**
6. Grant these permissions:
   - `read:clients`
   - `update:clients`
   - `read:organizations`
   - `update:organizations`
   - `create:organization_connections`
7. Click **Authorize**
8. Go to **Settings** tab and copy the **Client ID** and **Client Secret**
9. Get a token using:
   ```bash
   curl --request POST \
     --url https://retailzero-demo.au.auth0.com/oauth/token \
     --header 'content-type: application/json' \
     --data '{"client_id":"YOUR_CLIENT_ID","client_secret":"YOUR_CLIENT_SECRET","audience":"https://retailzero-demo.au.auth0.com/api/v2/","grant_type":"client_credentials"}'
   ```

## Step 2: Run the Script

```bash
node scripts/enable-organizations.js YOUR_TOKEN_HERE
```

**Example:**
```bash
node scripts/enable-organizations.js eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6...
```

## Step 3: What the Script Does

The script will:

1. ✅ Update your application to **require organization parameter**
2. ✅ Add your application to all 5 organizations:
   - AutoZero (`org_hC536v5MhZj2GMtF`)
   - CampNation (`org_BR45iMQDE2iNKP8R`)
   - BBQ1 (`org_ubS05VW6UFh2xI1W`)
   - OfficeZero (`org_TxqSP6gqpe4cE0Tf`)
   - CandyZero (`org_bt36R0WKuJ3rtiuM`)

## Step 4: After Running the Script

Once the script succeeds, you need to:

1. **Uncomment the organization parameter** in `src/index.js`:
   ```javascript
   // Change from:
   // organization: currentBrand.orgId,
   
   // To:
   organization: currentBrand.orgId,
   ```

2. **Restart your app**:
   ```bash
   npm start
   ```

3. **Test the login** - it should now work with organization-scoped authentication!

## Expected Output

```
🚀 Enabling Organizations for RetailZero Application
================================================

Domain: retailzero-demo.au.auth0.com
Client ID: xERyHPEBariMBWqKdMV2we1qFyhi3So6
Organizations: 5

📝 Step 1: Updating application to require organization...
   Found application: retailzero-demo
   ✅ Application updated to require organization parameter

📝 Step 2: Adding application to organizations...
   ✅ AutoZero (org_hC536v5MhZj2GMtF)
   ✅ CampNation (org_BR45iMQDE2iNKP8R)
   ✅ BBQ1 (org_ubS05VW6UFh2xI1W)
   ✅ OfficeZero (org_TxqSP6gqpe4cE0Tf)
   ✅ CandyZero (org_bt36R0WKuJ3rtiuM)

   Added to 5/5 organizations

✅ SUCCESS! Organizations enabled for your application

📋 Next steps:
   1. Uncomment the organization parameter in src/index.js
   2. Restart your app: npm start
   3. Test login with organization-scoped authentication

Your application is now ready for multi-brand authentication! 🎉
```

## Troubleshooting

**Error: "Insufficient scope"**
- Solution: Make sure your token has the required permissions (see Option B above)

**Error: "401 Unauthorized"**
- Solution: Your token may have expired. Get a new one from the API Explorer

**Error: "404 Not Found"**
- Solution: Check that the organization IDs are correct in Auth0

**Error: "Client not found"**
- Solution: Verify the Client ID is correct

## Alternative: Manual Configuration

If the script fails, you can still enable Organizations manually in the Auth0 Dashboard:
See `ENABLE_ORGANIZATIONS.md` for step-by-step instructions.
