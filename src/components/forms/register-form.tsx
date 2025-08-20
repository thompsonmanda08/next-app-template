'use client';
import { addToast, InputProps } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import useCustomTabsHook from '@/hooks/use-custom-tabs';
import { containerVariants } from '@/lib/constants';

import { Button } from '../ui/button';
import { RegistrationPayload, User } from '@/types/account';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ErrorState } from '@/types';
import { registerUser } from '@/app/_actions/auth-actions';
import { useRouter } from 'next/navigation';
import CustomAlert from '../base/alert';
// import { Input } from '../ui/input-field';
import { Input } from '../ui/hero-input';

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<User>) => {
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

  const validateFields = (
    data: Partial<User>,
    step: 'step1' | 'step2' = 'step1',
  ): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (step === 'step1') {
      // Step 1 validation
      if (!data.firstName?.trim()) {
        errors.firstName = 'First name is required';
      }
      if (!data.lastName?.trim()) {
        errors.lastName = 'Last name is required';
      }
      if (!data.email?.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (step === 'step2') {
      // Step 2 validation
      if (!data.password?.trim()) {
        errors.password = 'Password is required';
      } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password =
          'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }

    return errors;
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
      goTo={goTo}
      fieldErrors={fieldErrors}
    />,
    <Step2
      key={'password'}
      formData={formData}
      updateFormData={updateFormData}
      handleBack={() => goTo(0)}
      isSubmitting={isLoading}
      fieldErrors={fieldErrors}
    />,
  ]);

  function goTo(i: number) {
    navigateTo(i);
  }

  async function handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({ status: false, message: '' });
    setFieldErrors({});

    // Validate all fields
    const step1Errors = validateFields(formData, 'step1');
    const step2Errors = validateFields(formData, 'step2');
    const allErrors = { ...step1Errors, ...step2Errors };

    if (Object.keys(allErrors).length > 0) {
      setFieldErrors(allErrors);
      setError({
        status: true,
        message: 'Please fix the errors below',
        onFields: true,
        fieldErrors: allErrors,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create clean RegistrationPayload object
      const registrationData: RegistrationPayload = {
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        email: formData.email!,
        password: formData.password!,
      };

      const response = await registerUser(registrationData);

      if (response?.success) {
        addToast({
          color: 'success',
          title: 'Success',
          description: 'Account created successfully!',
        });
        router.push('/register?account_created=true');
      } else {
        setError({
          status: true,
          message: response?.message || 'Registration failed',
        });
        addToast({
          color: 'danger',
          title: 'Error',
          description: response?.message || 'Registration failed',
        });
      }
    } catch (err) {
      setError({ status: true, message: 'An unexpected error occurred' });
      addToast({
        color: 'danger',
        title: 'Error',
        description: 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentTabIndex}
          animate={'show'}
          className="flex w-full flex-col items-center justify-center gap-y-4"
          exit={'exit'}
          initial={currentTabIndex === 0 ? 'show' : 'hidden'}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
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
function Step1({
  formData,
  updateFormData,
  isSubmitting,
  goTo,
  fieldErrors,
}: {
  formData: Partial<User>;
  updateFormData: (data: Partial<User>) => void;
  isSubmitting: boolean;
  goTo: (i: number) => void;
  fieldErrors: Record<string, string>;
}) {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const validateFields = (data: Partial<User>): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  };

  const handleNext = () => {
    const errors = validateFields(formData);
    setLocalErrors(errors);

    if (Object.keys(errors).length === 0) {
      goTo(1);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          label="First Name"
          type="text"
          id="firstName"
          placeholder="John"
          value={formData.firstName || ''}
          onChange={(e) => {
            updateFormData({ firstName: e.target.value });
            if (localErrors.firstName) {
              setLocalErrors((prev) => ({ ...prev, firstName: '' }));
            }
          }}
          isInvalid={!!(localErrors.firstName || fieldErrors.firstName)}
          errorText={localErrors.firstName || fieldErrors.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          id="lastName"
          placeholder="Doe"
          value={formData.lastName || ''}
          onChange={(e) => {
            updateFormData({ lastName: e.target.value });
            if (localErrors.lastName) {
              setLocalErrors((prev) => ({ ...prev, lastName: '' }));
            }
          }}
          isInvalid={!!(localErrors.lastName || fieldErrors.lastName)}
          errorText={localErrors.lastName || fieldErrors.lastName}
          required
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        id="email"
        placeholder="your@email.com"
        value={formData.email || ''}
        onChange={(e) => {
          updateFormData({ email: e.target.value });
          if (localErrors.email) {
            setLocalErrors((prev) => ({ ...prev, email: '' }));
          }
        }}
        isInvalid={!!(localErrors.email || fieldErrors.email)}
        errorText={localErrors.email || fieldErrors.email}
        required
      />

      <Button
        type="button"
        onClick={handleNext}
        disabled={
          isSubmitting ||
          !formData.firstName ||
          !formData.lastName ||
          !formData.email
        }
        className="w-full"
      >
        Continue to Password
      </Button>
    </div>
  );
}
function Step2({
  formData,
  updateFormData,
  isSubmitting,
  handleBack,
  fieldErrors,
}: {
  formData: Partial<User>;
  updateFormData: (data: Partial<User>) => void;
  isSubmitting: boolean;
  handleBack: () => void;
  fieldErrors: Record<string, string>;
}) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  return (
    <>
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-foreground mb-2">
          Account Information
        </h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <strong>Name:</strong> {formData?.firstName} {formData?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {formData?.email}
          </p>
        </div>
      </div>

      <Input
        aria-describedby="password-addon"
        aria-label="Password"
        label="Password"
        name="password"
        placeholder="Create a strong password"
        type={showPassword.password ? 'text' : 'password'}
        required
        value={formData?.password || ''}
        onChange={(e) => {
          updateFormData({ password: e.target.value });
          if (localErrors.password) {
            setLocalErrors((prev) => ({ ...prev, password: '' }));
          }
          // Clear confirm password error if passwords now match
          if (
            confirmPassword &&
            e.target.value === confirmPassword &&
            localErrors.confirmPassword
          ) {
            setLocalErrors((prev) => ({ ...prev, confirmPassword: '' }));
          }
        }}
        isInvalid={!!(localErrors.password || fieldErrors.password)}
        description="Must be at least 8 characters long"
        errorText={localErrors.password || fieldErrors.password}
        autoComplete="new-password"
        endContent={
          formData?.password &&
          formData?.password.length > 0 && (
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
          )
        }
      />

      <Input
        label="Confirm Password"
        type={showPassword.confirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          // Clear error when user starts typing
          if (localErrors.confirmPassword) {
            setLocalErrors((prev) => ({ ...prev, confirmPassword: '' }));
          }
          // Validate on the fly
          if (
            formData.password &&
            e.target.value &&
            formData.password !== e.target.value
          ) {
            setLocalErrors((prev) => ({
              ...prev,
              confirmPassword: 'Passwords do not match',
            }));
          }
        }}
        isInvalid={!!localErrors.confirmPassword}
        errorText={localErrors.confirmPassword}
        required
        endContent={
          confirmPassword &&
          confirmPassword.length > 0 && (
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
          )
        }
      />

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
          disabled={
            isSubmitting ||
            !formData.password ||
            formData.password !== confirmPassword ||
            formData.password.length < 8 ||
            Object.keys(localErrors).some((key) => localErrors[key]) ||
            Object.keys(fieldErrors).some((key) => fieldErrors[key])
          }
          isLoading={isSubmitting}
          className="w-full"
        >
          Create Account
        </Button>
      </div>
    </>
  );
}
