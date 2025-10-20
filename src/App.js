import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { useBrand } from './context/BrandContext';
import BrandSelector from './components/BrandSelector';
import RetailZeroHome from './pages/RetailZeroHome';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EmployeePortal from './pages/EmployeePortal';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminPage from './pages/AdminPage';
import CustomerAuthenticated from './pages/CustomerAuthenticated';
import EmployeeAuthenticated from './pages/EmployeeAuthenticated';
import AdminAuthenticated from './pages/AdminAuthenticated';
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

const CustomerComponent = () => {
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || user?.app_metadata?.roles || [];
  // Allow customer role OR users without any role (default access)
  return roles.includes('customer') || roles.length === 0 || (!roles.includes('employee') && !roles.includes('admin')) ? 
    <Dashboard /> : 
    <p>Access denied: Customers only</p>;
};

const EmployeeComponent = () => {
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || user?.app_metadata?.roles || [];
  return roles.includes('employee') || roles.includes('admin') ? <EmployeePortal /> : <p>Access denied: Employees only</p>;
};

const AdminComponent = () => {
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || user?.app_metadata?.roles || [];
  return roles.includes('admin') ? <AdminPage /> : <p>Access denied: Admins only</p>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* RetailZero Home - No Nav */}
        <Route path="/" element={<RetailZeroHome />} />
        
        {/* Employee/Admin Login - Central Organization */}
        <Route path="/employee-login" element={<EmployeeLogin />} />
        
        {/* Brand-specific pages with Nav */}
        <Route path="/brand" element={<BrandLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="customer" element={<ProtectedRoute component={CustomerComponent} />} />
          <Route path="employee" element={<ProtectedRoute component={EmployeeComponent} />} />
          <Route path="admin" element={<ProtectedRoute component={AdminComponent} requireAdmin />} />
          <Route path="customer-authenticated" element={<ProtectedRoute component={CustomerAuthenticated} />} />
          <Route path="employee-authenticated" element={<ProtectedRoute component={EmployeeAuthenticated} />} />
          <Route path="admin-authenticated" element={<ProtectedRoute component={AdminAuthenticated} />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Layout component for brand-specific pages
function BrandLayout() {
  const { isAuthenticated, logout, user } = useAuth0();
  const { currentBrand } = useBrand();

  return (
    <>
      <nav className="main-nav">
        <div className="nav-brand">
          <img src={currentBrand.logo} alt={`${currentBrand.displayName} logo`} className="brand-logo" />
          <h2>{currentBrand.displayName}</h2>
        </div>
        <div className="nav-links">
          <Link to="/" style={{ fontSize: '14px', color: '#666' }}>← All Brands</Link>
          {isAuthenticated ? (
            <Link to="/brand/customer">My Dashboard</Link>
          ) : (
            <Link to="/brand">Home</Link>
          )}
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
      <Outlet />
    </>
  );
}

export default App;

