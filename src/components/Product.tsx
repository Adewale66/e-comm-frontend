import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { StarIcon } from './icons';
import { cn } from '../lib/utils';

const Product = ({
  name,
  price,
  description,
  imageSrc,
  rating,
}: {
  name: string;
  price: number;
  description: string;
  imageSrc: string;
  rating: number;
}) => {
  return (
    <div className='max-w-[350px] flex-grow '>
      <Link
        href={`/products/${name.split(' ').join('-').toLowerCase()}`}
        className='group transition-transform ease-in-out transform hover:scale-105 flex flex-col gap-4 hover:border-2 hover:border-primary  p-4 rounded-lg'
      >
        <Image
          src={imageSrc}
          width={350}
          height={350}
          alt='Product Image'
          className='w-full h-[300px] object-cover rounded-lg'
          style={{ aspectRatio: '400/400', objectFit: 'cover' }}
        />
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-medium'>{name} </h3>
          <p className='text-muted-foreground text-sm'>{description}</p>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    rating > i ? 'fill-primary' : 'text-muted-foreground',
                  )}
                />
              ))}
            </div>
            <span className='text-muted-foreground text-sm'>
              ({Math.floor(Math.random() * 100)})
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-bold'>${price}</span>
            <Button size='sm'>Add to Cart</Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
