import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons';

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
}

export const Button = ({
  className,
  text,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  iconClassName,
  type = 'button',
  ...props
}: ButtonProps) => {
  const Icon = icon ? buttonIcons[icon] : null;
  const hasLeftIcon = Boolean(icon) && iconPosition === 'left';
  const hasRightIcon = Boolean(icon) && iconPosition === 'right';

  return (
    <button type={type} className={clsx(styles.button, styles[variant], className)} {...props}>
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
