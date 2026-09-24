import { describe, expect, it } from "vitest";
import { WEEK_DAYS } from "../../shared/businessHours.js";
import { validateSettings } from "../schemas/settings.js";

const closedWeek = () => Object.fromEntries(
  WEEK_DAYS.map(({ key }) => [key, { enabled: false, open: "", close: "" }])
);

describe("weekly hours settings validation", () => {
  it("accepts a complete schedule with disabled days left unconfigured", () => {
    const weekly_hours = closedWeek();
    weekly_hours.friday = { enabled: true, open: "18:30", close: "23:45" };

    expect(validateSettings({ weekly_hours }).weekly_hours).toEqual(weekly_hours);
  });

  it("requires valid opening and closing times for enabled days", () => {
    const weekly_hours = closedWeek();
    weekly_hours.monday = { enabled: true, open: "", close: "23:00" };

    expect(() => validateSettings({ weekly_hours })).toThrow(/weekly_hours\.monday\.open/);
  });

  it("rejects invalid clock times and identical opening and closing times", () => {
    const invalidTime = closedWeek();
    invalidTime.tuesday = { enabled: false, open: "25:00", close: "" };
    expect(() => validateSettings({ weekly_hours: invalidTime })).toThrow(/weekly_hours\.tuesday\.open/);

    const identical = closedWeek();
    identical.wednesday = { enabled: true, open: "18:00", close: "18:00" };
    expect(() => validateSettings({ weekly_hours: identical })).toThrow(/abertura e fechamento precisam ser diferentes/);
  });

  it("requires all seven days in the saved schedule", () => {
    const incomplete = closedWeek();
    delete incomplete.sunday;
    expect(() => validateSettings({ weekly_hours: incomplete })).toThrow(/weekly_hours\.sunday/);
  });
});
