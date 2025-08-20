'use client';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import Logo from '@/components/base/logo';
import { Button } from '@/components/ui/button';
import SignUpForm from '@/components/forms/register-form';

export default function RegisterPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  // const isAccountCreated = searchParams.get('account_created');
  const isAccountCreated = false;

  // Check for success message from signup
  // useEffect(() => {
  //   const success = searchParams.get('success');
  //   if (success === 'true') {
  //     // SET A MESSAGE HERE
  //   }
  // }, [searchParams]);

  return (
    <div className="mx-auto w-full max-w-sm flex-auto p-6">
      {!isAccountCreated && (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-foreground mb-2">
            <span className="font-bold">Create</span> an Account
          </h1>
          <p className="text-muted-foreground">
            Sign up to access your account
          </p>
        </div>
      )}

      {/********************* REGISTER FORM *********************/}

      {isAccountCreated ? <AccountCreatedSuccess /> : <SignUpForm />}
      {/********************* REGISTER FORM *********************/}

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

function AccountCreatedSuccess() {
  return (
    <Card className="m-auto p-6 px-4 max-w-md shadow-none flex-col items-center justify-center ">
      <CardHeader className="items-center justify-center">
        <Logo />
      </CardHeader>
      <CardBody>
        <h2
          className={
            'w-full bg-gradient-to-tr from-primary via-primary/80 to-primary-light bg-clip-text text-center text-[clamp(18px,18px+0.5vw,32px)] font-bold text-transparent py-2'
          }
        >
          Account Created Successfully!
        </h2>
        <p className="max-w-md text-center text-xs leading-6 tracking-tight text-foreground/70 xl:text-sm">
          Your account was created successfully.{' '}
          <Link href={'/login'} className="font-bold">
            Login
          </Link>{' '}
          now.
        </p>
      </CardBody>

      <CardFooter>
        <Button as={Link} className={'w-full flex-1 my-2'} href={'/login'}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
