import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';

const ProtectedDashboard = withAuthenticationRequired(Dashboard);

const ProtectedAdmin = withAuthenticationRequired(() => {
  const { user } = useAuth0();
  const roles = user?.app_metadata?.roles || [];

  return roles.includes('admin') ? <AdminPage /> : <p>Access denied: Admins only</p>;
});

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/admin">Admin</Link> |{' '}
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

