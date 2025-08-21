import { Textarea as HeroUITextarea, TextAreaProps } from '@heroui/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TextareaProps = Partial<TextAreaProps> & {
  onError?: boolean;
  errorText?: string;
  classNames?: {
    base?: string;
    wrapper?: string;
    input?: string;
    label?: string;
    errorText?: string;
  };
};

export function Textarea({
  label,
  className,
  onError,
  errorText,
  classNames,
  isInvalid,
  ...props
}: TextareaProps) {
  const isError = onError || isInvalid;

  return (
    <HeroUITextarea
      className={cn(className, classNames?.wrapper)}
      classNames={{
        base: cn('w-full', classNames?.base),
        input: cn(
          'min-h-24 text-sm placeholder:text-muted-foreground',
          classNames?.input,
        ),
        inputWrapper: cn(
          'rounded-md border border-default-200 data-[hover=true]:border-default-300 data-[focus=true]:border-primary group-data-[focus=true]:border-primary',
          {
            'border-danger data-[hover=true]:border-danger data-[focus=true]:border-danger': isError,
          }
        ),
        label: cn(
          'text-sm font-medium text-foreground/70',
          {
            'text-danger': isError,
          },
          classNames?.label,
        ),
      }}
      errorMessage={
        isError && errorText ? (
          <motion.span
            className={cn('text-xs text-danger', classNames?.errorText)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorText}
          </motion.span>
        ) : undefined
      }
      isInvalid={isError}
      label={label}
      labelPlacement="outside"
      radius="md"
      variant="bordered"
      {...props}
    />
  );
}
