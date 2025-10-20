import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BRANDS } from '../config/brands';
import { useBrand } from '../context/BrandContext';

function RetailZeroHome() {
  const navigate = useNavigate();
  const { switchBrand } = useBrand();

  const handleBrandSelect = (brand) => {
    switchBrand(brand.id);
    navigate('/brand');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* RetailZero Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="/logos/retailzero.png" 
            alt="RetailZero"
            style={{
              height: '100px',
              width: '100px',
              objectFit: 'contain',
              marginBottom: '20px'
            }}
          />
          <h1 style={{
            fontSize: '56px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            fontWeight: '800'
          }}>
            RetailZero
          </h1>
          <p style={{
            fontSize: '24px',
            color: '#666',
            marginBottom: '10px'
          }}>
            Multi-Brand Retail Platform
          </p>
          <p style={{
            fontSize: '16px',
            color: '#999',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Secure authentication and management across all your favorite retail brands
          </p>
        </div>

        {/* Brand Selection */}
        <h2 style={{
          color: 'white',
          fontSize: '32px',
          marginBottom: '30px',
          fontWeight: '600'
        }}>
          Select Your Brand
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {Object.values(BRANDS).map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleBrandSelect(brand)}
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                border: `3px solid transparent`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
                e.currentTarget.style.borderColor = brand.primaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {/* Color stripe */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: `linear-gradient(90deg, ${brand.primaryColor}, ${brand.secondaryColor})`
              }} />

              <img 
                src={brand.logo} 
                alt={brand.name}
                style={{
                  height: '80px',
                  width: '80px',
                  objectFit: 'contain',
                  marginBottom: '20px'
                }}
              />
              <h3 style={{
                fontSize: '24px',
                color: brand.primaryColor,
                marginBottom: '10px',
                fontWeight: '700'
              }}>
                {brand.displayName}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                {brand.description}
              </p>

              {/* Features */}
              <div style={{ marginBottom: '20px' }}>
                {brand.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} style={{
                    fontSize: '12px',
                    color: '#888',
                    marginBottom: '5px'
                  }}>
                    ✓ {feature}
                  </div>
                ))}
              </div>

              <button style={{
                background: brand.primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              >
                Visit {brand.displayName} →
              </button>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '10px',
          padding: '20px',
          color: 'white',
          fontSize: '14px'
        }}>
          <p style={{ marginBottom: '10px' }}>
            🔒 Secured by Auth0 Organizations
          </p>
          <p style={{ opacity: 0.8 }}>
            Each brand operates in its own isolated organization with role-based access control
          </p>
        </div>
      </div>
    </div>
  );
}

export default RetailZeroHome;
