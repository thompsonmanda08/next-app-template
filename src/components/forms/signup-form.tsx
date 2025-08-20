'use client';
import { addToast } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import useCustomTabsHook from '@/hooks/use-custom-tabs';
import { containerVariants } from '@/lib/constants';

import { Button } from '../ui/button';
import { RegistrationPayload, User } from '@/types/account';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ErrorState } from '@/types';
import { registerUser } from '@/app/_actions/auth-actions';
import { useRouter } from 'next/navigation';
import CustomAlert from '../base/alert';
import { Input } from '../ui/input-field';

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (data: Partial<User>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const {
    activeTab,
    // navigateForward,
    // navigateBackwards,
    navigateTo,
    currentTabIndex,
  } = useCustomTabsHook([
    <Step1
      key="user"
      formData={formData}
      updateFormData={updateFormData}
      isSubmitting={isLoading}
    />,
    <Step2
      key={'password'}
      formData={formData}
      updateFormData={updateFormData}
      handleBack={() => goTo(0)}
      isSubmitting={isLoading}
    />,
  ]);

  function goTo(i: number) {
    navigateTo(i);
  }

  async function handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({ status: false, message: '' });

    // IMPLEMENT VALIDATION

    setIsLoading(true);
    const response = await registerUser(formData as RegistrationPayload);

    if (response?.success) {
      addToast({
        color: 'success',
        title: 'Success',
        description: 'Account created successfully!',
      });
      router.push('/register?account_created=true');
    } else {
      setError({ status: true, message: response?.message });
      setIsLoading(false);
      addToast({
        color: 'danger',
        title: 'Error',
        description: response?.message,
      });
    }
  }

  // useEffect(() => {
  //   // Clean out any errors if the user makes any changes to the form
  //   setError({});
  // }, [formData]);

  // FOR REGISTRATION

  return (
    <form
      className="mx-auto flex w-full flex-col items-center justify-center gap-4"
      onSubmit={handleCreateAccount}
    >
      <AnimatePresence mode="wait">
        <motion.div
          // key={currentTabIndex}
          animate={'show'}
          className="flex w-full flex-col items-center justify-center gap-y-4"
          exit={'exit'}
          initial={'hidden'}
          transition={{ duration: 0.5 }}
          variants={containerVariants}
        >
          {activeTab}
        </motion.div>
      </AnimatePresence>

      {error?.status && (
        <div className="mx-auto mt-1 flex w-full flex-col items-center justify-center">
          <CustomAlert color="danger" title="Error">
            {error.message}
          </CustomAlert>
        </div>
      )}
    </form>
  );
}

// Step components removed for template - implement as needed
const Step1 = ({
  formData,
  updateFormData,
  isSubmitting,
}: {
  formData: Partial<User>;
  updateFormData: (data: Partial<User>) => void;
  isSubmitting: boolean;
}) => (
  <>
    <Input
      label="Email Address"
      type="email"
      id="email"
      placeholder="your@email.com"
      value={formData.email}
      onChange={(e) => updateFormData({ email: e.target.value })}
      required
    />

    <Button type="submit" disabled={isSubmitting} className="w-full">
      Continue to Password
    </Button>
  </>
);
const Step2 = ({
  formData,
  updateFormData,
  isSubmitting,
  handleBack,
}: {
  formData: Partial<User>;
  updateFormData: (data: Partial<User>) => void;
  isSubmitting: boolean;
  handleBack: () => void;
}) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  return (
    <>
      <div className="bg-slate-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-black mb-2">Store Information</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Email:</strong> {formData?.email}
          </p>
          <p>
            <strong>Name:</strong> {formData?.firstName} {formData?.lastName}
          </p>
          <p>
            <strong>Mobile Number:</strong> {formData?.mobileNumber}
          </p>
        </div>
      </div>

      <div className="relative">
        <Input
          aria-describedby="password-addon"
          aria-label="Password"
          // isInvalid={error?.onFields}
          label="Password"
          name="password"
          placeholder="Create a strong password"
          type={showPassword.password ? 'text' : 'password'}
          required
          value={formData?.password}
          onChange={(e) => {
            updateFormData({ password: e.target.value });
          }}
          autoComplete={undefined}
        />
        <p className="text-xs text-gray-500 mt-1">
          Must be at least 8 characters long
        </p>
        {formData?.password && formData?.password.length > 0 && (
          <button
            type="button"
            className="absolute cursor-pointer right-3 top-[55%] transform -translate-y-1/2 text-gray-400"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !showPassword.password,
              }))
            }
          >
            {showPassword.password ? (
              <EyeOffIcon className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <EyeIcon className="w-6 h-6 md:w-7 md:h-7" />
            )}
          </button>
        )}
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showPassword.confirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors placeholder:text-gray-400 text-black"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {confirmPassword && confirmPassword.length > 0 && (
          <button
            type="button"
            className="absolute cursor-pointer right-3 top-[70%] transform -translate-y-1/2 text-gray-400"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirmPassword: !showPassword.confirmPassword,
              }))
            }
          >
            {showPassword.confirmPassword ? (
              <EyeOffIcon className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <EyeIcon className="w-6 h-6 md:w-7 md:h-7" />
            )}
          </button>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="bordered"
          onClick={handleBack}
          className="w-full bg-gray-100 text-black"
        >
          Back
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </>
  );
};
