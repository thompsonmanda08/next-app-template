'use server';

import { cache } from 'react';
import { handleError, successResponse } from '@/lib/api-config';
import { apiClient } from '@/lib/utils';
import { APIResponse } from '@/types';

/**
 * Retrieves the general configurations from the configuration service.
 * If the operation is successful, an API response containing the configurations is returned.
 * If the operation fails, an API response with a message indicating the error is returned.
 *
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success or failure of the operation,
 * including the message, data, status, and statusText.
 */
export const getGeneralConfigs = cache(async (): Promise<APIResponse> => {
  const url = `/configuration/all-configs`;

  try {
    const res = await apiClient.get(url);

    return successResponse(res.data);
  } catch (error) {
    return handleError(error, 'GET | GENERAL CONFIGS', url);
  }
});
