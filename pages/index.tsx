import type {NextPage} from 'next';
import Slider from '../components/ui/Slider';
import UpComingCard from '../components/ui/UpComingCard';
import {useEffect, useState} from 'react';
import {useBestActivities, useComingSoonActivities, usePopularActivities} from '../hooks';
import Custom from '../layout/Custom';
import EventCard from "../components/ui/EventCard";
import Link from 'next/link';
import {api} from "../config/api";
import {useAuth} from "../context/AuthContext";

const Accueil: NextPage = () => {
  const {geolocation} = useAuth()
  const {data: comingSoons} = useComingSoonActivities();
  const {data: populars} = usePopularActivities();
  const {data: bests} = useBestActivities();
  const [activities, setActivities] = useState<any>(null);

  const fetchOneActivity = async () => {
    const res = await api.get(`publications/pubOne/0ff67922-04cd-4640-810b-c7cf5e35ccc0`).then(res => {
      setActivities(res.data);
    })
  };

  useEffect(() => {
    fetchOneActivity();
  }, []);

  return (
    <Custom title={'Accueil'}>
      <>
        <section
          className="o-container o-container--margin"
          title="Best events to visit around"
        >
          <h2 className="separator"> Activités les plus populaires </h2>
          <div className="flex flex-wrap gap-4">
            {
              populars && populars.map((activity: any, index: any) => {
                return (
                  <>
                    <Link href={`/detail/${activity.id}`} key={index}>
                      <a>
                        <div className="w-[275px] h-[340px]" key={index}>
                          <EventCard
                            name={activity.name}
                            description={activity.description ? activity.description : ''}
                            logo={activity.image}
                            price={activity.price}
                            isLiked={activity.isLiked}
                            image={activity.image}
                          />
                        </div>
                      </a>
                    </Link>
                  </>
                )
              })
            }
          </div>
        </section>

        {
          geolocation && (
            <section
              className="o-container o-container--margin"
              title="Best events to visit around"
            >
              <h2 className="separator"> Activités proche de vous </h2>
              <div className="flex flex-wrap gap-4">
                {
                  geolocation.usersActivity.map((activity: any, index: any) => {
                    return (
                        <Link href={`/detail/${activity.id}`} key={index}>
                          <a>
                            <div className="w-[275px] h-[340px]" key={index}>
                              <EventCard
                                name={activity.name}
                                description={activity.description ? activity.description : ''}
                                logo={activity.image}
                                price={activity.price}
                                isLiked={activity.isLiked}
                                image={activity.image}
                              />
                            </div>
                          </a>
                        </Link>
                    )
                  })
                }
              </div>
            </section>
          )
        }

        <section
          className="o-container o-container--margin"
          title="Best events to visit around"
        >
          <h2 className="separator">Meilleurs évènements autour de vous</h2>
          <Slider cards={bests}/>
        </section>

        <section
          className="o-container o-container--margin"
          title="Best events to visit around"
        >
          {
            activities && (
              <UpComingCard
                coverImage={activities.image}
                title={activities.name}
                description={activities.description ? activities.description : ''}
                label={'Evénement à venir'}
                secondLabel={'Définir le rappel maintenant'}
              />
            )
          }
        </section>

        <section
          className="o-container o-container--margin"
          title="Best events to visit around"
        >
          <h2 className="separator">Événements à venir autour de vous</h2>
          <Slider cards={comingSoons}/>
        </section>
      </>
    </Custom>
  );
};

export default Accueil;
