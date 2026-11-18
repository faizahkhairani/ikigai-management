import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';
import type { Order, OrderFilters } from '../types';

// Array kosong dibuat sekali di luar, biar referensinya stabil
const EMPTY_ORDERS: Order[] = [];

export const useOrders = (filters: OrderFilters, page: number, pageSize: number) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['orders', filters, page, pageSize], 
    queryFn: () => orderService.list(filters, page, pageSize),
    placeholderData: keepPreviousData,
  });

  return {
    orders: data?.orders ?? EMPTY_ORDERS,
    pagination: data?.pagination ?? null,
    isLoading,
    isFetching,
    error,
  };
};