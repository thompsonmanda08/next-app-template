import { useState, useEffect } from 'react';

export interface TransactionStatus {
  id?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  amount?: number;
  currency?: string;
}

export function useCheckoutTransactionStatus(transactionId?: string, onStatusChange?: (status: string, data: any) => void) {
  const [status, setStatus] = useState<TransactionStatus>({
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionResponse, setTransactionResponse] = useState<any>(null);

  useEffect(() => {
    if (!transactionId) return;
    
    // This is a stub implementation
    setLoading(false);
    const response = {
      id: transactionId,
      status: 'pending',
      amount: 100,
      currency: 'USD'
    };
    setStatus(response);
    setTransactionResponse(response);
  }, [transactionId]);

  return {
    status,
    loading,
    error,
    refetch: () => {},
    transactionResponse,
    isSuccess: status.status === 'completed',
    isFailed: status.status === 'failed',
    isProcessing: status.status === 'pending'
  };
}