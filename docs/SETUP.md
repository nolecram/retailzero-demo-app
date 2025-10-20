# Setup Guide

## Prerequisites

- Node.js 16+ and npm
- Auth0 account
- Git

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd retailzero-demo
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
```

Or update `src/index.js` directly with your Auth0 credentials.

### 3. Auth0 Configuration

#### Basic Setup (Single Tenant)
1. Create an Auth0 Application (Single Page Application)
2. Configure Allowed Callback URLs: `http://localhost:3000`
3. Configure Allowed Logout URLs: `http://localhost:3000`
4. Copy Domain and Client ID to your configuration

#### Advanced Setup (Multi-Brand with Organizations)
See [Advanced Setup Guide](./setup/ADVANCED_SETUP.md) for Organizations configuration.

### 4. Run the Application

```bash
npm start
```

Visit `http://localhost:3000`

## Project Structure

```
retailzero-demo/
├── docs/                       # Documentation
│   ├── setup/                 # Setup guides
│   ├── architecture/          # Architecture docs
│   └── SETUP.md              # This file
├── public/
│   └── logos/                # Brand logos
├── scripts/                  # Auth0 automation scripts
│   ├── create-organizations.js
│   ├── create-admin-users.js
│   ├── create-employee-users.js
│   └── create-customer-users.js
├── src/
│   ├── components/           # Reusable components
│   ├── config/              # Configuration files
│   ├── context/             # React Context providers
│   └── pages/               # Page components
└── package.json
```

## User Roles

### Customer
- **Email**: customer1+[brand]@goingtobuy.com (e.g., customer1+autozero@goingtobuy.com)
- **Password**: Melbourne.2005
- **Access**: Customer Portal

### Employee
- **Email**: employee1@retailzero.com
- **Password**: Melbourne.2025
- **Access**: Employee Portal, Customer Portal

### Admin
- **Email**: admin1@retailzero.com
- **Password**: Melbourne.2025
- **Access**: All Portals

## Scripts

### Create Users
```bash
# Get Management API token first
node scripts/create-admin-users.js YOUR_TOKEN
node scripts/create-employee-users.js YOUR_TOKEN
node scripts/create-customer-users.js YOUR_TOKEN
```

### Enable Organizations
```bash
node scripts/enable-organizations.js YOUR_TOKEN
node scripts/create-organizations.js YOUR_TOKEN
```

## Troubleshooting

### "organization must be an organization id"
The organization parameter is commented out by default. Enable it in `src/pages/LandingPage.js` after creating Auth0 Organizations.

### Rate Limits
Auth0 free tier has rate limits. Wait 1 hour between bulk operations or upgrade your plan.

### Token Expiration
Management API tokens expire after 24 hours. Generate a new token if scripts fail.

## Next Steps

- [Architecture Overview](./architecture/MULTI_BRAND_ARCHITECTURE.md)
- [Technical Requirements](./TECHNICAL_REQUIREMENTS.md)
- [Advanced Setup](./setup/QUICK_SETUP.md)
