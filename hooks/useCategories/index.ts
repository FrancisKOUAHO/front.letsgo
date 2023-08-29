import { useQuery } from '@tanstack/react-query';
import {api} from "../../config/api";

const fetchCategories = async () => {
	const { data } = await api.get('categories/get_categories');
	return data;
};

const useCategories = () => {
	const { status, data, error, isFetching } = useQuery(
		['categories'],
		fetchCategories
	);

	return { status, data, error, isFetching };
};

export { fetchCategories, useCategories };
