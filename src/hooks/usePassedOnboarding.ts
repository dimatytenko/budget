import { useCallback } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';

const PASSED_ONBOARDING_KEY = 'worthy:isPassedOnboarding';

export const usePassedOnboarding = () => {
  const [isPassedOnboarding, setPassed] = useLocalStorage(PASSED_ONBOARDING_KEY, false);

  const markPassedOnboarding = useCallback(() => {
    setPassed(true);
  }, [setPassed]);

  return { isPassedOnboarding, markPassedOnboarding };
};
