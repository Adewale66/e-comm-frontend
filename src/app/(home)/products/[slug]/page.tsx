'use client';

import Image from 'next/image';
import React from 'react';
import { StarIcon } from '../../../../components/icons';
import { Button } from '../../../../components/ui/button';
import { useGetProductQuery } from '../../../../lib/slices/productsSlice';
import Loader from '../../../../components/Loader';

export default function Page({ params }: { params: { slug: string } }) {
  const product = params.slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
  const tag = params.slug;
  const { data, isLoading } = useGetProductQuery({ tag });

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full w-full my-auto'>
        <Loader />
      </div>
    );
  }

  return (
    <main>
      <section className='py-12 md:py-16 lg:py-20 flex justify-center'>
        <div className='container px-4 md:px-6'>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <Image
                src={data?.image || '/placeholder.png'}
                width={600}
                height={600}
                alt='Product Image'
                className='w-full h-[400px] object-cover rounded-lg'
                style={{ aspectRatio: '600/600', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h1 className='text-3xl font-bold'>{product}</h1>
              <p className='text-muted-foreground text-lg mt-2'>
                {data?.category}
              </p>
              <div className='flex items-center gap-4 mt-4'>
                <div className='flex items-center gap-0.5'>
                  <StarIcon className='w-5 h-5 fill-primary' />
                  <StarIcon className='w-5 h-5 fill-primary' />
                  <StarIcon className='w-5 h-5 fill-primary' />
                  <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                  <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                </div>
                <span className='text-muted-foreground text-sm'>(4.3)</span>
              </div>
              <div className='mt-6'>
                <span className='text-3xl font-bold'>${data?.price}</span>
              </div>
              <div className='mt-6 flex gap-4'>
                <Button size='lg'>Add to Cart</Button>
              </div>
              <div className='mt-8'>
                <h2 className='text-2xl font-bold'>Description</h2>
                <p className='text-muted-foreground text-lg mt-2'>
                  {data?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
