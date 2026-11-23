import { useMutation } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';

// Tanggal lokal (bukan UTC), cadangan kalau header nama file nggak kebaca
const todayStamp = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const triggerDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const useExportOrders = () =>
  useMutation({
    mutationFn: async () => {
      const { blob, filename } = await orderService.exportBackup();
      triggerDownload(blob, filename ?? `ikigai-backup-${todayStamp()}.xlsx`);
    },
  });
