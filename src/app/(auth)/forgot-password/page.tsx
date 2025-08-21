'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Note: Replace with actual auth actions implementation
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addToast } from '@heroui/react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email || !email.trim()) {
      setMessage('Please provide your email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate reset email sending - replace with actual implementation
      const response = { success: true };

      if (response.success) {
        router.push(`/?password_reset_link_sent=${true}`);
        addToast({
          color: 'success',
          title: 'Success',
          description: 'Password reset link sent successfully!',
        });
      } else {
        addToast({
          color: 'danger',
          title: 'Error',
          description: 'Failed to send reset email',
        });
        setMessage('Error: Failed to send reset email');
      }
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Error',
        description: 'An unexpected error occurred',
      });
      setMessage('Error: An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-black mb-2">
          Welcome <span className="font-bold">Back</span>
        </h1>
        <p className="text-gray-600">Forgot your Password?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <Input
          type="email"
          id="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          description="Enter your email address to receive a reset link."
          required
          isDisabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg text-center ${
              message.includes('🎉') || message.includes('successfully')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-black font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Oh! I remember my password
        </Link>
      </div>
    </div>
  );
}
