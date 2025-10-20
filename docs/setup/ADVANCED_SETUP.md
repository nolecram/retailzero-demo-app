# Advanced Setup: Multi-Brand Organizations

This guide covers setting up Auth0 Organizations for multi-tenant architecture.

## Overview

RetailZero uses Auth0 Organizations to isolate customers by brand:
- 5 brand organizations (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero)
- 1 central organization (RetailZero) for employees and admins

## Step 1: Get Management API Token

### Quick Method (24-hour token)
1. Go to: https://manage.auth0.com/dashboard/[tenant]/apis/management/explorer
2. Click **"API Explorer"** tab
3. Click **"Create & Authorize Test Application"**
4. Copy the token

### Production Method (Permanent token)
1. Create Machine-to-Machine Application
2. Authorize for Management API
3. Grant required scopes:
   - `create:organizations`
   - `read:organizations`
   - `update:organizations`
   - `create:organization_connections`
   - `create:users`
   - `update:users`
   - `create:roles`
   - `read:roles`

## Step 2: Enable Organizations

```bash
node scripts/enable-organizations.js YOUR_TOKEN
```

This enables the Organizations feature for your Auth0 application.

## Step 3: Create Organizations

```bash
node scripts/create-organizations.js YOUR_TOKEN
```

This creates 5 brand organizations and 1 central organization.

## Step 4: Create Roles

```bash
node scripts/update-roles.js YOUR_TOKEN
```

Creates three roles:
- **customer**: For brand customers
- **employee**: For internal staff
- **admin**: For administrators

## Step 5: Create Users

### Admins (Central Organization)
```bash
node scripts/create-admin-users.js YOUR_TOKEN
```

Creates 4 admin users: admin1-4@retailzero.com

### Employees (Central Organization)
```bash
node scripts/create-employee-users.js YOUR_TOKEN
```

Creates 4 employee users: employee1-4@retailzero.com

### Customers (Brand Organizations)
```bash
node scripts/create-customer-users.js YOUR_TOKEN
```

Creates 4 customers per brand (20 total):
- customer1-4+autozero@goingtobuy.com
- customer1-4+campnation@goingtobuy.com
- etc.

**Note**: Rate limits may prevent all users from being created at once. Re-run after 1 hour.

## Step 6: Update Application Code

The organization IDs are already configured in `src/config/brands.js`. The organization parameter is passed dynamically during login.

## Verification

### Test Customer Login
1. Go to http://localhost:3000
2. Select a brand (e.g., AutoZero)
3. Click "Get Started"
4. Login with: customer1+autozero@goingtobuy.com / Melbourne.2005
5. Should redirect to Customer Authenticated page

### Test Employee Login
1. Go to http://localhost:3000
2. Click "Employee & Admin Login" in footer
3. Login with: employee1@retailzero.com / Melbourne.2025
4. Should redirect to Employee Authenticated page

### Test Admin Login
1. Follow employee login steps
2. Login with: admin1@retailzero.com / Melbourne.2025
3. Should redirect to Admin Authenticated page

## Troubleshooting

### Organizations Not Appearing
- Verify Organizations feature is enabled in Auth0 dashboard
- Check tenant settings → Features → Organizations

### Users Can't Login
- Verify users are members of correct organization
- Check organization has Username-Password-Authentication enabled
- Verify connection is enabled for the application

### Rate Limit Errors
- Auth0 free tier: 2 requests/second, 1000/day
- Wait 1 hour between bulk operations
- Consider upgrading plan for production

## Architecture

```
┌─────────────────────────────────────────────────┐
│              RetailZero Application              │
└─────────────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
   Customers                   Employees/Admins
        │                           │
   ┌────┴────┐                 ┌────┴────┐
   │ 5 Brand │                 │ Central │
   │  Orgs   │                 │   Org   │
   └─────────┘                 └─────────┘
   • AutoZero                  • RetailZero
   • CampNation               
   • BBQ1                      4 Admins
   • OfficeZero               4 Employees
   • CandyZero
   
   4 Customers each
   (20 total)
```

## Next Steps

- Review [Architecture Documentation](../architecture/MULTI_BRAND_ARCHITECTURE.md)
- Test role-based access control
- Configure custom domains (optional)
- Set up email templates (optional)
