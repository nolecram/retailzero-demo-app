# RetailZero Demo App

A modern React application demonstrating **Auth0 authentication**, **role-based access control**, and **multi-brand architecture** using Auth0 Organizations. Built for the Auth0 technical exercise showcasing secure authentication patterns.

## 📋 Technical Exercise Requirements

This application satisfies the following requirements:

### ✅ 1. Unsecured ("Open") Landing Page
- **Route**: `/` (LandingPage.js)
- **Access**: Public - No authentication required
- **Features**: Brand showcase, login CTA, public information

### ✅ 2. Protected Page for Any Authenticated User
- **Route**: `/dashboard` (Dashboard.js)
- **Access**: Any authenticated user
- **Protection**: `withAuthenticationRequired` HOC
- **Features**: User profile, organization info, personalized dashboard

### ✅ 3. Protected Page for Admin Group Only
- **Route**: `/admin` (AdminPage.js)
- **Access**: Users with `admin` role only
- **Protection**: `withAuthenticationRequired` + role-based authorization
- **Features**: User management, brand overview, admin analytics

📄 **[See detailed requirements verification →](./TECHNICAL_REQUIREMENTS.md)**

## ✨ Features

- **� Auth0 Authentication**: Secure OAuth 2.0 login/logout with Organizations support
- **🏢 Multi-Brand Architecture**: 5 retail brands (AutoZero, CampNation, BBQ1, OfficeZero, CandyZero)
- **🛡️ Role-Based Access Control**: Admin and user role enforcement
- **🎨 Dynamic Theming**: Brand-specific colors and logos
- **📱 Responsive Design**: Mobile-friendly interface
- **� Brand Context**: React Context for global brand state management

## 🏗️ Project Structure

```
retailzero-demo/
├── public/
│   ├── logos/                  # Brand logos (AutoZero, CampNation, BBQ1, etc.)
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── pages/
│   │   ├── LandingPage.js      # ✅ PUBLIC: Unsecured landing page
│   │   ├── Dashboard.js        # ✅ PROTECTED: Any authenticated user
│   │   └── AdminPage.js        # ✅ ADMIN ONLY: Admin role required
│   ├── components/
│   │   └── BrandSelector.js    # Brand switching dropdown
│   ├── context/
│   │   └── BrandContext.js     # Global brand state management
│   ├── config/
│   │   └── brands.js           # 5 brand configurations with Auth0 Org IDs
│   ├── App.js                  # Main app with routing and protection
│   ├── App.css                 # Dynamic theming styles
│   └── index.js                # Auth0Provider with Organizations
├── scripts/
│   └── create-organizations.js # Script to create Auth0 Organizations
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Auth0 account (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nolecram/retailzero-demo-app.git
   cd retailzero-demo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Auth0:
   - **Domain**: `retailzero-demo.au.auth0.com` (already configured)
   - **Client ID**: `xERyHPEBariMBWqKdMV2we1qFyhi3So6` (already configured)
   - **Organizations**: 5 brands already created with real Organization IDs
   - Alternatively, create your own Auth0 application at [auth0.com](https://auth0.com)
   - Add `http://localhost:3000` to Allowed Callback URLs
   - Add `http://localhost:3000` to Allowed Logout URLs
   - Add `http://localhost:3000` to Allowed Web Origins

4. Organizations are pre-configured:
   - **AutoZero**: `org_hC536v5MhZj2GMtF`
   - **CampNation**: `org_BR45iMQDE2iNKP8R`
   - **BBQ1**: `org_ubS05VW6UFh2xI1W`
   - **OfficeZero**: `org_TxqSP6gqpe4cE0Tf`
   - **CandyZero**: `org_bt36R0WKuJ3rtiuM`

### Running the App

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

### `npm start`
Runs the app in development mode with hot reloading.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. Optimizes the build for best performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App for full configuration control.

## 🔑 Authentication & Authorization

### Route Protection Summary

| Route | Component | Access Level | Protection Method |
|-------|-----------|--------------|-------------------|
| `/` | LandingPage | **Public** | None - Open access ✅ |
| `/dashboard` | Dashboard | **Authenticated Users** | `withAuthenticationRequired` HOC ✅ |
| `/admin` | AdminPage | **Admin Role Only** | `withAuthenticationRequired` + role check ✅ |

### Authentication Flow

1. **Landing Page** (`/`)
   - Public access for all visitors
   - Displays brand information and login button
   - No authentication required

2. **User Login**
   - Click "Get Started" or "Log In"
   - Redirects to Auth0 Universal Login
   - Authenticates with organization-scoped login
   - Returns to application with tokens

3. **Dashboard** (`/dashboard`)
   - Protected route for authenticated users
   - Shows user profile and organization info
   - Accessible to all logged-in users regardless of role

4. **Admin Panel** (`/admin`)
   - Protected route with role-based authorization
   - Requires `admin` role in user profile
   - Shows user management and brand overview
   - Displays "Access denied" message if user lacks admin role

### Role Configuration

Roles are assigned in Auth0 and read from the user's token:
```javascript
const roles = user?.['https://retailzero.com/roles'] || [];
const isAdmin = roles.includes('admin');
```

To assign admin role in Auth0:
1. Go to **User Management** → **Users**
2. Select a user
3. Navigate to **Roles** tab
4. Assign the `admin` role

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
