import { useState, useEffect } from 'react';

export interface KYCInfo {
  status: 'pending' | 'approved' | 'rejected' | 'not_started';
  level?: string;
  documents?: string[];
  verifiedAt?: string;
}

export function useKYCInfo(userId?: string) {
  const [kycInfo, setKycInfo] = useState<KYCInfo>({
    status: 'not_started'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    
    // This is a stub implementation
    setLoading(false);
    setKycInfo({
      status: 'not_started',
      level: 'basic',
      documents: [],
      verifiedAt: undefined
    });
  }, [userId]);

  return {
    kycInfo,
    loading,
    error,
    refetch: () => {},
    isApprovedUser: kycInfo.status === 'approved',
    merchantKYC: kycInfo,
    isCompleteKYC: kycInfo.status === 'approved',
    isLoading: loading,
    businessDetails: { name: 'Sample Business' }
  };
}