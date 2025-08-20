import { useState, useEffect } from 'react';

export interface ConfigOptions {
  theme?: string;
  language?: string;
  currency?: string;
}

export function useConfigOptions() {
  const [options, setOptions] = useState<ConfigOptions>({
    theme: 'light',
    language: 'en',
    currency: 'USD'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This is a stub implementation
    setLoading(false);
  }, []);

  const updateOptions = (newOptions: Partial<ConfigOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };

  return {
    options,
    loading,
    error,
    updateOptions,
    // Additional properties that components expect
    isLoading: loading,
    isError: !!error,
    countries: [{ id: 'us', name: 'United States' }, { id: 'uk', name: 'United Kingdom' }],
    provinces: [{ id: 'ca', name: 'California' }, { id: 'ny', name: 'New York' }]
  };
}