import { FunctionComponent } from 'react';
import ReviewProps from '../../types/ReviewProps';

const Review: FunctionComponent<ReviewProps> = ({ title, rating }) => {
	return (
		<div className="c-review">
			<p>{title}</p>
			<hr />
			<span>{rating}.0</span>
		</div>
	);
};

export default Review;
