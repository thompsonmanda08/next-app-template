import { QUERY_KEYS } from '@/lib/constants';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

//SERVER ACTIONS
const functionToDoAction = async (data: any): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate random failure for demo
  if (Math.random() < 0.1) {
    throw new Error('Payment failed');
  }
};

//SERVER ACTIONS
const functionToGetProfile = async (data: any): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate random failure for demo
  if (Math.random() < 0.1) {
    throw new Error('Payment failed');
  }
};

export const usePayBill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: functionToDoAction,
    onSuccess: () => {
      // Invalidate and refetch transactions
      queryClient.invalidateQueries({ queryKey: ['key'] });
      queryClient.invalidateQueries({ queryKey: ['key'] });
    },
  });
};

export function useUserProfile() {
  return useQuery({
    queryFn: functionToGetProfile,
    queryKey: [QUERY_KEYS],
    staleTime: 0, // Use cache duration as stale time
    gcTime: 0, // Don't cache in memory
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
