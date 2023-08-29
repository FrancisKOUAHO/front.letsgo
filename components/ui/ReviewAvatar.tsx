import { FunctionComponent } from 'react';
import ReviewAvatarProps from '../../types/ReviewAvatarProps';

const ReviewAvatar: FunctionComponent<ReviewAvatarProps> = ({
                                                              name,
                                                              description,
                                                              avatarUrl,
                                                              date,
                                                            }) => {
  return (
    <div className="c-review-avatar">
      <div className="flex items-center gap-2 c-review-content">
        <img className="c-review-content__image" src={avatarUrl} alt={name} />
        <div className="flex flex-col">
          <p className="u-medium-grey-text c-review-content__image__name">{name}</p>
          <p className="u-medium-grey-text">{date}</p>
        </div>
      </div>
      <p className="u-medium-grey-text mt-6">{description}</p>
    </div>
  );
};

export default ReviewAvatar;
