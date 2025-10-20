import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useBrand } from '../context/BrandContext';

function EmployeePortal() {
  const { user } = useAuth0();
  const { currentBrand } = useBrand();

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: currentBrand.theme.primary, fontSize: '36px' }}>
          Employee Portal
        </h1>
        <p style={{ color: '#666', fontSize: '18px' }}>
          Internal tools and resources for {currentBrand.displayName} staff
        </p>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        borderLeft: `5px solid ${currentBrand.theme.primary}`
      }}>
        <h2 style={{ color: currentBrand.theme.secondary, marginBottom: '15px' }}>
          Welcome, {user?.name || user?.email}!
        </h2>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <p><strong>Role:</strong> Employee</p>
          <p><strong>Organization:</strong> {currentBrand.displayName}</p>
          <p><strong>Employee ID:</strong> {user?.sub?.split('|')[1]?.substring(0, 8).toUpperCase()}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Internal Tools */}
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: currentBrand.theme.primary, marginBottom: '15px' }}>
            📊 Internal Tools
          </h3>
          <ul style={{ lineHeight: '2', color: '#666' }}>
            <li>Inventory Management</li>
            <li>Order Processing</li>
            <li>Customer Support</li>
            <li>Sales Reports</li>
          </ul>
        </div>

        {/* Team Resources */}
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: currentBrand.theme.primary, marginBottom: '15px' }}>
            👥 Team Resources
          </h3>
          <ul style={{ lineHeight: '2', color: '#666' }}>
            <li>Employee Directory</li>
            <li>Training Materials</li>
            <li>Shift Schedule</li>
            <li>Company Policies</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: currentBrand.theme.primary, marginBottom: '15px' }}>
            ⚡ Quick Actions
          </h3>
          <ul style={{ lineHeight: '2', color: '#666' }}>
            <li>Clock In/Out</li>
            <li>Submit Ticket</li>
            <li>View Messages</li>
            <li>Request Time Off</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#666', fontSize: '14px' }}>
          🔒 Secure employee portal powered by Auth0 Organizations
        </p>
      </div>
    </main>
  );
}

export default EmployeePortal;
