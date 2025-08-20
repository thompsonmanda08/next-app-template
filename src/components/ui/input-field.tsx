'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  errorText?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  classNames?: {
    wrapper?: string;
    input?: string;
    label?: string;
    errorText?: string;
  };
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      name,
      classNames,
      error,
      maxLength,
      max,
      min,
      isInvalid = false,
      isDisabled,
      errorText = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn('flex w-full flex-col', classNames?.wrapper, {
          'cursor-not-allowed opacity-50': isDisabled,
        })}
      >
        {label && (
          <label
            className={cn(
              'pl-1 text-sm font-medium text-nowrap text-gray-700 mb-0.5',
              {
                'text-red-500': isInvalid,
                'opacity-50': isDisabled || props?.disabled,
              },
            )}
            htmlFor={name}
          >
            {label}{' '}
            {props?.required && (
              <span className="font-bold text-red-500"> *</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-lg border-2 border-border px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black/50 disabled:cursor-not-allowed disabled:opacity-50',
            {
              'border-red-500 focus:border-red-500/70 focus-visible:ring-red-500/30':
                isInvalid,
            },
            className,
            classNames?.input,
          )}
          disabled={isDisabled || props?.disabled}
          id={name}
          max={max}
          maxLength={maxLength}
          min={min}
          name={name}
          type={type}
          {...props}
        />
        {errorText && isInvalid && (
          <span
            className={cn('ml-1 text-xs text-red-500', classNames?.errorText)}
          >
            {errorText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
