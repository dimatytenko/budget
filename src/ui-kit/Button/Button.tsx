import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons';
import { Loader } from '@/ui-kit/Loader';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type IconPosition = 'left' | 'right';
const buttonIcons = {
  ArrowRightIcon,
  ArrowLeftIcon,
};
type ButtonIcon = keyof typeof buttonIcons;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  iconPosition?: IconPosition;
  iconClassName?: string;
  isLoading?: boolean;
}

export const Button = ({
  className,
  text,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  iconClassName,
  type = 'button',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const Icon = icon ? buttonIcons[icon] : null;
  const hasLeftIcon = Boolean(icon) && iconPosition === 'left' && !isLoading;
  const hasRightIcon = Boolean(icon) && iconPosition === 'right' && !isLoading;

  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], isLoading && styles.loading, className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span className={styles.loaderSlot} aria-hidden>
          <Loader size="sm" />
        </span>
      )}
      {hasLeftIcon && Icon && (
        <span className={styles.icon}>
          <Icon className={iconClassName} />
        </span>
      )}
      <span>{text}</span>
      {hasRightIcon && Icon && (
        <span className={styles.icon}>
          <Icon className={iconClassName} />
        </span>
      )}
    </button>
  );
};

export type { ButtonProps, ButtonVariant, IconPosition, ButtonIcon };
