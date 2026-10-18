import { useState, useMemo } from 'react';
import { ClientEntity, ClientLeadStatus } from '../types/client.types';
import { INITIAL_CLIENTS } from '../data/clientsData';

export interface ClientFilterQuery {
  leadStatus?: ClientLeadStatus;
  category?: string;
  searchQuery?: string;
  hasOverdue?: boolean;
}

export function useClients(initialFilters?: ClientFilterQuery) {
  const [clients, setClients] = useState<ClientEntity[]>(INITIAL_CLIENTS);

  const addClient = (newClient: Omit<ClientEntity, 'id'>) => {
    const client: ClientEntity = {
      ...newClient,
      id: `client-${Date.now()}`,
    };
    setClients((prev) => [client, ...prev]);
    return client;
  };

  const updateClient = (id: string, updates: Partial<ClientEntity>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const removeClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    clients,
    addClient,
    updateClient,
    removeClient,
    totalCount: clients.length,
  };
}
