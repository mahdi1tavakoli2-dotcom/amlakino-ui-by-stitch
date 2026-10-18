import { useState, useEffect, useCallback } from 'react';
import { propertyRepository } from '../api/property.repository';
import { PropertyEntity, CreatePropertyInput, PropertyFilterQuery } from '../types/property.types';

export function useProperties(filter?: PropertyFilterQuery) {
  const [properties, setProperties] = useState<PropertyEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    try {
      const data = await propertyRepository.getAll(filter);
      setProperties(data);
    } finally {
      setLoading(false);
    }
  }, [filter?.listingType, filter?.searchQuery, filter?.location]);

  useEffect(() => {
    fetchProperties();
    const unsubscribe = propertyRepository.subscribe(() => {
      fetchProperties();
    });
    return unsubscribe;
  }, [fetchProperties]);

  const createProperty = useCallback(async (input: CreatePropertyInput) => {
    const created = await propertyRepository.create(input);
    return created;
  }, []);

  const deleteProperty = useCallback(async (id: string) => {
    return await propertyRepository.delete(id);
  }, []);

  return {
    properties,
    totalCount: properties.length,
    loading,
    refresh: fetchProperties,
    createProperty,
    deleteProperty,
  };
}
