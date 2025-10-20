# RetailZero Demo App

A modern React-based retail management application demonstrating authentication, role-based access control, and multi-page navigation. This project showcases a complete implementation of Auth0 authentication with protected routes and admin-level authorization.

## ✨ Features

- **🔐 Authentication**: Secure login/logout functionality using Auth0
- **🛡️ Protected Routes**: Role-based access control for sensitive pages
- **👥 User Roles**: Support for regular users and administrators
- **🎨 Modern UI**: Built with React 19 and React Router v7
- **📱 Responsive Design**: Mobile-friendly interface
- **🚀 Fast Development**: Hot module reloading with Create React App

## 🏗️ Project Structure

```
retailzero-demo/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── pages/
│   │   ├── LandingPage.js      # Public home page
│   │   ├── Dashboard.js        # Protected user dashboard
│   │   └── AdminPage.js        # Admin-only panel
│   ├── App.js                  # Main app with routing
│   ├── index.js                # Entry point
│   └── App.css                 # Styles
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
   - Create an Auth0 application at [auth0.com](https://auth0.com)
   - Configure your Auth0 settings in your app
   - Add `http://localhost:3000` to Allowed Callback URLs
   - Add `http://localhost:3000` to Allowed Logout URLs

4. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
   REACT_APP_AUTH0_CLIENT_ID=your-client-id
   ```

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

## 🔑 Authentication Flow

1. **Landing Page**: Public access, displays welcome message
2. **Login**: Click "Log In" to authenticate via Auth0
3. **Dashboard**: Protected route accessible to all authenticated users
4. **Admin Panel**: Protected route accessible only to users with admin role

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **React Router v7** - Client-side routing
- **Auth0 React SDK** - Authentication and authorization
- **Create React App** - Build tooling
- **React Testing Library** - Testing utilities

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

## 👤 Author

**nolecram**
- GitHub: [@nolecram](https://github.com/nolecram)

---

Built with ❤️ using React and Auth0
