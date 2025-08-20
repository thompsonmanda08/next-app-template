'use server';
import authenticatedApiClient, {
  handleError,
  successResponse,
} from '@/lib/api-config';
import { createAuthSession, updateAuthSession } from '@/lib/session';
import { apiClient } from '@/lib/utils';
import { APIResponse } from '@/types';
import { LoginPayload, RegistrationPayload } from '@/types/account';

/**
 * Authenticates a user with their email and password by calling the API endpoint
 * and creates an authentication session upon successful login.
 *
 * @param {LoginDetails} loginCredentials - An object containing login details.
 * @param {string} loginCredentials.email - The email of the user.
 * @param {string} loginCredentials.password - The password of the user.
 * @returns {Promise<APIResponse>} A promise that resolves to an APIResponse object which indicates the success or failure of the operation.
 *
 */
export async function loginUser(
  loginCredentials: LoginPayload,
): Promise<APIResponse> {
  const url = `merchant/user/authentication`;

  try {
    const res = await apiClient.post(url, loginCredentials);

    const response = res.data;

    const accessToken = response?.token;

    await createAuthSession(accessToken);

    return successResponse({ accessToken }, res.data?.message);
  } catch (error: Error | any) {
    return handleError(error, 'POST | LOGIN', url);
  }
}

export async function registerUser(
  registerUser: RegistrationPayload,
): Promise<APIResponse> {
  const url = `merchant/user/authentication`;

  try {
    const res = await apiClient.post(url, registerUser);

    const accessToken = res.data?.token;

    await createAuthSession(accessToken);

    return successResponse({ accessToken }, res.data?.message);
  } catch (error: Error | any) {
    return handleError(error, 'POST | LOGIN', url);
  }
}

/**
 * Refreshes the authentication token by sending a request to the refresh token endpoint.
 * If the operation is successful, a new access token is obtained and a session is created.
 * In case of an error, an appropriate message is returned.
 *
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success or failure of the operation.
 * The object includes:
 * - `success`: A boolean indicating whether the operation was successful.
 * - `message`: A string providing a message about the result of the operation.
 * - `data`: An object containing the new access token if successful, otherwise null.
 * - `status`: The HTTP status code of the response.
 * - `statusText`: The HTTP status text of the response.
 */
export async function getRefreshToken(): Promise<APIResponse> {
  const url = `merchant/user/refresh/token`;

  try {
    const res = await authenticatedApiClient({ url });

    const response = res.data;

    const accessToken = response?.token;

    await createAuthSession(accessToken);

    return successResponse({ accessToken }, res.data?.message);
  } catch (error: Error | any) {
    return handleError(error, 'POST | REFRESH TOKEN', url);
  }
}

export const getUserProfile = async (): Promise<APIResponse> => {
  try {
    console.log('Fetching fresh profile data');
    const response = await authenticatedApiClient({
      method: 'GET',
      url: '/user/profile',
    });

    console.log('PROFILE RESPONSE:', response.data);

    const user = response?.data || null;

    await updateAuthSession({ user });

    return successResponse(user);
  } catch (error) {
    return handleError(error, 'GET', '/profile');
  }
};
