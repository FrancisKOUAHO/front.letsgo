import '../styles/_main.scss';
import 'remixicon/fonts/remixicon.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import ProtectedRoute from '../components/safe/ProtectedRoute';
import {useRouter} from 'next/router';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {useState} from 'react';
import {STRIPE_TEST_PROMISE} from '../config/api';
import {Elements} from '@stripe/react-stripe-js';
import AuthContextProvider from '../context/AuthContext';
import PlausibleProvider from 'next-plausible'

const MyApp = ({Component, pageProps}: any) => {
    const route = useRouter();
    const AuthRequired = [''];

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
                            {!AuthRequired.includes(route.pathname) ? (
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
