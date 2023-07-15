'use client'

import { StaticImageData } from 'next/image';
import ComfortablePillow from '../assets/comfortable-pillow.jpg'

import { createContext, ReactNode, useState, useEffect } from 'react';

interface CartProviderProps {
  children: ReactNode;
}


interface CartContextItemProps { 
  id: number;
  pictureUrl: StaticImageData;
  name: string;
  description: string;
  quantity: number;
  price: number;
  deleteButton?: () => any;
  
}


export interface CartProviderDataProps { 
  cartItems: CartContextItemProps[];
  setCartItems: any;
  addItemToCart: (item: any) => any;
  deleteCartItem: (id: number) => void
  increaseCartItemQuantity: (id: number) => void
  decreaseCartItemQuantity: (id: number) => void
}

export const CartContext = createContext({} as CartProviderDataProps);


export function CartProviderContext({children}: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartContextItemProps[]>([]);

  function addItemToCart(item: CartContextItemProps) {
    const existingCartItem = cartItems.find((cartItem) => item.id === cartItem.id);
  
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (item.id === cartItem.id) {
          return { ...cartItem, quantity: cartItem.quantity + item.quantity };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    } else {
      if (cartItems.length >= 3) return;
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: item.quantity }
      ]);
    }
  }

  
function increaseCartItemQuantity(itemId: number) {
  const updatedCartItems = cartItems.map((cartItem) => {
    if (cartItem.id === itemId) {
      const updatedQuantity = cartItem.quantity + 1;
      return { ...cartItem, quantity: updatedQuantity };
    }
    return cartItem;
  });
  setCartItems(updatedCartItems);
}

  
  function decreaseCartItemQuantity(itemId: number) {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  }
 

  function deleteCartItem(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }




  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addItemToCart,
      deleteCartItem,
      increaseCartItemQuantity,
      decreaseCartItemQuantity
}}>
      {children}
    </CartContext.Provider>
  )
}
