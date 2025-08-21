'use client';
import OverlayLoader from '@/components/elements/overlay-loader';

export default function LoadingPage({ loadingText = 'Please wait' }) {
  return (
    <OverlayLoader
      description="Please be patient while we prepare your session"
      show={true}
      title={loadingText}
    />
  );
}
