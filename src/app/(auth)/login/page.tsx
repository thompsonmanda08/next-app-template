'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/components/forms/login-form';
import CustomAlert from '@/components/base/alert';

export default function LoginPage() {
  const searchParams = useSearchParams();

  const isPasswordResetComplete = searchParams.get('password_reset');

  // Check for success message from signup
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'account-created') {
      // SET A MESSAGE HERE
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-black mb-2">
          Welcome <span className="font-bold">Back</span>
        </h1>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>

      {isPasswordResetComplete && (
        <>
          <CustomAlert color="success" className="mb-4 mt-2" title="Success">
            Password reset completed successfully!
          </CustomAlert>
        </>
      )}

      <LoginForm />

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-black font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
