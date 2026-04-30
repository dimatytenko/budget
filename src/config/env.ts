function getEnvVariable(key: string, fallback = ''): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (typeof value === 'undefined') {
    // noop
    return fallback;
  }
  return value;
}

export const config = {
  apiBaseUrl: getEnvVariable('VITE_BASE_URL', 'http://localhost:3000'),
};
