'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  MountainIcon,
  SearchIcon,
  UserIcon,
  ShoppingCartIcon,
  FootprintsIcon,
  ShoppingBagIcon,
  WatchIcon,
  HeadphonesIcon,
  LogOutIcon,
  XIcon,
  CommandIcon,
} from '../components/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';

export default function Home() {
  const [showPopover, setShowPopover] = useState(false);
  const [cart, setCart] = useState([
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
  ]);

  const removeFromCart = (item: {
    name: string;
    price?: number;
    image?: string;
  }) => {
    setCart(cart.filter((i) => i.name !== item.name));
  };
  return (
    <div className='flex flex-col min-h-[100vh]'>
      <header className='bg-background border-b shadow-sm sticky top-0 z-30 flex justify-center'>
        <div className='container px-4 md:px-6 flex items-center h-14 lg:h-16'>
          <Link
            href='#'
            className='mr-6 flex items-center gap-2'
            prefetch={false}
          >
            <MountainIcon className='h-6 w-6' />
            <span className='text-lg font-semibold'>Acme Ecommerce</span>
          </Link>
          <nav className='ml-auto hidden lg:flex items-center gap-6 text-sm font-medium'>
            <Link
              href='#'
              className='hover:underline underline-offset-4'
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href='#'
              className='hover:underline underline-offset-4'
              prefetch={false}
            >
              Shop
            </Link>
            <Link
              href='#categories'
              className='hover:underline underline-offset-4'
              prefetch={false}
            >
              Categories
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
                    <AvatarImage
                      src='/placeholder-user.jpg'
                      alt='User Avatar'
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>John Doe</h4>
                    <p className='text-sm text-muted-foreground'>
                      johndoe@example.com
                    </p>
                  </div>
                </div>
                <Separator className='my-4' />
                <div className='grid gap-2'>
                  <Link
                    href='#'
                    className='flex items-center gap-2 hover:bg-muted rounded-md p-2'
                    prefetch={false}
                  >
                    <CommandIcon className='w-5 h-5' />
                    <span>Orders</span>
                  </Link>
                  <Link
                    href='#'
                    className='flex items-center gap-2 hover:bg-muted rounded-md p-2'
                    prefetch={false}
                  >
                    <LogOutIcon className='w-5 h-5' />
                    <span>Logout</span>
                  </Link>
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
                            <Button
                              size='icon'
                              variant='ghost'
                              onClick={() => removeFromCart(item)}
                            >
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
      <main className='flex flex-col'>
        <section className='py-12 md:py-16 lg:py-20 self-center'>
          <div className='container px-4 md:px-6'>
            <Carousel className='w-full max-w-6xl'>
              <CarouselContent>
                <CarouselItem>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                      <Image
                        src='/placeholder.png'
                        width={600}
                        height={400}
                        alt='Featured Product'
                        className='w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg'
                        style={{ aspectRatio: '600/400', objectFit: 'cover' }}
                      />
                    </div>
                    <div className='col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-center gap-4'>
                      <h2 className='text-3xl md:text-4xl font-bold'>
                        Discover Our Featured Product
                      </h2>
                      <p className='text-muted-foreground text-lg'>
                        Elevate your style with our latest must-have item.
                        Crafted with care and attention to detail, this product
                        is sure to impress.
                      </p>
                      <div className='flex items-center gap-4'>
                        <span className='text-2xl font-bold'>$99.99</span>
                        <Button size='lg'>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                      <Image
                        src='/placeholder.png'
                        width={600}
                        height={400}
                        alt='Featured Product'
                        className='w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg'
                        style={{ aspectRatio: '600/400', objectFit: 'cover' }}
                      />
                    </div>
                    <div className='col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-center gap-4'>
                      <h2 className='text-3xl md:text-4xl font-bold'>
                        Discover Our Featured Product 2
                      </h2>
                      <p className='text-muted-foreground text-lg'>
                        Elevate your style with our latest must-have item.
                        Crafted with care and attention to detail, this product
                        is sure to impress.
                      </p>
                      <div className='flex items-center gap-4'>
                        <span className='text-2xl font-bold'>$79.99</span>
                        <Button size='lg'>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                      <Image
                        src='/placeholder.png'
                        width={600}
                        height={400}
                        alt='Featured Product'
                        className='w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg'
                        style={{ aspectRatio: '600/400', objectFit: 'cover' }}
                      />
                    </div>
                    <div className='col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-center gap-4'>
                      <h2 className='text-3xl md:text-4xl font-bold'>
                        Discover Our Featured Product 3
                      </h2>
                      <p className='text-muted-foreground text-lg'>
                        Elevate your style with our latest must-have item.
                        Crafted with care and attention to detail, this product
                        is sure to impress.
                      </p>
                      <div className='flex items-center gap-4'>
                        <span className='text-2xl font-bold'>$59.99</span>
                        <Button size='lg'>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        <section
          className='py-12 md:py-16 lg:py-20 bg-muted flex justify-center flex-wrap'
          id='categories'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center text-center gap-4 mb-8'>
              <h2 className='text-3xl md:text-4xl font-bold'>
                Popular Categories
              </h2>
              <p className='text-muted-foreground text-lg max-w-md'>
                Explore our wide range of products across various categories to
                find the perfect fit for your needs.
              </p>
            </div>
            <div className='flex items-center justify-around gap-4 flex-wrap'>
              <Link
                href='#'
                className='flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-background transition-colors'
                prefetch={false}
              >
                <FootprintsIcon className='w-8 h-8' />
                <span className='text-sm font-medium'>
                  Women&rsquo;s Clothing
                </span>
              </Link>
              <Link
                href='#'
                className='flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-background transition-colors'
                prefetch={false}
              >
                <ShoppingBagIcon className='w-8 h-8' />
                <span className='text-sm font-medium'>
                  Men&rsquo;s Clothing
                </span>
              </Link>
              <Link
                href='#'
                className='flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-background transition-colors'
                prefetch={false}
              >
                <WatchIcon className='w-8 h-8' />
                <span className='text-sm font-medium'>Jewelery</span>
              </Link>
              <Link
                href='#'
                className='flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-background transition-colors'
                prefetch={false}
              >
                <HeadphonesIcon className='w-8 h-8' />
                <span className='text-sm font-medium'>Electronics</span>
              </Link>
            </div>
          </div>
        </section>
        <section className='py-12 md:py-16 lg:py-20 flex justify-center'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center text-center gap-4 mb-8'>
              <h2 className='text-3xl md:text-4xl font-bold'>
                Featured Products
              </h2>
              <p className='text-muted-foreground text-lg max-w-md'>
                Discover our latest collection of high-quality products that are
                sure to impress.
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
              <div className='flex flex-col gap-4'>
                <Image
                  src='/placeholder.png'
                  width={400}
                  height={400}
                  alt='Product Image'
                  className='w-full h-[300px] object-cover rounded-lg'
                  style={{ aspectRatio: '400/400', objectFit: 'cover' }}
                />
                <div className='flex flex-col gap-2'>
                  <h3 className='text-lg font-medium'>Cozy Sweater</h3>
                  <p className='text-muted-foreground text-sm'>
                    Stay warm and stylish in this soft, comfortable sweater.
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold'>$49.99</span>
                    <Button size='sm'>Add to Cart</Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <Image
                  src='/placeholder.png'
                  width={400}
                  height={400}
                  alt='Product Image'
                  className='w-full h-[300px] object-cover rounded-lg'
                  style={{ aspectRatio: '400/400', objectFit: 'cover' }}
                />
                <div className='flex flex-col gap-2'>
                  <h3 className='text-lg font-medium'>Leather Backpack</h3>
                  <p className='text-muted-foreground text-sm'>
                    Stylish and durable backpack for everyday use.
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold'>$79.99</span>
                    <Button size='sm'>Add to Cart</Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <Image
                  src='/placeholder.png'
                  width={400}
                  height={400}
                  alt='Product Image'
                  className='w-full h-[300px] object-cover rounded-lg'
                  style={{ aspectRatio: '400/400', objectFit: 'cover' }}
                />
                <div className='flex flex-col gap-2'>
                  <h3 className='text-lg font-medium'>Wireless Headphones</h3>
                  <p className='text-muted-foreground text-sm'>
                    Immersive audio experience with these high-quality
                    headphones.
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold'>$99.99</span>
                    <Button size='sm'>Add to Cart</Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <Image
                  src='/placeholder.png'
                  width={400}
                  height={400}
                  alt='Product Image'
                  className='w-full h-[300px] object-cover rounded-lg'
                  style={{ aspectRatio: '400/400', objectFit: 'cover' }}
                />
                <div className='flex flex-col gap-2'>
                  <h3 className='text-lg font-medium'>Stylish Sunglasses</h3>
                  <p className='text-muted-foreground text-sm'>
                    Protect your eyes in style with these trendy sunglasses.
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold'>$29.99</span>
                    <Button size='sm'>Add to Cart</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='bg-muted py-8 border-t flex justify-center'>
        <div className='mt-8 text-center text-sm'>
          &copy; 2024 Acme Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
