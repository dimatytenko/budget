import clsx from 'clsx';

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons';
import { getPaginationItems } from '@/utils/pagination/getPaginationItems';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const items = getPaginationItems(safeCurrentPage, safeTotalPages);

  const handlePrevious = () => {
    if (safeCurrentPage > 1) {
      onPageChange(safeCurrentPage - 1);
    }
  };

  const handleNext = () => {
    if (safeCurrentPage < safeTotalPages) {
      onPageChange(safeCurrentPage + 1);
    }
  };

  return (
    <nav className={clsx(styles.pagination, className)} aria-label="Pagination">
      <button
        type="button"
        className={styles.nav_button}
        aria-label="Previous page"
        disabled={safeCurrentPage <= 1}
        onClick={handlePrevious}
      >
        <ArrowLeftIcon aria-hidden className={styles.nav_icon} />
      </button>

      <ul className={styles.pages}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === 'ellipsis' ? (
              <span className={styles.ellipsis} aria-hidden>
                ...
              </span>
            ) : (
              <button
                type="button"
                className={clsx(styles.page_button, item === safeCurrentPage && styles.page_active)}
                aria-label={`Page ${item}`}
                aria-current={item === safeCurrentPage ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className={styles.mobile_status} aria-live="polite">
        <span className="visibility-hidden">Page </span>
        <span className={styles.mobile_status_value}>{safeCurrentPage}</span>
        <span className={styles.mobile_status_separator} aria-hidden>
          /
        </span>
        <span>
          <span className="visibility-hidden"> of </span>
          {safeTotalPages}
        </span>
      </p>

      <button
        type="button"
        className={styles.nav_button}
        aria-label="Next page"
        disabled={safeCurrentPage >= safeTotalPages}
        onClick={handleNext}
      >
        <ArrowRightIcon aria-hidden className={styles.nav_icon} />
      </button>
    </nav>
  );
};

export type { PaginationProps };
