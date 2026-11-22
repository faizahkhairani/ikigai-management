import { useQuery } from '@tanstack/react-query';
import { trackService } from '../services/TrackService';
import type { TrackSearchQuery, TrackedOrderSummary } from '../types';

const EMPTY_ORDERS: TrackedOrderSummary[] = [];

export const useTrackSearch = (
  query: TrackSearchQuery | null,
  page: number,
  pageSize: number
) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['track-search', query, page, pageSize],
    queryFn: () => trackService.search(query as TrackSearchQuery, page, pageSize),
    enabled: !!query, // belum ada yang dicari = jangan fetch
  });

  return {
    orders: data?.orders ?? EMPTY_ORDERS,
    pagination: data?.pagination ?? null,
    isLoading,
    isFetching,
    error,
  };
};