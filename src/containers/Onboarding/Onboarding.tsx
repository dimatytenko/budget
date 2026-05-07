import Onboarding from '@/components/Onboarding';
import useOnboarding from '@/hooks/useOnboarding';

const OnboardingPage = () => {
  const {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    currentSlide,
    handleBack,
    handleNext,
    handleSkip,
  } = useOnboarding();

  return (
    <Onboarding
      currentStep={currentStep}
      totalSteps={totalSteps}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      currentSlide={currentSlide}
      handleBack={handleBack}
      handleNext={handleNext}
      handleSkip={handleSkip}
    />
  );
};

export default OnboardingPage;
