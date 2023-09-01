import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const baseUrl = `${process.env.REACT_APP_API_UPLOAD_URL}`;

export const STRIPE_PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`;

export const STRIPE_TEST_PROMISE = loadStripe(STRIPE_PUBLIC_KEY);
