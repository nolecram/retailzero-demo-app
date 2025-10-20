import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { useBrand } from './context/BrandContext';
import BrandSelector from './components/BrandSelector';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import './App.css';

const ProtectedDashboard = withAuthenticationRequired(Dashboard);

const ProtectedAdmin = withAuthenticationRequired(() => {
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || user?.app_metadata?.roles || [];

  return roles.includes('admin') ? <AdminPage /> : <p>Access denied: Admins only</p>;
});

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
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
        </nav>      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

