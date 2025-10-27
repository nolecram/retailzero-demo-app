# RetailZero Demo App - Complete Repository Overview

## 📋 Project Summary

**RetailZero Demo** is a production-ready React application demonstrating **Auth0 Organizations** for multi-tenant B2B retail management. It showcases 5 independent retail brands (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero) with role-based access control, dynamic theming, and secure authentication.

**Key Achievement**: Demonstrates how to build a scalable multi-brand SaaS platform using Auth0 Organizations for complete customer isolation while maintaining a unified admin interface.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    RetailZero Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Auth0 Tenant: YOUR_AUTH0_DOMAIN                            │
│  ├── RetailZero Org (Central)                               │
│  │   └── Admins & Employees (global access to all brands)   │
│  │                                                           │
│  ├── AutoZero Org (org_hC536v5MhZj2GMtF)                    │
│  ├── CampNation Org (org_BR45iMQDE2iNKP8R)                  │
│  ├── BBQ1 Org (org_ubS05VW6UFh2xI1W)                        │
│  ├── OfficeZero Org (org_TxqSP6gqpe4cE0Tf)                  │
│  └── CandyZero Org (org_bt36R0WKuJ3rtiuM)                   │
│                                                               │
│  React Frontend: Single Page Application                     │
│  ├── Public Pages (no auth required)                         │
│  ├── Protected Pages (auth required)                         │
│  └── Admin Pages (admin role required)                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Features

### 1. **Multi-Brand Architecture**
- **5 Independent Brands** with Auth0 Organizations
- **Organization-Based Isolation**: Customers only access their brand
- **Unified Admin Interface**: Admins/Employees see all brands
- **Brand Context Management**: Global React Context for brand state

### 2. **Three-Tier Authentication Model**

| Role | Access | Organization | Pages |
|------|--------|--------------|-------|
| **Customer** | Brand-specific | Brand Org (e.g., AutoZero) | Brand landing page, dashboard |
| **Employee** | All brands | RetailZero Org | Home, all brands, dashboards |
| **Admin** | All brands + management | RetailZero Org | Home, admin panel, all dashboards |

### 3. **Role-Based Routing**
- **AuthRedirect.js**: Automatic post-login redirection based on role
- Customers → Brand landing page
- Employees/Admins → RetailZero home with brand selector
- Protected routes with `withAuthenticationRequired` HOC

### 4. **Dynamic Theming**
- Each brand has unique colors (primary & secondary)
- CSS variables applied globally
- Brand-specific logo integration
- Responsive design with brand context

### 5. **Security Features**
- Auth0 Organizations for tenant isolation
- Custom role claims in JWT tokens
- Organization-scoped authentication
- Protected admin pages with role verification

---

## 📁 Project Structure

```
retailzero-demo/
│
├── .mcp-config.json                 # MCP Server Configuration (Auth0 integration)
├── package.json                     # Dependencies (React 19, Auth0, Router)
├── README.md                        # Main documentation
│
├── docs/
│   ├── INDEX.md                     # Documentation index
│   ├── SETUP.md                     # Setup guide
│   ├── TECHNICAL_REQUIREMENTS.md    # Requirements verification
│   ├── IMPLEMENTATION_SUMMARY.md    # Feature overview
│   └── OPTIMIZATION_SUMMARY.md      # Performance notes
│
├── public/
│   ├── index.html                   # HTML template
│   ├── manifest.json                # PWA manifest
│   └── logos/                       # Brand logos (5 brands)
│
├── src/
│   ├── index.js                     # Entry point (Auth0Provider setup)
│   ├── App.js                       # Main router & navigation
│   ├── App.css                      # Global styles & CSS variables
│   │
│   ├── config/
│   │   └── brands.js                # 5 Brand configurations + helpers
│   │
│   ├── context/
│   │   └── BrandContext.js          # React Context for brand state
│   │
│   ├── components/
│   │   ├── AuthRedirect.js          # Post-login role-based routing
│   │   ├── BrandSelector.js         # Brand switching dropdown
│   │   ├── BrandSelector.css        # Brand selector styles
│   │   ├── TokenInspector.js        # JWT token debugging
│   │   └── TokenInspector.css
│   │
│   ├── pages/
│   │   ├── RetailZeroHome.js        # Main hub (public/all access)
│   │   ├── LandingPage.js           # Brand landing page
│   │   ├── Dashboard.js             # Protected customer dashboard
│   │   ├── AdminPage.js             # Admin-only management panel
│   │   └── EmployeeLogin.js         # Employee/admin login portal
│   │
│   └── utils/
│       ├── clearAuth0Cache.js       # Auth0 cache management
│       ├── mockDataGenerators.js    # Mock data for admin panel
│       └── styles.js                # Utility styles
│
├── scripts/                         # Auth0 automation scripts
│   ├── README.md
│   ├── create-organizations.js      # Create brand organizations
│   ├── create-retailzero-org.js     # Create central organization
│   ├── enable-organizations.js      # Enable Org feature
│   ├── create-admin-users.js        # Create admin users
│   ├── create-employee-users.js     # Create employee users
│   ├── create-customer-users.js     # Create customer users
│   ├── update-roles.js              # Assign roles to users
│   └── update-callback-urls.js      # Update Auth0 URLs
│
└── build/                          # Production build (compiled React)
```

---

## 🚀 MCP Integration

### Configuration File: `.mcp-config.json`
```json
{
  "mcpServers": {
    "auth0": {
      "command": "npx",
      "args": ["-y", "@auth0/auth0-mcp-server"],
      "env": {
        "AUTH0_DOMAIN": "YOUR_AUTH0_DOMAIN",
        "AUTH0_CLIENT_ID": "YOUR_AUTH0_CLIENT_ID",
        "AUTH0_CLIENT_SECRET": "YOUR_AUTH0_CLIENT_SECRET"
      }
    }
  }
}
```

### What is MCP?
**Model Context Protocol** - A protocol that allows Claude (or other AI assistants) to interact with Auth0 APIs through a standardized interface.

### Auth0 MCP Server Capabilities
When configured, this allows direct access to:
- **Organizations API** - List, create, update organizations
- **Users API** - Manage users across organizations
- **Roles API** - Create and assign roles
- **Rules API** - Configure custom authentication flows
- **Token API** - Inspect and validate JWT tokens

### Usage Example
With MCP configured, an AI assistant can:
1. Query Auth0 Organizations status
2. Create new users programmatically
3. Assign roles and permissions
4. Verify organization setup
5. Manage multi-tenant configurations

---

## 🔌 APIs Used

### 1. **Auth0 Management API**
**Endpoint**: `https://YOUR_AUTH0_DOMAIN/api/v2/`

**Operations**:
- `GET /api/v2/organizations` - List all organizations
- `POST /api/v2/organizations` - Create organization
- `POST /api/v2/organizations/{id}/members` - Add user to organization
- `GET /api/v2/users` - List users
- `POST /api/v2/users` - Create user
- `POST /api/v2/roles` - Create role
- `POST /api/v2/users/{id}/roles` - Assign role to user
- `GET /api/v2/logs` - Get authentication logs

**Authentication**: Machine-to-Machine (M2M) token via client credentials flow

**Used By**: Backend scripts in `/scripts` folder for automation

### 2. **Auth0 Authentication API**
**Endpoint**: OAuth 2.0 Authorization Server

**Flows**:
- **Authorization Code Flow** - Primary user login
- **Implicit Flow** - Token refresh
- **Client Credentials** - M2M app authentication

**Features**:
- Organization-scoped login (`organization` parameter)
- ID Token with custom claims
- Access Token for API authorization
- Refresh Token for session persistence

**Used By**: Frontend via `@auth0/auth0-react` SDK

---

## 🔐 Authentication Flow

### Customer Authentication
```
1. User visits /brand (e.g., AutoZero landing page)
   ↓
2. Clicks "Login to Your Account"
   ↓
3. App calls: loginWithRedirect({
     authorizationParams: { organization: 'org_hC536v5MhZj2GMtF' }
   })
   ↓
4. Redirected to Auth0 Universal Login (org-scoped)
   ↓
5. User enters email + password
   ↓
6. Auth0 verifies credentials within organization
   ↓
7. ID Token issued with:
   - email, name, picture
   - org_id: 'org_hC536v5MhZj2GMtF'
   - roles: ['customer']
   ↓
8. Callback to /brand/dashboard
   ↓
9. AuthRedirect.js detects customer role
   ↓
10. App stays on /brand (brand context)
```

### Employee/Admin Authentication
```
1. User visits /employee-login
   ↓
2. Clicks "Login" or navigates from home
   ↓
3. App calls: loginWithRedirect({
     authorizationParams: { organization: 'org_K6sjZprHVLfXgIzs' }
   })
   ↓
4. Auth0 Universal Login (RetailZero org)
   ↓
5. User authenticates
   ↓
6. ID Token issued with:
   - email, name
   - org_id: 'org_K6sjZprHVLfXgIzs' (RetailZero)
   - roles: ['admin'] OR ['employee']
   ↓
7. Callback to home
   ↓
8. AuthRedirect.js detects admin/employee role
   ↓
9. Redirects to / (home with brand selector)
```

---

## 💻 Key Code Examples

### Brand Configuration (`src/config/brands.js`)
```javascript
export const BRANDS = {
  AUTO_ZERO: {
    id: 'autozero',
    displayName: 'AutoZero',
    orgId: 'org_hC536v5MhZj2GMtF',
    theme: { primary: '#FF6B35', secondary: '#004E89' },
    logo: '/logos/autozero.png',
  },
  // ... 4 more brands
};
```

### Brand Context (`src/context/BrandContext.js`)
```javascript
export const BrandProvider = ({ children }) => {
  const [currentBrand, setCurrentBrand] = useState(() => 
    getBrandFromHostname(window.location.hostname)
  );
  
  return (
    <BrandContext.Provider value={{ currentBrand, switchBrand }}>
      {children}
    </BrandContext.Provider>
  );
};
```

### Role-Based Routing (`src/components/AuthRedirect.js`)
```javascript
const { isAuthenticated, user } = useAuth0();
const roles = user?.['https://retailzero.com/roles'] || [];
const hasGlobalAccess = roles.includes('admin') || roles.includes('employee');

if (!hasGlobalAccess) {
  navigate('/brand'); // Customers stay on brand
} else {
  navigate('/'); // Admins/Employees to home
}
```

### Protected Admin Page (`src/App.js`)
```javascript
function ProtectedAdminComponent() {
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || [];
  
  return roles.includes('admin') ? 
    <AdminPage /> : 
    <div>Access Denied: Admins only</div>;
}

const ProtectedAdmin = withAuthenticationRequired(ProtectedAdminComponent);
```

---

## 🧪 Technical Requirements Verification

### ✅ Requirement 1: Unsecured Landing Page
- **Route**: `/`
- **Implementation**: `RetailZeroHome.js`
- **Access**: Public (no authentication)
- **Features**: Brand selection, Auth0 exploration link

### ✅ Requirement 2: Protected User Page
- **Route**: `/brand/dashboard`
- **Implementation**: `Dashboard.js`
- **Access**: Any authenticated user (via `withAuthenticationRequired` HOC)
- **Features**: User profile, brand info, dashboards

### ✅ Requirement 3: Admin-Only Page
- **Route**: `/admin`
- **Implementation**: `AdminPage.js`
- **Access**: Users with `admin` role in JWT token
- **Features**: All brands overview, user management, security monitoring, system config
- **Protection**: Double-layer (authentication + role verification)

---

## 📊 Database/State Management

### No External Database
This is a **frontend-only demo** application. All data comes from:

1. **Auth0 User Database**
   - User credentials
   - Profile information (email, name, picture)
   - Organization membership
   - Role assignments

2. **React Context (Client-Side)**
   - Current brand selection
   - User theme preferences
   - Authentication state

3. **Mock Data** (Admin Panel Only)
   - Generated via `mockDataGenerators.js`
   - Used for UI demonstration
   - Would be replaced with real API calls in production

### Production Implementation Would Include:
- REST API (Node.js/Express) backend
- Database (PostgreSQL/MongoDB)
- API integration layer
- Real data fetching instead of mock data

---

## 🔧 Dependencies

### Core Framework
- **React** `19.2.0` - UI framework
- **React Router** `7.9.4` - Client-side routing
- **React DOM** `19.2.0` - React rendering

### Authentication
- **@auth0/auth0-react** `2.8.0` - Auth0 SDK for React
  - Provides `useAuth0()` hook
  - `withAuthenticationRequired` HOC
  - `loginWithRedirect`, `logout` functions

### Testing
- **@testing-library/react** `16.3.0` - Component testing
- **@testing-library/jest-dom** `6.9.1` - Jest matchers
- **@testing-library/user-event** `13.5.0` - User interaction simulation

### Build
- **react-scripts** `5.0.1` - Create React App build tools

---

## 📝 Test Credentials

### Customer (Brand-Specific)
```
Email: customer1+autozero@goingtobuy.com
Password: Melbourne.2005
Access: AutoZero brand only
```

### Employee
```
Email: employee1@retailzero.com
Password: Melbourne.2025
Access: All brands, no admin features
```

### Admin
```
Email: admin1@retailzero.com
Password: Melbourne.2025
Access: All brands + admin panel
```

---

## 🚀 Deployment Readiness

### Production Checklist
- ✅ Multi-tenant architecture via Auth0 Organizations
- ✅ Role-based access control
- ✅ Protected routes with authentication guards
- ✅ Admin-only pages with role verification
- ✅ Dynamic theming system
- ✅ Error handling for access denied scenarios
- ✅ Responsive design (mobile-friendly)
- ✅ Security: No credentials in client code (Auth0 handles)
- ⚠️ **Missing**: Backend API for real data (currently mock data)
- ⚠️ **Missing**: Database integration
- ⚠️ **Missing**: Production Auth0 configuration

### Deploy To:
- **Vercel** - Recommended for React SPA
- **Netlify** - Alternative static hosting
- **AWS S3 + CloudFront** - CDN distribution
- **GitHub Pages** - Simple static deployment

---

## 🎓 Learning Outcomes

This project demonstrates:

1. **Auth0 Organizations** - Multi-tenant B2B architecture
2. **Role-Based Access Control** - JWT custom claims
3. **React Context API** - Global state management
4. **Protected Routes** - Security patterns in React
5. **Dynamic Theming** - CSS variables + React
6. **OAuth 2.0** - Authentication flows
7. **SPA Routing** - React Router patterns
8. **API Integration** - Auth0 Management API via scripts

---

## 📚 Key Files to Study

1. **`src/index.js`** - Auth0Provider setup
2. **`src/App.js`** - Main routing and navigation
3. **`src/config/brands.js`** - Brand configuration
4. **`src/context/BrandContext.js`** - State management
5. **`src/components/AuthRedirect.js`** - Role-based routing
6. **`src/pages/AdminPage.js`** - Comprehensive admin UI
7. **`scripts/create-organizations.js`** - Auth0 API usage
8. **`.mcp-config.json`** - MCP server configuration

---

## 🔗 External Resources

- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 Organizations](https://auth0.com/docs/manage-users/organizations)
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Auth0 React SDK](https://github.com/auth0/auth0-react)
- [Auth0 Management API](https://auth0.com/docs/api/management/v2)

---

## 📞 Summary

**RetailZero Demo** is a complete, production-grade demonstration of:
- ✅ Multi-tenant SaaS architecture
- ✅ Auth0 Organizations for tenant isolation
- ✅ Role-based access control
- ✅ Dynamic multi-brand theming
- ✅ Protected routes and admin pages
- ✅ MCP integration for API automation
- ✅ React modern best practices

**Ready for**: Technical interviews, proof-of-concepts, learning Auth0, or as a template for multi-brand retail applications.
