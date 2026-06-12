function getEnvVariable(key: string, fallback = ''): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (typeof value === 'undefined') {
    // noop
    return fallback;
  }
  return value;
}

// Falls back to localhost when VITE_BASE_URL is unset. Set it in `.env` and restart `npm run dev` — Vite only reads env on server start.
export const config = {
  apiBaseUrl: getEnvVariable('VITE_BASE_URL', 'http://localhost:3000'),
};
