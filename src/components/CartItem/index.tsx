import Image, { StaticImageData } from 'next/image';

export interface CartItemProps { 
  id: number;
  pictureUrl: StaticImageData;
  name: string;
  description: string;
  quantity: number;
  price: number;
  deleteButton?: () => any;
}


export function CartItem (props: CartItemProps) {
  return (
    <div className='w-full h-20 relative ease-in-out  justify-between items-center flex text-black rounded mb-4 '>

      <div className='w-20 h-20 border-gray-300 border relative  bg-gray-100 rounded-xl'>
        <div className='w-5 h-5 text-xs items-center justify-center text-gray-500 border-2 border-gray-300 text-center rounded-full absolute top-0 right-0 bg-gray-100'>
          {props.quantity}
         </div>
        <Image
         width={200}
         height={200}
         className='w-20 h-20 rounded-lg' 
         src={props.pictureUrl}  
         alt={props.name}
         />
      </div>
      <div className='text-left'>
        <h6 className='text-base  font-semibold'>
          {props.name}
        </h6>
        <p className='text-xs text-gray-500 leading-tight tracking-tight'>
          {props.description}
        </p>

      </div>
      <p className='justify-center  text-xs font-medium'>${props.price}</p>
      <button onClick={props.deleteButton} className='w-16 h-5 p-3 text-center tracking-tighter absolute top-16 right-0 text-xs font-semibold items-center justify-center flex text-white rounded-md hover:bg-zinc-800 ease-out transition bg-black'>Remove</button>
    </div>
    );
}