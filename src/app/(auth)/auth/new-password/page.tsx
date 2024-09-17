'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Page() {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  function otp() {
    setLoader(true);
    // make fetch call
    setStep1(false);
    toast({
      description: 'Otp sent to your email',
      duration: 1500,
    });
    setStep2(true);
    setLoader(false);
  }

  function verifyOtp() {
    setLoader(true);
    // make fetch call and change if successful
    setStep2(false);
    toast({
      description: 'Otp verified',
      duration: 1500,
    });
    setStep3(true);
    setLoader(false);
  }

  function changePassword() {
    setLoader(true);
    // make fetch call and change if successful
    toast({
      description: 'Password changed successfully',
      duration: 1500,
    });
    setLoader(false);
  }

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-full relative w-full'>
      {!step3 && (
        <>
          <h1
            className={clsx('text-3xl font-bold', {
              step3: 'hidden',
            })}
          >
            Reset Password
          </h1>
        </>
      )}
      <div className='relative w-full'>
        <div
          className={clsx(
            'flex flex-col gap-4 items-center absolute top-3/4 w-full h-full transition-all duration-500 ease-in-out transform',
            step1
              ? 'translate-x-0 opacity-100 z-10'
              : '-translate-x-full opacity-0 z-0 ',
          )}
        >
          <Label htmlFor='email'>
            Please enter the email associated with your account
          </Label>

          <Input type='email' name='email' className='max-w-max' />
          <Button disabled={loader} onClick={otp}>
            {loader ? 'Please wait...' : 'Send OTP'}
          </Button>
        </div>

        <div
          className={clsx(
            'flex flex-col gap-4 items-center absolute w-full h-full transition-all duration-500 ease-in-out transform',
            step2
              ? 'translate-x-0 opacity-100 z-10'
              : '-translate-x-full opacity-0 z-0',
          )}
        >
          <Label htmlFor='otp'>Enter the OTP sent to your email</Label>
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={verifyOtp} disabled={loader}>
            {loader ? 'Please wait...' : 'Verify OTP'}
          </Button>
        </div>

        <div
          className={clsx(
            'flex flex-col gap-4 items-center absolute w-full h-full bottom-0 mb-32 transition-all duration-500 ease-in-out transform',
            step3
              ? 'translate-x-0 opacity-100 z-10'
              : '-translate-x-full opacity-0 z-0',
          )}
        >
          <Card className='w-full max-w-sm'>
            <CardHeader>
              <CardTitle className='text-2xl'>Change password</CardTitle>
              <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>Confirm password</Label>
                <Input id='confirmPassword' type='password' required />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className='w-full'
                disabled={loader}
                onClick={changePassword}
              >
                {loader ? 'Please wait...' : 'Change password'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
