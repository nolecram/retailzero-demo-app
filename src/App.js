import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useBrand } from './context/BrandContext';
import BrandSelector from './components/BrandSelector';
import AuthRedirect from './components/AuthRedirect';
import RetailZeroHome from './pages/RetailZeroHome';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import EmployeeLogin from './pages/EmployeeLogin';
import './App.css';

// Protected route component for admin-only access
function ProtectedAdminComponent() {
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || [];

  return roles.includes('admin') ? (
    <AdminPage />
  ) : (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: '#f5f5f5'
    }}>
      <div style={{
        background: 'white',
        padding: '60px 40px',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '500px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#dc3545',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          fontSize: '40px',
          color: 'white'
        }}>🚫</div>
        <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '15px' }}>
          Access Denied
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
          Admins only
        </p>
        <p style={{ fontSize: '14px', color: '#999' }}>
          Your current role: {roles.length > 0 ? roles.join(', ') : 'None'}
        </p>
      </div>
    </div>
  );
}

const ProtectedAdmin = withAuthenticationRequired(ProtectedAdminComponent);

function App() {
  return (
    <>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={<RetailZeroHome />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
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

