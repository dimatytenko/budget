import Cookies from 'js-cookie';

export const COOKIES = {
  TOKEN_ID: 'token_id',
};

export const getToken = (): string | undefined => {
  return Cookies.get(COOKIES.TOKEN_ID);
};

export const setToken = (token?: string, expires: number = 30): void => {
  if (!token) {
    Cookies.remove(COOKIES.TOKEN_ID);
    return;
  }
  Cookies.set(COOKIES.TOKEN_ID, token, { expires });
};
