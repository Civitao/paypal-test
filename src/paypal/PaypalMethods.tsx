import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { baseUrl } from '../utils/api';
import { randomUUID } from 'crypto';
const [clientId, secretKey] = [
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, 
  process.env.NEXT_PUBLIC_PAYPAL_SECRET_KEY!
]

export async function createPaypalToken() {
    const response = await fetch(baseUrl + "/v1/oauth2/token", {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: 
        "Basic " + Buffer.from(clientId + ":" + secretKey).toString("base64"),   
      }
    });
    const data = await response.json()
    return data.access_token;

}   

  

export async function createOrder() {

  const accessToken = await createPaypalToken();
  
  const response = await axios({
    url: baseUrl + "/v2/checkout/orders",
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  
    data: {
      intent: "CAPTURE",
      purchase_units: [
        { 
          items: [
          {
              name: "T-Shirt",
              description: "Green XL",
              quantity: "1",
              unit_amount: {
                  currency_code: "USD",
                  value: "100.00"
              }
          }
      ],
          amount: {
            currency_code: "USD",
            value: "100.00",
            breakdown: {
              item_total: {
                  currency_code: "USD",
                  value: "100.00"
              }
          }
          }
        },
        
      ],
      application_context: {
        return_url: "https://example.com/return",
        cancel_url: "https://example.com/cancel"
    },
    }
  });

  const data = response.data;
  console.log(data);
  return data;

}

export async function createPaypalOrder() {
  let order = await createOrder();
  const response = authorizeOrderPayment(order.id)
  console.log(response);

  return response;
}

export async function capturePayment(orderId: string) {
  const accessToken = await createPaypalToken();
  const response = await axios({
    url: baseUrl + `/v2/checkout/orders/${orderId}/capture`,
    method: "post",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "PayPal-Request-Id": uuidv4(),
    },
  });


  console.log(response);
  return response;
  }



export async function authorizeOrderPayment(orderId: string) {
  const accessToken = await createPaypalToken();

const authorize = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/authorize`, {
    method: 'POST',
    headers: {
        'PayPal-Request-Id': uuidv4(),
        'Authorization': `Bearer ${accessToken}`
    }
});
const response = await authorize.json()
console.log(response);
alert(response.message);
return response




}