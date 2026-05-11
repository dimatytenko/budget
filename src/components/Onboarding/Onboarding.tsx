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
      </header>

      <div className={styles.content}>
        <div className={styles.content_inner}>
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
              text={isLastStep ? 'Go to dashboard' : isFirstStep ? 'Try it FREE' : 'Next'}
              onClick={handleNext}
              className={styles.next_button}
            />
          </div>
          <div className={styles.progress_wrapper}>
            <StepProgress current={currentStep} total={totalSteps} />
            {!isLastStep && <Button variant="ghost" text="Skip" onClick={handleSkip} />}
          </div>
        </div>

        <img className={styles.illustration} src={currentSlide.image} alt={currentSlide.title} />
      </div>
      {isLastStep && (
        <p className={styles.last_step_description}>Let’s make every decision a worthy one. 💚</p>
      )}
    </section>
  );
};

export default Onboarding;
