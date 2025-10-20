import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useBrand } from './context/BrandContext';
import BrandSelector from './components/BrandSelector';
import AuthRedirect from './components/AuthRedirect';
import RetailZeroHome from './pages/RetailZeroHome';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EmployeeLogin from './pages/EmployeeLogin';
import './App.css';

function App() {
  return (
    <>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={<RetailZeroHome />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/brand" element={<BrandLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

// Layout component for brand-specific pages
function BrandLayout() {
  const { isAuthenticated, logout, user } = useAuth0();
  const { currentBrand } = useBrand();
  const roles = user?.['https://retailzero.com/roles'] || [];
  const userRole = roles.includes('admin') ? 'Admin' : roles.includes('employee') ? 'Employee' : 'Customer';

  return (
    <>
      <nav className="main-nav">
        <div className="nav-left">
          <Link to="/" className="all-brands-link">
            <span className="back-icon">←</span>
            <span>All Brands</span>
          </Link>
          <div className="nav-divider"></div>
          <div className="nav-brand">
            <img src={currentBrand.logo} alt={`${currentBrand.displayName} logo`} className="brand-logo" />
            <h2>{currentBrand.displayName}</h2>
          </div>
        </div>
        <div className="nav-links">
          {isAuthenticated ? (
            <Link to="/brand/dashboard">My Dashboard</Link>
          ) : (
            <Link to="/brand">Home</Link>
          )}
        </div>
        <div className="nav-right">
          <BrandSelector />
          {isAuthenticated && (
            <div className="user-profile">
              <div className="user-avatar">
                {user?.picture ? (
                  <img src={user.picture} alt={user.name} />
                ) : (
                  <div className="user-avatar-placeholder">
                    {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.name || user?.email}</span>
                <span className="user-role">{userRole}</span>
              </div>
              <button className="logout-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;

