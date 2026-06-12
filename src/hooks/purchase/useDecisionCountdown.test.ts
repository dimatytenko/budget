import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDecisionCountdown } from './useDecisionCountdown';

describe('useDecisionCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-11T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats remaining time until decisionEndsAt', () => {
    const createdAt = '2026-06-11T12:00:00.000Z';
    const decisionEndsAt = '2026-06-11T14:30:45.000Z';

    const { result } = renderHook(() => useDecisionCountdown(decisionEndsAt, createdAt));

    expect(result.current.formatted).toBe('02:30:45');
    expect(result.current.isExpired).toBe(false);
  });

  it('decreases formatted time after one second', () => {
    const createdAt = '2026-06-11T12:00:00.000Z';
    const decisionEndsAt = '2026-06-11T14:30:45.000Z';

    const { result } = renderHook(() => useDecisionCountdown(decisionEndsAt, createdAt));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.formatted).toBe('02:30:44');
  });

  it('increases progress from creation to deadline', () => {
    const createdAt = '2026-06-11T12:00:00.000Z';
    const decisionEndsAt = '2026-06-11T14:00:00.000Z';

    const { result } = renderHook(() => useDecisionCountdown(decisionEndsAt, createdAt));

    expect(result.current.progress).toBe(0);

    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1000);
    });

    expect(result.current.progress).toBe(50);

    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1000);
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.isExpired).toBe(true);
  });

  it('stays expired without further countdown changes', () => {
    const createdAt = '2026-06-11T12:00:00.000Z';
    const decisionEndsAt = '2026-06-11T13:00:00.000Z';

    const { result } = renderHook(() => useDecisionCountdown(decisionEndsAt, createdAt));

    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1000);
    });

    expect(result.current.formatted).toBe('00:00:00');
    expect(result.current.isExpired).toBe(true);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.formatted).toBe('00:00:00');
    expect(result.current.isExpired).toBe(true);
  });

  it('returns placeholder when decisionEndsAt is null', () => {
    const { result } = renderHook(() => useDecisionCountdown(null, null));

    expect(result.current.formatted).toBe('--:--:--');
    expect(result.current.progress).toBe(0);
  });
});
