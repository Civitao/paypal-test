import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-m.sandbox.paypal.com'
})

export const baseUrl = 'https://api-m.sandbox.paypal.com'

