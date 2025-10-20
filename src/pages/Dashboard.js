import React from 'react';
import { useBrand } from '../context/BrandContext';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const { currentBrand } = useBrand();
  const { user } = useAuth0();

  return (
    <main style={{ padding: '40px 20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: currentBrand.theme.primary, fontSize: '36px' }}>
          Customer Portal
        </h1>
        <p style={{ color: '#666', fontSize: '18px' }}>
          Manage your account and orders at {currentBrand.displayName}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <img 
          src={currentBrand.logo} 
          alt={`${currentBrand.name} logo`}
          style={{
            height: '60px',
            width: '60px',
            objectFit: 'contain'
          }}
        />
        <h2 style={{ color: currentBrand.theme.primary, margin: 0 }}>
          {currentBrand.name} - Customer Dashboard
        </h2>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: `4px solid ${currentBrand.theme.primary}`
        }}>
          <h3>👤 User Profile</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Brand:</strong> {currentBrand.name}</p>
        </div>

        <div style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: `4px solid ${currentBrand.theme.secondary}`
        }}>
          <h3>🛍️ Recent Orders</h3>
          <p>No orders yet</p>
          <button style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: currentBrand.theme.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Browse Products
          </button>
        </div>

        <div style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: `4px solid ${currentBrand.theme.primary}`
        }}>
          <h3>⭐ Loyalty Points</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: currentBrand.theme.primary }}>
            0
          </p>
          <p style={{ color: '#666', fontSize: '14px' }}>Points available</p>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '8px',
        borderLeft: `5px solid ${currentBrand.theme.secondary}`
      }}>
        <h3>Organization Info</h3>
        <p><strong>Organization ID:</strong> {currentBrand.orgId}</p>
        <p><strong>Brand Domain:</strong> {currentBrand.domain}</p>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
          You are accessing {currentBrand.name} through Auth0 Organizations
        </p>
      </div>
    </main>
  );
}

export default Dashboard;

