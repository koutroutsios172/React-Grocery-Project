"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [loader,setLoader]=useState();
  const onSignIn = () => {
    setLoader(true)
    GlobalApi.SignIn(email, password).then(
      (resp) => {
        const { user, jwt } = resp.data;
        sessionStorage.setItem('jwt', jwt);
        router.push('/');
        toast.success(`Welcome back, ${user.name}!`);
        setLoader(false);
      },
      (e) => {
        console.error(e);
        toast.error('Login failed. Please check your credentials.');
        setLoader(false);
      }
    );
  };

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <div className="flex items-baseline justify-center my-20">
        <div
          className="flex flex-col items-center justify-center
        p-10 bg-slate-100 border-gray-200"
        >
          <Image src="/logo.png" width={200} height={200} alt="logo" />
          <h2 className="font-bold text-3xl">Sign In to Account</h2>
          <h2 className="text-gray-500">
            Enter your Email and Password to Sign In
          </h2>
          <div className="w-full flex flex-col gap-3 mt-7">
            <Input
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={onSignIn}
              disabled={!(email && password)} // Ensure both fields are filled
            >
              {loader?<LoaderIcon className='animate-spin'/> : 'Sign in'}
            </Button>
            <p>
              Don't have an account
              <Link href="/create-account" className="text-blue-500">
                Click here to create new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
