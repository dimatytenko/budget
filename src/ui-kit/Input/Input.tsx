import clsx from 'clsx';
import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/assets/icons';

import styles from './Input.module.scss';

type InputType = 'text' | 'email' | 'password';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  type?: InputType;
  error?: string;
  /** Helper text under the field (e.g. password rules). */
  hint?: string;
  leadingIcon?: 'email' | 'password';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      className,
      id: idProp,
      leadingIcon,
      error,
      hint,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const errorId = useId();
    const hintId = useId();
    const id = idProp ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const hasLeading = type === 'email' || type === 'password';
    const inputType: InputHTMLAttributes<HTMLInputElement>['type'] = isPassword
      ? showPassword
        ? 'text'
        : 'password'
      : type;

    const leading =
      leadingIcon === 'email' ? (
        <MailIcon aria-hidden className={styles.leading_icon} />
      ) : leadingIcon === 'password' ? (
        <LockIcon aria-hidden className={styles.leading_icon} />
      ) : null;

    const describedByParts = [ariaDescribedBy, hint ? hintId : null, error ? errorId : null].filter(
      Boolean,
    ) as string[];
    const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    return (
      <div className={clsx(styles.field, className)}>
        {label ? (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        ) : null}
        <div className={styles.control}>
          <div
            className={clsx(
              styles.input_frame,
              hasLeading && styles.has_leading,
              error && styles.has_error,
            )}
          >
            <div className={styles.input_row}>
              {leading ? <span className={styles.leading}>{leading}</span> : null}
              <input
                ref={ref}
                id={id}
                type={inputType}
                className={styles.input}
                {...rest}
                aria-invalid={error ? true : ariaInvalid}
                aria-describedby={describedBy}
              />
              {isPassword ? (
                <button
                  type="button"
                  className={styles.toggle}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOffIcon aria-hidden /> : <EyeIcon aria-hidden />}
                </button>
              ) : null}
            </div>
          </div>
          {hint ? (
            <p id={hintId} className={styles.hint}>
              {hint}
            </p>
          ) : null}
          {error ? (
            <p id={errorId} className={styles.error} role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
export type { InputProps, InputType };
