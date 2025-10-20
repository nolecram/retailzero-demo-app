import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBrandFromHostname, BRANDS } from '../config/brands';

const BrandContext = createContext();

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider = ({ children }) => {
  const [currentBrand, setCurrentBrand] = useState(() => {
    // Determine brand from hostname or default to Brand A
    return getBrandFromHostname(window.location.hostname);
  });

  useEffect(() => {
    // Apply brand theme to document
    document.documentElement.style.setProperty('--primary-color', currentBrand.theme.primary);
    document.documentElement.style.setProperty('--secondary-color', currentBrand.theme.secondary);
    document.title = `${currentBrand.name} - RetailZero`;
  }, [currentBrand]);

  const switchBrand = (brandId) => {
    const brand = Object.values(BRANDS).find(b => b.id === brandId);
    if (brand) {
      setCurrentBrand(brand);
    }
  };

  return (
    <BrandContext.Provider value={{ currentBrand, switchBrand }}>
      {children}
    </BrandContext.Provider>
  );
};
