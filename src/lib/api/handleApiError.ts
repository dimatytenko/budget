import axios from 'axios';

/** Normalizes axios and generic errors into a user-facing message for form feedback. */
export const getApiErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const message = (err.response?.data as { message?: string })?.message || 'Request failed';
    return message;
  }

  if (err instanceof Error) return err.message;

  return 'Unknown error occurred';
};
