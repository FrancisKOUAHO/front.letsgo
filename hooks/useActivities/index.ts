import {api} from "../../config/api";
import { useQuery } from '@tanstack/react-query';

const fetchActivities = async () => {
  const {data} = await api.get(`activities/get_activities`);

  return data;
};

const useActivities = () => {
  const {status, data, error, isFetching} = useQuery(
    ['activities'],
    async () => await fetchActivities()
  );

  return {status, data, error, isFetching};
};

const fetchActivityId = async (id: any) => {
  const {data} = await api.get(`activities/get_activity/${id}`)

  return data;
};

const fetchPopularActivities = async () => {
  const {data} = await api.get(`activities/get_activities/popular`);

  return data;
};

const usePopularActivities = () => {
  const {
    status,
    data,
    error,
    isFetching
  } = useQuery(['popularActivities'], async () => await fetchPopularActivities(), {
    cacheTime: 0,
  });

  return {status, data, error, isFetching};
};

const fetchBestActivities = async () => {
  const {data} = await api.get(`activities/get_activities/best`);

  return data;
};

const useBestActivities = () => {
  const {status, data, error, isFetching} = useQuery(['bestActivities'], async () => await fetchBestActivities(), {
    cacheTime: 0,
  });

  return {status, data, error, isFetching};
};

const useActivityId = (id: any) => {
  const {status, data, error, isFetching} = useQuery(['activity', id], async () => await fetchActivityId(id));

  return {status, data, error, isFetching};
};

const fetchSearchActivity = async (filter: any) => {
  const {data} = await api.post(`activities/filterActivity?filter=${filter}`);

  return data;
};

const fetchComingSoonActivities = async () => {
  const {data} = await api.get(`activities/get_activities/comingSoon`);

  return data;
};

const useComingSoonActivities = () => {
  const {
    status,
    data,
    error,
    isFetching
  } = useQuery(['comingSoonActivities'], async () => await fetchComingSoonActivities(), {
    cacheTime: 0,
  });

  return {status, data, error, isFetching};
};


const useSearchActivity = (filter: any) => {
  const {status, data, error, isFetching} = useQuery(['searchActivity', filter], () => fetchSearchActivity(filter));

  return {status, data, error, isFetching};
};

export {
  useActivities,
  fetchActivities,
  useActivityId,
  useSearchActivity,
  fetchSearchActivity,
  usePopularActivities,
  useBestActivities,
  useComingSoonActivities
};
