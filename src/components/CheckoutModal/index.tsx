'use client'

import { PayPalButtons } from '@paypal/react-paypal-js';
import * as Dialog from '@radix-ui/react-dialog';
import { useRef, useState } from 'react';
import Autocomplete, { usePlacesWidget} from "react-google-autocomplete";

interface CheckoutModalProps {
  orderValue: string;
  open: boolean;
}

export function CheckoutModal(props: CheckoutModalProps) {
  const inputRef = useRef(null);
  const [streetOneValue, setStreetOneValue] = useState<HTMLInputElement>();
  const [streetTwoValue, setStreetTwoValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');
  const [countryValue, setCountryValue] = useState('US');
  
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
    onPlaceSelected: (place) => {
      setStreetTwoValue(place);
    }})
 
    console.log(inputRef);
    
return (
  <Dialog.Root>
    <Dialog.Trigger asChild>
    <button className='w-full h-12 mt-3 font-semibold rounded-lg hover:bg-zinc-800 ease-out transition bg-black'>Checkout</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='w-full h-screen ease-linear fixed top-0 left-0 bg-black blur-sm opacity-50  transition-opacity'/>
      <Dialog.Content 
        className='w-[45%] h-[55%] ease-linear flex rounded-md transition-opacity bg-white fixed top-[15%] p-8 left-[25%]'>
         
        <div className='w-[50%] h-[100%] pt-10'>
        <Dialog.Title className='text-black text-3xl absolute top-4 font-semibold block '>Adress</Dialog.Title>
         <fieldset className='text-black mb-6 items-center w-[100%] h-[10%] flex justify-between'>  
         <label className="mr-2 font-semibold Label" htmlFor="name">
            Street 1
          </label>
        <Autocomplete 
          language='en'
          ref={autocompleteRef}
          className='border focus:border-2 pl-1 border-black h-[100%] text-black text-lg rounded w-[75%]'
          apiKey={process.env.NEXT_PUBLIC_MAPS_KEY!} 
          onPlaceSelected={(places, a, c) => {
            //@ts-ignore
            inputRef.current.setValue(places?.formateted_address);
          }}
          options={{
            types: ["geocode", "establishment"]
          }}
          defaultValue="Moscow"
          
          />

            </fieldset>

          <fieldset className='text-black mb-6 items-center w-[100%] h-[10%] flex justify-between'>
          <label className="mr-1 font-semibold " htmlFor="name">
            Street 2
          </label>
          <input
            ref={inputRef}
            onChange={e =>setStreetTwoValue(e.target.value)}
            placeholder='Your street'
            className="border pl-1 focus:border-2 outline-none border-black h-[100%] rounded w-[75%] placeholder:text-zinc-300" 
           />
        </fieldset>

        <fieldset className='text-black mb-6 items-center w-[100%] h-[10%] flex justify-between'>
          <label className="mr-1 font-semibold " htmlFor="name">
            State
          </label>
          <input  
           value={stateValue}
           placeholder='Your state'
           onChange={e =>setStateValue(e.target.value)}
           
           className="border pl-1 focus:border-2 outline-none border-black h-[100%] rounded w-[75%] placeholder:text-zinc-300"  />
        </fieldset>


        <fieldset className='text-black mb-6 items-center w-[100%] h-[10%] flex justify-between'>
          <label className="mr-1 font-semibold " htmlFor="name">
            ZIP Code
          </label>
          <input  
           value={zipCodeValue}
           placeholder='Your zip code'
           onChange={e =>setZipCodeValue(e.target.value)}
           className="border pl-1 focus:border-2 outline-none border-black h-[100%] rounded w-[75%] placeholder:text-zinc-300"  />
        </fieldset>

        <fieldset className='text-black mb-6 items-center w-[100%] h-[10%] flex justify-between'>
          <label className="mr-1 font-semibold " htmlFor="name">
            Country
          </label>
          <input 
            value={countryValue}
            placeholder='Type your country'
            className="border focus:border-2 pl-1 outline-none border-black h-[100%] rounded w-[75%] placeholder:text-zinc-300"  />
           
        </fieldset>
        </div>
        <div className='w-[50%] ml-8 flex flex-col justify-center p-6'>
          <PayPalButtons
        
      createOrder={(data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        
                        value: props.orderValue,
                    },
                },
            ],
        });
    }}
    // onApprove={(data, actions) => {
    //     return actions.order.capture().then((details) => {
    //         const name = details.payer.name.given_name;
    //         alert(`Transaction completed by ${name}`);
    //     });
    // }}
      />    
            <button className='w-full h-12 mt-3 font-semibold rounded-lg hover:bg-zinc-800 ease-out transition bg-blue-600'>Via PayPal API</button>

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
