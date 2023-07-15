'use client'
  
import { useContext } from 'react';

import { CartContext, CartProviderDataProps } from '../contexts/CartContext';

export function useCart(): CartProviderDataProps {
  const context = useContext(CartContext);

  return context;
}
