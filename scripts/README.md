# RetailZero Setup Scripts

Automation scripts for setting up Auth0 Organizations, users, and roles for the RetailZero multi-brand application.

## 📋 Prerequisites

Create a `.env` file in the project root with your Auth0 credentials:

```env
AUTH0_DOMAIN=retailzero-demo.au.auth0.com
AUTH0_CLIENT_ID=xERyHPEBariMBWqKdMV2we1qFyhi3So6
AUTH0_CLIENT_SECRET=your-m2m-client-secret
AUTH0_MANAGEMENT_API_AUDIENCE=https://retailzero-demo.au.auth0.com/api/v2/
```

**Note**: These scripts require a Machine-to-Machine application with Management API access.

## 🚀 Quick Setup

Run scripts in this order for complete setup:

```bash
# 1. Create brand organizations
node scripts/create-organizations.js

# 2. Create RetailZero central organization
node scripts/create-retailzero-org.js

# 3. Enable Organizations feature
node scripts/enable-organizations.js

# 4. Create admin users
node scripts/create-admin-users.js

# 5. Create employee users
node scripts/create-employee-users.js

# 6. Create customer users
node scripts/create-customer-users.js

# 7. Assign roles to users
node scripts/update-roles.js

# 8. Update callback URLs
node scripts/update-callback-urls.js
```

## 📂 Script Details

### Organization Management

#### `create-organizations.js`
Creates 5 brand organizations in Auth0:
- AutoZero (Automotive parts)
- CampNation (Outdoor gear)
- BBQ1 (BBQ equipment)
- OfficeZero (Office supplies)
- CandyZero (Confectionery)

**Output**: Organization IDs for each brand

#### `create-retailzero-org.js`
Creates the central RetailZero organization for employees and admins.

**Output**: RetailZero organization ID

#### `verify-retailzero-org.js`
Verifies the RetailZero organization exists and displays its details.

**Usage**: Diagnostic tool to check organization setup

#### `enable-organizations.js`
Enables the Organizations feature in your Auth0 tenant.

**Note**: Only needs to be run once per tenant

### User Management

#### `create-admin-users.js`
Creates 4 admin users in the RetailZero organization:
- admin1@retailzero.com
- admin2@retailzero.com
- admin3@retailzero.com
- admin4@retailzero.com

**Default Password**: `Melbourne.2025`

#### `create-employee-users.js`
Creates 4 employee users in the RetailZero organization:
- employee1@retailzero.com
- employee2@retailzero.com
- employee3@retailzero.com
- employee4@retailzero.com

**Default Password**: `Melbourne.2025`

#### `create-customer-users.js`
Creates 4 customer users for each brand (20 total):
- customer1+autozero@goingtobuy.com
- customer1+campnation@goingtobuy.com
- customer1+bbq1@goingtobuy.com
- customer1+officezero@goingtobuy.com
- customer1+candyzero@goingtobuy.com
- (and customer2, customer3, customer4 for each brand)

**Default Password**: `Melbourne.2005`

### Configuration

#### `update-roles.js`
Assigns roles to users:
- Admins → `admin` role
- Employees → `employee` role
- Customers → `customer` role

**Note**: Roles must exist in Auth0 before running this script

#### `update-callback-urls.js`
Updates Auth0 application callback URLs for local development and production.

**URLs Added**:
- `http://localhost:3000`
- `http://localhost:3000/callback`
- (Add production URLs as needed)

## 🔧 Environment Variables

All scripts require these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `AUTH0_DOMAIN` | Your Auth0 domain | `retailzero-demo.au.auth0.com` |
| `AUTH0_CLIENT_ID` | M2M Client ID | `xERyHPEBariMBWqKdMV2we1qFyhi3So6` |
| `AUTH0_CLIENT_SECRET` | M2M Client Secret | `your-secret-here` |
| `AUTH0_MANAGEMENT_API_AUDIENCE` | Management API URL | `https://retailzero-demo.au.auth0.com/api/v2/` |

## 🛡️ Security Notes

- **Never commit** `.env` file to version control
- Use **Machine-to-Machine** application for scripts
- Grant **minimum required scopes** to M2M app
- **Rotate secrets** regularly
- Use **different passwords** in production

## 🔍 Troubleshooting

### "Insufficient scope" error
Grant your M2M app the following scopes:
- `create:organizations`
- `read:organizations`
- `create:organization_members`
- `create:users`
- `update:users`
- `create:roles`
- `update:roles`

### "Organization already exists" error
Organizations are unique by name. Either:
1. Delete the existing organization in Auth0 dashboard
2. Modify the script to use a different name

### "User already exists" error
Users are unique by email. The script will skip existing users.

## 📚 Additional Resources

- [Auth0 Management API](https://auth0.com/docs/api/management/v2)
- [Auth0 Organizations](https://auth0.com/docs/manage-users/organizations)
- [Node.js Auth0 SDK](https://github.com/auth0/node-auth0)

---

**Need help?** Check the main [Setup Guide](../docs/SETUP.md) or [Advanced Setup](../docs/setup/ADVANCED_SETUP.md)
