'use client';

import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error);
    }
    // Add your error reporting service here
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={error ? 500 : 0} />
      </body>
    </html>
  );
}
