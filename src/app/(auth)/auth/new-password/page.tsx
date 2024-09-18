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
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resendCodeTimer, setResendCodeTimer] = useState(0);
  const [intervalState, setIntervalState] = useState<NodeJS.Timeout | null>(
    null,
  );
  const { toast } = useToast();
  const router = useRouter();

  function sendOtp() {
    setLoader(true);
    // make fetch call
    setStep1(false);
    toast({
      description: 'Otp sent to your email',
      duration: 2000,
    });
    setStep2(true);
    setResendCodeTimer(30);
    if (intervalState) {
      clearInterval(intervalState);
    }
    setIntervalState(
      setInterval(() => {
        setResendCodeTimer((prev) => prev - 1);
      }, 1000),
    );

    setLoader(false);
  }

  function verifyOtp() {
    if (intervalState) clearInterval(intervalState);
    setLoader(true);
    // make fetch call and change if successful
    setStep2(false);
    toast({
      description: 'Otp verified',
      duration: 2000,
    });
    setStep3(true);
    setLoader(false);
  }

  function changePassword() {
    setLoader(true);
    // make fetch call and change if successful
    toast({
      description: 'Password changed successfully',
      duration: 2000,
    });
    setLoader(false);
  }

  return (
    <div className=' p-5 my-auto  flex justify-center items-center'>
      <Card className='w-[470px] h-[350px] pt-8 relative block'>
        <div
          className={clsx(
            ' absolute  transition-all duration-500 ease-in-out transform',
            step1
              ? 'translate-x-0 opacity-100 z-10'
              : '-translate-x-full opacity-0 z-0',
          )}
        >
          <CardHeader>
            <CardTitle className='text-lg'>Password reset</CardTitle>
            <CardDescription>
              Please enter your email address associated with your account to
              reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Email</Label>
                <Input id='name' type='email' required placeholder='Email' />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loader} onClick={sendOtp} className='w-full'>
              Send OTP code
            </Button>
          </CardFooter>
        </div>

        <div
          className={clsx(
            'flex flex-col gap-4 items-center absolute   w-full h-full transition-all duration-500 ease-in-out transform',
            step2
              ? 'translate-x-0 opacity-100 z-10 '
              : '-translate-x-full opacity-0 z-0 ',
          )}
        >
          <CardHeader>
            <CardDescription className='text-base'>
              Enter the code that was sent to INSER EMAIL. If you can not find
              the message in your inbox, please check spam folder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5 items-center'>
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
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col  gap-2 w-full'>
            <Button onClick={verifyOtp} disabled={loader} className='w-full'>
              {loader ? 'Please wait...' : 'Verify OTP'}
            </Button>
            <Button
              variant='outline'
              onClick={sendOtp}
              className='w-full'
              disabled={resendCodeTimer > 0}
            >
              Resend OTP code {resendCodeTimer > 0 && `(${resendCodeTimer})`}
            </Button>
          </CardFooter>
        </div>
        <div
          className={clsx(
            'flex flex-col gap-4 items-center absolute w-full h-full top-1 transition-all duration-500 ease-in-out transform',
            step3
              ? 'translate-x-0 opacity-100 z-10'
              : '-translate-x-full opacity-0 z-0',
          )}
        >
          <CardHeader>
            <CardDescription className='text-lg'>
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent className='w-full'>
            <div className='flex flex-col w-full items-center gap-4'>
              <div className='flex flex-col gap-2 w-full '>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' required />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <Label htmlFor='confirmPassword'>Confirm password</Label>
                <Input id='confirmPassword' type='password' required />
              </div>
            </div>
          </CardContent>
          <CardFooter className='w-full'>
            <Button
              disabled={loader}
              onClick={changePassword}
              className='w-full'
            >
              {loader ? 'Please wait...' : 'Confirm'}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
