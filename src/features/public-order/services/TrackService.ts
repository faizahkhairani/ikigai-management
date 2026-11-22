import { api } from '@/lib/api';
import type { TrackedOrder, TrackSearchQuery, TrackSearchResult } from '../types';

export const trackService = {
  getByToken: async (token: string): Promise<TrackedOrder> => {
    const { data } = await api.get(`/track/${token}`);
    return data.order;
  },

  search: async (
    query: TrackSearchQuery,
    page: number,
    pageSize: number
  ): Promise<TrackSearchResult> => {
    const { data } = await api.get('/track', { params: { ...query, page, pageSize } });
    return data;
  },
};