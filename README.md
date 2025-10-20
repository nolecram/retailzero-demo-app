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
| **Admin** | Full access to all portals | RetailZero home with admin features |

### Organizations

- **5 Brand Organizations**: AutoZero, CampNation, BBQ1, OfficeZero, CandyZero (customer isolation)
- **1 Central Organization**: RetailZero (employee/admin hub)

### Key Components

- **LandingPage.js**: Brand landing pages with organization security
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
│   │   ├── EmployeePortal.js   # Employee tools and features
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
- `/dashboard` - Customer dashboard (authenticated)
- `/admin` - Admin panel (admin role required)
- `/employee` - Employee portal (employee/admin roles)

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

## 🛠️ Scripts

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
- `AUTH0_MANAGEMENT_TOKEN` - Management API token

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
