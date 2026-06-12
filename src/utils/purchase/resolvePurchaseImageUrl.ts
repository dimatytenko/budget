import { config } from '@/config/env';

/** Turns API-relative image paths into absolute URLs using the API origin from config. */
export const resolvePurchaseImageUrl = (imageUrl: string | null): string | null => {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  const apiOrigin = config.apiBaseUrl.replace(/\/api\/?$/, '');

  return `${apiOrigin}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};
