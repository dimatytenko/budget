import clsx from 'clsx';
import { useId, useState } from 'react';

import styles from './QuantityStepper.module.scss';

interface QuantityStepperProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
}

const clamp = (value: number, min: number, max?: number) => {
  if (max !== undefined && value > max) return max;
  if (value < min) return min;
  return value;
};

const QuantityStepper = ({
  label,
  value: valueProp,
  defaultValue = 1,
  onChange,
  min = 1,
  max,
  step = 1,
  disabled = false,
  error,
  className,
  id: idProp,
}: QuantityStepperProps) => {
  const generatedId = useId();
  const errorId = useId();
  const labelId = useId();
  const id = idProp ?? generatedId;

  const [internalValue, setInternalValue] = useState(() =>
    clamp(defaultValue, min, max),
  );
  const value = clamp(valueProp ?? internalValue, min, max);

  const setValue = (next: number) => {
    const clamped = clamp(next, min, max);
    if (valueProp === undefined) {
      setInternalValue(clamped);
    }
    onChange?.(clamped);
  };

  const canDecrement = !disabled && value > min;
  const canIncrement = !disabled && (max === undefined || value < max);

  const handleDecrement = () => {
    if (canDecrement) setValue(value - step);
  };

  const handleIncrement = () => {
    if (canIncrement) setValue(value + step);
  };

  return (
    <div className={clsx(styles.field, className)}>
      {label ? (
        <label id={labelId} htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.control}>
        <div className={clsx(styles.input_frame, error && styles.has_error)}>
          <div
            id={id}
            role="group"
            aria-labelledby={label ? labelId : undefined}
            aria-disabled={disabled || undefined}
            className={styles.stepper_row}
          >
            <button
              type="button"
              className={styles.step_button}
              aria-label="Decrease quantity"
              disabled={!canDecrement}
              onClick={handleDecrement}
            >
              <span aria-hidden>−</span>
            </button>
            <span className={styles.value} aria-live="polite" aria-atomic="true">
              {value}
            </span>
            <button
              type="button"
              className={styles.step_button}
              aria-label="Increase quantity"
              disabled={!canIncrement}
              onClick={handleIncrement}
            >
              <span aria-hidden>+</span>
            </button>
          </div>
        </div>
        {error ? (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export { QuantityStepper };
export type { QuantityStepperProps };
