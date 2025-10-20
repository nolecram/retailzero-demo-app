# RetailZero Setup Scripts

Setup scripts for the RetailZero multi-brand demo application.

## Prerequisites

`.env` file in project root with Auth0 credentials:
```
AUTH0_DOMAIN=retailzero-demo.au.auth0.com
AUTH0_CLIENT_ID=xERyHPEBariMBWqKdMV2we1qFyhi3So6
AUTH0_CLIENT_SECRET=your-m2m-client-secret
AUTH0_MANAGEMENT_API_AUDIENCE=https://retailzero-demo.au.auth0.com/api/v2/
```

## Setup Order

1. **create-organizations.js** - Creates 5 brand organizations
2. **create-retailzero-org.js** - Creates central RetailZero organization  
3. **enable-organizations.js** - Enables organization support
4. **create-admin-users.js** - Creates admin users (password: Melbourne.2025)
5. **create-employee-users.js** - Creates employee users (password: Melbourne.2025)
6. **create-customer-users.js** - Creates customer users (password: Melbourne.2005)
7. **update-roles.js** - Assigns roles to users

## Notes

All scripts use the Auth0 Management API and are configured for the retailzero-demo tenant.
