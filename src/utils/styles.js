/**
 * Reusable Style Constants
 * Maintains consistency across components and reduces style duplication
 */

export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#007bff',
  light: '#f8f9fa',
  dark: '#333',
  text: '#666',
  border: '#e0e0e0',
  white: 'white',
};

export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
  success: `linear-gradient(135deg, ${COLORS.success} 0%, #20c997 100%)`,
  info: `linear-gradient(135deg, ${COLORS.info} 0%, #0056b3 100%)`,
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '30px',
};

export const BORDER_RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '50%',
};

export const SHADOWS = {
  sm: '0 2px 4px rgba(0,0,0,0.05)',
  md: '0 4px 12px rgba(0,0,0,0.1)',
  lg: '0 8px 20px rgba(102, 126, 234, 0.25)',
};

export const TRANSITIONS = {
  default: 'all 0.2s ease',
  slow: 'all 0.3s ease',
};

/**
 * Common button styles
 */
export const buttonStyles = {
  base: {
    border: 'none',
    borderRadius: BORDER_RADIUS.md,
    fontWeight: '600',
    cursor: 'pointer',
    transition: TRANSITIONS.default,
    fontSize: '12px',
  },
  primary: {
    background: COLORS.primary,
    color: COLORS.white,
  },
  secondary: {
    background: COLORS.success,
    color: COLORS.white,
  },
  tertiary: {
    background: COLORS.info,
    color: COLORS.white,
  },
};

/**
 * Common card styles
 */
export const cardStyles = {
  base: {
    background: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    boxShadow: SHADOWS.md,
    border: `1px solid ${COLORS.border}`,
  },
};

/**
 * Header styles
 */
export const headerStyles = {
  base: {
    background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
    borderBottom: `1px solid rgba(0,0,0,0.1)`,
    boxShadow: SHADOWS.md,
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `${SPACING.xxl} ${SPACING.xl}`,
  },
};

/**
 * Content container styles
 */
export const contentStyles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: SPACING.xl,
  },
};
