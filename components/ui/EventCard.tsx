import {FunctionComponent, useState} from 'react';
import EventCardProps from '../../types/EventCardProps';
import {baseUrl} from "../../config/api";

const EventCard: FunctionComponent<EventCardProps> = ({
                                                        id,
                                                        isLiked,
                                                        name,
                                                        width,
                                                        height,
                                                        description,
                                                        image,
                                                        logo,
                                                        distance,
                                                        price,
                                                        index,
}) => {
  const [liked, setLiked] = useState(isLiked);

  return (

    <div
      className="c-eventcard"
      key={index}
    >
      <img
        className="c-eventcard__image"
        src={image}
        alt="Picture of the author"
        onError={(e: any) => {
          e.target.src = `${baseUrl}${image}`;
        }}

        width={width}
        height={height}
      />
      {/*<button onClick={() => setLiked(!liked)} className="c-eventcard__like">
        <HeartIcon liked={liked}/>
      </button>*/}z
      <div className="content">
        <div className="content__block--left">
          <span className="content__logo">
                <img
                  src={logo}
                  alt="Picture of the author"
                  onError={(e: any) => {
                    e.target.src = `${baseUrl}${logo}`;
                  }}
                />
            </span>
          <span className="content__title">{name?.substring(0, 33)}</span>
          <span className="content__description">{description?.substring(0, 55) + '...'}</span>
        </div>
        <div className="content__block--right">
          {/*<i className="content__pin ri-map-pin-2-fill" />*/}
          {/*<span className="content__distance">{distance} km</span>*/}
          <span className="content__distance">{price + '€'}</span>
        </div>
      </div>
    </div>

  );
};

export default EventCard;
