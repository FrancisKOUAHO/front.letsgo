import Layout from '../../layout/Layout';
import React, {useEffect, useState} from 'react';
import Button from '../../components/ui/Button';
import BookingYourDetail from '../../components/checkout/BookingYourDetail';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {Disclosure} from '@headlessui/react';
import {useRouter} from "next/router";
import {getDateLong} from "../../utils/dates";
import Select from "react-select";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {api} from '../../config/api';
import {useAuth} from '../../context/AuthContext';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const {id, date} = router.query;
    const {user} = useAuth();

    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(0);
    const [arrayOfHour, setArrayOfHour] = useState<any>([])
    const [bookingDetail, setBookingDetail] = useState<any>(null);
    const [reservation, setReservation] = useState<any>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingStripe, setLoadingStripe] = useState(false);
    const [message, setMessage] = useState('');
    const [data, setData] = useState<any>(null);
    const [activityId, setActivityId] = useState<any>(null);

    let getDate = getDateLong(date).toDateString();
    let dateR = getDate.split(' ');

    const options = [
        {value: '1', label: '1'},
    ]

    let price = `${selectedOption && selectedOption.value * Number(data.price.replace('&nbsp;', '').replace('€', ''))}`

    const handleSendCustomer = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataForm = Object.fromEntries(formData.entries());

        const reservation = await api.post('reservations/create_reservation', {
            full_name: dataForm.firstName + ' ' + dataForm.lastName,
            email: dataForm.email,
            phone: dataForm.phone,
            activity_id: activityId,
            number_of_places: selectedOption.value,
            time_of_session: selected,
            status: 'pending',
            date_of_session: date,
            total_price: price,
        })


        if (reservation.status === 200) {
            setReservation(reservation.data);
            setStep(3);
        } else {
            setMessage('Une erreur est survenue');
            setError(true);
        }
    }

    const handlePayment = async (event: { preventDefault: () => void; }) => {
        try {
            setLoadingStripe(true);
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }

            const cardElement = elements.getElement(CardElement);

            if (cardElement) {
                const {error, paymentMethod} = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: bookingDetail.firstName + ' ' + bookingDetail.lastName,
                        email: bookingDetail.email,
                        phone: bookingDetail.phone,
                    }
                });

                if (!error) {
                    const {id} = paymentMethod;
                    const response = await api.post('payments/create_payment', {
                        payment_method_id: id,
                        reservation_id: reservation.reservation.id,
                        amount: price,
                        currency: 'eur',
                        description: 'Paiement de la réservation',
                        customer_id: user.id ? user.id : null,
                    })

                    if (response.status === 200) {
                        setSuccess(true);
                        setLoadingStripe(false);
                        setLoading(false);
                        await router.push(`/success/A=${id}R=${reservation.reservation.id}C=${user.id ? user.id : null}`)
                        toast('Votre paiement a été effectué avec succès', {
                            position: toast.POSITION.BOTTOM_CENTER,
                            type: 'success'
                        });
                    } else {
                        setError(true);
                        toast('Désolé, votre paiement n\'a pas pu être traité pour le moment. Veuillez vérifier les détails de votre carte et réessayer ultérieurement.', {
                            position: toast.POSITION.BOTTOM_CENTER,
                            type: 'error'
                        });
                        setLoadingStripe(false);
                        setLoading(false);
                    }

                } else {
                    setError(true);
                    toast('Désolé, votre paiement n\'a pas pu être traité pour le moment. Veuillez vérifier les détails de votre carte et réessayer ultérieurement.', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        type: 'error'
                    });
                    setLoadingStripe(false);
                    setLoading(false);
                }
            }

        } catch (e: any) {
            setError(true);
            toast('Désolé, votre paiement n\'a pas pu être traité pour le moment. Veuillez vérifier les détails de votre carte et réessayer ultérieurement.', {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error'
            });
            setLoadingStripe(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!!id) {
            setActivityId(id);
            api.get(`activities/get_activity/${id}`).then((res) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [id]);

    useEffect(() => {
        const progress = document.getElementById('progress');
        const next: any = document.getElementById('next');
        const steps = document.querySelectorAll('.step');

        if (progress && next && steps) {
            if (step === 1) {
                progress.style.width = '33%';
                steps[0].classList.add('active');
                next.disabled = false;
            } else if (step === 2) {
                progress.style.width = '66%';
                steps[1].classList.add('active');
                next.disabled = false;
            } else if (step === 3) {
                progress.style.width = '100%';
                steps[2].classList.add('active');
                next.disabled = true;
            }
        }
    }, [step]);

    useEffect(() => {
        if (data && date) {
            let filterHours = data.schedule.dates.filter((item: any) => item.date === date);
            if (filterHours) {
                setArrayOfHour(filterHours[0].hours)
            }
        }
    }, [date, data])


    const switchToCheckout = (arg: number) => {
        switch (arg) {
            case 1:
                return (
                    <>
                        {
                            !!data && (
                                <>
                                    <div className="o-box">
                                        <div className="flex gap-2 justify-between">
                                            <h1 className="text-[17px]">
                                                {data.name}
                                            </h1>
                                            <img
                                                className={`h-auto w-[100px] object-cover rounded-lg`}
                                                src={data.image}
                                                alt=""
                                            />
                                        </div>
                                        <p className="text-[16px]">Paris, France</p>
                                    </div>
                                    <h2 className="text-[22px] mt-6">Quelle heure ?</h2>
                                    <div className='max-w-md'>
                                        <div
                                            className="mt-4 flex gap-4 w-full"
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))'
                                            }}
                                        >
                                            {
                                                !!arrayOfHour && arrayOfHour.map((hour: any, index: any) => {
                                                    return (
                                                        <Button
                                                            key={index}
                                                            color={'secondary'}
                                                            isActive={selected === hour}
                                                            onClick={() => setSelected(hour)}
                                                        >
                                                            {hour}
                                                        </Button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <h2 className="text-[22px] mt-6">Sélectionnez vos billets</h2>
                                    <div className="o-box mt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className='font-semibold'>Adulte(s) (18+) </span>
                                                <span className='mt-1'>{data.price + '€'}</span>
                                            </div>
                                            <div>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                );
            case 2:
                return <BookingYourDetail handleSendCustomer={handleSendCustomer} setStep={setStep}
                                          selected={selected}/>;
            case 3:
                return (<div className="w-full h-full">
                    <h1 className="text-[29px]">Comment voulez-vous payer ?</h1>
                    <p className="mt-4 text-[16px]">
                        Nous avons sécurisé vos billets. Pour recevoir vos billets, veuillez
                        effectuer votre paiement dès que possible via l'une de nos méthodes de
                        paiement sécurisées.
                    </p>

                    <p className="mt-4 text-[16px]">
                        Time left to complete your payment: <span>26 minutes</span>
                    </p>

                    <h2 className="mt-10 text-[19px]">Sélectionnez un mode de paiement</h2>

                    {
                        loading ? <LoadingSpinner/> : (
                            <div className="w-full mt-4">
                                <div
                                    className="w-full max-w-md rounded-2xl bg-white p-2 "
                                    style={{border: '1px solid #4376FF'}}
                                >
                                    <Disclosure>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button className="flex flex-col w-full">
                                                    <div
                                                        className="flex justify-between w-full rounded-lg bg-[#4376FF] px-4 py-2 text-left text-sm font-medium text-white">
                                                        <span className="text-[17px]">Carte de crédit</span>
                                                        <i
                                                            className={`ri-bank-card-fill ri-2x h-5 w-5 text-white`}
                                                        />
                                                    </div>
                                                    <ul className="mt-4 w-full flex justify-around">
                                                        <li><i className="ri-visa-line text-blue-600"/></li>
                                                        <li><i className="ri-mastercard-line text-orange-500"/></li>
                                                        <li><i className="ri-paypal-line text-blue-500"/></li>
                                                        <li><i className="ri-alipay-line text-blue-700"/></li>
                                                        <li><i className="ri-secure-payment-line text-green-600"/></li>
                                                    </ul>
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="p-2">
                                                    <form onSubmit={handlePayment}>
                                                        <CardElement className='mt-6'/>
                                                        {
                                                            loadingStripe ? <LoadingSpinner/> : (
                                                                <button
                                                                    className={`mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4376fe] hover:bg-[#4376fe] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4376fe] ring-[#4376fe]`}>
                                                                    Procéder au paiement
                                                                </button>
                                                            )
                                                        }
                                                    </form>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            </div>
                        )
                    }
                </div>);
            default:
                return 'Error';
        }
    };


    return (
        <Layout title="Checkout">
            <>
                {
                    !!data && (
                        <section className='o-container o-container--margin o-container--margin--reduce'>
                            <div className="container">
                                <div className="progress-wrap">
                                    <div className="progress" id="progress"></div>
                                    <div className="step active cursor-pointer" onClick={() => setStep(1)}>1</div>
                                    <div className="step cursor-pointer" onClick={() => {
                                        if (step > 1) setStep(2)
                                    }}>2
                                    </div>
                                    <div className="step cursor-pointer" onClick={() => {
                                        if (step > 2) setStep(3)
                                    }}>3
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs">
                                    <div>Détails de la réservation</div>
                                    <div>Vos coordonnées</div>
                                    <div>Paiement</div>
                                </div>
                            </div>

                            <div className="mt-12 flex gap-10 justify-between flex-wrap">
                                <div className='c-checkout-content grow-[9999] shrink basis-[400px]'>
                                    {switchToCheckout(step)}
                                </div>
                                <div className='c-checkout-recap grow shrink basis-[360px]'>
                                    <h3>Aperçu de vos billets</h3>
                                    <div className='sticky top-0'>
                                        <div className='c-details o-box mt-4'>
                                            <div className='flex items-start gap-x-4'>
                                                <p className='flex-1 mb-4'>Louvre Museum: Skip The Line + Guided Tour in
                                                    English</p>
                                                <img className='c-details__pic w-full h-full object-cover rounded-lg'
                                                     src={data.image}
                                                     alt=""/>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <i className="ri-calendar-2-line ri-l"/>
                                                <time
                                                    className="text-sm ml-2">{dateR ? `${dateR[0]}, ${dateR[2]} ${dateR[1]} ${dateR[3]}` : ""}</time>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <i className="ri-time-line ri-l"/>
                                                <time className="text-sm ml-2">{selected}</time>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <i className="ri-checkbox-circle-line ri-l"/>
                                                <time className="text-sm ml-2">Annulation gratuite</time>
                                            </div>
                                            <span className='c-details__separator mt-4 mb-4'/>
                                            <div className="flex justify-between items-center mt-2">
                                                <span>Prix</span>
                                                <span>{price}€</span>
                                            </div>
                                        </div>
                                        {step === 3 && (
                                            <>
                                                <hr className="ml-auto mr-auto mt-4 w-[90%] mb-6"/>
                                                <h3>Vos coordonnées</h3>
                                                {
                                                    !!bookingDetail && (
                                                        <div className="mt-6 bg-white rounded-lg shadow-lg p-4 sticky top-0">
                                                            <div
                                                                className="mt-2 font-bold">{`${bookingDetail.firstName} ${bookingDetail.lastName} `}</div>
                                                            <div className="mt-2">{`${bookingDetail.email}`}</div>
                                                            <div className="mt-2">{`${bookingDetail.phone}`}</div>
                                                            <div className="mt-2">{`${bookingDetail.invite_name}`}</div>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )}
                                        <div className="c-total o-box mt-4">
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="u-fw-700">Prix total</span>
                                                <span>{price}€</span>
                                            </div>
                                            <div className="mt-4" id="next">
                                                {step === 1 && (<Button
                                                    color={'primary'}
                                                    isActive={true}
                                                    w='full'
                                                    onClick={() => {
                                                        setStep(2)
                                                    }}
                                                >Passez à l'étape suivante</Button>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }
                <ToastContainer/>
            </>
        </Layout>
    );
};

export default Checkout;
