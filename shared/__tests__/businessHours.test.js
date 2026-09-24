import { describe, expect, it } from "vitest";
import {
  BUSINESS_TIME_ZONE,
  DEFAULT_WEEKLY_HOURS,
  WEEK_DAYS,
  formatWeeklyHoursSummary,
  getBusinessHoursStatus,
  normalizeWeeklyHours,
} from "../businessHours.js";

function scheduleWith(changes) {
  return {
    ...Object.fromEntries(WEEK_DAYS.map(({ key }) => [key, { ...DEFAULT_WEEKLY_HOURS[key] }])),
    ...changes,
  };
}

describe("weekly business hours", () => {
  it("starts with every day disabled instead of inventing store hours", () => {
    const schedule = normalizeWeeklyHours(undefined);
    expect(WEEK_DAYS.every(({ key }) => schedule[key].enabled === false)).toBe(true);
    expect(schedule.monday).toEqual({ enabled: false, open: "", close: "" });
    expect(getBusinessHoursStatus(schedule, { now: "2024-01-01T21:00:00Z" })).toMatchObject({
      open: false,
      scheduledOpen: false,
      nextOpening: null,
    });
    expect(formatWeeklyHoursSummary(schedule)).toBe("Horários ainda não configurados");
  });

  it("uses Recife local time and includes the opening minute but not the closing minute", () => {
    const schedule = scheduleWith({ monday: { enabled: true, open: "18:00", close: "23:00" } });

    // 21:00 UTC is 18:00 in Recife on Monday.
    expect(getBusinessHoursStatus(schedule, { now: "2024-01-01T21:00:00Z" })).toMatchObject({
      open: true,
      scheduledOpen: true,
      dayKey: "monday",
      todayHours: "18:00–23:00",
    });
    // 02:00 UTC on Tuesday is exactly 23:00 Monday in Recife.
    expect(getBusinessHoursStatus(schedule, { now: "2024-01-02T02:00:00Z" })).toMatchObject({
      open: false,
      scheduledOpen: false,
      nextOpening: {
        dayKey: "monday",
        text: "na próxima segunda-feira às 18:00",
      },
    });
  });

  it("keeps overnight openings active after midnight until their closing time", () => {
    const schedule = scheduleWith({ sunday: { enabled: true, open: "20:00", close: "02:00" } });

    // Monday 01:00 Recife is still within Sunday's 20:00–02:00 window.
    expect(getBusinessHoursStatus(schedule, { now: "2024-01-08T04:00:00Z" })).toMatchObject({
      open: true,
      scheduledOpen: true,
      dayKey: "monday",
    });
    // At 02:00 Recife the previous day's window has ended.
    expect(getBusinessHoursStatus(schedule, { now: "2024-01-08T05:00:00Z" })).toMatchObject({
      open: false,
      scheduledOpen: false,
    });
  });

  it("lets a manual pause override an otherwise open schedule", () => {
    const schedule = scheduleWith({ monday: { enabled: true, open: "18:00", close: "23:00" } });
    const status = getBusinessHoursStatus(schedule, {
      manualOpen: false,
      now: "2024-01-01T22:00:00Z",
    });
    expect(status).toMatchObject({ open: false, scheduledOpen: true, manualOpen: false, reason: "manual" });
  });

  it("summarizes adjacent days with matching hours", () => {
    const weekday = { enabled: true, open: "18:00", close: "23:00" };
    const schedule = scheduleWith({
      monday: weekday,
      tuesday: weekday,
      wednesday: weekday,
      thursday: weekday,
      friday: weekday,
    });
    expect(formatWeeklyHoursSummary(schedule)).toBe("Seg–Sex 18:00–23:00 · Sáb–Dom fechado");
  });

  it("documents the store timezone used for schedule calculations", () => {
    expect(BUSINESS_TIME_ZONE).toBe("America/Recife");
  });
});
