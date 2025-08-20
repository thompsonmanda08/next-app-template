'use client';
import * as React from 'react';
import {
  Input as HeroInput,
  InputProps as HeroInputProps,
} from '@heroui/react';

import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  HeroInputProps & {
    label?: string;
    error?: string;
    errorText?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    endContent?: React.ReactNode;
    description?: string;
    classNames?: {
      wrapper?: string;
      input?: string;
      label?: string;
      errorText?: string;
      base?: string;
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
      variant = 'bordered',
      radius = 'sm',
      size = 'md',
      labelPlacement = 'outside',
      isDisabled,
      errorText = '',
      endContent,
      description,
      ...props
    },
    ref,
  ) => {
    // Filter out HTML-specific props that conflict with HeroUI
    const {
      accept,
      alt,
      autoComplete,
      capture,
      checked,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      height,
      list,
      multiple,
      pattern,
      step,
      width,
      ...filteredProps
    } = props;

    return (
      <HeroInput
        ref={ref}
        label={label}
        type={type}
        name={name}
        size={size}
        variant={variant}
        radius={radius}
        labelPlacement={labelPlacement}
        id={name}
        max={max}
        maxLength={maxLength}
        min={min}
        isDisabled={isDisabled || props?.disabled}
        isInvalid={isInvalid}
        errorMessage={errorText && isInvalid ? errorText : undefined}
        isRequired={props?.required}
        description={description}
        endContent={endContent}
        className={cn(className, classNames?.wrapper)}
        classNames={{
          mainWrapper: cn('', classNames?.wrapper),
          base: cn('text-foreground gap-0', classNames?.base),
          input: cn('text-foreground', classNames?.input),
          label: cn('text-foreground text-sm mb-1', classNames?.label),
          errorMessage: cn('text-red-500', classNames?.errorText),
        }}
        // Pass only safe props
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        autoComplete={autoComplete}
        pattern={pattern}
        step={step}
        {...(filteredProps as any)}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
