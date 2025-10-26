# RetailZero Demo - Visual Quick Reference Guide

## 🎯 Application Flow Chart

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USER VISITS APPLICATION                           │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
          ┌──────▼──────┐            ┌──────▼──────┐
          │  / (HOME)   │            │ Not Logged  │
          │ RetailZeroHome            │    In      │
          └──────┬──────┘            └────────────┘
                 │
         ┌───────┴───────┐
         │               │
    ┌────▼────┐     ┌────▼────┐
    │ Customer │    │ Employee │
    │  Brand   │    │  & Admin │
    └────┬────┘    └────┬────┘
         │              │
    ┌────▼──────┐  ┌────▼──────────┐
    │ /brand    │  │ /employee-    │
    │Landing    │  │ login         │
    │Page       │  └────┬──────────┘
    │           │       │
    └────┬──────┘   ┌───▼────┐
         │          │ Login  │
    ┌────▼──────┐   │ to     │
    │ Click     │   │ Auth0  │
    │ Login     │   └───┬────┘
    │           │       │
    └────┬──────┘   ┌───▼───────────┐
         │          │ Redirected    │
    ┌────▼──────┐   │ to /          │
    │ Auth0     │   │ (Home)        │
    │ Org:      │   └───┬───────────┘
    │ AutoZero  │       │
    │ (etc)     │   ┌───▼─────────┐
    └────┬──────┘   │ Can see     │
         │          │ all brands  │
    ┌────▼──────────▼──────┐
    │  JWT Token in Memory │
    │  {                   │
    │    org_id: org_...,  │
    │    roles: [...]      │
    │  }                   │
    └────┬─────────────────┘
         │
    ┌────▼──────────────┐
    │  AuthRedirect.js  │
    │  Checks roles     │
    └────┬──────┬───────┘
         │      │
    ┌────▼─┐  ┌─▼──────────┐
    │Cust  │  │Admin/Emp   │
    │→/bnd │  │→/ (home)   │
    └──────┘  └──┬─────────┘
               │
        ┌──────▼──────┐
        │ Can access: │
        │ / /brand/* │
        │ /admin ✓   │
        └────────────┘
```

---

## 📊 User Role Matrix

```
┌──────────────┬─────────────┬──────────────┬────────────────┐
│              │  CUSTOMER   │  EMPLOYEE    │     ADMIN      │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ Org          │ Brand Org   │ RetailZero   │ RetailZero     │
│              │ (1 of 5)    │ Central      │ Central        │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ Email        │ customer@+  │ employee@    │ admin@         │
│              │ brand.com   │ retailzero   │ retailzero     │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ Roles        │ [customer]  │ [employee]   │ [admin]        │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ Access /     │ ✓ (public)  │ ✓            │ ✓              │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ Access /brand│ ✓ (own)     │ ✓ (all)      │ ✓ (all)        │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ /brand/dash  │ ✓ (own)     │ ✓ (any)      │ ✓ (any)        │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ /admin       │ ✗ DENIED    │ ✗ DENIED     │ ✓ ALLOWED      │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ Brand Selector│ ✗ (none)   │ ✓ (all)      │ ✓ (all)        │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ Token Claims │ customer,   │ employee,    │ admin,         │
│              │ AutoZero Org│ RetailZero   │ RetailZero     │
└──────────────┴─────────────┴──────────────┴────────────────┘
```

---

## 🎨 Brand Configuration at a Glance

```
┌────────────────┬────────────┬─────────────┬─────────────┐
│     BRAND      │   COLOR    │  ORG ID     │  INDUSTRY   │
├────────────────┼────────────┼─────────────┼─────────────┤
│  AutoZero      │   🟠 #FF6B │ org_hC536v5 │  Auto Parts │
│                │   35       │ MhZj2GMtF   │             │
├────────────────┼────────────┼─────────────┼─────────────┤
│  CampNation    │   🟢 #2D6A │ org_BR45iMQ │  Outdoor    │
│                │   4F       │ DE2iNKP8R   │  Gear       │
├────────────────┼────────────┼─────────────┼─────────────┤
│  BBQ1          │   🔴 #D000 │ org_ubS05VW │  BBQ        │
│                │   00       │ 6UFh2xI1W   │  Equipment  │
├────────────────┼────────────┼─────────────┼─────────────┤
│  OfficeZero    │   🔵 #4361 │ org_TxqSP6g │  Office     │
│                │   EE       │ qpe4cE0Tf   │  Supplies   │
├────────────────┼────────────┼─────────────┼─────────────┤
│  CandyZero     │   💜 #F725 │ org_bt36R0W │  Candy &    │
│                │   85       │ KuJ3rtiuM   │  Sweets     │
├────────────────┼────────────┼─────────────┼─────────────┤
│  RetailZero    │   💜 #6B7E │ org_K6sjZpr │  Central    │
│  (Central Org) │   EA       │ HVLfXgIzs   │  Management │
└────────────────┴────────────┴─────────────┴─────────────┘
```

---

## 🔐 Authentication Sequence Diagram

```
Customer Login                          Admin/Employee Login
═══════════════════════════════════════════════════════════════

┌─────────┐                              ┌─────────┐
│ Browser │                              │ Browser │
└────┬────┘                              └────┬────┘
     │                                        │
     │ 1. Click Login                         │ 1. Click Login
     │    (Brand Page)                       │    (Employee Login)
     │                                        │
     ├──→ loginWithRedirect({               ├──→ loginWithRedirect({
     │      organization: 'org_...'         │      organization: 'org_K6...'
     │    })                                │    })
     │                                        │
     │ 2. Redirect to Auth0                  │ 2. Redirect to Auth0
     │    (Org-Scoped)                      │    (RetailZero Org)
     │                                        │
     ├──────────────────────────────────────┤
     │                                        │
     │        ┌──────────────┐              │
     │        │    Auth0     │              │
     │        │  (Verifies)  │              │
     │        └──────────────┘              │
     │                                        │
     │ 3. User enters credentials            │ 3. User enters credentials
     │                                        │
     │ 4. Auth0 checks org membership      │ 4. Auth0 checks org membership
     │    ✓ In AutoZero org                 │    ✓ In RetailZero org
     │    (or similar)                      │                                        │
     │                                        │
     │ 5. JWT Token Generated                │ 5. JWT Token Generated
     │    {org_id: org_...,                  │    {org_id: org_K6...,
     │     roles: [customer]}                │     roles: [employee/admin]}
     │                                        │
     │ 6. Redirected to /brand               │ 6. Redirected to /
     │                                        │
     ├─────────────────────────────────────┤
     │                                        │
     │ 7. AuthRedirect checks role           │ 7. AuthRedirect checks role
     │    → customer → stays on /brand       │    → admin/employee → stays on /
     │                                        │
     │ 8. LandingPage renders               │ 8. RetailZeroHome renders
     │    (Brand Colors)                    │    (With Brand Selector)
     │                                        │
```

---

## 📂 Component Communication Map

```
┌─────────────────────────────────────────────────────────────┐
│                      INDEX.JS / ROOT                         │
│  <Auth0Provider> <BrandProvider> <BrowserRouter>            │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                    ┌─────────────┴────────────────┐
                    │                              │
            ┌───────▼────────┐        ┌───────────▼────────┐
            │    APP.JS      │        │   AUTHREDIRECT     │
            │   (ROUTING)    │        │   (MONITORING)     │
            └───────┬────────┘        └───────────┬────────┘
                    │                             │
        ┌───────────┼──────────────┐              │
        │           │              │              │
   ┌────▼────┐ ┌────▼────┐ ┌──────▼────┐        │
   │  HOME   │ │  BRAND  │ │  ADMIN    │        │
   │         │ │  LAYOUT │ │  ROUTE    │        │
   └────┬────┘ └────┬────┘ └──────┬────┘        │
        │           │             │              │
        │      ┌────┴────┐        │              │
        │      │          │       │              │
   ┌────▼────┐ ┌──────────▼────┐ ┌──────────────▼────┐
   │Retail   │ │BrandSelector  │ │ProtectedAdmin    │
   │ZeroHome │ │               │ │ (with Role Check) │
   └─────────┘ └────────┬───────┘ └─────────┬────────┘
        │               │                    │
        │          ┌────▼──────┐             │
        │          │ (switches) │            │
        │          │  BRAND     │            │
        │          │ CONTEXT    │            │
        │          └────┬───────┘            │
        │               │                    │
   ┌────┴─────┐    ┌────┴────┐        ┌─────▼────────┐
   │Landing   │    │Dashboard│        │ Admin Page   │
   │Page      │    │          │        │(Full Control)│
   └──────────┘    └──────────┘        └──────────────┘
   
   Uses:
   • useAuth0() → JWT tokens, user info, login/logout
   • useBrand() → current brand, colors, logo
   • useNavigate() → React Router navigation
```

---

## 🔄 State Flow Diagram

```
┌──────────────────────────────────────────────────────┐
│          AUTH0 SESSION (Browser Storage)             │
│  • access_token: eyJhbGc...                          │
│  • id_token: eyJhbGc... (contains claims)           │
│  • refresh_token: ...                                │
│  • expires_in: 86400                                 │
└─────────────────────────┬──────────────────────────┘
                          │
                  ┌───────▼────────┐
                  │  useAuth0()    │
                  │  (Auth0 SDK)   │
                  └───────┬────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼───────┐  ┌──────▼────────┐  ┌────▼──────┐
   │isLoading   │  │isAuthenticated│  │user object│
   │(boolean)   │  │(boolean)      │  │{...}      │
   └────────────┘  └──────┬────────┘  └────┬──────┘
                          │                 │
                   ┌──────▼──────────────────▼──┐
                   │ AuthRedirect.js Monitoring │
                   │ (useEffect hook)           │
                   └──────┬─────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼─────────────────▼────────────────▼────┐
   │  Extract roles from token                   │
   │  const roles = user?.['https://...roles']   │
   └────┬──────────────────────────────────────┘
        │
   ┌────▼──────────────────────┐
   │ Decision Tree             │
   ├──────────────────────────┤
   │ if (admin) → /           │
   │ if (employee) → /        │
   │ if (customer) → /brand   │
   └────┬──────────────────────┘
        │
   ┌────▼──────────────────────┐
   │ navigate(path)            │
   │ (React Router)            │
   └────┬──────────────────────┘
        │
   ┌────▼──────────────────────┐
   │ Page renders with:        │
   │ • Current brand context   │
   │ • User info              │
   │ • Appropriate styling    │
   └──────────────────────────┘

┌──────────────────────────────────────────────────────┐
│       BRAND CONTEXT (React Context)                  │
│  • currentBrand: { id, colors, logo, orgId, ... }   │
│  • switchBrand: (brandId) → setCurrentBrand         │
└──────────────────────────────────────────────────────┘
        │
   ┌────▼──────────────────────┐
   │ CSS Variables Set:        │
   │ --primary-color: ...     │
   │ --secondary-color: ...   │
   └────┬──────────────────────┘
        │
   ┌────▼──────────────────────────────┐
   │ All components using var(...) CSS  │
   │ automatically update colors        │
   │ NO page reload needed!             │
   └───────────────────────────────────┘
```

---

## 🔑 Key Files Quick Reference

```
Entry Point
  └─ src/index.js
     └─ Auth0Provider + BrandProvider setup

Main App
  └─ src/App.js
     ├─ Route definitions
     ├─ Protected route logic
     └─ BrandLayout (navigation)

Authentication
  ├─ src/components/AuthRedirect.js (role-based routing)
  ├─ src/components/TokenInspector.js (debug tool)
  └─ src/utils/clearAuth0Cache.js (cache management)

State Management
  ├─ src/context/BrandContext.js (brand state)
  └─ src/config/brands.js (5 brands config)

Pages
  ├─ src/pages/RetailZeroHome.js (home, public)
  ├─ src/pages/LandingPage.js (brand landing, org-scoped)
  ├─ src/pages/Dashboard.js (customer dashboard, protected)
  ├─ src/pages/AdminPage.js (admin panel, admin-only)
  └─ src/pages/EmployeeLogin.js (employee login, public)

Styling
  ├─ src/App.css (global, CSS variables)
  ├─ src/index.css (base styles)
  └─ src/components/BrandSelector.css (component styles)

Scripts (Setup Automation)
  ├─ scripts/create-organizations.js (create 5 brand orgs)
  ├─ scripts/create-retailzero-org.js (create central org)
  ├─ scripts/enable-organizations.js (enable feature)
  ├─ scripts/create-*-users.js (create users)
  └─ scripts/update-roles.js (assign roles)

Configuration
  └─ .mcp-config.json (MCP server for AI integration)

Documentation
  ├─ README.md (main docs)
  ├─ REPOSITORY_OVERVIEW.md (technical overview)
  ├─ ARCHITECTURE_DEEP_DIVE.md (this document)
  └─ docs/ (additional guides)
```

---

## ⚡ Quick Command Reference

```bash
# Installation
npm install

# Development
npm start                    # Start dev server on port 3000

# Testing
npm test                     # Run tests

# Production
npm run build               # Build for deployment

# Setup (Auth0 Automation)
node scripts/create-organizations.js
node scripts/create-retailzero-org.js
node scripts/enable-organizations.js
node scripts/create-admin-users.js
node scripts/create-employee-users.js
node scripts/create-customer-users.js
node scripts/update-roles.js
node scripts/update-callback-urls.js

# Debug (Console)
clearAuth0Cache()           # Clear Auth0 tokens
```

---

## 🎓 Understanding Checklist

After reading this guide, you should understand:

- [ ] What RetailZero does and why it exists
- [ ] How the 5 brands are managed in one codebase
- [ ] The three-tier user system (customer, employee, admin)
- [ ] How Auth0 Organizations isolate customers
- [ ] How JWT tokens carry role and org information
- [ ] How role-based routing works
- [ ] How brand context provides dynamic theming
- [ ] How components communicate via hooks
- [ ] How authentication flows work for each user type
- [ ] How to add a 6th brand
- [ ] How to extend with new features
- [ ] Why this is better than building 5 separate apps

**If you can explain all of these, you understand RetailZero!** 🎉

