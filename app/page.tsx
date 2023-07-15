'use client'
import { Checkout } from '@/src/components/Checkout'
import { CheckoutModal } from '@/src/components/CheckoutModal'
import { ItemsArea } from '@/src/components/ItemsArea'
import { CartProviderContext } from '@/src/contexts/CartContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import Image from 'next/image'

export default function Home() {
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
};
  return (
    <CartProviderContext> 
     <PayPalScriptProvider options={initialOptions}>
    <main className=" w-screen h-screen bg-black flex-row py-16">
      <ItemsArea />
      <Checkout />
    </main >
    </PayPalScriptProvider>
    </CartProviderContext>
  )
}
