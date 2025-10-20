import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';
import { useAuth0 } from '@auth0/auth0-react';
import { BRANDS } from '../config/brands';

function AdminPage() {
  const navigate = useNavigate();
  const { currentBrand } = useBrand();
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || [];

  // Double-check admin access (should be handled by route protection, but good practice)
  if (!roles.includes('admin')) {
    return (
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
            This page is restricted to administrators only.
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            Your current role: {roles.length > 0 ? roles.join(', ') : 'None'}
          </p>
        </div>
      </div>
    );
  }

  const brandArray = Object.values(BRANDS);

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Back to Home Link */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#666',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#667eea';
            e.currentTarget.style.color = '#667eea';
            e.currentTarget.style.transform = 'translateX(-3px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e0e0e0';
            e.currentTarget.style.color = '#666';
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
          }}
        >
          <span style={{ fontSize: '18px' }}>←</span>
          <span>Back to RetailZero Home</span>
        </button>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: '#28a745',
          color: 'white',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '15px'
        }}>
          🛡️ ADMIN ACCESS
        </div>
        <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '10px' }}>
          RetailZero Admin Panel
        </h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Manage all brands and system configurations
        </p>
      </div>

      {/* Admin Info Card */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '15px',
        color: 'white',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}>
            {user?.picture ? (
              <img src={user.picture} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            ) : (
              '👤'
            )}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '24px', marginBottom: '5px' }}>
              {user?.name || 'Admin User'}
            </h3>
            <p style={{ opacity: 0.9, marginBottom: '10px' }}>
              {user?.email}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {roles.map(role => (
                <span key={role} style={{
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {role.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #28a745'
        }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>TOTAL BRANDS</div>
          <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#28a745', marginBottom: '5px' }}>
            {brandArray.length}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>Active retail brands</div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #007bff'
        }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>USER MANAGEMENT</div>
          <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#007bff', marginBottom: '5px' }}>
            ∞
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>Multi-organization support</div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #ffc107'
        }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>AUTH0 INTEGRATION</div>
          <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#ffc107', marginBottom: '5px' }}>
            ✓
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>Organizations enabled</div>
        </div>
      </div>

      {/* All Brands Overview */}
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>
          All Retail Brands
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {brandArray.map(brand => (
            <div
              key={brand.id}
              style={{
                padding: '20px',
                border: brand.id === currentBrand.id ? `3px solid ${brand.primaryColor}` : '2px solid #e0e0e0',
                borderRadius: '10px',
                background: brand.id === currentBrand.id ? `${brand.primaryColor}10` : 'white',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h3 style={{ fontSize: '18px', color: brand.primaryColor, margin: 0 }}>
                  {brand.displayName}
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                {brand.description}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    background: brand.primaryColor,
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  title={`Primary: ${brand.primaryColor}`}
                />
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    background: brand.secondaryColor,
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  title={`Secondary: ${brand.secondaryColor}`}
                />
              </div>
              <div style={{
                fontSize: '11px',
                color: '#999',
                fontFamily: 'monospace',
                background: '#f5f5f5',
                padding: '8px',
                borderRadius: '4px',
                wordBreak: 'break-all'
              }}>
                {brand.orgId}
              </div>
              {brand.id === currentBrand.id && (
                <div style={{
                  marginTop: '10px',
                  padding: '6px 12px',
                  background: brand.primaryColor,
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  CURRENT BRAND
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Brand Configuration Details */}
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>
          System Configuration
        </h2>
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '4px solid #6c757d'
        }}>
          <h3 style={{ fontSize: '16px', color: '#495057', marginBottom: '15px' }}>
            Current Brand Context
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Brand Name:</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>{currentBrand.displayName}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Organization ID:</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '14px' }}>
                  {currentBrand.orgId}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Primary Color:</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: currentBrand.primaryColor,
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }} />
                    <span>{currentBrand.primaryColor}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>Secondary Color:</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: currentBrand.secondaryColor,
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }} />
                    <span>{currentBrand.secondaryColor}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', fontWeight: '600' }}>Features:</td>
                <td style={{ padding: '10px' }}>
                  {currentBrand.features?.join(', ') || 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Placeholder */}
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>
          Analytics Dashboard
        </h2>
        <div style={{
          padding: '60px',
          textAlign: 'center',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
            Analytics Coming Soon
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            Multi-brand performance metrics and insights
          </p>
        </div>
      </div>
    </main>
  );
}

export default AdminPage;
