import axios from 'axios';

export const getApiErrorMessage = (err: unknown): string => {
  console.log('err', err);
  if (axios.isAxiosError(err)) {
    const message = (err.response?.data as { message?: string })?.message || 'Request failed';
    return message;
  }

  if (err instanceof Error) return err.message;

  return 'Unknown error occurred';
};
