import React from 'react';
import { Button } from '@/components/ui/button';

// Dummy step component for template
export default function Step0() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Welcome</h3>
      <p className="text-foreground/70">This is step 0 of the signup process.</p>
      <Button>Continue</Button>
    </div>
  );
}