import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  XIcon,
} from '../../../components/icons';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import Image from 'next/image';

const Page = () => {
  const cart = [
    {
      name: 'Cozy Sweater',
      price: 49.99,
      image: '/placeholder.svg',
      quantity: 1,
    },
    {
      name: 'Leather Backpack',
      price: 79.99,
      image: '/placeholder.svg',
      quantity: 1,
    },
  ];
  return (
    <main className='flex-1'>
      <section className='py-12 md:py-16 lg:py-20 flex flex-col items-center'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-8'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>Cart</h1>
              <span className='text-muted-foreground'>{cart.length} items</span>
            </div>
            {cart.length > 0 ? (
              <div className='grid gap-6'>
                {cart.map((item, index) => (
                  <Card key={index}>
                    <CardContent className='flex items-center justify-between'>
                      <div className='flex mt-4	 items-center gap-4'>
                        <Image
                          src='/placeholder.png'
                          width={100}
                          height={100}
                          alt={item.name}
                          className='rounded-md'
                          style={{
                            aspectRatio: '100/100',
                            objectFit: 'contain',
                          }}
                        />
                        <div>
                          <h3 className='font-medium'>{item.name}</h3>
                          <p className='text-muted-foreground text-sm'>
                            ${item.price}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-4'>
                        <Button size='icon' variant='ghost'>
                          <MinusIcon className='w-4 h-4' />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button size='icon' variant='ghost'>
                          <PlusIcon className='w-4 h-4' />
                        </Button>
                        <Button size='icon' variant='ghost'>
                          <XIcon className='w-4 h-4' />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center gap-4'>
                <ShoppingCartIcon className='w-12 h-12 text-muted-foreground' />
                <p className='text-muted-foreground'>Your cart is empty.</p>
              </div>
            )}
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold'>Total</h2>
                <p className='text-muted-foreground'>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className='flex gap-2'>
                <Button variant='outline' size='lg'>
                  Clear
                </Button>
                <Button size='lg'>Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
