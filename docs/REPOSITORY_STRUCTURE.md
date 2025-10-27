# Repository Structure & Organization Guide

## 📁 Final Repository Structure

```
retailzero-demo/
├── 📄 README.md                          # Main project documentation
├── 📄 package.json                       # Dependencies and scripts
├── 📄 package-lock.json                  # Locked dependency versions
│
├── 🔐 .env.example                       # Frontend config template
├── 🔐 .mcp-config.example.json           # MCP server config template
├── 🔐 .gitignore                         # Git ignore rules
│
├── 📁 public/                            # Static assets
│   ├── index.html                        # HTML entry point
│   ├── manifest.json                     # PWA manifest
│   ├── robots.txt                        # SEO robots file
│   └── logos/                            # Brand logos
│
├── 📁 src/                               # React source code
│   ├── index.js                          # App entry point (Auth0Provider setup)
│   ├── index.css                         # Global styles
│   ├── App.js                            # Main app component (routing)
│   ├── App.css                           # Navigation styles
│   │
│   ├── components/                       # Reusable components
│   │   ├── AuthRedirect.js               # Post-login role routing
│   │   ├── BrandSelector.js              # Brand switcher dropdown
│   │   ├── BrandSelector.css             # Brand selector styles
│   │   └── TokenInspector.js             # JWT token debugging tool
│   │
│   ├── pages/                            # Page components
│   │   ├── LandingPage.js                # Brand landing page
│   │   ├── Dashboard.js                  # User dashboard
│   │   ├── AdminPage.js                  # Admin panel
│   │   ├── EmployeeLogin.js              # Employee login page
│   │   └── RetailZeroHome.js             # Main hub
│   │
│   ├── context/                          # React Context
│   │   └── BrandContext.js               # Global brand state
│   │
│   ├── config/                           # Configuration
│   │   └── brands.js                     # Brand definitions & org IDs
│   │
│   └── utils/                            # Utility functions
│       └── clearAuth0Cache.js            # Auth0 cache management
│
├── 📁 scripts/                           # Node.js automation scripts
│   ├── README.md                         # Script documentation
│   ├── create-organizations.js           # Create Auth0 organizations
│   ├── create-admin-users.js             # Create admin users
│   ├── create-employee-users.js          # Create employee users
│   ├── create-customer-users.js          # Create customer users
│   ├── create-retailzero-org.js          # Create RetailZero org
│   ├── enable-organizations.js           # Enable org features
│   ├── standardize-customer-passwords.js # Password standardization
│   └── update-roles.js                   # Update user roles
│
├── 📁 docs/                              # Documentation
│   ├── INDEX.md                          # Documentation index
│   ├── SETUP.md                          # Setup instructions
│   ├── TECHNICAL_REQUIREMENTS.md         # Requirements checklist
│   ├── IMPLEMENTATION_SUMMARY.md         # Implementation details
│   ├── OPTIMIZATION_SUMMARY.md           # Performance optimizations
│   ├── SECRETS_CONFIGURATION.md          # Secrets & env vars
│   │
│   └── auth0-customization/              # Auth0 customization
│       ├── AUTH0_LOGIN_TEMPLATE_GUIDE.md # Login template guide
│       ├── QUICK_START.md                # Quick implementation
│       ├── auth0-autozero-login.html     # AutoZero login template
│       ├── auth0-campnation-login.html   # CampNation login template
│       ├── auth0-bbq1-login.html         # BBQ1 login template
│       ├── auth0-officezero-login.html   # OfficeZero login template
│       └── auth0-candyzero-login.html    # CandyZero login template
│
├── 📁 build/                             # Production build (generated)
│   └── (compiled React app)
│
└── 📁 node_modules/                      # Dependencies (in .gitignore)
```

## 📊 Key Files by Purpose

### Authentication & Security
- `src/index.js` - Auth0Provider initialization
- `src/components/TokenInspector.js` - JWT debugging
- `src/utils/clearAuth0Cache.js` - Cache management
- `docs/SECRETS_CONFIGURATION.md` - Secrets setup

### Routing & Navigation
- `src/App.js` - Route definitions
- `src/components/AuthRedirect.js` - Role-based routing
- `src/App.css` - Navigation styling

### Brand Management
- `src/config/brands.js` - Brand definitions
- `src/context/BrandContext.js` - Brand state
- `src/components/BrandSelector.js` - Brand switcher

### Pages
- `src/pages/RetailZeroHome.js` - Main hub
- `src/pages/LandingPage.js` - Brand landing
- `src/pages/Dashboard.js` - User dashboard
- `src/pages/AdminPage.js` - Admin panel
- `src/pages/EmployeeLogin.js` - Employee entry

### Automation & Setup
- `scripts/` - Node.js setup scripts
- `docs/SETUP.md` - Setup guide
- `docs/auth0-customization/` - Auth0 templates

## 🎯 Best Practices Implemented

✅ **Component Organization**
- Components in `src/components/` (reusable)
- Pages in `src/pages/` (route-level)
- Context in `src/context/` (state management)
- Config in `src/config/` (constants)
- Utils in `src/utils/` (helpers)

✅ **Security**
- Secrets in `.env.local` (gitignored)
- Public credentials in React code only
- Private credentials protected
- MCP config in `.mcp-config.json` (gitignored)

✅ **Documentation**
- Central `README.md` with quick start
- `docs/` folder for detailed guides
- Inline code comments for complex logic
- Script documentation in `scripts/README.md`

✅ **Build & Deployment**
- React Scripts for building
- `.gitignore` prevents committing build artifacts
- Package.json with essential dependencies only

## 📈 Clean Architecture Features

### Separation of Concerns
- Components don't know about Auth0 internals
- Pages compose components
- Context manages brand state
- Config centralizes constants

### Reusability
- `BrandSelector` - Used in multiple pages
- `AuthRedirect` - Centralized routing logic
- `TokenInspector` - Debugging tool

### Scalability
- Easy to add new brands (just update `brands.js`)
- Easy to add new pages/routes (add to `src/pages/`, wire in `App.js`)
- Easy to add new scripts (add to `scripts/`)

## 🔄 Development Workflow

```
1. Clone repo
2. Copy .env.example → .env.local
3. Add Auth0 credentials
4. npm install
5. npm start
6. Develop components in src/
7. Test routes in App.js
8. Update documentation
9. Commit & push
```

## 📚 Related Files

- `.mcp-config.example.json` - MCP template (copy to `.mcp-config.json`)
- `.env.example` - Frontend template (copy to `.env.local`)
- `.gitignore` - Protects secrets
- `package.json` - Dependency management
- `docs/SECRETS_CONFIGURATION.md` - Detailed secrets guide

---

**Generated:** October 28, 2025
**Version:** 1.0.0
