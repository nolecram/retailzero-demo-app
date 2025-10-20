import React from 'react';
import { useBrand } from '../context/BrandContext';
import { useAuth0 } from '@auth0/auth0-react';

function LandingPage() {
  const { currentBrand } = useBrand();
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();

  // Auto-redirect customers to their brand page after login
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const roles = user?.['https://retailzero.com/roles'] || [];
      const isCustomer = roles.includes('customer');
      const isAdmin = roles.includes('admin');
      const isEmployee = roles.includes('employee');
      const userOrg = user?.org_id;
      
      // If customer is on wrong brand, don't redirect
      if (isCustomer && !isAdmin && !isEmployee && userOrg !== currentBrand.orgId) {
        return; // Let the access denied screen show
      }
    }
  }, [isAuthenticated, user, currentBrand.orgId]);

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        organization: currentBrand.orgId,
      },
      appState: {
        returnTo: window.location.pathname
      }
    });
  };

  const handleSignup = () => {
    loginWithRedirect({
      authorizationParams: {
        organization: currentBrand.orgId,
        screen_hint: 'signup',
        prompt: 'login', // Force the login screen to show
      },
      appState: {
        returnTo: window.location.pathname,
        targetOrg: currentBrand.orgId
      }
    });
  };

  // If authenticated, verify user belongs to this brand's organization
  if (isAuthenticated && user) {
    const userOrg = user?.org_id;
    const roles = user?.['https://retailzero.com/roles'] || [];
    
    // Admins and employees have access to all brands
    const hasGlobalAccess = roles.includes('admin') || roles.includes('employee');
    
    // Check if user belongs to the current brand's organization (unless they have global access)
    if (!hasGlobalAccess && userOrg !== currentBrand.orgId) {
      return (
        <div style={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${currentBrand.primaryColor} 0%, ${currentBrand.secondaryColor} 100%)`,
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
              background: '#dc3545',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              fontSize: '40px',
              color: 'white'
            }}>✗</div>
            
            <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>
              Access Denied
            </h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
              You don't have access to {currentBrand.displayName}
            </p>
            
            <div style={{
              background: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: '10px',
              padding: '20px',
              margin: '30px 0',
              textAlign: 'left'
            }}>
              <p style={{ fontSize: '16px', color: '#856404', margin: 0 }}>
                <strong>Why am I seeing this?</strong><br/>
                Your account is registered with a different brand. Please log out and access your own brand portal.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  background: '#dc3545',
                  border: 'none',
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
                  color: '#666',
                  background: 'white',
                  border: '2px solid #ccc',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${currentBrand.primaryColor} 0%, ${currentBrand.secondaryColor} 100%)`,
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
            background: currentBrand.primaryColor,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            fontSize: '40px',
            color: 'white'
          }}>✓</div>
          
          <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>
            Welcome to {currentBrand.displayName}!
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
            You are successfully authenticated
          </p>
          
          <div style={{
            background: '#f0f7ff',
            border: `2px solid ${currentBrand.primaryColor}`,
            borderRadius: '10px',
            padding: '30px',
            margin: '30px 0',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '18px', color: currentBrand.primaryColor, marginBottom: '20px' }}>
              Your Information:
            </h3>
            <div style={{ fontSize: '16px', color: '#333', lineHeight: '2' }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Brand:</strong> {currentBrand.displayName}</p>
              <p><strong>Email Verified:</strong> {user.email_verified ? '✓ Yes' : '✗ No'}</p>
              {roles.length > 0 && (
                <p><strong>Roles:</strong> {roles.join(', ')}</p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                color: currentBrand.primaryColor,
                background: 'white',
                border: `2px solid ${currentBrand.primaryColor}`,
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
                background: currentBrand.primaryColor,
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div style={{ 
            marginTop: '30px',
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleLogin}
              style={{
                padding: '15px 40px',
                fontSize: '18px',
                backgroundColor: currentBrand.theme.primary,
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Login to Your Account
            </button>
            <button
              onClick={handleSignup}
              style={{
                padding: '15px 40px',
                fontSize: '18px',
                backgroundColor: 'white',
                color: currentBrand.theme.primary,
                border: `2px solid ${currentBrand.theme.primary}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentBrand.theme.primary;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = currentBrand.theme.primary;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default LandingPage;

