import clsx from 'clsx';
import {
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useMemo, useRef, useState, type ReactNode } from 'react';

import styles from './Tooltip.module.scss';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Tooltip = ({ content, children, className }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context, placement, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { move: false, delay: { open: 100, close: 80 } });
  const focus = useFocus(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, role]);

  const staticSide = useMemo(() => {
    const side = placement.split('-')[0];

    return {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }[side];
  }, [placement]);

  if (!content) {
    return children;
  }

  return (
    <>
      <span
        ref={refs.setReference}
        className={clsx(styles.trigger, className)}
        {...getReferenceProps()}
      >
        {children}
      </span>

      {isOpen ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={styles.tooltip}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div className={styles.content}>{content}</div>
            <div
              ref={arrowRef}
              className={styles.arrow}
              data-side={placement.split('-')[0]}
              style={{
                left: middlewareData.arrow?.x,
                top: middlewareData.arrow?.y,
                [staticSide as string]: '-5px',
              }}
            />
          </div>
        </FloatingPortal>
      ) : null}
    </>
  );
};

export type { TooltipProps };
