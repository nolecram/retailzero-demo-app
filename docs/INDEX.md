# RetailZero Demo - Documentation Index

Multi-brand retail application demonstrating Auth0 Organizations with role-based access control.

## Quick Links

- [Setup Guide](./SETUP.md) - Complete setup instructions
- [Technical Requirements](./TECHNICAL_REQUIREMENTS.md) - Architecture and requirements
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - What has been built

## Key Features

- **Multi-Brand Architecture**: 5 independent brands (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero) managed under one platform
- **Auth0 Organizations**: Each brand is its own organization with isolated users
- **Role-Based Access**: Three roles (admin, employee, customer) with different access levels
- **Single Page Application**: Built with React 19 and React Router 7

## Authentication Flow

1. **Customer Login**: Brand-specific login via brand landing pages
2. **Employee/Admin Login**: Central login via `/employee-login` for RetailZero organization
3. **Success Display**: Shows user information and roles after successful authentication

## Users

- **Admins**: admin1-4@retailzero.com (password: Melbourne.2025)
- **Employees**: employee1-4@retailzero.com (password: Melbourne.2025)  
- **Customers**: customer1-4@[brand].com (password: Melbourne.2005)
