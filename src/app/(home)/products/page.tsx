'use client';

import Product from '../../../components/Product';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import { useGetAllProductsQuery } from '../../../lib/slices/productsSlice';
import Loader from '../../../components/Loader';

const Page = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const { data: products, isLoading } = useGetAllProductsQuery({
    category: category || '',
  });

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
          <div className='flex flex-col items-center text-center gap-4 mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold'>All Products</h2>
            <p className='text-muted-foreground text-lg max-w-md'>
              Browse through our extensive collection of high-quality products
              to find the perfect fit for your needs.
            </p>
          </div>
          <Select>
            <SelectTrigger className='w-[180px] mb-3'>
              <SelectValue placeholder='Filter category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='men'> Men&rsquo;s Clothing</SelectItem>
                <SelectItem value='women'>Women&rsquo;s Clothing</SelectItem>
                <SelectItem value='jewelery'>Jewelery</SelectItem>
                <SelectItem value='electronics'>Electronics</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className='flex flex-wrap gap-6'>
            {products?.map((product, i) => (
              <Product
                name={product.title}
                price={product.price}
                description={product.description}
                imageSrc={product.image}
                key={i}
                rating={Math.floor(Math.random() * 5) + 1}
              />
            ))}
          </div>
        </div>
      </section>
      {!category && (
        <>
          <Pagination className='mb-4'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className='hover:cursor-pointer' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className='hover:cursor-pointer' isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className='hover:cursor-pointer'>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className='hover:cursor-pointer'>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className='hover:cursor-pointer' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </main>
  );
};

export default Page;
