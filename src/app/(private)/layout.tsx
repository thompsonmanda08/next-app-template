import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { verifySession } from '@/lib/session';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await verifySession();

  if (!session?.accessToken) redirect('/login');

  return (
    <main className="flex h-screen items-start justify-start overflow-hidden bg-background text-foreground">
      {/* <SideNavBar /> */}
      <div className="flex max-h-screen w-full flex-col overflow-y-auto  p-5 pt-20 lg:pt-8">
        {/* <TopNavBar user={session?.user} /> */}
        {children}
      </div>
    </main>
  );
}
