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
    // Only redirect once after authentication and only from root path
    if (!isLoading && isAuthenticated && user && !hasRedirected.current && location.pathname === '/') {
      const roles = user?.['https://retailzero.com/roles'] || [];
      const isAdmin = roles.includes('admin');
      const isEmployee = roles.includes('employee');
      const isCustomer = roles.includes('customer');
      const userOrgId = user?.org_id;

      // Role-based redirect
      if (isCustomer && !isAdmin && !isEmployee) {
        // Customer: find their brand and switch to it, then redirect to brand page
        const customerBrand = getBrandByOrgId(userOrgId);
        if (customerBrand) {
          switchBrand(customerBrand.id);
        }
        hasRedirected.current = true;
        navigate('/brand', { replace: true });
      } else {
        // Admin/Employee: mark as redirected but stay on home
        hasRedirected.current = true;
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, switchBrand, location.pathname]);

  return null; // This component doesn't render anything
}

export default AuthRedirect;
