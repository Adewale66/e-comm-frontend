'use client';

import Link from 'next/link';
import {
  FootprintsIcon,
  ShoppingBagIcon,
  WatchIcon,
  HeadphonesIcon,
} from '../../components/icons';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import CarouselProduct from '../../components/Carouselproduct';
import FeaturedProducts from '../../components/FeaturedProducts';

export default function Home() {
  return (
    <div className='flex flex-col min-h-[100vh]'>
      <main className='flex flex-col'>
        <section className='py-12 md:py-16 lg:py-20 self-center'>
          <div className='container px-4 md:px-6'>
            <Carousel className='w-full max-w-6xl'>
              <CarouselContent>
                {Array.from({ length: 3 }).map((_, i) => (
                  <CarouselItem key={i}>
                    <CarouselProduct key={i} name={`Product ${i}`} />
                  </CarouselItem>
                ))}
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
                href='/products?category=women'
                className='flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-background transition-colors'
                prefetch={false}
              >
                <FootprintsIcon className='w-8 h-8' />
                <span className='text-sm font-medium'>
                  Women&rsquo;s Clothing
                </span>
              </Link>
              <Link
                href='/products?category=men'
                className='flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-background transition-colors'
                prefetch={false}
              >
                <ShoppingBagIcon className='w-8 h-8' />
                <span className='text-sm font-medium'>
                  Men&rsquo;s Clothing
                </span>
              </Link>
              <Link
                href='/products?category=jewelery'
                className='flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-background transition-colors'
                prefetch={false}
              >
                <WatchIcon className='w-8 h-8' />
                <span className='text-sm font-medium'>Jewelery</span>
              </Link>
              <Link
                href='/products?category=electronics'
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
              {Array.from({ length: 4 }).map((_, i) => (
                <FeaturedProducts key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
