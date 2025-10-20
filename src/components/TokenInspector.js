import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const TokenInspector = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState('loading');
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [showRawToken, setShowRawToken] = useState(false);

  // Decode JWT token
  const decodeToken = (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid token format');

      const payload = JSON.parse(atob(parts[1]));
      const header = JSON.parse(atob(parts[0]));

      return { header, payload, signature: parts[2].substring(0, 20) + '...' };
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  };

  // Fetch and decode current token
  const refreshTokenData = async () => {
    if (!isAuthenticated || isLoading) return;

    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);

      const decoded = decodeToken(accessToken);
      setDecodedToken(decoded);

      // Check expiration
      if (decoded?.payload?.exp) {
        const expiresAt = decoded.payload.exp * 1000;
        const now = Date.now();
        const remaining = expiresAt - now;

        if (remaining < 0) {
          setTokenStatus('expired');
        } else if (remaining < 5 * 60 * 1000) {
          setTokenStatus('expiring');
        } else {
          setTokenStatus('valid');
        }

        setTimeRemaining(Math.max(0, Math.floor(remaining / 1000)));
      }

      // Log event
      addEvent('Token refreshed', 'success');
    } catch (error) {
      console.error('Failed to get token:', error);
      setTokenStatus('error');
      addEvent(`Token error: ${error.message}`, 'error');
    }
  };

  // Add event to log
  const addEvent = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setRecentEvents((prev) => [
      { message, type, timestamp, id: Date.now() },
      ...prev.slice(0, 9), // Keep last 10 events
    ]);
  };

  // Update token on mount and set interval
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      refreshTokenData();
      const interval = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isLoading]);

  // Format time remaining
  const formatTime = (seconds) => {
    if (!seconds) return '0s';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addEvent('Copied to clipboard', 'success');
  };

  if (!isAuthenticated || isLoading) return null;

  // Status colors
  const statusColors = {
    valid: '#28a745',
    expiring: '#ffc107',
    expired: '#dc3545',
    error: '#dc3545',
    loading: '#6c757d',
  };

  const statusEmojis = {
    valid: '🟢',
    expiring: '🟡',
    expired: '🔴',
    error: '🔴',
    loading: '⚪',
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: isOpen ? '400px' : '60px',
          height: isOpen ? '500px' : '60px',
          background: 'white',
          borderRadius: isOpen ? '12px' : '50%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          border: `2px solid ${statusColors[tokenStatus]}`,
        }}
      >
        {!isOpen ? (
          // Collapsed state - Show badge
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div>{statusEmojis[tokenStatus]}</div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: '600',
                color: statusColors[tokenStatus],
              }}
            >
              {timeRemaining ? formatTime(timeRemaining) : ''}
            </div>
          </div>
        ) : (
          // Expanded state
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              backgroundColor: '#f8f9fa',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '15px',
                background: `linear-gradient(135deg, ${statusColors[tokenStatus]} 0%, ${statusColors[tokenStatus]}dd 100%)`,
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>
                {statusEmojis[tokenStatus]} Token Inspector
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                style={{
                  background: 'rgba(255,255,255,0.3)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                padding: '12px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Info */}
              {user && (
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#666',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    👤 User
                  </div>
                  <div
                    style={{
                      background: 'white',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <div>
                      <strong>{user.name}</strong>
                    </div>
                    <div style={{ color: '#666' }}>{user.email}</div>
                  </div>
                </div>
              )}

              {/* Token Status */}
              {decodedToken?.payload && (
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#666',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    ⏱️ Expiration
                  </div>
                  <div
                    style={{
                      background: 'white',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ color: '#666' }}>Expires in:</span>{' '}
                      <strong style={{ color: statusColors[tokenStatus] }}>
                        {timeRemaining ? formatTime(timeRemaining) : 'Expired'}
                      </strong>
                    </div>
                    <div style={{ fontSize: '11px', color: '#999' }}>
                      {new Date(
                        decodedToken.payload.exp * 1000
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {/* Token Claims */}
              {decodedToken?.payload && (
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#666',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    🔐 Claims
                  </div>
                  <div
                    style={{
                      background: 'white',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      border: '1px solid #e0e0e0',
                      maxHeight: '100px',
                      overflow: 'auto',
                      fontFamily: 'monospace',
                    }}
                  >
                    {decodedToken.payload.org_id && (
                      <div>
                        <strong>org_id:</strong> {decodedToken.payload.org_id}
                      </div>
                    )}
                    {decodedToken.payload.scope && (
                      <div>
                        <strong>scope:</strong>{' '}
                        {decodedToken.payload.scope.substring(0, 40)}...
                      </div>
                    )}
                    {decodedToken.payload.aud && (
                      <div>
                        <strong>aud:</strong> {decodedToken.payload.aud}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Events */}
              {recentEvents.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#666',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    📋 Events
                  </div>
                  <div
                    style={{
                      background: 'white',
                      borderRadius: '6px',
                      border: '1px solid #e0e0e0',
                      maxHeight: '80px',
                      overflow: 'auto',
                    }}
                  >
                    {recentEvents.map((event) => (
                      <div
                        key={event.id}
                        style={{
                          padding: '6px 8px',
                          borderBottom: '1px solid #f0f0f0',
                          fontSize: '11px',
                          color:
                            event.type === 'success'
                              ? '#28a745'
                              : event.type === 'error'
                              ? '#dc3545'
                              : '#666',
                        }}
                      >
                        <div>
                          <strong>{event.message}</strong>
                        </div>
                        <div style={{ color: '#999', fontSize: '10px' }}>
                          {event.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div
              style={{
                padding: '12px',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                gap: '8px',
                background: 'white',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  refreshTokenData();
                }}
                style={{
                  flex: 1,
                  minWidth: '80px',
                  padding: '6px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                🔄 Refresh
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (token) copyToClipboard(token);
                }}
                style={{
                  flex: 1,
                  minWidth: '80px',
                  padding: '6px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                📋 Copy
              </button>
              <a
                href="https://auth0.com/docs/tokens/access-tokens"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '80px',
                  padding: '6px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                📖 Access Tokens
              </a>
              <a
                href="https://auth0.com/docs/secure/tokens"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '80px',
                  padding: '6px',
                  background: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                📚 JWT Guide
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TokenInspector;
