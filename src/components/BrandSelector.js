import React from 'react';
import { useBrand } from '../context/BrandContext';
import { BRANDS } from '../config/brands';
import './BrandSelector.css';

function BrandSelector() {
  const { currentBrand, switchBrand } = useBrand();

  return (
    <div className="brand-selector">
      <label>Current Brand:</label>
      <select 
        value={currentBrand.id} 
        onChange={(e) => switchBrand(e.target.value)}
        className="brand-dropdown"
      >
        {Object.values(BRANDS).map(brand => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
      <span className="brand-indicator" style={{ backgroundColor: currentBrand.theme.primary }}>
        ●
      </span>
    </div>
  );
}

export default BrandSelector;
