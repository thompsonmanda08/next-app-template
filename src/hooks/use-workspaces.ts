import { useState, useEffect } from 'react';

export interface Workspace {
  id: string;
  name: string;
  type: 'personal' | 'business' | 'enterprise';
  status: 'active' | 'inactive';
}

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
    setWorkspaces([
      {
        id: 'ws_1',
        name: 'Default Workspace',
        type: 'business',
        status: 'active'
      }
    ]);
  }, []);

  return {
    workspaces,
    loading,
    error,
    refetch: () => {},
    isLoading: loading
  };
}