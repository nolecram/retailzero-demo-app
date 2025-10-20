import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';
import { useAuth0 } from '@auth0/auth0-react';

function LandingPage() {
  const { currentBrand } = useBrand();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Get user roles
      const roles = user?.['https://retailzero.com/roles'] || user?.app_metadata?.roles || [];
      
      // Redirect based on role
      if (roles.includes('admin')) {
        navigate('/brand/admin-authenticated');
      } else if (roles.includes('employee')) {
        navigate('/brand/employee-authenticated');
      } else {
        // Customer or no role
        navigate('/brand/customer-authenticated');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        organization: currentBrand.orgId
      },
      appState: {
        returnTo: '/brand'
      }
    });
  };

  return (
    <main style={{ textAlign: 'center', padding: '60px 20px' }}>
      <img 
        src={currentBrand.logo} 
        alt={`${currentBrand.name} logo`} 
        style={{
          height: '120px',
          width: '120px',
          objectFit: 'contain',
          marginBottom: '30px'
        }}
      />
      <h1 style={{ 
        fontSize: '48px', 
        color: currentBrand.theme.primary,
        marginBottom: '20px'
      }}>
        Welcome to {currentBrand.name}
      </h1>
      <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
        Your trusted retail partner powered by RetailZero
      </p>
      
      <div style={{
        padding: '40px',
        background: '#f9f9f9',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: '0 auto',
        borderLeft: `5px solid ${currentBrand.theme.primary}`
      }}>
        <h3 style={{ color: currentBrand.theme.secondary }}>Brand Features</h3>
        <ul style={{ textAlign: 'left', lineHeight: '2', fontSize: '16px' }}>
          <li>Secure authentication with Auth0</li>
          <li>Multi-brand support across {currentBrand.name}</li>
          <li>Role-based access control</li>
          <li>Customer dashboard and analytics</li>
          <li>Admin management portal</li>
        </ul>
        
        {!isAuthenticated && (
          <button
            onClick={handleLogin}
            style={{
              marginTop: '30px',
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: currentBrand.theme.primary,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Get Started with {currentBrand.name} →
          </button>
        )}
      </div>
    </main>
  );
}

export default LandingPage;

