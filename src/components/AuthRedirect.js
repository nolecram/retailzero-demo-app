import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useBrand } from '../context/BrandContext';
import { getBrandByOrgId } from '../config/brands';

function AuthRedirect() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const { switchBrand } = useBrand();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect once after authentication
    if (!isLoading && isAuthenticated && user && !hasRedirected.current) {
      const roles = user?.['https://retailzero.com/roles'] || [];
      const isAdmin = roles.includes('admin');
      const isEmployee = roles.includes('employee');
      const isCustomer = roles.includes('customer');
      const userOrgId = user?.org_id;

      // Check if user has admin/employee role for global access
      const hasGlobalAccess = isAdmin || isEmployee;

      // Role-based redirect
      if (!hasGlobalAccess) {
        // Customer or new user: find their brand and switch to it, then redirect to brand page
        const customerBrand = getBrandByOrgId(userOrgId);
        if (customerBrand) {
          switchBrand(customerBrand.id);
        }
        hasRedirected.current = true;
        // Only redirect if not already on brand page
        if (location.pathname !== '/brand' && !location.pathname.startsWith('/brand/')) {
          navigate('/brand', { replace: true });
        }
      } else {
        // Admin/Employee: redirect to home only if on brand page
        hasRedirected.current = true;
        if (location.pathname === '/brand' || location.pathname.startsWith('/brand/')) {
          navigate('/', { replace: true });
        }
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, switchBrand, location.pathname]);

  return null; // This component doesn't render anything
}

export default AuthRedirect;
