import { Logo, Button, StepProgress } from '@/ui-kit';

import styles from './Onboarding.module.scss';
import type { OnboardingSlide } from '@/hooks/useOnboarding';

interface OnboardingProps {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentSlide: OnboardingSlide;
  handleBack: () => void;
  handleNext: () => void;
  handleSkip: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  currentSlide,
  handleBack,
  handleNext,
  handleSkip,
}) => {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Logo />
        <Button variant="ghost" text="Skip" onClick={handleSkip} />
      </header>

      <div className={styles.content}>
        <div className={styles.content_text}>
          <h1 className={styles.title}>{currentSlide.title}</h1>
          <p className={styles.description}>{currentSlide.description}</p>

          <div className={styles.actions}>
            {!isFirstStep && (
              <Button
                variant="secondary"
                icon="ArrowLeftIcon"
                iconPosition="left"
                text="Back"
                onClick={handleBack}
              />
            )}
            <Button
              variant="primary"
              icon={'ArrowRightIcon'}
              text={isLastStep ? 'Go to dashboard' : isFirstStep ? 'Let`s get started' : 'Next'}
              onClick={handleNext}
            />
          </div>
        </div>

        <img className={styles.illustration} src={currentSlide.image} alt={currentSlide.title} />
      </div>

      <footer className={styles.footer}>
        <StepProgress current={currentStep} total={totalSteps} />
      </footer>
    </section>
  );
};

export default Onboarding;
