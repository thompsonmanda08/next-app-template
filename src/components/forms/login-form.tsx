'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input-field';
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

  const updateFormData = (data: Partial<LoginPayload>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const updateError = (data: Partial<ErrorState>) => {
    setError((prev) => ({
      ...prev,
      ...data,
    }));
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const email = formData.email;
    const password = formData.password;

    if (!email || !password) {
      updateError({
        onFields: true,
        status: true,
        message: 'Provide login credentials',
      });
      setIsLoading(false);

      return;
    }

    const response = await loginUser(formData);

    if (response?.success) {
      addToast({
        color: 'success',
        title: 'Success',
        description: 'Login successful!',
      });
      router.push('/home');
    } else {
      updateError({
        status: !response?.success,
        message: response?.message,
      });
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
      <form className="flex flex-col gap-2" role="form" onSubmit={handleLogin}>
        <Input
          aria-describedby="email-addon"
          aria-label="Email"
          isInvalid={error?.onFields}
          label="Email or Username"
          name={'email'}
          placeholder="Enter your email or username"
          onChange={(e) => {
            updateFormData({ email: e.target.value });
          }}
        />

        <Input
          aria-describedby="password-addon"
          aria-label="Password"
          isInvalid={error?.onFields}
          label="Password"
          name="password"
          placeholder="Enter Password"
          type="password"
          onChange={(e) => {
            updateFormData({ password: e.target.value });
          }}
        />
        <p className="-mt-1 ml-1 text-xs font-medium text-foreground/60 xl:text-sm">
          Forgot password?{' '}
          <Link
            className="text-primary hover:text-primary/80"
            href={'/support'}
          >
            Contact Support
          </Link>
        </p>
        <Button
          className={'mt-4 w-full'}
          isLoading={isLoading}
          loadingText={'Signing In...'}
          type="submit"
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
