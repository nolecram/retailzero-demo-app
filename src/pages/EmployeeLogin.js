import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { RETAILZERO_ORG, BRANDS } from '../config/brands';

function EmployeeLogin() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const roles = user?.['https://retailzero.com/roles'] || user?.app_metadata?.roles || [];
      
      // Set a default brand (AutoZero) for the context after employee login
      if (roles.includes('admin')) {
        navigate('/brand/admin-authenticated');
      } else if (roles.includes('employee')) {
        navigate('/brand/employee-authenticated');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleEmployeeLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        organization: RETAILZERO_ORG.orgId
      },
      appState: {
        returnTo: '/employee-login'
      }
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '60px 40px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <img 
          src="/logos/retailzero.png" 
          alt="RetailZero"
          style={{
            height: '100px',
            width: '100px',
            objectFit: 'contain',
            marginBottom: '30px'
          }}
        />
        
        <h1 style={{
          fontSize: '32px',
          color: '#333',
          marginBottom: '10px'
        }}>
          Employee & Admin Access
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Sign in to access the RetailZero employee portal and manage all brands from a single account.
        </p>

        <div style={{
          background: '#f9f9f9',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '14px', color: '#333', marginBottom: '15px' }}>
            This portal is for:
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', fontSize: '14px', lineHeight: '2' }}>
            <li>RetailZero Employees</li>
            <li>Brand Administrators</li>
            <li>Internal Staff</li>
            <li>System Managers</li>
          </ul>
        </div>

        <button
          onClick={handleEmployeeLogin}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '18px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            marginBottom: '20px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Sign In as Employee/Admin
        </button>

        <p style={{ fontSize: '14px', color: '#999' }}>
          Are you a customer? <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>Go to brand selection</a>
        </p>
      </div>
    </div>
  );
}

export default EmployeeLogin;
