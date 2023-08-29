import { FunctionComponent } from 'react';
import ReviewCardProps from '../../types/ReviewCardProps';

const ReviewCard: FunctionComponent<ReviewCardProps> = ({
	name,
	rating,
	description,
	image,
	key,
}) => {
	return (
		<div className="c-review-card" key={key}>
			<img src={`${image}`} alt="avatar" />
			<div className="c-review-card__content mt-3">
				<div>
					<h3 className="c-review-card__title">{name}</h3>
				</div>

				<div className="flex gap-x-2 mt-4">
					<i className="ri-star-fill" />
					<i className="ri-star-fill" />
					<i className="ri-star-fill" />
					<i className="ri-star-fill" />
					<i className="ri-star-line" />
				</div>

				<div>
					<p className="c-review-card__description mt-2">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
