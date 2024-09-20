import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const FeaturedProducts = ({
  name,
  description,
  price,
  src,
}: {
  name: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={`/products/${name.split(' ').join('-').toLowerCase()}`}
      className='flex flex-col gap-4'
    >
      <Image
        src={src}
        width={400}
        height={400}
        alt='Product Image'
        className='w-full h-[250px] object-cover rounded-lg'
        style={{ aspectRatio: '400/400', objectFit: 'fill' }}
      />
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-medium'>{name}</h3>
        <p className='text-muted-foreground text-sm'>{description}</p>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold'>${price}</span>
          <Button size='sm'>Add to Cart</Button>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProducts;
