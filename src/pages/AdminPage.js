import React from 'react';
import { useBrand } from '../context/BrandContext';
import { useAuth0 } from '@auth0/auth0-react';
import { BRANDS } from '../config/brands';

function AdminPage() {
  const { currentBrand } = useBrand();
  const { user } = useAuth0();

  return (
    <main style={{ padding: '40px 20px' }}>
      <h2 style={{ color: currentBrand.theme.primary }}>
        Admin Panel - {currentBrand.name}
      </h2>
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <strong>🔐 Admin Access Granted</strong>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
          You have administrative privileges for {currentBrand.name}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
          <h3>👥 User Management</h3>
          <p>Total Users: 0</p>
          <p>Active Sessions: 0</p>
          <button style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: currentBrand.theme.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Manage Users
          </button>
        </div>

        <div style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: `4px solid ${currentBrand.theme.secondary}`
        }}>
          <h3>🏢 Brand Configuration</h3>
          <p><strong>Current Brand:</strong> {currentBrand.name}</p>
          <p><strong>Organization:</strong> {currentBrand.orgId}</p>
          <p><strong>Theme:</strong> {currentBrand.theme.primary}</p>
        </div>

        <div style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: `4px solid ${currentBrand.theme.primary}`
        }}>
          <h3>📊 Analytics</h3>
          <p>Page Views: 0</p>
          <p>Conversions: 0</p>
          <p>Revenue: $0</p>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3>🏪 All RetailZero Brands</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '20px'
        }}>
          {Object.values(BRANDS).map(brand => (
            <div
              key={brand.id}
              style={{
                padding: '15px',
                background: brand.id === currentBrand.id ? '#f0f8ff' : '#f9f9f9',
                borderRadius: '8px',
                borderLeft: `4px solid ${brand.theme.primary}`,
                border: brand.id === currentBrand.id ? `2px solid ${brand.theme.primary}` : 'none',
                textAlign: 'center'
              }}
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`}
                style={{
                  height: '60px',
                  width: '60px',
                  objectFit: 'contain',
                  marginBottom: '10px'
                }}
              />
              <h4 style={{ color: brand.theme.primary, margin: '0 0 10px 0' }}>
                {brand.name}
              </h4>
              <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                {brand.orgId}
              </p>
              <div style={{
                display: 'flex',
                gap: '5px',
                marginTop: '10px',
                justifyContent: 'center'
              }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '3px',
                  backgroundColor: brand.theme.primary
                }}></span>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '3px',
                  backgroundColor: brand.theme.secondary
                }}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '8px',
        borderLeft: `5px solid ${currentBrand.theme.primary}`
      }}>
        <h3>Admin User Info</h3>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>User ID:</strong> {user?.sub}</p>
        <p><strong>Roles:</strong> {user?.['https://retailzero.com/roles']?.join(', ') || 'admin'}</p>
      </div>
    </main>
  );
}

export default AdminPage;

