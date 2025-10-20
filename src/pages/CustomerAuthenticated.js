import React from 'react';
import { Link } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';
import { useAuth0 } from '@auth0/auth0-react';

function CustomerAuthenticated() {
  const { currentBrand } = useBrand();
  const { user } = useAuth0();

  return (
    <main style={{ 
      textAlign: 'center', 
      padding: '60px 20px',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '40px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderTop: `5px solid ${currentBrand.theme.primary}`
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
        
        <h1 style={{ 
          fontSize: '36px', 
          color: currentBrand.theme.primary,
          marginBottom: '10px'
        }}>
          Customer Authenticated
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          marginBottom: '20px' 
        }}>
          Welcome, {user?.name || user?.email}!
        </p>

        <div style={{
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '8px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <p style={{ margin: '5px 0' }}>
            <strong>Role:</strong> Customer
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Brand:</strong> {currentBrand.displayName}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Access Level:</strong> Customer Portal
          </p>
        </div>

        <p style={{ color: '#666', marginBottom: '30px' }}>
          You have successfully authenticated as a customer for {currentBrand.displayName}.
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              fontSize: '16px',
              backgroundColor: '#f0f0f0',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: '600',
              transition: 'background-color 0.3s'
            }}
          >
            ← Back to Home
          </Link>
          
          <Link 
            to="/brand/customer"
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              fontSize: '16px',
              backgroundColor: currentBrand.theme.primary,
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: '600',
              transition: 'background-color 0.3s'
            }}
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CustomerAuthenticated;
