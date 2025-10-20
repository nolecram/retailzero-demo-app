/**
 * Utility function to clear Auth0 cache from localStorage
 * Use this when testing different organization logins
 */
export const clearAuth0Cache = () => {
  // Clear all Auth0-related items from localStorage
  const keysToRemove = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('@@auth0spajs@@')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  console.log('✅ Auth0 cache cleared. Reload the page to start fresh.');
};

// Make it available globally for easy console access
if (typeof window !== 'undefined') {
  window.clearAuth0Cache = clearAuth0Cache;
}
