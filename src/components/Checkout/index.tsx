'use client'

import { useCart } from '@/src/hooks/UseCart';
import { CartItem } from '../CartItem';
import { PaypalButton } from '../PaypalButton';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import { convertToPrice, convertToPriceWithShipping, convertTotalToPaypalTotal } from '@/src/utils/convertToPrice';
import { CheckoutModal } from '../CheckoutModal';


export function Checkout() {

  const { cartItems, deleteCartItem } = useCart();
  const [total, setTotal] = useState(0);
  const shippingTax = 800;


  useEffect(() => {
    const sumTotal = cartItems.reduce((accumulator, { price, quantity }) => {
      let sumPrice = quantity * price;
      return accumulator + sumPrice;
    }, 0);
    setTotal(sumTotal);
  }, [cartItems]);

  
    
  return (  
    <div className='w-[24%] min-h-[72%] max-h-[72%] px-8 py-4 absolute right-12 rounded-2xl bg-white'>
       <div className='min-h-[40%]  h-[320px] flex-col'>
        {(cartItems.length >= 1) ? cartItems.map((item, i) => ( 
        <CartItem 
          id={item.id}
          key={i} 
          name={item.name} 
          description={item.description} 
          pictureUrl={item.pictureUrl}
          deleteButton={() => deleteCartItem(item.id)}
          quantity={(item.quantity ? item.quantity : 1)}  
          price={(item.price / 100).toFixed(2)}
        />
        )) : 
          <p className='text-black font-semibold text-center pt-32'>There no items yet</p>
          }
       </div>
        <div className='w-full mt-4 rounded h-[2px] bg-gray-100'></div>
      <div  className='w-full h-28  py-6'>
        <div className='w-full text-black text-sm px-3 flex justify-between'>
        <p className='text-gray-400 font-medium '>
          Subtotal
        </p>
        <p className='font-medium'>${convertToPrice(total)}</p>
        </div>
        <div className='w-full text-black text-sm mt-6 px-3 flex justify-between'>
        <p className='text-gray-400 font-medium'>
          Shipping
        </p>
        <p className='font-medium'>${(shippingTax / 100).toFixed(2)}</p>
        </div>
      </div>
      <div className='w-full rounded h-[2px] bg-gray-100'></div>
      
      <div  className='w-full h-20  py-6'>
      <div className='w-full text-black items-center text-sm text-center px-3 flex justify-between'>
        <p className='text-black  font-medium'>
          Total
        </p>
        <div className='flex text-center items-center'>
          <p className='text-xs text-zinc-400 tracking-tight font-semibold mr-3'>USD</p>
          <p className='text-2xl tracking-tight font-medium'>${convertToPriceWithShipping(total)}</p>
        </div>
        </div>
        </div>
        <CheckoutModal orderValue={convertTotalToPaypalTotal(total)} open />

        
      </div>
  );
}

