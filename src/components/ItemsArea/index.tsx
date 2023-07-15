'use client'

import { useState } from 'react';
import ComfortablePillow from '../../assets/comfortable-pillow.jpg'
import DeerPillow from '../../assets/deer-pillow.jpg'
import MoustardPillow from '../../assets/moustard-pillow.jpg'
import { ItemCard } from '../ItemCard';
import { useCart } from '@/src/hooks/UseCart';


export function ItemsArea () {


  const [items, setItems] = useState([
    {
      id: 0,
      pictureUrl: ComfortablePillow,
      name: 'Comfortable Pillow',
      description: 'Very Comfortable',
      price: 15000,
      cost: 15000,
      quantity: 1,
    },
    {
      id: 1,
      pictureUrl: DeerPillow,
      name: 'Deer Pillow',
      description: 'Memories of x-mas',
      price: 12000,
      quantity: 1,
    },
    {
      id: 2,
      pictureUrl: MoustardPillow,
      name: 'Moustard Pillow',
      description: 'To sauce your sleep',
      price: 15000,
      quantity: 1,
    },
  ]);

  const handleIncreaseItemQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseItemQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

   const { cartItems, increaseCartItemQuantity, decreaseCartItemQuantity , addItemToCart } = useCart();

  return ( 
    <div className='w-[52%] h-[48%] absolute flex flex-row left-60 rounded-2xl bg-white'>
      {items.map((item, i) => (
        <ItemCard  id={item.id} key={i} pictureUrl={item.pictureUrl} decreaseButton={() => handleDecreaseItemQuantity(item.id)} increaseButton={() => handleIncreaseItemQuantity(item.id)} quantity={item.quantity} addButton={() => addItemToCart({ ...item, quantity: item.quantity })} name={item.name} description={item.description}  price={item.price} />
      ))}
      </div>

   );
}