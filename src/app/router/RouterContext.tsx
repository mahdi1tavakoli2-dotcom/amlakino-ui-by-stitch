import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppRoute = 'home' | 'properties' | 'property-details' | 'clients' | 'more';

interface RouterContextType {
  currentRoute: AppRoute;
  selectedPropertyId: string | null;
  navigate: (route: AppRoute, propertyId?: string) => void;
  navigateToPropertyDetails: (propertyId: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parseHash(hash: string): { route: AppRoute; propertyId: string | null } {
  const clean = hash.replace(/^#\/?/, '');
  if (clean.startsWith('properties/')) {
    const parts = clean.split('/');
    return { route: 'property-details', propertyId: parts[1] || null };
  }
  if (clean === 'properties') return { route: 'properties', propertyId: null };
  if (clean === 'property-details') return { route: 'property-details', propertyId: null };
  if (clean === 'clients') return { route: 'clients', propertyId: null };
  if (clean === 'more') return { route: 'more', propertyId: null };
  return { route: 'home', propertyId: null };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routeState, setRouteState] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRouteState(parseHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((route: AppRoute, propertyId?: string) => {
    if (route === 'home') {
      window.location.hash = '#/';
    } else if (route === 'property-details' && propertyId) {
      window.location.hash = `#/properties/${propertyId}`;
    } else {
      window.location.hash = `#/${route}`;
    }
    setRouteState({ route, propertyId: propertyId || null });
  }, []);

  const navigateToPropertyDetails = useCallback((propertyId: string) => {
    navigate('property-details', propertyId);
  }, [navigate]);

  return (
    <RouterContext.Provider
      value={{
        currentRoute: routeState.route,
        selectedPropertyId: routeState.propertyId,
        navigate,
        navigateToPropertyDetails,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
