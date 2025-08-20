import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';

interface WelcomeHeaderProps {
  accountState?: string;
  permissions?: string[];
  className?: string;
}

export default function WelcomeHeader({ 
  accountState, 
  permissions, 
  className = "" 
}: WelcomeHeaderProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome!
        </h1>
      </CardHeader>
      <CardBody>
        <p className="text-foreground/70">
          Thanks for using our template. This is a welcome header component.
        </p>
        {accountState && (
          <p className="text-sm text-foreground/60 mt-2">
            Account Status: {accountState}
          </p>
        )}
      </CardBody>
    </Card>
  );
}