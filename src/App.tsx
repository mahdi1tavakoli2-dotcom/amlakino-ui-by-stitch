/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ToastProvider } from './app/context/ToastContext';
import { RouterProvider, useRouter } from './app/router/RouterContext';
import { ModalProvider, useModals } from './app/context/ModalContext';
import { AppShell } from './app/shell/AppShell';
import { GlobalModals } from './app/modals/GlobalModals';

// Feature Views
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { PropertiesPage } from './features/properties/pages/PropertiesPage';
import { PropertyDetailsPage } from './features/properties/pages/PropertyDetailsPage';
import { ClientsPage } from './features/clients/pages/ClientsPage';
import { MoreView } from './components/MoreView';

import { FollowUpItem } from './data/mockData';

const AppContent: React.FC = () => {
  const { currentRoute } = useRouter();
  const { openCall, openQuickAdd, openAssistant } = useModals();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  return (
    <AppShell unreadCount={unreadNotificationsCount}>
      {/* Route Switcher */}
      {currentRoute === 'home' && <DashboardPage />}
      {currentRoute === 'properties' && <PropertiesPage />}
      {currentRoute === 'property-details' && <PropertyDetailsPage />}
      {currentRoute === 'clients' && <ClientsPage />}
      {currentRoute === 'more' && (
        <MoreView onAssistantSettings={openAssistant} />
      )}

      {/* Global Modals Coordinator */}
      <GlobalModals
        onClearNotifications={() => setUnreadNotificationsCount(0)}
      />
    </AppShell>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </RouterProvider>
    </ToastProvider>
  );
}
