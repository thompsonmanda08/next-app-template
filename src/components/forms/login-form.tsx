'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Input } from '../ui/hero-input';
import { LoginPayload } from '@/types/account';

import { Button } from '../ui/button';
import CustomAlert from '../base/alert';
import { ErrorState } from '@/types';
import { useRouter } from 'next/navigation';
import { addToast } from '@heroui/react';
import { loginUser } from '@/app/_actions/auth-actions';

function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<LoginPayload>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));

    // Clear field errors when user starts typing
    Object.keys(data).forEach((field) => {
      if (fieldErrors[field]) {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    });
  };

  const validateFields = (data: LoginPayload): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.password?.trim()) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const updateError = (data: Partial<ErrorState>) => {
    setError((prev) => ({
      ...prev,
      ...data,
    }));
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({ status: false, message: '' });
    setFieldErrors({});

    // Validate fields
    const errors = validateFields(formData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError({
        status: true,
        message: 'Please fix the errors below',
        onFields: true,
        fieldErrors: errors,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(formData);

      if (response?.success) {
        addToast({
          color: 'success',
          title: 'Success',
          description: 'Login successful!',
        });
        router.push('/home');
      } else {
        setError({
          status: true,
          message: response?.message || 'Login failed',
        });
        addToast({
          color: 'danger',
          title: 'Error',
          description: response?.message || 'Login failed',
        });
      }
    } catch (err) {
      setError({
        status: true,
        message: 'An unexpected error occurred',
      });
      addToast({
        color: 'danger',
        title: 'Error',
        description: 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Clean out any errors if the user makes any changes to the form
    setError({});

    // RESET ALL AUTH DATA
    return () => {
      setError({});
    };
  }, [formData]);

  return (
    <div className="mx-auto w-full max-w-sm flex-auto p-6 ">
      <form className="flex flex-col gap-4" role="form" onSubmit={handleLogin}>
        <Input
          aria-describedby="email-addon"
          aria-label="Email"
          label="Email or Username"
          name="email"
          type="email"
          placeholder="Enter your email or username"
          value={formData.email}
          onChange={(e) => {
            updateFormData({ email: e.target.value });
          }}
          isInvalid={!!fieldErrors.email}
          errorText={fieldErrors.email}
          required
        />

        <Input
          aria-describedby="password-addon"
          aria-label="Password"
          label="Password"
          name="password"
          placeholder="Enter Password"
          type="password"
          value={formData.password}
          onChange={(e) => {
            updateFormData({ password: e.target.value });
          }}
          isInvalid={!!fieldErrors.password}
          errorText={fieldErrors.password}
          required
        />

        <Button
          className={'mt-4 w-full'}
          isLoading={isLoading}
          loadingText={'Signing In...'}
          type="submit"
          disabled={
            isLoading ||
            !formData.email.trim() ||
            !formData.password.trim() ||
            Object.keys(fieldErrors).some((key) => fieldErrors[key])
          }
        >
          Sign in
        </Button>
      </form>
      {error?.status && (
        <div className="mx-auto mt-1 flex w-full flex-col items-center justify-center">
          <CustomAlert color="danger" title="Error">
            {error.message}
          </CustomAlert>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
