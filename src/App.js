import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { useBrand } from './context/BrandContext';
import BrandSelector from './components/BrandSelector';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import './App.css';

// Custom wrapper to pass organization during authentication
const ProtectedRoute = ({ component: Component, requireAdmin = false }) => {
  const { currentBrand } = useBrand();
  
  const ProtectedComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => <div>Loading...</div>,
    loginOptions: {
      authorizationParams: {
        organization: currentBrand.orgId
      }
    }
  });

  return requireAdmin ? (
    <ProtectedComponent />
  ) : (
    <ProtectedComponent />
  );
};

const AdminComponent = () => {
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || user?.app_metadata?.roles || [];
  return roles.includes('admin') ? <AdminPage /> : <p>Access denied: Admins only</p>;
};

function App() {
  const { isAuthenticated, logout, user } = useAuth0();
  const { currentBrand } = useBrand();

  return (
    <Router>
        <nav className="main-nav">
          <div className="nav-brand">
            <img src={currentBrand.logo} alt={`${currentBrand.displayName} logo`} className="brand-logo" />
            <h2>{currentBrand.displayName}</h2>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/admin">Admin</Link>
            {isAuthenticated && (
              <div className="user-profile">
                <span>👤 {user?.name || user?.email}</span>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Logout
                </button>
              </div>
            )}
          </div>
          <BrandSelector />
        </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/admin" element={<ProtectedRoute component={AdminComponent} requireAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

