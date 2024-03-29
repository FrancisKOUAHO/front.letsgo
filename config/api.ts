import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import 'dotenv/config'


export const api = axios.create({
    baseURL: "https://api.letsgoeurope.fr/api/v1/",
    //baseURL: "http://127.0.0.1:3333/api/v1/",
});

export const baseUrl = "https://api.letsgoeurope.fr/uploads/";
//export const baseUrl = "http://127.0.0.1:3333/uploads/";

export const STRIPE_PUBLIC_KEY = "pk_live_51MdvGWEkovoeS1CWUCORErQT2jSzP99IG1psfPDIZq7KwAKefiDztQuUsaa3fYDz5TiKO7v5VtSbfAQTDZ36MIxF00gngPuV0x";
//export const STRIPE_PUBLIC_KEY = "pk_test_51HwcPhKYGE5dRt9idxqGRsQgRwPQ78zHXD9N6cfWcC77owBiEJFH7r7d4sI0nfLnLj9U9gRMTr1bzQbSLgnasBMa00MHGpiTx5";


export const STRIPE_TEST_PROMISE = loadStripe(STRIPE_PUBLIC_KEY);
