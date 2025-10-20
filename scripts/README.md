# Auth0 Automation Scripts

This directory contains Node.js scripts for automating Auth0 configuration and user management.

## Prerequisites

- Node.js 16+
- Auth0 Management API token with appropriate scopes

## Getting a Management API Token

### Quick Method (24-hour token)
1. Go to: https://manage.auth0.com/dashboard/[tenant]/apis/management/explorer
2. Click "API Explorer" tab
3. Click "Create & Authorize Test Application"
4. Copy the token

### Production Method (Long-lived token)
Create a Machine-to-Machine application with Management API access. See [Advanced Setup Guide](../docs/setup/ADVANCED_SETUP.md#step-1-get-management-api-token).

## Scripts

### 1. Enable Organizations
**File**: `enable-organizations.js`

Enables the Organizations feature for your Auth0 application.

```bash
node scripts/enable-organizations.js YOUR_TOKEN
```

**Required Scopes**:
- `read:clients`
- `update:clients`

**What it does**:
- Enables Organizations feature for the application
- Enables Username-Password-Authentication connection for organizations

---

### 2. Create Organizations
**File**: `create-organizations.js`

Creates 5 brand organizations and 1 central RetailZero organization.

```bash
node scripts/create-organizations.js YOUR_TOKEN
```

**Required Scopes**:
- `create:organizations`
- `read:organizations`
- `create:organization_connections`

**What it creates**:
- AutoZero (`org_hC536v5MhZj2GMtF`)
- CampNation (`org_BR45iMQDE2iNKP8R`)
- BBQ1 (`org_ubS05VW6UFh2xI1W`)
- OfficeZero (`org_TxqSP6gqpe4cE0Tf`)
- CandyZero (`org_bt36R0WKuJ3rtiuM`)
- RetailZero (`org_K6sjZprHVLfXgIzs`) - Central organization

---

### 3. Update Roles
**File**: `update-roles.js`

Creates and configures three user roles.

```bash
node scripts/update-roles.js YOUR_TOKEN
```

**Required Scopes**:
- `create:roles`
- `read:roles`
- `update:roles`

**What it creates**:
- `customer` role (`rol_5DIQEmj3Z4XG3i2k`)
- `employee` role (`rol_4p5nPnXdL0T0cIKt`)
- `admin` role (`rol_gmI0zSWSCSdVbHwW`)

---

### 4. Create Admin Users
**File**: `create-admin-users.js`

Creates 5 admin users in the central RetailZero organization.

```bash
node scripts/create-admin-users.js YOUR_TOKEN
```

**Required Scopes**:
- `create:users`
- `read:users`
- `read:roles`
- `create:role_members`
- `create:organization_members`

**What it creates**:
- admin1@retailzero.com
- admin2@retailzero.com
- admin3@retailzero.com
- admin4@retailzero.com
- admin5@retailzero.com

**Password**: `Melbourne.2025`

---

### 5. Create Employee Users
**File**: `create-employee-users.js`

Creates 4 employee users in the central RetailZero organization.

```bash
node scripts/create-employee-users.js YOUR_TOKEN
```

**Required Scopes**: Same as admin users

**What it creates**:
- employee1@retailzero.com
- employee2@retailzero.com
- employee3@retailzero.com
- employee4@retailzero.com

**Password**: `Melbourne.2025`

---

### 6. Create Customer Users
**File**: `create-customer-users.js`

Creates 4 customer users for each of the 5 brands (20 total users).

```bash
node scripts/create-customer-users.js YOUR_TOKEN
```

**Required Scopes**: Same as admin users

**What it creates**:
For each brand (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero):
- customer1+[brand]@goingtobuy.com
- customer2+[brand]@goingtobuy.com
- customer3+[brand]@goingtobuy.com
- customer4+[brand]@goingtobuy.com

**Password**: `Melbourne.2005`

**Note**: May hit rate limits. Re-run after 1 hour if some users fail to create.

---

### 7. Create RetailZero Organization
**File**: `create-retailzero-org.js`

Creates only the central RetailZero organization (used for employees/admins).

```bash
node scripts/create-retailzero-org.js YOUR_TOKEN
```

This is a standalone script if you only want to create the central organization.

---

## Full Setup Workflow

Run scripts in this order for complete setup:

```bash
# 1. Enable Organizations feature
node scripts/enable-organizations.js YOUR_TOKEN

# 2. Create all organizations
node scripts/create-organizations.js YOUR_TOKEN

# 3. Create roles
node scripts/update-roles.js YOUR_TOKEN

# 4. Create admin users
node scripts/create-admin-users.js YOUR_TOKEN

# 5. Create employee users
node scripts/create-employee-users.js YOUR_TOKEN

# 6. Create customer users (may need to run twice due to rate limits)
node scripts/create-customer-users.js YOUR_TOKEN
```

## Troubleshooting

### Rate Limits
**Error**: `HTTP 429: Too Many Requests`

Auth0 free tier limits:
- 2 requests/second
- 1000 requests/day

**Solution**: Wait 1 hour and re-run the script. Scripts are idempotent and will skip existing resources.

### Token Expired
**Error**: `HTTP 401: Unauthorized`

Management API tokens expire after 24 hours.

**Solution**: Generate a new token and re-run the script.

### Missing Scopes
**Error**: `HTTP 403: Insufficient scope`

**Solution**: Ensure your Management API token has all required scopes listed above.

### Organization Already Exists
**Warning**: Organization with this name already exists

Scripts will skip existing organizations and continue. This is normal on re-runs.

### User Already Exists
**Warning**: User with this email already exists

Scripts will skip existing users and continue. This is normal on re-runs.

## Script Architecture

All scripts use:
- Node.js built-in `https` module (no external dependencies)
- Direct Auth0 Management API v2 calls
- Error handling with detailed output
- Idempotent operations (safe to re-run)

## Security Notes

- Never commit Management API tokens to version control
- Tokens have 24-hour expiration by default
- Use environment variables for tokens in production
- Rotate tokens regularly
- Limit token scopes to minimum required permissions

## Further Reading

- [Auth0 Management API Documentation](https://auth0.com/docs/api/management/v2)
- [Auth0 Organizations](https://auth0.com/docs/manage-users/organizations)
- [Auth0 Roles](https://auth0.com/docs/manage-users/access-control/rbac)
