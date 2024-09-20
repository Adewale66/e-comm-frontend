'use client';

import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RootState } from '../../../lib/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const dynamic = 'force-dynamic';

const Page = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin?redirect=/orders');
    }
  }, [user, router]);
  const orders = [
    {
      id: 1,
      date: '2023-04-15',
      items: [
        {
          name: 'Cozy Sweater',
          price: 49.99,
          quantity: 1,
        },
        {
          name: 'Leather Backpack',
          price: 79.99,
          quantity: 1,
        },
      ],
      total: 129.98,
      status: 'Delivered',
    },
    {
      id: 2,
      date: '2023-03-20',
      items: [
        {
          name: 'Cozy Sweater',
          price: 49.99,
          quantity: 2,
        },
      ],
      total: 99.98,
      status: 'Delivered',
    },
    {
      id: 3,
      date: '2023-02-10',
      items: [
        {
          name: 'Leather Backpack',
          price: 79.99,
          quantity: 1,
        },
      ],
      total: 79.99,
      status: 'Delivered',
    },
    {
      id: 4,
      date: '2023-01-05',
      items: [
        {
          name: 'Cozy Sweater',
          price: 49.99,
          quantity: 1,
        },
        {
          name: 'Leather Backpack',
          price: 79.99,
          quantity: 1,
        },
      ],
      total: 129.98,
      status: 'Delivered',
    },
  ];
  return (
    <main className='flex flex-col bg-green-100'>
      <section className='py-12 md:py-16 lg:py-20'>
        <div className='container px-4 md:px-6'>
          <h2 className='text-2xl font-bold mb-6'>Order History</h2>
          <div className='flex flex-col gap-6 '>
            {orders.map((order) => (
              <div key={order.id} className='min-w-full'>
                <Card className='min-w-[500px]'>
                  <CardHeader className='flex items-center justify-center'>
                    <div>
                      <h3 className='font-medium'>Order #{order.id}</h3>
                      <p className='text-muted-foreground text-sm'>
                        {order.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        order.status === 'Delivered' ? 'secondary' : 'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className='max-w-full'>
                    <div className='grid gap-4'>
                      {order.items.map((item, index) => (
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
                            <div>
                              <p className='font-medium'>{item.name}</p>
                              <p className='text-muted-foreground text-sm'>
                                {item.quantity} x ${item.price}
                              </p>
                            </div>
                          </div>
                          <p className='font-medium'>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className='flex items-center justify-between'>
                    <p className='text-muted-foreground'>
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
