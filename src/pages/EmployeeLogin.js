import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { RETAILZERO_ORG } from '../config/brands';

function EmployeeLogin() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const handleEmployeeLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        organization: RETAILZERO_ORG.orgId,
        prompt: 'login'
      }
    });
  };

  // If authenticated, redirect based on role
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const roles = user?.['https://retailzero.com/roles'] || [];
      const isAdmin = roles.includes('admin');
      const isEmployee = roles.includes('employee');
      
      // Redirect admins and employees to home page
      if (isAdmin || isEmployee) {
        window.location.href = '/';
      }
    }
  }, [isAuthenticated, user]);

  // Show success message while redirecting
  if (isAuthenticated && user) {
    const roles = user?.['https://retailzero.com/roles'] || [];
    const organization = user?.['https://retailzero.com/org_name'] || user?.org_name || 'RetailZero';
    
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
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            fontSize: '40px',
            color: 'white'
          }}>✓</div>
          
          <h1 style={{
            fontSize: '32px',
            color: '#333',
            marginBottom: '10px'
          }}>Authentication Successful!</h1>
          
          <div style={{
            background: '#f0f7ff',
            border: '2px solid #667eea',
            borderRadius: '10px',
            padding: '30px',
            margin: '30px 0',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '18px', color: '#667eea', marginBottom: '20px' }}>Your Details:</h3>
            <div style={{ fontSize: '16px', color: '#333', lineHeight: '2' }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Organization:</strong> {organization}</p>
              <p><strong>Roles:</strong> {roles.length > 0 ? roles.join(', ') : 'No roles assigned'}</p>
              <p><strong>Email Verified:</strong> {user.email_verified ? '✓ Yes' : '✗ No'}</p>
            </div>
          </div>

          {roles.length > 0 && (
            <div style={{
              background: '#f9f9f9',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Access Level:</h3>
              {roles.map(role => (
                <span key={role} style={{
                  display: 'inline-block',
                  background: role === 'admin' ? '#667eea' : role === 'employee' ? '#764ba2' : '#888',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  margin: '5px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {role}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin + '/employee-login' } })}
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#667eea',
                background: 'white',
                border: '2px solid #667eea',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
