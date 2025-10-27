# RetailZero Demo - Documentation Index

Multi-brand retail application demonstrating Auth0 Organizations with role-based access control.

## 📚 Main Documentation

### Quick Start
- [**README.md**](../README.md) - Project overview and quick start
- [**SETUP.md**](./SETUP.md) - Complete setup instructions
- [**SECRETS_CONFIGURATION.md**](./SECRETS_CONFIGURATION.md) - Environment variables and credentials

### Architecture & Implementation
- [**TECHNICAL_REQUIREMENTS.md**](./TECHNICAL_REQUIREMENTS.md) - Requirements checklist
- [**IMPLEMENTATION_SUMMARY.md**](./IMPLEMENTATION_SUMMARY.md) - What has been built
- [**REPOSITORY_STRUCTURE.md**](./REPOSITORY_STRUCTURE.md) - Folder structure guide
- [**AUDIT_REPORT.md**](./AUDIT_REPORT.md) - Code quality & optimization report

### Deep Dives
- [**OPTIMIZATION_SUMMARY.md**](./OPTIMIZATION_SUMMARY.md) - Performance optimizations

### Auth0 Customization
- [**auth0-customization/QUICK_START.md**](./auth0-customization/QUICK_START.md) - Brand login page setup
- [**auth0-customization/AUTH0_LOGIN_TEMPLATE_GUIDE.md**](./auth0-customization/AUTH0_LOGIN_TEMPLATE_GUIDE.md) - Detailed customization
- Auth0 Templates:
  - [AutoZero Login](./auth0-customization/auth0-autozero-login.html)
  - [CampNation Login](./auth0-customization/auth0-campnation-login.html)
  - [BBQ1 Login](./auth0-customization/auth0-bbq1-login.html)
  - [OfficeZero Login](./auth0-customization/auth0-officezero-login.html)
  - [CandyZero Login](./auth0-customization/auth0-candyzero-login.html)

## Key Features

- **Multi-Brand Architecture**: 5 independent brands (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero) managed under one platform
- **Auth0 Organizations**: Each brand is its own organization with isolated users
- **Role-Based Access**: Three roles (admin, employee, customer) with different access levels
- **Single Page Application**: Built with React 19 and React Router 7
- **Branded Login Pages**: Custom Auth0 Universal Login templates per brand

## Authentication Flow

1. **Customer Login**: Brand-specific login via brand landing pages
2. **Employee/Admin Login**: Central login via `/employee-login` for RetailZero organization
3. **Success Display**: Shows user information and roles after successful authentication

## Test Users

- **Admins**: admin1-4@retailzero.com (password: Melbourne.2025)
- **Employees**: employee1-4@retailzero.com (password: Melbourne.2025)  
- **Customers**: customer1-4@[brand].com (password: Melbourne.2005)

## 🗂️ Documentation Organization

```
docs/
├── INDEX.md (you are here)
├── SETUP.md
├── SECRETS_CONFIGURATION.md
├── TECHNICAL_REQUIREMENTS.md
├── IMPLEMENTATION_SUMMARY.md
├── OPTIMIZATION_SUMMARY.md
├── REPOSITORY_STRUCTURE.md
├── AUDIT_REPORT.md
└── auth0-customization/
    ├── QUICK_START.md
    ├── AUTH0_LOGIN_TEMPLATE_GUIDE.md
    └── [5 brand login templates]
```

## 🎯 Choose Your Path

**I want to...**
- **Get started quickly** → Start with [README.md](../README.md)
- **Understand the architecture** → Read [TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md)
- **Set up my environment** → Follow [SETUP.md](./SETUP.md)
- **Configure secrets** → See [SECRETS_CONFIGURATION.md](./SECRETS_CONFIGURATION.md)
- **Customize Auth0 login** → Follow [auth0-customization/QUICK_START.md](./auth0-customization/QUICK_START.md)
- **Review code quality** → Check [AUDIT_REPORT.md](./AUDIT_REPORT.md)
- **Understand folder structure** → See [REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md)

## 📊 Repository Status

- ✅ Production-ready
- ✅ Fully documented
- ✅ Secure and optimized
- ✅ Ready for deployment
- See [AUDIT_REPORT.md](./AUDIT_REPORT.md) for full details
