'use server';

import { cache } from 'react';
import { handleError, successResponse } from '@/lib/api-config';
import { apiClient } from '@/lib/utils';
import { APIResponse } from '@/types';
import { verifySession } from '@/lib/session';

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

/**
 * Retrieves the authentication session for the current user.
 * If the session is successfully retrieved, it returns the session object;
 * otherwise, it returns null.
 *
 * @returns {Promise<Object|null>} A promise that resolves to the session object if available, or null if not.
 */
export const getAuthSession = cache(async (): Promise<any> => {
  const session = await verifySession();

  if (session) return session;

  return null;
});
