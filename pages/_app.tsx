import '../styles/_main.scss';
import 'remixicon/fonts/remixicon.css';
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app';
import 'swiper/css';
import ProtectedRoute from '../components/safe/ProtectedRoute';
import {useRouter} from 'next/router';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {useEffect, useState} from 'react';
import {STRIPE_TEST_PROMISE} from '../config/api';
import {Elements} from '@stripe/react-stripe-js';
import AuthContextProvider from '../context/AuthContext';
import PlausibleProvider from 'next-plausible'

function MyApp({Component, pageProps}: AppProps) {
    const route = useRouter();
    const AuthRequired = [
        '/account/profile',
        '/booking',
        '/success/',
    ];

    const [queryClient] = useState(() => new QueryClient(
        {
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    retry: false,
                    staleTime: 0,
                }
            }
        }
    ));

    return (
        <PlausibleProvider domain="letsgoeurope.fr">
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Elements stripe={STRIPE_TEST_PROMISE}>
                        <Hydrate state={pageProps}>
                            {AuthRequired.includes(route.pathname) ? (
                                <Component {...pageProps} />
                            ) : (
                                <ProtectedRoute>
                                    <Component {...pageProps} />
                                    <ReactQueryDevtools initialIsOpen={false}/>
                                </ProtectedRoute>
                            )}
                        </Hydrate>
                        <ReactQueryDevtools/>
                    </Elements>
                </QueryClientProvider>
            </AuthContextProvider>
        </PlausibleProvider>
    );
}

export default MyApp;
