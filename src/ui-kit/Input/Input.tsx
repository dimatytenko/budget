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
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      className,
      id: idProp,
      error,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const errorId = useId();
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
      type === 'email' ? (
        <MailIcon aria-hidden className={styles.leading_icon} />
      ) : type === 'password' ? (
        <LockIcon aria-hidden className={styles.leading_icon} />
      ) : null;

    return (
      <div className={clsx(styles.field, className)}>
        {label ? (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        ) : null}
        <div
          className={clsx(
            styles.input_wrap,
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
              aria-describedby={
                error ? (ariaDescribedBy ? `${errorId} ${ariaDescribedBy}` : errorId) : ariaDescribedBy
              }
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
