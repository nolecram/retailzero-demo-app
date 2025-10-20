# RetailZero Demo App# RetailZero Demo App



A modern React application demonstrating **Auth0 authentication**, **role-based access control**, and **multi-brand architecture** using Auth0 Organizations.A modern React application demonstrating **Auth0 authentication**, **role-based access control**, and **multi-brand architecture** using Auth0 Organizations. Built for the Auth0 technical exercise showcasing secure authentication patterns.



## ✨ Key Features## 📋 Technical Exercise Requirements



- 🔐 **Auth0 Authentication**: OAuth 2.0 with Organizations supportThis application satisfies the following requirements:

- 🏢 **Multi-Brand Architecture**: 5 retail brands with isolated customer bases

- 👥 **Three-Tier Access Control**: Customer, Employee, and Admin portals### ✅ 1. Unsecured ("Open") Landing Page

- 🎨 **Dynamic Theming**: Brand-specific colors and logos- **Route**: `/` (LandingPage.js)

- 📱 **Responsive Design**: Mobile-friendly interface- **Access**: Public - No authentication required

- 🔄 **Centralized Staff Management**: Single organization for all employees/admins- **Features**: Brand showcase, login CTA, public information



## 🚀 Quick Start### ✅ 2. Protected Page for Any Authenticated User

- **Route**: `/dashboard` (Dashboard.js)

```bash- **Access**: Any authenticated user

# Install dependencies- **Protection**: `withAuthenticationRequired` HOC

npm install- **Features**: User profile, organization info, personalized dashboard



# Start development server### ✅ 3. Protected Page for Admin Group Only

npm start- **Route**: `/admin` (AdminPage.js)

```- **Access**: Users with `admin` role only

- **Protection**: `withAuthenticationRequired` + role-based authorization

Visit `http://localhost:3000`- **Features**: User management, brand overview, admin analytics



**Default Test User:**📄 **[See detailed requirements verification →](./TECHNICAL_REQUIREMENTS.md)**

- Email: `customer1+autozero@goingtobuy.com`

- Password: `Melbourne.2005`## ✨ Features



📖 **[Full Setup Guide →](./docs/SETUP.md)**- **� Auth0 Authentication**: Secure OAuth 2.0 login/logout with Organizations support

- **🏢 Multi-Brand Architecture**: 5 retail brands (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero)

## 📋 Technical Requirements ✅- **🛡️ Role-Based Access Control**: Admin and user role enforcement

- **🎨 Dynamic Theming**: Brand-specific colors and logos

### 1. Unsecured Landing Page- **📱 Responsive Design**: Mobile-friendly interface

- **Route**: `/` and `/brand`- **� Brand Context**: React Context for global brand state management

- **Access**: Public - No authentication required

- **Purpose**: Brand showcase, login options## 🏗️ Project Structure



### 2. Protected Customer Portal```

- **Route**: `/brand/customer`retailzero-demo/

- **Access**: Any authenticated user├── public/

- **Features**: Dashboard, orders, account info│   ├── logos/                  # Brand logos (AutoZero, CampNation, BBQ1, etc.)

│   ├── index.html

### 3. Admin-Only Portal│   └── manifest.json

- **Route**: `/brand/admin`├── src/

- **Access**: Users with `admin` role only│   ├── pages/

- **Features**: User management, brand analytics│   │   ├── LandingPage.js      # ✅ PUBLIC: Unsecured landing page

│   │   ├── Dashboard.js        # ✅ PROTECTED: Any authenticated user

📄 **[Detailed Requirements →](./docs/TECHNICAL_REQUIREMENTS.md)**│   │   └── AdminPage.js        # ✅ ADMIN ONLY: Admin role required

│   ├── components/

## 🏗️ Architecture│   │   └── BrandSelector.js    # Brand switching dropdown

│   ├── context/

### User Roles│   │   └── BrandContext.js     # Global brand state management

│   ├── config/

| Role | Access Level | Login Portal |│   │   └── brands.js           # 5 brand configurations with Auth0 Org IDs

|------|--------------|--------------|│   ├── App.js                  # Main app with routing and protection

| **Customer** | Brand-specific portal | Brand landing pages |│   ├── App.css                 # Dynamic theming styles

| **Employee** | All brands, internal tools | Central employee login |│   └── index.js                # Auth0Provider with Organizations

| **Admin** | Full access to all portals | Central employee login |├── scripts/

│   └── create-organizations.js # Script to create Auth0 Organizations

### Organizations└── package.json

```

- **5 Brand Organizations**: AutoZero, CampNation, BBQ1, OfficeZero, CandyZero

- **1 Central Organization**: RetailZero (for employees/admins)## 🚀 Getting Started



📐 **[Architecture Details →](./docs/architecture/MULTI_BRAND_ARCHITECTURE.md)**### Prerequisites



## 📂 Project Structure- Node.js (v14 or higher)

- npm or yarn

```- Auth0 account (for authentication)

retailzero-demo/

├── docs/                      # Documentation### Installation

│   ├── setup/                # Setup guides

│   ├── architecture/         # Architecture docs1. Clone the repository:

│   └── SETUP.md             # Main setup guide   ```bash

├── public/   git clone https://github.com/nolecram/retailzero-demo-app.git

│   └── logos/               # Brand logos   cd retailzero-demo-app

├── scripts/                 # Auth0 automation   ```

│   ├── create-organizations.js

│   ├── create-admin-users.js2. Install dependencies:

│   ├── create-employee-users.js   ```bash

│   └── create-customer-users.js   npm install

└── src/   ```

    ├── components/          # Reusable components

    ├── config/             # Brand configurations3. Set up Auth0:

    ├── context/            # React Context providers   - **Domain**: `retailzero-demo.au.auth0.com` (already configured)

    └── pages/              # Route pages   - **Client ID**: `xERyHPEBariMBWqKdMV2we1qFyhi3So6` (already configured)

```   - **Organizations**: 5 brands already created with real Organization IDs

   - Alternatively, create your own Auth0 application at [auth0.com](https://auth0.com)

## 🔧 Tech Stack   - Add `http://localhost:3000` to Allowed Callback URLs

   - Add `http://localhost:3000` to Allowed Logout URLs

- **React 19.2.0** - UI framework   - Add `http://localhost:3000` to Allowed Web Origins

- **React Router 7.9.4** - Client-side routing

- **Auth0 React SDK 2.8.0** - Authentication4. Organizations are pre-configured:

- **Auth0 Organizations** - Multi-tenant isolation   - **AutoZero**: `org_hC536v5MhZj2GMtF`

- **React Context API** - State management   - **CampNation**: `org_BR45iMQDE2iNKP8R`

   - **BBQ1**: `org_ubS05VW6UFh2xI1W`

## 🎨 Brands   - **OfficeZero**: `org_TxqSP6gqpe4cE0Tf`

   - **CandyZero**: `org_bt36R0WKuJ3rtiuM`

| Brand | Industry | Primary Color |

|-------|----------|---------------|### Running the App

| **AutoZero** | Automotive parts | `#FF6B35` |

| **CampNation** | Outdoor gear | `#2D6A4F` |Start the development server:

| **BBQ1** | BBQ equipment | `#D00000` |```bash

| **OfficeZero** | Office supplies | `#4361EE` |npm start

| **CandyZero** | Confectionery | `#F72585` |```



## 🔐 Test CredentialsThe app will open at [http://localhost:3000](http://localhost:3000)



### Customers (Brand-Specific)## 📋 Available Scripts

- **Email Format**: `customer[1-4]+[brand]@goingtobuy.com`

- **Example**: `customer1+autozero@goingtobuy.com`### `npm start`

- **Password**: `Melbourne.2005`Runs the app in development mode with hot reloading.



### Employees (Central Organization)### `npm test`

- **Email**: `employee[1-4]@retailzero.com`Launches the test runner in interactive watch mode.

- **Password**: `Melbourne.2025`

### `npm run build`

### Admins (Central Organization)Builds the app for production to the `build` folder. Optimizes the build for best performance.

- **Email**: `admin[1-4]@retailzero.com`

- **Password**: `Melbourne.2025`### `npm run eject`

**Note: This is a one-way operation!** Ejects from Create React App for full configuration control.

## 📚 Documentation

## 🔑 Authentication & Authorization

- **[Setup Guide](./docs/SETUP.md)** - Installation and configuration

- **[Advanced Setup](./docs/setup/ADVANCED_SETUP.md)** - Organizations and user creation### Route Protection Summary

- **[Architecture](./docs/architecture/MULTI_BRAND_ARCHITECTURE.md)** - System design

- **[Technical Requirements](./docs/TECHNICAL_REQUIREMENTS.md)** - Requirements verification| Route | Component | Access Level | Protection Method |

|-------|-----------|--------------|-------------------|

## 🛠️ Development| `/` | LandingPage | **Public** | None - Open access ✅ |

| `/dashboard` | Dashboard | **Authenticated Users** | `withAuthenticationRequired` HOC ✅ |

```bash| `/admin` | AdminPage | **Admin Role Only** | `withAuthenticationRequired` + role check ✅ |

# Install dependencies

npm install### Authentication Flow



# Run development server1. **Landing Page** (`/`)

npm start   - Public access for all visitors

   - Displays brand information and login button

# Build for production   - No authentication required

npm run build

```2. **User Login**

   - Click "Get Started" or "Log In"

## 🎯 User Journeys   - Redirects to Auth0 Universal Login

   - Authenticates with organization-scoped login

### Customer Journey   - Returns to application with tokens

1. Visit RetailZero home (`/`)

2. Select a brand (e.g., AutoZero)3. **Dashboard** (`/dashboard`)

3. Click "Get Started"   - Protected route for authenticated users

4. Login → Customer Authenticated page   - Shows user profile and organization info

5. Access Customer Portal   - Accessible to all logged-in users regardless of role



### Employee/Admin Journey4. **Admin Panel** (`/admin`)

1. Visit RetailZero home (`/`)   - Protected route with role-based authorization

2. Click "Employee & Admin Login" (footer)   - Requires `admin` role in user profile

3. Login → Employee/Admin Authenticated page   - Shows user management and brand overview

4. Access appropriate portal   - Displays "Access denied" message if user lacks admin role

5. Manage all brands from single account

### Role Configuration

## 🔒 Security Features

Roles are assigned in Auth0 and read from the user's token:

- **OAuth 2.0** authentication flow```javascript

- **Organization-based** user isolationconst roles = user?.['https://retailzero.com/roles'] || [];

- **Role-based** access control (RBAC)const isAdmin = roles.includes('admin');

- **Protected routes** with authentication guards```

- **Secure token storage** with refresh tokens

- **Multi-tenant** data isolationTo assign admin role in Auth0:

1. Go to **User Management** → **Users**

---2. Select a user

3. Navigate to **Roles** tab

**Built with ❤️ using Auth0, React, and modern web standards**4. Assign the `admin` role


## 🛠️ Tech Stack

- **React 19.2.0** - Modern UI library with concurrent features
- **React Router v7.9.4** - Client-side routing with protected routes
- **@auth0/auth0-react v2.8.0** - Auth0 authentication SDK
- **Auth0 Organizations** - Multi-tenant B2B architecture
- **Create React App** - Zero-config build tooling
- **React Context API** - Global state management for brands

## 🧪 Testing

Run tests with:
```bash
npm test
```

Tests are configured with:
- Jest
- React Testing Library
- @testing-library/user-event

## 📦 Building for Production

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. The optimized files will be in the `build/` folder, ready to deploy.

## 🌐 Deployment

This app can be deployed to various platforms:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload the `build` folder to S3 bucket

See the [Create React App deployment docs](https://facebook.github.io/create-react-app/docs/deployment) for more options.

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
- [React Router Documentation](https://reactrouter.com/)
- [Create React App Documentation](https://create-react-app.dev/)

## 📚 Project Documentation

This project includes comprehensive documentation:

- **[TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md)** - Verification of exercise requirements ✅
- **[MULTI_BRAND_ARCHITECTURE.md](./MULTI_BRAND_ARCHITECTURE.md)** - Multi-brand architecture details
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step configuration guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Complete feature summary
- **[AUTH0_SETUP_INSTRUCTIONS.md](./AUTH0_SETUP_INSTRUCTIONS.md)** - Auth0 troubleshooting guide
- **[QUICK_SETUP.md](./QUICK_SETUP.md)** - 3-step quick start for Organizations
- **[LOGO_URLS_FOR_AUTH0.md](./LOGO_URLS_FOR_AUTH0.md)** - GitHub URLs for brand logos
- **[create-auth0-organizations.md](./create-auth0-organizations.md)** - Detailed organization creation

## 👤 Author

**nolecram**
- GitHub: [@nolecram](https://github.com/nolecram)

---

Built with ❤️ using React and Auth0
