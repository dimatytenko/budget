import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';

import { CheckIcon, ChevronDownIcon } from '@/assets/icons';

import styles from './Select.module.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  name?: string;
}

const Select = ({
  label,
  options,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  className,
  id: idProp,
  name,
}: SelectProps) => {
  const generatedId = useId();
  const listboxId = useId();
  const errorId = useId();
  const labelId = useId();
  const id = idProp ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);

  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? options[0]?.value ?? '',
  );
  const [isOpen, setIsOpen] = useState(false);

  const value = valueProp ?? internalValue;
  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;
  const hasValue = Boolean(selectedOption);

  const setValue = (next: string) => {
    if (valueProp === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
    setIsOpen(false);
  };

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
    if (!disabled) {
      setIsOpen((open) => !open);
    }
  };

  return (
    <div ref={rootRef} className={clsx(styles.field, className)}>
      {label ? (
        <label id={labelId} htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.control}>
        <button
          type="button"
          id={id}
          name={name}
          role="combobox"
          aria-labelledby={label ? labelId : undefined}
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          className={clsx(
            styles.trigger,
            isOpen && styles.is_open,
            error && styles.has_error,
            !hasValue && styles.is_placeholder,
          )}
          onClick={handleToggle}
        >
          <span className={styles.value}>{displayLabel}</span>
          <ChevronDownIcon
            aria-hidden
            className={clsx(styles.chevron, isOpen && styles.chevron_open)}
          />
        </button>

        {isOpen ? (
          <ul id={listboxId} role="listbox" className={styles.dropdown} tabIndex={-1}>
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={clsx(styles.option, isSelected && styles.option_selected)}
                    onClick={() => setValue(option.value)}
                  >
                    <span className={styles.option_label}>{option.label}</span>
                    {isSelected ? (
                      <CheckIcon aria-hidden className={styles.check_icon} />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}

        {error ? (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export { Select };
export type { SelectProps, SelectOption };
