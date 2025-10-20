import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';
import { useAuth0 } from '@auth0/auth0-react';
import { BRANDS } from '../config/brands';

// Mock data generator for security metrics
const generateMockSecurityData = () => {
  const now = new Date();
  const locations = ['Sydney, AU', 'Melbourne, AU', 'Brisbane, AU', 'Perth, AU', 'Auckland, NZ', 'Singapore, SG'];
  const statuses = ['success', 'success', 'success', 'success', 'failed']; // 80% success rate
  
  const recentLogins = [];
  for (let i = 0; i < 15; i++) {
    const brand = Object.values(BRANDS)[Math.floor(Math.random() * 5)];
    const minutesAgo = Math.floor(Math.random() * 1440); // Last 24 hours
    const timestamp = new Date(now - minutesAgo * 60000);
    
    recentLogins.push({
      id: i,
      email: `user${i + 1}@${brand.domain}`,
      organization: brand.name,
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: timestamp.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return recentLogins.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

function AdminPage() {
  const navigate = useNavigate();
  const { currentBrand } = useBrand();
  const { user } = useAuth0();
  const roles = user?.['https://retailzero.com/roles'] || [];
  const [securityData, setSecurityData] = useState([]);

  // Load mock security data on mount - MUST be before any conditional returns
  useEffect(() => {
    setSecurityData(generateMockSecurityData());
  }, []);

  const brandArray = Object.values(BRANDS);
  
  // Calculate security metrics
  const totalUsers = 47; // Simulated total across all orgs
  const activeToday = 23;
  const failedLogins = securityData.filter(log => log.status === 'failed').length;
  const mfaEnabled = 68; // percentage

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

  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          padding: '30px 40px'
        }}>
          {/* Header Content */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '30px', flexWrap: 'wrap' }}>
            {/* Left: Back Button */}
            <div style={{ flex: '0 0 240px', minWidth: '240px' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'white',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ fontSize: '16px' }}>←</span>
                <span>Back to RetailZero Home</span>
              </button>
            </div>

            {/* Center: Title */}
            <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: '36px', 
                color: '#333', 
                marginBottom: '8px',
                fontWeight: '700',
                letterSpacing: '-0.5px'
              }}>
                RetailZero Admin Panel
              </h1>
              <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
                Manage all brands and system configurations
              </p>
            </div>

            {/* Right: Admin Profile Card */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '20px 25px',
              borderRadius: '12px',
              color: 'white',
              flex: '0 0 320px',
              minWidth: '320px',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  ) : (
                    <span style={{ fontSize: '24px' }}>
                      {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    marginBottom: '4px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {user?.name || 'Admin User'}
                  </h3>
                  <p style={{ 
                    opacity: 0.9, 
                    marginBottom: '8px',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {user?.email}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {roles.map(role => (
                      <span key={role} style={{
                        padding: '3px 10px',
                        background: 'rgba(255,255,255,0.25)',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: '40px'
      }}>

      {/* Security Metrics Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '5px', fontWeight: '700' }}>
              🔒 Security & Monitoring
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
              Real-time authentication metrics and security insights
            </p>
          </div>
          <a
            href="https://auth0.com/docs/api/management/v2"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.95)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#667eea',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            📚 Auth0 Management API Docs
            <span style={{ fontSize: '16px' }}>→</span>
          </a>
        </div>

        {/* Security Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #28a745'
          }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Users</div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#28a745', marginBottom: '5px', lineHeight: 1 }}>
              {totalUsers}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>Across all organizations</div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #007bff'
          }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Today</div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#007bff', marginBottom: '5px', lineHeight: 1 }}>
              {activeToday}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>Daily active users</div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #dc3545'
          }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Failed Logins</div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#dc3545', marginBottom: '5px', lineHeight: 1 }}>
              {failedLogins}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>Last 24 hours</div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #ffc107'
          }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MFA Enabled</div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffc107', marginBottom: '5px', lineHeight: 1 }}>
              {mfaEnabled}%
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>Users with 2FA</div>
          </div>
        </div>

        {/* Recent Login Activity */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            padding: '25px', 
            borderBottom: '2px solid #f0f0f0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '5px', fontWeight: '700' }}>
              🕐 Recent Login Activity
            </h3>
            <p style={{ fontSize: '13px', margin: 0, opacity: 0.9 }}>
              Last 15 authentication events across all brands
            </p>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>User</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Organization</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>IP Address</th>
                  <th style={{ padding: '15px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {securityData.slice(0, 10).map((log, idx) => (
                  <tr key={log.id} style={{ 
                    borderBottom: '1px solid #f0f0f0',
                    background: idx % 2 === 0 ? 'white' : '#fafafa',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
                  onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'white' : '#fafafa'}
                  >
                    <td style={{ padding: '15px', fontSize: '13px', color: '#666', whiteSpace: 'nowrap' }}>
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '15px', fontSize: '13px', color: '#333', fontWeight: '500' }}>
                      {log.email}
                    </td>
                    <td style={{ padding: '15px', fontSize: '13px', color: '#666' }}>
                      {log.organization}
                    </td>
                    <td style={{ padding: '15px', fontSize: '13px', color: '#666' }}>
                      {log.location}
                    </td>
                    <td style={{ padding: '15px', fontSize: '13px', color: '#666', fontFamily: 'monospace' }}>
                      {log.ip}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        background: log.status === 'success' ? '#d4edda' : '#f8d7da',
                        color: log.status === 'success' ? '#155724' : '#721c24'
                      }}>
                        {log.status === 'success' ? '✓ Success' : '✗ Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ padding: '20px', textAlign: 'center', background: '#f8f9fa', borderTop: '1px solid #e9ecef' }}>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
              💡 <strong>Production Note:</strong> This data would be fetched from{' '}
              <a 
                href="https://auth0.com/docs/api/management/v2/logs/get-logs" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
              >
                Auth0 Management API - GET /api/v2/logs
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '20px', fontWeight: '700' }}>
          📊 System Overview
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
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
      </div>
    </main>
  );
}

export default AdminPage;
