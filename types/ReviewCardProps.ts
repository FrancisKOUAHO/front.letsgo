type ReviewCardProps = {
	name?: string;
	rating?: number;
	description: string;
	user_id?: string;
	message?: string;
	activity_id?: string;
	image?: any;
	activities?: {
		image: string;
	};
	users?: {
		name: string;
		full_name: string;
	};
	key?: number;
};

export default ReviewCardProps;
