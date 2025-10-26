# RetailZero Demo App

A modern React application demonstrating **Auth0 authentication**, **role-based access control**, and **multi-brand architecture** using Auth0 Organizations.

## ✨ Features

- **🔐 Auth0 Authentication**: Secure OAuth 2.0 with Organizations support
- **🏢 Multi-Brand Architecture**: 5 retail brands (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero) with isolated customer bases
- **👥 Three-Tier Access Control**: Customers (brand-specific), Employees & Admins (global access)
- **🎨 Dynamic Theming**: Brand-specific colors and logos
- **🔄 Role-Based Routing**: Automatic redirects based on user role
- **📱 Responsive Design**: Mobile-friendly interface
- **✨ Unified Navigation**: Consistent design system across all pages
- **🛡️ Organization Security**: Customers isolated to their brand organization

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000`

**Default Test User:**
- Email: `customer1+autozero@goingtobuy.com`
- Password: `Melbourne.2005`

📖 **[Full Setup Guide →](./docs/SETUP.md)**

## 🏗️ Architecture

### User Roles

| Role | Access Level | Portal |
|------|--------------|--------|
| **Customer** | Single brand only | Brand-specific landing pages |
| **Employee** | All brands + internal tools | RetailZero home |
| **Admin** | Full access + admin panel | RetailZero home with admin panel access |

### Organizations

- **5 Brand Organizations**: AutoZero, CampNation, BBQ1, OfficeZero, CandyZero (customer isolation)
- **1 Central Organization**: RetailZero (employee/admin hub)

### Key Components

- **LandingPage.js**: Brand landing pages with organization security
- **Dashboard.js**: Protected customer dashboard for any authenticated user
- **AdminPage.js**: Admin-only panel with role verification and all-brands overview
- **AuthRedirect.js**: Post-login role-based routing logic
- **BrandContext.js**: Global brand state management
- **BrandSelector**: Dropdown for switching brands (employees/admins only)

📐 **[Detailed Architecture →](./docs/architecture/MULTI_BRAND_ARCHITECTURE.md)**

## 📂 Project Structure

```
retailzero-demo/
├── public/
│   └── logos/                  # Brand logos (AutoZero, CampNation, etc.)
├── src/
│   ├── pages/
│   │   ├── LandingPage.js      # Brand landing pages with org security
│   │   ├── Dashboard.js        # Protected customer dashboard
│   │   ├── AdminPage.js        # Admin-only management panel
│   │   ├── EmployeeLogin.js    # Central login for staff
│   │   └── RetailZeroHome.js   # Main hub with brand selector
│   ├── components/
│   │   ├── AuthRedirect.js     # Role-based routing logic
│   │   └── BrandSelector.js    # Brand switching dropdown
│   ├── context/
│   │   └── BrandContext.js     # Global brand state
│   ├── config/
│   │   └── brands.js           # Brand configs with Auth0 Org IDs
│   ├── utils/
│   │   └── clearAuth0Cache.js  # Auth0 cache management
│   ├── App.js                  # Main app with routing
│   ├── App.css                 # Unified navigation styles
│   └── index.js                # Auth0Provider setup
├── scripts/
│   ├── create-organizations.js # Create Auth0 Organizations
│   ├── create-admin-users.js   # Create admin users
│   ├── create-employee-users.js # Create employee users
│   ├── create-customer-users.js # Create customer users
│   └── update-callback-urls.js # Update Auth0 URLs
└── docs/                       # Comprehensive documentation
```

## 🔧 Tech Stack

- **React 19.0.2** - Modern UI framework
- **React Router 7.9.4** - Client-side routing with protected routes
- **@auth0/auth0-react 2.8.0** - Auth0 authentication SDK
- **Auth0 Organizations** - Multi-tenant B2B architecture
- **React Context API** - Global state management
- **Auth0 MCP Server** - Model Context Protocol for AI-assisted Auth0 management
- **Auth0 Management API** - Backend automation for organizations and users

## 🎨 Brands

| Brand | Industry | Primary Color | Organization ID |
|-------|----------|---------------|-----------------|
| **AutoZero** | Automotive parts | `#FF6B35` | `org_hC536v5MhZj2GMtF` |
| **CampNation** | Outdoor gear | `#2D6A4F` | `org_BR45iMQDE2iNKP8R` |
| **BBQ1** | BBQ equipment | `#D00000` | `org_a9v2qExc7Y5e8lhR` |
| **OfficeZero** | Office supplies | `#4361EE` | `org_8QhwRXLh3r4P40x8` |
| **CandyZero** | Confectionery | `#F72585` | `org_W7thtc67bKQfTpjl` |

## 🔐 Test Credentials

### Customers (Brand-Specific)
- **Email Format**: `customer[1-4]+[brand]@goingtobuy.com`
- **Example**: `customer1+autozero@goingtobuy.com`
- **Password**: `Melbourne.2005`

### Employees (Central Organization)
- **Email**: `employee[1-4]@retailzero.com`
- **Password**: `Melbourne.2025`

### Admins (Central Organization)
- **Email**: `admin[1-4]@retailzero.com`
- **Password**: `Melbourne.2025`

## 🔒 Security Features

- **Organization-Based Isolation**: Customers can only access their brand
- **Role-Based Access Control**: Admins and employees have global access
- **Automatic Role Routing**: Post-login redirects based on user role
- **Protected Routes**: Authentication guards on all sensitive pages
- **Secure Token Storage**: Auth0 SDK with refresh tokens
- **Organization Verification**: Real-time org membership checks

## ��️ Routing & Authentication

### Public Routes
- `/` - RetailZero home page (public)
- `/brand` - Brand landing pages (public, org-scoped login)

### Protected Routes
- `/brand/dashboard` - Customer dashboard (authenticated)
- `/admin` - Admin panel (admin role required)
- `/employee-login` - Employee/admin login portal

### Authentication Flow

1. **Customer Login**: Brand landing page → Auth0 with org context → Auto-redirect to `/brand`
2. **Employee/Admin Login**: Employee login page → Auth0 with RetailZero org → Auto-redirect to `/`

**Role-Based Routing** (AuthRedirect.js):
- Customers → `/brand` (their brand context)
- Employees/Admins → `/` (RetailZero home)

## 🎯 User Journeys

### Customer Journey
1. Visit RetailZero home (`/`)
2. Select a brand (e.g., AutoZero)
3. Click "Login to Your Account" or "Sign Up"
4. Authenticate with organization-scoped login
5. Auto-redirect to brand dashboard

### Employee/Admin Journey
1. Visit RetailZero home (`/`)
2. Click "Employee & Admin Login" (footer)
3. Authenticate with RetailZero organization
4. Auto-redirect to home with brand selector
5. Access all brands and internal tools

## 📋 Available Scripts

### `npm start`
Runs the app in development mode with hot reloading at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder with optimizations

### `npm run eject`
**One-way operation!** Ejects from Create React App for full control

## 📚 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Installation and configuration
- **[Advanced Setup](./docs/setup/ADVANCED_SETUP.md)** - Organizations and user creation
- **[Quick Setup](./docs/setup/QUICK_SETUP.md)** - 3-step quick start
- **[Architecture](./docs/architecture/MULTI_BRAND_ARCHITECTURE.md)** - System design details
- **[Technical Requirements](./docs/TECHNICAL_REQUIREMENTS.md)** - Requirements verification
- **[Implementation Summary](./docs/IMPLEMENTATION_SUMMARY.md)** - Feature overview
- **[Optimization Summary](./docs/OPTIMIZATION_SUMMARY.md)** - Performance improvements
- **[Logo URLs](./docs/setup/LOGO_URLS_FOR_AUTH0.md)** - Brand logo resources
- **[Repository Overview](./REPOSITORY_OVERVIEW.md)** - Complete technical overview with MCP and API details

## � API & MCP Integration

This project integrates directly with Auth0 using two mechanisms:

### 1. MCP (Model Context Protocol) Integration

**What is MCP?**
Model Context Protocol is a standardized interface that allows Claude and other AI assistants to interact with external systems (like Auth0) through configured servers.

**Configuration** (`.mcp-config.json`):
```json
{
  "mcpServers": {
    "auth0": {
      "command": "npx",
      "args": ["-y", "@auth0/auth0-mcp-server"],
      "env": {
        "AUTH0_DOMAIN": "retailzero-demo.au.auth0.com",
        "AUTH0_CLIENT_ID": "xERyHPEBariMBWqKdMV2we1qFyhi3So6",
        "AUTH0_CLIENT_SECRET": "rLFagAsEQdgR2NBURQk8BP3u17hiKzABLtHNDVN78nXbMxg5adViZdfKQWqX-Kqa"
      }
    }
  }
}
```

**Capabilities via MCP:**
- Query and list organizations
- Create new organizations
- Add/remove users from organizations
- Assign roles to users
- Inspect authentication logs
- Verify multi-tenant setup
- Generate management tokens

**Use Cases:**
- AI assistants can help troubleshoot Auth0 configuration
- Automated validation of organization setup
- Programmatic user and role management
- Organization health checks

---

### 2. Auth0 APIs

#### **Authentication API** (OAuth 2.0)
**Endpoint**: `https://retailzero-demo.au.auth0.com/`

**Purpose**: User authentication and session management

**Flows Used**:
- **Authorization Code Flow** - Primary user login
  ```javascript
  loginWithRedirect({
    authorizationParams: {
      organization: 'org_hC536v5MhZj2GMtF' // Brand-specific org
    }
  });
  ```
- **Refresh Token Flow** - Session persistence
- **Implicit Flow** - Token exchange

**Frontend Usage** (`src/index.js`):
```javascript
<Auth0Provider
  domain="retailzero-demo.au.auth0.com"
  clientId="xERyHPEBariMBWqKdMV2we1qFyhi3So6"
  authorizationParams={{ 
    redirect_uri: window.location.origin,
    organization: currentBrand.orgId // Organization-scoped auth
  }}
  useRefreshTokens={true}
  cacheLocation="memory"
>
```

**Returns**:
- **ID Token** - User identity + custom claims (roles, org_id)
- **Access Token** - API authorization
- **Refresh Token** - Extended session

---

#### **Management API** (Machine-to-Machine)
**Endpoint**: `https://retailzero-demo.au.auth0.com/api/v2/`

**Purpose**: Backend automation for organizations, users, roles, and configuration

**Authentication**: Client Credentials OAuth flow (M2M application)

**Key Endpoints Used in Scripts**:

| Operation | Endpoint | Script |
|-----------|----------|--------|
| Create Organization | `POST /api/v2/organizations` | `create-organizations.js` |
| List Organizations | `GET /api/v2/organizations` | Verification scripts |
| Add Member to Org | `POST /api/v2/organizations/{id}/members` | User creation scripts |
| Create User | `POST /api/v2/users` | `create-*-users.js` |
| List Users | `GET /api/v2/users` | User queries |
| Create Role | `POST /api/v2/roles` | `update-roles.js` |
| Assign Role to User | `POST /api/v2/users/{id}/roles` | `update-roles.js` |
| Get Logs | `GET /api/v2/logs` | Admin panel (mock data) |
| Update Application | `PATCH /api/v2/clients/{id}` | `update-callback-urls.js` |

**Example from `create-organizations.js`**:
```javascript
const response = await axios.post(
  `https://${process.env.AUTH0_DOMAIN}/api/v2/organizations`,
  {
    name: 'AutoZero',
    display_name: 'AutoZero',
    description: 'Automotive parts and accessories'
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
```

**Example from `create-customer-users.js`**:
```javascript
// Create user
await axios.post(
  `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
  {
    email: 'customer1+autozero@goingtobuy.com',
    password: 'Melbourne.2005',
    connection: 'Username-Password-Authentication'
  }
);

// Add to organization
await axios.post(
  `https://${process.env.AUTH0_DOMAIN}/api/v2/organizations/${orgId}/members`,
  { user_id: userId },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

### 3. Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  CUSTOMER AUTHENTICATION                     │
└─────────────────────────────────────────────────────────────┘

Frontend (React)                    Auth0                 Backend (Optional)
      │                               │                         │
      │──1. Click "Login"──────────>  │                         │
      │  (loginWithRedirect)          │                         │
      │                               │                         │
      │   2. Auth0 Login Page         │                         │
      │  <──────────────────────      │                         │
      │                               │                         │
      │──3. Email + Password────────>│  Management API          │
      │                               │  (verify credentials)   │
      │                               │                         │
      │   4. Authorization Code       │                         │
      │  <──────────────────────      │                         │
      │                               │                         │
      │──5. Exchange Code for Token──>│                         │
      │  (Backend or PKCE)            │                         │
      │                               │                         │
      │   6. ID Token + Access Token  │                         │
      │  <──────────────────────      │                         │
      │                               │                         │
      │──7. Store in Memory/Cache─────┤                         │
      │  (useRefreshTokens: true)     │                         │
      │                               │                         │
      └─────────────────────────────────────────────────────────

Tokens Returned:
├─ ID Token: Contains user info + org_id + roles
│  {
│    "email": "customer1@example.com",
│    "org_id": "org_hC536v5MhZj2GMtF",
│    "https://retailzero.com/roles": ["customer"]
│  }
├─ Access Token: For API authorization (if needed)
└─ Refresh Token: Extends session (if enabled)
```

---

### 4. Organization Scoping

**Key Feature**: Users authenticate within their specific organization

**Backend Script Usage**:
```bash
# Scripts use Management API to set up the org structure
node scripts/create-organizations.js        # Create 5 brand orgs
node scripts/create-retailzero-org.js       # Create central org
node scripts/enable-organizations.js        # Enable feature in tenant
node scripts/create-customer-users.js       # Add users to orgs
node scripts/update-roles.js                # Assign roles
```

**Frontend Usage**:
```javascript
// Brand-specific login (Customer)
loginWithRedirect({
  authorizationParams: {
    organization: 'org_hC536v5MhZj2GMtF' // AutoZero org
  }
});

// Central organization (Employee/Admin)
loginWithRedirect({
  authorizationParams: {
    organization: 'org_K6sjZprHVLfXgIzs' // RetailZero org
  }
});
```

---

### 5. Environment Variables for API Access

To use the scripts and enable full integration, configure these environment variables in a `.env` file:

```env
# Auth0 Credentials (from Auth0 Dashboard)
AUTH0_DOMAIN=retailzero-demo.au.auth0.com
AUTH0_CLIENT_ID=xERyHPEBariMBWqKdMV2we1qFyhi3So6
AUTH0_CLIENT_SECRET=your-m2m-client-secret-here

# Management API
AUTH0_MANAGEMENT_API_AUDIENCE=https://retailzero-demo.au.auth0.com/api/v2/

# Optional: Management token (generated via client credentials)
AUTH0_MANAGEMENT_TOKEN=your-generated-token
```

**How to Get These**:
1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Create a **Machine-to-Machine Application**
3. Grant scopes:
   - `create:organizations`, `read:organizations`, `update:organizations`
   - `create:organization_members`, `read:organization_members`
   - `create:users`, `read:users`, `update:users`
   - `create:roles`, `read:roles`, `update:roles`
4. Copy credentials to `.env`

---

## �🛠️ Scripts

All automation scripts are in the `scripts/` folder. See **[scripts/README.md](./scripts/README.md)** for details.

### Organization Management
- `create-organizations.js` - Create Auth0 Organizations for all brands
- `create-retailzero-org.js` - Create RetailZero central organization
- `verify-retailzero-org.js` - Verify RetailZero organization setup
- `enable-organizations.js` - Enable Organizations feature

### User Management
- `create-admin-users.js` - Create admin users in RetailZero org
- `create-employee-users.js` - Create employee users in RetailZero org
- `create-customer-users.js` - Create customer users in brand orgs

### Configuration
- `update-callback-urls.js` - Update Auth0 callback URLs
- `update-roles.js` - Configure user roles

**Environment Variables Required:**
- `AUTH0_DOMAIN` - Your Auth0 domain
- `AUTH0_CLIENT_ID` - Your Auth0 client ID
- `AUTH0_CLIENT_SECRET` - Your Auth0 client secret
- `AUTH0_MANAGEMENT_TOKEN` - Management API token (or will be generated on-demand)

## 🔐 How the Frontend Uses Auth0 APIs

### Authentication Hook (`useAuth0()`)
The frontend uses the Auth0 React SDK's `useAuth0()` hook for all authentication:

```javascript
// From src/components/AuthRedirect.js
const { isAuthenticated, isLoading, user } = useAuth0();

// User object contains:
// {
//   email: "customer1@example.com",
//   name: "Customer One",
//   org_id: "org_hC536v5MhZj2GMtF",
//   "https://retailzero.com/roles": ["customer"]
// }
```

### Custom Claims Extraction
Role-based access control uses custom JWT claims:

```javascript
// From src/pages/AdminPage.js
const roles = user?.['https://retailzero.com/roles'] || [];
const isAdmin = roles.includes('admin');

if (!isAdmin) {
  return <div>Access Denied: Admins only</div>;
}
```

**Note**: These claims must be added via Auth0 Actions:

```javascript
// Auth0 Post-Login Action (configure in Auth0 Dashboard)
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://retailzero.com';
  
  if (event.authorization) {
    api.idToken.setCustomClaim(
      `${namespace}/roles`, 
      event.authorization.roles
    );
  }
};
```

### Protected Routes
Routes are protected using Auth0's `withAuthenticationRequired` HOC:

```javascript
// From src/App.js
const ProtectedAdmin = withAuthenticationRequired(ProtectedAdminComponent);

<Route path="/admin" element={<ProtectedAdmin />} />
```

This automatically:
- Checks if user is authenticated
- Redirects to Auth0 login if not
- Returns user after successful authentication

---

## 🧪 Testing

Run tests with:
```bash
npm test
```

Tests use:
- Jest
- React Testing Library
- @testing-library/user-event

## 📦 Building for Production

Build the production bundle:
```bash
npm run build
```

Optimized files will be in the `build/` folder, ready to deploy.

## 🌐 Deployment

Deploy to various platforms:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `build` folder to S3 bucket

See [Create React App deployment docs](https://facebook.github.io/create-react-app/docs/deployment) for more options.

## 🚨 Troubleshooting

### Common Issues

**Issue**: "Organization is required" error
- **Solution**: Ensure you're using organization-scoped login via brand landing pages

**Issue**: Customer can access wrong brand
- **Solution**: LandingPage.js checks org membership; verify user is in correct Auth0 Organization

**Issue**: Employee/Admin redirects to brand page
- **Solution**: AuthRedirect.js checks for `hasGlobalAccess`; verify roles are assigned correctly

**Issue**: Auth0 callback fails
- **Solution**: Check callback URLs in Auth0 dashboard match `http://localhost:3000`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [React Documentation](https://react.dev/)
- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 Organizations](https://auth0.com/docs/manage-users/organizations)
- [React Router Documentation](https://reactrouter.com/)
- [Create React App Documentation](https://create-react-app.dev/)

---

**Built with ❤️ using React and Auth0**
