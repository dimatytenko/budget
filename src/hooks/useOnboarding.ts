import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/constants/routes';
import worthyCheckImg from '@/assets/images/worthy/worthy-check.png';
import worthyHandUpImg from '@/assets/images/worthy/worthy-hand-up.png';
import worthyLookImg from '@/assets/images/worthy/worthy-look.png';
import worthyTimeImg from '@/assets/images/worthy/worthy-time.png';

interface OnboardingSlide {
  title: string;
  description: string;
  image: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    title: 'Welcome to Worthy',
    description: 'Your smart shopping companion that helps you make confident financial decisions.',
    image: worthyHandUpImg,
  },
  {
    title: 'You want it, we analyze it',
    description:
      'Add any purchase you`re thinking about. Worthy will analyze how it fits into your financial life.',
    image: worthyLookImg,
  },
  {
    title: 'Take time to think',
    description:
      'Worthy encourages you to take a pause before buying with a reflection timer. Good decisions take time.',
    image: worthyTimeImg,
  },
  {
    title: "You're all set!",
    description:
      'You now have everything needed to manage your money mindfully. Let’s continue to your dashboard.',
    image: worthyCheckImg,
  },
];

const useOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = onboardingSlides.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const currentSlide = useMemo(() => onboardingSlides[currentStep - 1], [currentStep]);

  const goToStep = (step: number) => {
    const nextStep = Math.min(Math.max(1, step), totalSteps);
    setCurrentStep(nextStep);
  };

  const handleNext = () => {
    if (isLastStep) {
      navigate(routes.dashboard);
      return;
    }

    goToStep(currentStep + 1);
  };

  const handleBack = () => {
    if (isFirstStep) return;
    goToStep(currentStep - 1);
  };

  const handleSkip = () => {
    navigate(routes.dashboard);
  };

  return {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    currentSlide,
    goToStep,
    handleNext,
    handleBack,
    handleSkip,
  };
};

export default useOnboarding;
export type { OnboardingSlide };
