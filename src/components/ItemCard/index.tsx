"use client"

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface ItemCardProps { 
  id: number;
  pictureUrl: StaticImageData;
  name: string;
  description: string;
  price: number;
  quantity: number;
  addButton: () => void;
  increaseButton: () => void;
  decreaseButton: () => void;
}


export function ItemCard (props: ItemCardProps) {
  const [quantity, setQuantity] = useState(1)

  function increaseQuantity() {
    setQuantity(quantity + 1)
  }
  function decreaseQuantity() {
    if(quantity === 1) return
    setQuantity(quantity - 1)
  }
  
  return (
    <div className='w-[32%] mt-auto mx-auto flex-col border-zinc-100 border h-[60%]  min-h-[412px] relative items-center flex text-black rounded-lg '>

      <div className='w-full h-[70%] border border-zinc-100 relative bg-gray-100 '> 
        <Image
         width={400}
         height={400}
         className='w-full h-full ' 
         src={props.pictureUrl}  
         alt={props.name}
         />
      </div>
      <div className='w-full h-full px-3 py-2'>
        <h6 className='text-lg font-medium'>
          {props.name}
        </h6>
        <p className='text-xs text-gray-500 leading-tight tracking-tight'>
          {props.description}
        </p>
        <p className='text-sm mt-4 font-medium'>
          ${(props.price / 100).toFixed(2)}
        </p>
      <div className='w-16 absolute right-4 bottom-32 justify-between flex'> 
        <button onClick={props.decreaseButton} className='w-5 h-5 flex rounded-full text-center items-center justify-center text-xl text-white  hover:bg-zinc-800 ease-out transition bg-black '>-</button>
        <p className=''>
          {props.quantity}
        </p>
        <button onClick={props.increaseButton} className='w-5 h-5 flex rounded-full text-center items-center justify-center text-xl text-white hover:bg-zinc-800 ease-out transition  bg-black '>+</button>
      </div>
      <button onClick={props.addButton} className='w-16 h-6  text-sm text-white font-semibold right-2 bottom-2 absolute rounded hover:bg-zinc-800 ease-out transition bg-black'>Add</button>
      </div>
    </div>
    );
}