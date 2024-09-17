import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const FeaturedProducts = () => {
  return (
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
  );
};

export default FeaturedProducts;
