"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/hero-input";
import { Button } from "@/components/ui/button";
import { addToast } from "@heroui/react";

export default function ResetForgotPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!token) {
    // If no token is provided, redirect to forgot password page
    router.push("/forgot-password");
    addToast({
      color: 'danger',
      title: 'Error',
      description: 'No reset token provided.',
    });
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
    </div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setMessage("Please enter both newPassword and password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate password reset - replace with actual implementation
      const response = { success: true };
      
      if (response.success) {
        addToast({
          color: 'success',
          title: 'Success',
          description: 'Password reset successfully!',
        });
        setMessage("🎉 Password reset successfully! Redirecting...");
        router.push(`/login?password_reset=${true}`);
      } else {
        addToast({
          color: 'danger',
          title: 'Error',
          description: 'Failed to reset password',
        });
        setMessage("Error: Failed to reset password");
      }
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Error',
        description: 'An unexpected error occurred',
      });
      setMessage("Error: An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-black mb-2">
          Reset <span className="font-bold">Password</span>
        </h1>
        <p className="text-gray-600">Change your Password?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          id="newPassword"
          label="New Password"
          value={newPassword}
          isInvalid={newPassword.length < 6 && newPassword.length > 0}
          errorText="Password must be at least 6 characters."
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          disabled={isSubmitting}
        />
        <Input
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          isInvalid={
            confirmPassword !== newPassword && confirmPassword.length > 6
          }
          errorText="Passwords do not match."
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Enter your password again"
          disabled={isSubmitting}
        />

        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting} className="w-full">
          {isSubmitting ? "Resetting..." : "Change Password"}
        </Button>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg text-center ${
              message.includes("🎉") || message.includes("successfully")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
