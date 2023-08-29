import {api} from "../../config/api";
import { useQuery } from '@tanstack/react-query';

const fetchReviews = async () => {
	const { data } = await api.get('avis/create_avis');
	return data;
};

const useReviews = () => {
	const { status, data, error, isFetching } = useQuery(
		['reviews'],
		fetchReviews
	);

	return { status, data, error, isFetching };
};

const fetchReviewId = (id: any) => {
	return api.get(`avis/get_avis/${id}`);
};

const useReviewId = (id: any) => {
	return useQuery(['review', id], () => fetchReviewId(id));
};

export { fetchReviews, useReviews, useReviewId };
