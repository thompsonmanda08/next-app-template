'use server';
import { handleError, successResponse } from '@/lib/api-config';
import { APIResponse } from '@/types';

// Dummy merchant actions for template
export async function getMerchantDetails(): Promise<APIResponse> {
  try {
    return successResponse(
      {
        id: 'merchant_123',
        name: 'Sample Merchant',
        email: 'merchant@example.com',
        status: 'active',
        kyc: { status: 'approved', level: 'basic' }
      },
      'Merchant details retrieved'
    );
  } catch (error: any) {
    return handleError(error, 'GET | MERCHANT DETAILS', 'merchant/details');
  }
}

export async function updateMerchantProfile(data: any): Promise<APIResponse> {
  try {
    return successResponse(data, 'Merchant profile updated successfully');
  } catch (error: any) {
    return handleError(error, 'PUT | MERCHANT PROFILE', 'merchant/profile');
  }
}

export async function deleteWorkspace(workspaceId: string): Promise<APIResponse> {
  try {
    return successResponse(null, 'Workspace deleted successfully');
  } catch (error: any) {
    return handleError(error, 'DELETE | WORKSPACE', `workspace/${workspaceId}`);
  }
}

export async function updateWorkspace(workspaceId: string, data: any): Promise<APIResponse> {
  try {
    return successResponse(data, 'Workspace updated successfully');
  } catch (error: any) {
    return handleError(error, 'PUT | WORKSPACE', `workspace/${workspaceId}`);
  }
}