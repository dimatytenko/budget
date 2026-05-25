import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';

import { CalendarIcon, ChevronDownIcon, ExternalLinkIcon, TrashIcon } from '@/assets/icons';
import PurchaseStatusSelect from '@/components/PurchaseStatusSelect';
import { type FinalPurchaseStatus } from '@/constants/purchase';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { BasePurchaseInterface } from '@/types/purchase';
import { formatPurchaseDate } from '@/utils/purchase/formatPurchaseDate';
import {
  formatIncomePercent,
  formatWorkHours,
} from '@/utils/purchase/formatPurchaseStatistics';
import { formatTimerLeft } from '@/utils/purchase/formatTimerLeft';
import { resolvePurchaseImageUrl } from '@/utils/purchase/resolvePurchaseImageUrl';

import styles from './PurchaseCard.module.scss';

interface PurchaseCardProps {
  purchase: BasePurchaseInterface;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: FinalPurchaseStatus) => void;
  className?: string;
}

const formatPrice = (price: number, quantity: number) => {
  const total = price * quantity;

  return `$${total.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(total) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
};

const getLinkLabel = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, '');
  } catch {
    return 'Link text';
  }
};

interface StatusBadgeProps {
  status: BasePurchaseInterface['status'];
  onStatusChange?: (status: FinalPurchaseStatus) => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, onStatusChange }) => (
  <PurchaseStatusSelect status={status} onStatusChange={onStatusChange} />
);

export const PurchaseCard: React.FC<PurchaseCardProps> = ({
  purchase,
  onDelete,
  onStatusChange,
  className,
}) => {
  const detailsId = useId();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const isExpanded = !isMobile || isMobileExpanded;
  const imageUrl = resolvePurchaseImageUrl(purchase.imageUrl);
  const statistics = purchase.statistics;

  const [timerLeft, setTimerLeft] = useState<string | null>(
    purchase.status === 'pending' ? formatTimerLeft(purchase.decisionEndsAt) : null,
  );

  useEffect(() => {
    if (isMobile) {
      setIsMobileExpanded(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (purchase.status !== 'pending') {
      setTimerLeft(null);
      return;
    }

    const updateTimer = () => {
      setTimerLeft(formatTimerLeft(purchase.decisionEndsAt));
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(intervalId);
  }, [purchase.decisionEndsAt, purchase.status]);

  const toggleExpanded = () => {
    if (!isMobile) return;

    setIsMobileExpanded((prev) => !prev);
  };

  return (
    <article className={clsx(styles.card, isExpanded && styles.card_expanded, className)}>
      <header className={styles.header}>
        <div className={styles.date}>
          <CalendarIcon aria-hidden className={styles.date_icon} />
          <time dateTime={purchase.createdAt}>{formatPurchaseDate(purchase.createdAt)}</time>
        </div>

        <div className={styles.header_actions}>
          {onDelete ? (
            <button
              type="button"
              className={styles.icon_button}
              aria-label="Delete purchase"
              onClick={() => onDelete(purchase.id)}
            >
              <TrashIcon aria-hidden />
            </button>
          ) : null}

          <button
            type="button"
            className={clsx(styles.icon_button, styles.toggle_button)}
            aria-label={isExpanded ? 'Collapse purchase details' : 'Expand purchase details'}
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={toggleExpanded}
          >
            <ChevronDownIcon
              aria-hidden
              className={clsx(styles.chevron, isExpanded && styles.chevron_expanded)}
            />
          </button>
        </div>
      </header>

      {!isExpanded ? (
        <div className={styles.summary}>
          <div className={styles.thumbnail}>
            {imageUrl ? (
              <img src={imageUrl} alt="" className={styles.thumbnail_image} />
            ) : (
              <div className={styles.image_placeholder} aria-hidden />
            )}
          </div>

          <div className={styles.summary_content}>
            <h3 className={styles.title}>{purchase.name}</h3>

            {purchase.link ? (
              <a
                href={purchase.link}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getLinkLabel(purchase.link)}
                <ExternalLinkIcon aria-hidden className={styles.link_icon} />
              </a>
            ) : null}

            <StatusBadge
              status={purchase.status}
              onStatusChange={
                onStatusChange ? (status) => onStatusChange(purchase.id, status) : undefined
              }
            />
          </div>

          <p className={styles.summary_price}>{formatPrice(purchase.price, purchase.quantity)}</p>
        </div>
      ) : null}

      {isExpanded ? (
        <div id={detailsId} className={styles.details}>
          <div className={styles.hero_image_wrap}>
            {imageUrl ? (
              <img src={imageUrl} alt="" className={styles.hero_image} />
            ) : (
              <div className={styles.hero_placeholder} aria-hidden />
            )}
          </div>

          <div className={styles.details_header}>
            <div className={styles.details_info}>
              <h3 className={styles.title}>{purchase.name}</h3>

              {purchase.link ? (
                <a
                  href={purchase.link}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getLinkLabel(purchase.link)}
                  <ExternalLinkIcon aria-hidden className={styles.link_icon} />
                </a>
              ) : null}
            </div>

            <div className={styles.details_meta}>
              <StatusBadge
              status={purchase.status}
              onStatusChange={
                onStatusChange ? (status) => onStatusChange(purchase.id, status) : undefined
              }
            />
              <p className={styles.details_price}>
                {formatPrice(purchase.price, purchase.quantity)}
              </p>
            </div>
          </div>

          {statistics ? (
            <>
              <div className={styles.impact}>
                <div className={styles.impact_header}>
                  <span className={styles.impact_label}>Monthly income impact</span>
                  <span className={styles.impact_value}>
                    {formatIncomePercent(statistics.incomePercent)}
                  </span>
                </div>

                <div className={styles.impact_track} aria-hidden>
                  <span
                    className={styles.impact_fill}
                    style={{ width: `${Math.min(statistics.incomePercent, 100)}%` }}
                  />
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat_item}>
                  <span className={styles.stat_label}>Work hours</span>
                  <span className={styles.stat_value}>
                    {formatWorkHours(statistics.workHoursToPay)}
                  </span>
                </div>

                <div className={styles.stat_item}>
                  <span className={styles.stat_label}>Annual return</span>
                  <span className={styles.stat_value}>
                    {Math.round(statistics.investmentIncome).toLocaleString('en-US')} usd
                  </span>
                </div>

                <div className={styles.stat_item}>
                  <span className={styles.stat_label}>Timer</span>
                  <span
                    className={clsx(
                      styles.stat_value,
                      purchase.status === 'pending' && styles.stat_valueAccent,
                    )}
                  >
                    {purchase.status === 'pending' ? timerLeft || '—' : '—'}
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </article>
  );
};

export default PurchaseCard;
