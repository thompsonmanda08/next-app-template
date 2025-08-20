import { useState, useEffect } from 'react';

export interface ProfileInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  businessDetails?: any;
  kyc?: {
    status: string;
    level: string;
  };
}

export function useProfileInfo() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
    setProfile({
      id: 'user_1',
      name: 'John Doe',
      email: 'john@example.com',
      businessDetails: { name: 'Sample Business' },
      kyc: { status: 'approved', level: 'basic' }
    });
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: () => {},
    isLoading: loading
  };
}