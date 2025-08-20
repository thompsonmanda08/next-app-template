import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function CustomCard({ 
  children, 
  className = "",
  header,
  title,
  subtitle
}: CustomCardProps) {
  return (
    <Card className={`w-full ${className}`}>
      {(header || title || subtitle) && (
        <CardHeader className="flex flex-col items-start px-6 pt-6 pb-0">
          {header}
          {title && (
            <h3 className="text-lg font-semibold text-foreground">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-foreground/60">
              {subtitle}
            </p>
          )}
        </CardHeader>
      )}
      <CardBody className="px-6 py-4">
        {children}
      </CardBody>
    </Card>
  );
}