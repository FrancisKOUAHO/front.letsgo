import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import 'dotenv/config'


export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export const baseUrl = `${process.env.NEXT_PUBLIC_API_UPLOAD_URL}`;

export const STRIPE_PUBLIC_KEY = `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`;

export const STRIPE_TEST_PROMISE = loadStripe(STRIPE_PUBLIC_KEY);
