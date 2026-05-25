import clsx from 'clsx';

import styles from './SegmentedFilter.module.scss';

interface SegmentedFilterOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedFilterProps<T extends string> {
  value: T;
  options: SegmentedFilterOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  ariaLabel?: string;
}

export const SegmentedFilter = <T extends string>({
  value,
  options,
  onChange,
  className,
  ariaLabel = 'Filter',
}: SegmentedFilterProps<T>) => {
  return (
    <div className={clsx(styles.root, className)} role="tablist" aria-label={ariaLabel}>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={clsx(styles.tab, isActive && styles.tab_active)}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export type { SegmentedFilterOption, SegmentedFilterProps };
