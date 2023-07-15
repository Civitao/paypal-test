import { PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';

interface PaypalOrderProps {
  value: string;
}


export function PaypalButton({value}: PaypalOrderProps) {

  return (  
      <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        
                        value: `${value}`,
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
  );
}

