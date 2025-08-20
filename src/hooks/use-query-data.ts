import { useState, useEffect } from 'react';

export interface QueryData {
  user?: any;
  workspace?: any;
  permissions?: string[];
}

export function useQueryData() {
  const [data, setData] = useState<QueryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This is a stub implementation
    setLoading(false);
    setData({
      user: { name: 'User', email: 'user@example.com' },
      workspace: { name: 'Default Workspace' },
      permissions: []
    });
  }, []);

  return {
    data,
    loading,
    error,
    refetch: () => {},
    mutate: () => {}
  };
}

// Additional exports for specific use cases
export function useWorkspaceInit() {
  const [workspace, setWorkspace] = useState<any>({ name: 'Default Workspace', id: 'workspace-1' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
    setWorkspace({ name: 'Default Workspace', id: 'workspace-1' });
  }, []);

  const mutate = () => {
    // Stub mutation function
  };

  return {
    workspace,
    loading,
    error,
    refetch: () => {},
    data: workspace,
    isLoading: loading,
    isPending: loading,
    mutate
  };
}

export function useRefreshToken() {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async (param?: any) => {
    setRefreshing(true);
    // Stub implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return {
    refresh,
    refreshing
  };
}

export function useWorkspaceCallbackURL() {
  const [callbackURL, setCallbackURL] = useState('https://example.com/callback');
  const [loading, setLoading] = useState(false);

  return {
    callbackURL,
    loading,
    updateURL: (url: string) => setCallbackURL(url)
  };
}