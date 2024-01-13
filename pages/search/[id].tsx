import ButtonRounded from '../../components/ui/ButtonRounded';
import EventCard from '../../components/ui/EventCard';
import Custom from '../../layout/Custom';
import {useSearchActivity} from '../../hooks';
import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';
import Link from "next/link";

const Id: FunctionComponent<any> = () => {
  const router = useRouter();
  const {filter} = router.query;

  const SearchActivity = useSearchActivity(filter);


  return (
    <Custom title={'search'}>
      <>
        <div className="flex flex-row flex-wrap justify-between gap-5">
          {SearchActivity &&
            SearchActivity.data?.map((activity: any, index: number) => {
              return (
                <Link href={`/detail/${activity.id}`} key={index}>
                  <a>
                    <EventCard
                      isLiked={false}
                      name={activity.name}
                      description={activity.description ? activity.description : ''}
                      image={activity.image}
                      width={270}
                      height={340}
                      key={index}
                    />
                  </a>
                </Link>
              );
            })}
        </div>

        <div className="flex gap-2 justify-center o-container--margin">
          <ButtonRounded color={'secondary'} isActive>
            <i className="ri-arrow-left-s-line" />
          </ButtonRounded>
          <ButtonRounded label={'1'} color={'grey-dark'} />
          <ButtonRounded label={'2'} />
          <ButtonRounded label={'3'} />
          <ButtonRounded label={'...'} />
          <ButtonRounded>
            <i className="ri-arrow-right-s-line" />
          </ButtonRounded>
        </div>
      </>
    </Custom>
  );
};

export default Id;
