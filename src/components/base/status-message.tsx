import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface StatusMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  className?: string;
}

export default function StatusMessage({ type, title, message, className = "" }: StatusMessageProps) {
  const baseStyles = "p-4 rounded-lg border";
  
  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
  };

  const icons = {
    success: <CheckCircleIcon className="h-5 w-5" />,
    error: <XCircleIcon className="h-5 w-5" />,
    warning: <ExclamationCircleIcon className="h-5 w-5" />,
    info: <InformationCircleIcon className="h-5 w-5" />
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}