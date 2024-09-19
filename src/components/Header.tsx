'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import {
  MountainIcon,
  SearchIcon,
  UserIcon,
  ShoppingCartIcon,
  LogOutIcon,
  XIcon,
  CommandIcon,
} from './icons';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { removeCredentials } from '../lib/slices/authSlice';

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);

  const cart = [
    {
      name: 'Cozy Sweater',
      price: 49.99,
      image: '/placeholder.svg',
    },
    {
      name: 'Leather Backpack',
      price: 79.99,
      image: '/placeholder.svg',
    },
  ];

  function logout() {
    dispatch(removeCredentials());
  }

  return (
    <header className='bg-background border-b shadow-sm sticky top-0 z-30 flex justify-center'>
      <div className='container px-4 md:px-6 flex items-center h-14 lg:h-16'>
        <Link
          href='/'
          className='mr-6 flex items-center gap-2'
          prefetch={false}
        >
          <MountainIcon className='h-6 w-6' />
          <span className='text-lg font-semibold'>Acme Ecommerce</span>
        </Link>
        <nav className='ml-auto hidden lg:flex items-center gap-6 text-sm font-medium'>
          <Link
            href='/'
            className='hover:underline underline-offset-4'
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href='/products'
            className='hover:underline underline-offset-4'
            prefetch={false}
          >
            Shop
          </Link>
          <Link
            href='/#'
            className='hover:underline underline-offset-4'
            prefetch={false}
          >
            About
          </Link>
          <Link
            href='/#'
            className='hover:underline underline-offset-4'
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className='ml-auto relative hidden lg:block'>
          <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search products...'
            className='pl-10 pr-4 bg-muted rounded-md w-72 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary'
          />
        </div>
        <div className='ml-4 lg:hidden'>
          <Button size='icon' variant='ghost'>
            <SearchIcon className='w-6 h-6' />
            <span className='sr-only'>Search</span>
          </Button>
        </div>
        <div className='ml-4'>
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
              <Button size='icon' variant='ghost'>
                <UserIcon className='w-6 h-6' />
                <span className='sr-only'>User</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80 p-4'>
              <div className='flex items-center gap-4'>
                <Avatar>
                  <AvatarFallback>
                    {user?.name
                      .split(' ')
                      .map((x) => x[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className='font-medium'>{user?.name}</h4>
                  <p className='text-sm text-muted-foreground'>{user?.email}</p>
                </div>
              </div>
              <Separator className='my-4' />
              <div className='grid gap-2'>
                <Link
                  href='/orders'
                  className='flex items-center gap-2 hover:bg-muted rounded-md p-2'
                  prefetch={false}
                >
                  <CommandIcon className='w-5 h-5' />
                  <span>Orders</span>
                </Link>
                <span
                  className='flex items-center gap-2 hover:bg-muted rounded-md p-2 hover:cursor-pointer'
                  onClick={logout}
                >
                  <LogOutIcon className='w-5 h-5' />
                  <span>Logout</span>
                </span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className='ml-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button size='icon' variant='ghost'>
                <ShoppingCartIcon className='w-6 h-6' />
                <span className='sr-only'>Cart</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80 p-4'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-medium'>Cart</h4>
                  <span className='text-muted-foreground'>
                    {cart.length} items
                  </span>
                </div>
                {cart.length > 0 ? (
                  <div className='flex flex-col gap-4'>
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center gap-2'>
                          <Image
                            src='/placeholder.png'
                            width={50}
                            height={50}
                            alt={item.name}
                            className='rounded-md'
                            style={{
                              aspectRatio: '50/50',
                              objectFit: 'cover',
                            }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold'>${item.price}</span>
                          <Button size='icon' variant='ghost'>
                            <XIcon className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-muted-foreground'>Your cart is empty.</p>
                )}
                <div className='flex justify-end'>
                  <Button>Checkout</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
