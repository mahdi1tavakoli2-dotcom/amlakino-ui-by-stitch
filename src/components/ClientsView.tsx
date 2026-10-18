import React from 'react';
import { ClientsPage } from '../features/clients/pages/ClientsPage';
import { FollowUpItem } from '../data/mockData';

interface ClientsViewProps {
  onCallClient?: (client: FollowUpItem) => void;
  onAddNewClient?: () => void;
}

export const ClientsView: React.FC<ClientsViewProps> = () => {
  return <ClientsPage />;
};
