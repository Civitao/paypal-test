export async function createPaypalOrder() {

  fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
          'Authorization': 'Bearer 6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn3paCgRpdeMdVYmWzgbKSsECednupJ3Zx5Xd-g'
      },
      body: JSON.stringify({ "intent": "CAPTURE", "purchase_units": [ { "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b", "amount": { "currency_code": "USD", "value": "100.00" } } ], "payment_source": { "paypal": { "experience_context": { "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED", "payment_method_selected": "PAYPAL", "brand_name": "EXAMPLE INC", "locale": "en-US", "landing_page": "LOGIN", "shipping_preference": "SET_PROVIDED_ADDRESS", "user_action": "PAY_NOW", "return_url": "https://example.com/returnUrl", "cancel_url": "https://example.com/cancelUrl" } } } })
  });

}

export async function updatePaypalOrder() {

  fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer access_token6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn3paCgRpdeMdVYmWzgbKSsECednupJ3Zx5Xd-g'
      },
      body: JSON.stringify([ { "op": "replace", "path": "/purchase_units/@reference_id==PUHF/shipping/address", "value": { "address_line_1": "2211 N First Street", "address_line_2": "Building 17", "admin_area_2": "San Jose", "admin_area_1": "CA", "postal_code": "95131", "country_code": "US" } } ])
  });

}

export async function authorizeOrderPayment() {

const authorize = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T/authorize', {
    method: 'POST',
    headers: {
        'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': 'Bearer access_token6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn3paCgRpdeMdVYmWzgbKSsECednupJ3Zx5Xd-g'
    }
});
const response = await authorize.json()
console.log(response);




}