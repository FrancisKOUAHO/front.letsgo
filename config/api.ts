import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import 'dotenv/config'


export const api = axios.create({
    baseURL: "https://backendletsgo-preproduction.up.railway.app/api/v1/",
    //baseURL: "http://127.0.0.1:3333/api/v1/",
});

export const baseUrl = "https://backendletsgo-preproduction.up.railway.app/uploads/";
//export const baseUrl = "http://127.0.0.1:3333/uploads/";

export const STRIPE_PUBLIC_KEY = "pk_test_51MdvGWEkovoeS1CWWQk30YnyudXkuXtJ4l1n3CKDmDAn1E5hG66vzrQQR9vqBssaEook290zHYOLAFTydDzm8ODw00UO7ivtC8";

export const STRIPE_TEST_PROMISE = loadStripe(STRIPE_PUBLIC_KEY);
