import React from 'react';
import { Card, CardBody } from '@heroui/react';

interface EmptyLogsProps {
  title?: string;
  message?: string;
  subTitle?: string;
  icon?: React.ReactNode;
  className?: string;
  classNames?: {
    heading?: string;
    [key: string]: string | undefined;
  };
}

export default function EmptyLogs({ 
  title = "No Data Found", 
  message = "No data available to display.", 
  subTitle,
  icon,
  className = "",
  classNames 
}: EmptyLogsProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardBody className="flex flex-col items-center justify-center py-12 text-center">
        {icon && <div className="mb-4 text-4xl text-gray-400">{icon}</div>}
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 ${classNames?.heading || ''}`}>
          {title}
        </h3>
        {subTitle && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {subTitle}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          {message}
        </p>
      </CardBody>
    </Card>
  );
}