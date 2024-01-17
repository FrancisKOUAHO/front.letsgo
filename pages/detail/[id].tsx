import {FunctionComponent, useEffect, useState} from 'react';
import DatePickerButton from '../../components/ui/DatePickerButton';
import GoogleMapReact from 'google-map-react';
import EventCard from '../../components/ui/EventCard';
import Button from '../../components/ui/Button';
import {useRouter} from 'next/router';
import {getDateShort, getSelectedDays,} from '../../utils/dates';
import ReactModal from 'react-modal';
import Calendar from '../../components/ui/Calendar';
import {useReviewId} from '../../hooks';
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Layout from '../../layout/Layout';
import {api, baseUrl} from "../../config/api";
import {useAuth} from "../../context/AuthContext";
import Login from "../../components/form/Login";
import ReviewAvatar from '../../components/ui/ReviewAvatar';
import ReviewCard from "../../components/ui/ReviewCard";
import HeartIcon from '../../components/ui/icons/HeartIcon';
import ShareIcon from '../../components/ui/icons/ShareIcon';
import {sharePage} from '../../utils/browser';

type DayProps = {
    label: string;
    date: Date;
};

const AnyReactComponent: FunctionComponent<any> = ({text}: any) => <img src={text} alt="marker localication"
                                                                        width={25}/>;


const Index: FunctionComponent<any> = () => {
    const router = useRouter();
    const {id} = router.query


    const [selectedDays, setSelectedDays] = useState<DayProps[]>([]);
    const [selectedDate, setSelectedDate] = useState<number>(
        new Date().setHours(0, 0, 0, 0)
    );
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [availableDays, setAvailableDays] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    let ReviewId = useReviewId(id);
    let {data: reviews} = ReviewId;

    const Event = {
        title: 'Grosse teuf',
        isLiked: false,
    };

    const toggleLike = () => {
        Event.isLiked = !Event.isLiked;
    };

    const handleDateClick = (date: Date) => {
        setIsLoading(true);
        setSelectedDate(date.setHours(0, 0, 0, 0));
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleOpenCalendar = () => {
        setIsShowModal(true);
    };


    useEffect(() => {
        if (!!id) {
            api.get(`activities/get_activity/${id}`).then((res) => {
                setData(res.data);
                res.data.schedule.dates.map((day: any) => {
                    availableDays.push(day.date);
                });
            }).catch((err) => {
                console.log(Error(err.message));
            })
        }
    }, [id]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [selectedDays]);

    useEffect(() => {
        setSelectedDays(getSelectedDays(new Date()));

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [data, id, availableDays]);

    return (
        <Layout title={'detail'}>
            <>
                {
                    !!data && (
                        <>
                            <section className='o-container o-container--margin o-container--margin--reduce'
                                     title="images carousel">
                                <div className="grid grid-cols-3 gap-x-2">
                                    <div className="row-span-3 col-span-2">
                                        <EventCard
                                            isLiked={false}
                                            name={data.name}
                                            description={data.description ? data.description : ''}
                                            image={data.image}
                                            logo={data.image}
                                            key={data.id}
                                            price={data.price}
                                        />
                                    </div>
                                    <div className="h-[260px]">
                                        <EventCard
                                            isLiked={false}
                                            name={data.name}
                                            description={data.description ? data.description : ''}
                                            image={data.image}
                                            logo={data.image}
                                            key={data.id}
                                            price={data.price}
                                        />
                                    </div>
                                    <div className="h-[260px] mt-1">
                                        <EventCard
                                            isLiked={false}
                                            name={data.name}
                                            description={data.description ? data.description : ''}
                                            image={data.image}
                                            logo={data.image}
                                            key={data.id}
                                            price={data.price}
                                        />
                                    </div>
                                </div>
                            </section>
                            <section className='o-container o-container--margin'>
                                <div className='max-w-4xl'>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <h1>{data.name}</h1>
                                            <p className="u-medium-grey-text">{data.description}</p>
                                        </div>
                                        <div className="flex gap-x-2">
                                            <button onClick={toggleLike}>
                                                <HeartIcon liked={Event.isLiked}/>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    sharePage(Event.title, Event.title, document.location.href)
                                                }
                                            >
                                                <ShareIcon/>
                                            </button>
                                        </div>
                                    </div>
                                    <span className="mt-6 block text-[14px]">Selectionner une date</span>
                                    <div className="c-date-selector mt-2">
                                        {selectedDays && (
                                            selectedDays
                                                .slice(0, windowWidth / 90)
                                                .map((day, index) => {
                                                    return (
                                                        <DatePickerButton
                                                            key={index}
                                                            label={day.label}
                                                            date={day.date}
                                                            isFirst={index === 0}
                                                            isSelected={day.date.setHours(0, 0, 0, 0) === selectedDate}
                                                            isDisabled={!availableDays.includes(getDateShort(day.date))}
                                                            onClick={() => {
                                                                handleDateClick(day.date)
                                                            }}
                                                        />
                                                    )
                                                }))
                                        }
                                        <button className="c-open-calendar" onClick={handleOpenCalendar}>
                     <span className="c-open-calendar__icon">
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="currentColor"
                     >
                          <path
                              d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                          <path
                              fillRule="evenodd"
                              d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                              clipRule="evenodd"
                          />
                     </svg>
                 </span>
                                            <span className="c-open-calendar__label">Toutes les dates</span>
                                        </button>
                                    </div>
                                    {selectedDate && !isLoading ? (
                                        <div className='c-ticket-card mt-8'>
                                            <img
                                                className='c-ticket-card__image'
                                                src={data.image}
                                                alt={data.name}
                                                onError={(e: any) => {
                                                    e.target.src = `${baseUrl}${data.image}`;
                                                }}
                                            />
                                            <div className='c-ticket-card__content'>
                                                <div className='flex items-center justify-between gap-x-2 w-full'>
                                                    <span className='c-ticket-card__tag'>Visite guidée</span>
                                                    <div className='c-ticket-card__avis'>
                                                        <svg className='c-ticket-card__avis__icon'
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 24 24">
                                                            <path fillRule="evenodd"
                                                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                        <span className='c-ticket-card__avis__note'>3.75 / 5</span>
                                                    </div>
                                                </div>
                                                <h3 className='c-ticket-card__title'>{data.name}</h3>
                                                <p className='c-ticket-card__description'>{data.description}</p>
                                                <div className='c-ticket-card__reservation'>
                                                    <span
                                                        className='c-ticket-card__reservation__price'>{data.price + '€'}</span>
                                                    <Button color={'primary'} isActive={true} onClick={() => {
                                                        let convertTimestamp = new Date(selectedDate);
                                                        let date = `${convertTimestamp.getMonth() + 1}-${convertTimestamp.getDate()}-${convertTimestamp.getFullYear()}`
                                                        router.push(`/checkout/${data.id}?date=${date}`)
                                                    }}>
                                                        Réserver
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <LoadingSpinner/>}
                                    <ReactModal
                                        isOpen={isShowModal}
                                        contentLabel="Modal showing calendar to choose a date"
                                        shouldCloseOnOverlayClick={true}
                                        onRequestClose={() => setIsShowModal(false)}
                                        ariaHideApp={false}
                                        portalClassName={'c-modal'}
                                        overlayClassName={'c-modal__overlay'}
                                        className={'c-modal__content'}
                                        bodyOpenClassName={'has-modal-open'}
                                        closeTimeoutMS={80}
                                    >
                                        <Calendar
                                            initialDate={new Date(selectedDate)}
                                            availableDays={availableDays}
                                            onHideModal={() => setIsShowModal(false)}
                                            setActiveDay={(value: Date) => {
                                                setSelectedDays(getSelectedDays(value));
                                                setSelectedDate(value.setHours(0, 0, 0, 0));
                                            }}
                                        />
                                    </ReactModal>
                                </div>
                            </section>
                            <section className='o-container o-container--margin'>
                                <div className='max-w-4xl'>
                                    <h1>Détails de l'événement</h1>
                                    <p className="mt-6">
                                        {data.description}
                                    </p>
                                    <p className="mt-4">
                                        {data.programme}
                                    </p>
                                    <p className="mt-4">
                                        {data.practical_information}
                                    </p>
                                    <div className='mt-4' style={{height: '426px', width: '100%'}}>
                                        <GoogleMapReact
                                            bootstrapURLKeys={{key: 'AIzaSyDNq5N5k_7ooYaHhKK3eKjVuYZGDpoTUo8'}}
                                            defaultCenter={{
                                                lat: data.latitude,
                                                lng: data.longitude,
                                            }}
                                            defaultZoom={15}
                                        >
                                            <AnyReactComponent
                                                lat={data.latitude}
                                                lng={data.longitude}
                                                text="/marker.png"
                                            />
                                        </GoogleMapReact>
                                    </div>
                                </div>
                            </section>
                            <section className='o-container o-container--margin'>
                                <div className='max-w-4xl'>
                                    <h1>Avis récents</h1>
                                    <div className="o-container--margin">
                                        <div className="flex gap-10 justify-center flex-wrap">
                                            {reviews ? reviews.data.map(
                                                    (
                                                        review: {
                                                            user_id: string;
                                                            message: string;
                                                            image: string;
                                                            users: {
                                                                name: string;
                                                                full_name: string;
                                                            };
                                                        },
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <ReviewCard
                                                                key={index}
                                                                description={review?.message}
                                                                name={review?.users.full_name}
                                                                image={review?.image}
                                                            />
                                                        );
                                                    }
                                                )
                                                : 'Aucun avis pour cet événement'}
                                        </div>
                                        <div className="o-container--margin">
                                            <div className="flex gap-2">
                                                <h1>Reviews</h1>
                                                <i className="ri-star-fill ri-2x mt-[5px] text-[#484848]"/>
                                                <p className="text-3xl mt-[5px] text-[#484848]">5.0</p>
                                            </div>

                                            <div className="flex flex-wrap gap-5 mt-6">
                                                <ReviewAvatar
                                                    avatarUrl={
                                                        'https://www.edigitalagency.com.au/wp-content/uploads/Twitter-logo-png.png'
                                                    }
                                                    date={'Mar 12 2020'}
                                                    description={
                                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                                    }
                                                    name={'John Doberman'}
                                                />
                                            </div>

                                            <div className="mt-20">
                                                <Button isActive={true} onClick={() => console.log('RRR')}>
                                                    Afficher tous les 5 avis
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <Login closeModal={closeModal} isOpen={isOpen}/>
                        </>
                    )
                }
            </>
        </Layout>
    );
};

export default Index;
