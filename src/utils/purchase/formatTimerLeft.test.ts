import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatTimerLeft } from './formatTimerLeft';

describe('formatTimerLeft', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-11T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns null when decisionEndsAt is null', () => {
    expect(formatTimerLeft(null)).toBeNull();
  });

  it('formats remaining time as H:MM:SS left', () => {
    const decisionEndsAt = new Date('2026-06-11T17:33:12.000Z').toISOString();

    expect(formatTimerLeft(decisionEndsAt)).toBe('5:33:12 left');
  });

  it('pads minutes and seconds with leading zeros', () => {
    const decisionEndsAt = new Date('2026-06-11T12:03:07.000Z').toISOString();

    expect(formatTimerLeft(decisionEndsAt)).toBe('0:03:07 left');
  });

  it("returns Time's up when deadline is in the past", () => {
    const decisionEndsAt = new Date('2026-06-11T11:00:00.000Z').toISOString();

    expect(formatTimerLeft(decisionEndsAt)).toBe("Time's up");
  });
});
