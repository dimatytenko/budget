import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';

import { ChevronDownIcon } from '@/assets/icons';
import {
  FINAL_PURCHASE_STATUSES,
  PURCHASE_STATUS_LABELS,
  type FinalPurchaseStatus,
  type PurchaseStatus,
} from '@/constants/purchase';

import styles from './PurchaseStatusSelect.module.scss';

interface PurchaseStatusSelectProps {
  status: PurchaseStatus;
  onStatusChange?: (status: FinalPurchaseStatus) => void;
  className?: string;
}

const PurchaseStatusSelect: React.FC<PurchaseStatusSelectProps> = ({
  status,
  onStatusChange,
  className,
}) => {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isInteractive = status === 'pending' && Boolean(onStatusChange);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!isInteractive) return;

    setIsOpen((open) => !open);
  };

  const handleSelect = (nextStatus: FinalPurchaseStatus) => {
    onStatusChange?.(nextStatus);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={clsx(styles.root, className)}>
      {isInteractive ? (
        <button
          type="button"
          className={clsx(styles.trigger, styles[`status_${status}`], isOpen && styles.trigger_open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          onClick={handleToggle}
        >
          <span className={styles.status_dot} aria-hidden />
          <span>{PURCHASE_STATUS_LABELS[status]}</span>
          <ChevronDownIcon
            aria-hidden
            className={clsx(styles.chevron, isOpen && styles.chevron_open)}
          />
        </button>
      ) : (
        <span className={clsx(styles.badge, styles[`status_${status}`])}>
          <span className={styles.status_dot} aria-hidden />
          {PURCHASE_STATUS_LABELS[status]}
        </span>
      )}

      {isInteractive && isOpen ? (
        <ul id={listboxId} role="listbox" className={styles.dropdown} aria-label="Change purchase status">
          {FINAL_PURCHASE_STATUSES.map((optionStatus) => (
            <li key={optionStatus} role="presentation">
              <button
                type="button"
                role="option"
                className={clsx(styles.option, styles[`status_${optionStatus}`])}
                onClick={() => handleSelect(optionStatus)}
              >
                <span className={styles.status_dot} aria-hidden />
                {PURCHASE_STATUS_LABELS[optionStatus]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default PurchaseStatusSelect;
