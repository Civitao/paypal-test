'use client'

import { createOrder, createPaypalOrder, createPaypalToken } from '@/src/paypal/PaypalMethods';
import * as Dialog from '@radix-ui/react-dialog';
import { useRef, useState } from 'react';


interface ApprovedProps { 
  orderId: string;
}


export function ApprovedModal({orderId}: ApprovedProps) {

  const [streetTwoValue, setStreetTwoValue] = useState('');



return (
  <Dialog.Root open>
    <Dialog.Portal>
      <Dialog.Overlay className='w-full h-screen ease-linear fixed top-0 left-0 bg-black blur-sm opacity-50  transition-opacity'/>
      <Dialog.Content 
        className='w-[45%] h-[55%] ease-linear flex rounded-md transition-opacity bg-white fixed top-[15%] p-8 left-[25%]'>
         
        <div className='w-[50%] h-[100%] pt-10'>
        <Dialog.Title className='text-black text-3xl absolute top-4 font-semibold block '>{orderId}</Dialog.Title>
         
        </div>
        <div className='w-[50%] ml-8 flex flex-col justify-center p-6'>
          
            <button 
            onClick={createOrder}
            className='w-full h-12 mt-3 font-semibold rounded-lg hover:bg-blue-700 ease-out transition bg-blue-600'>Via PayPal API</button>

        </div>
        {/* <Dialog.Close asChild>
            <button className="w-12 h-12 bg-green-400">Save changes</button>
          </Dialog.Close> */}

        <Dialog.Description />
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
}
