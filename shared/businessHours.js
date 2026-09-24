export const BUSINESS_TIME_ZONE = "America/Recife";

export const WEEK_DAYS = Object.freeze([
  Object.freeze({ key: "monday", label: "Segunda-feira", short: "Seg", intl: "Mon" }),
  Object.freeze({ key: "tuesday", label: "Terça-feira", short: "Ter", intl: "Tue" }),
  Object.freeze({ key: "wednesday", label: "Quarta-feira", short: "Qua", intl: "Wed" }),
  Object.freeze({ key: "thursday", label: "Quinta-feira", short: "Qui", intl: "Thu" }),
  Object.freeze({ key: "friday", label: "Sexta-feira", short: "Sex", intl: "Fri" }),
  Object.freeze({ key: "saturday", label: "Sábado", short: "Sáb", intl: "Sat" }),
  Object.freeze({ key: "sunday", label: "Domingo", short: "Dom", intl: "Sun" }),
]);

const DAY_INDEX_BY_INTL = Object.fromEntries(WEEK_DAYS.map((day, index) => [day.intl, index]));
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const RECIFE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: BUSINESS_TIME_ZONE,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export const DEFAULT_WEEKLY_HOURS = Object.freeze(
  Object.fromEntries(WEEK_DAYS.map(({ key }) => [key, Object.freeze({ enabled: false, open: "", close: "" })]))
);

export function isValidBusinessTime(value) {
  return typeof value === "string" && TIME_PATTERN.test(value);
}

function parseSchedule(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/** Return a safe, complete weekly schedule. Invalid or missing hours stay closed. */
export function normalizeWeeklyHours(value) {
  const input = parseSchedule(value);
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return Object.fromEntries(WEEK_DAYS.map(({ key }) => [key, { ...DEFAULT_WEEKLY_HOURS[key] }]));
  }

  return Object.fromEntries(WEEK_DAYS.map(({ key }) => {
    const day = input[key] && typeof input[key] === "object" ? input[key] : {};
    const open = isValidBusinessTime(day.open) ? day.open : "";
    const close = isValidBusinessTime(day.close) ? day.close : "";
    const enabled = day.enabled === true && Boolean(open) && Boolean(close) && open !== close;
    return [key, { enabled, open, close }];
  }));
}

export function getWeeklyHoursValidationError(value) {
  const input = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  for (const { key, label } of WEEK_DAYS) {
    const day = input[key] || {};
    if (day.enabled !== true) continue;
    if (!isValidBusinessTime(day.open) || !isValidBusinessTime(day.close)) {
      return `${label}: informe os horários de abertura e fechamento.`;
    }
    if (day.open === day.close) {
      return `${label}: abertura e fechamento precisam ser diferentes.`;
    }
  }
  return "";
}

function timeToMinutes(value) {
  if (!isValidBusinessTime(value)) return null;
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getLocalClock(now, timeZone) {
  const date = now instanceof Date ? now : new Date(now);
  if (Number.isNaN(date.getTime())) throw new TypeError("Horário atual inválido.");
  const formatter = timeZone === BUSINESS_TIME_ZONE
    ? RECIFE_FORMATTER
    : new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
  const parts = Object.fromEntries(formatter.formatToParts(date).map(({ type, value }) => [type, value]));
  const dayIndex = DAY_INDEX_BY_INTL[parts.weekday];
  if (dayIndex === undefined) throw new RangeError(`Dia da semana desconhecido: ${parts.weekday}`);
  return { dayIndex, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

function isScheduleOpenAt(schedule, dayIndex, minutes) {
  const today = schedule[WEEK_DAYS[dayIndex].key];
  const start = timeToMinutes(today.open);
  const end = timeToMinutes(today.close);

  if (today.enabled && start !== null && end !== null) {
    if (start < end && minutes >= start && minutes < end) return true;
    if (start > end && minutes >= start) return true;
  }

  // An opening period that crosses midnight belongs to the previous day too.
  const previousIndex = (dayIndex + WEEK_DAYS.length - 1) % WEEK_DAYS.length;
  const previous = schedule[WEEK_DAYS[previousIndex].key];
  const previousStart = timeToMinutes(previous.open);
  const previousEnd = timeToMinutes(previous.close);
  return Boolean(
    previous.enabled &&
    previousStart !== null &&
    previousEnd !== null &&
    previousStart > previousEnd &&
    minutes < previousEnd
  );
}

function findNextOpening(schedule, dayIndex, minutes) {
  // Include offset 7 so a schedule with just today's weekday can find next week.
  for (let offset = 0; offset <= WEEK_DAYS.length; offset += 1) {
    const index = (dayIndex + offset) % WEEK_DAYS.length;
    const day = schedule[WEEK_DAYS[index].key];
    if (!day.enabled) continue;
    const start = timeToMinutes(day.open);
    if (start === null) continue;
    if (offset === 0 && start <= minutes) continue;

    let when;
    if (offset === 0) when = "hoje";
    else if (offset === 1) when = "amanhã";
    else if (index < dayIndex || offset === WEEK_DAYS.length) when = `na próxima ${WEEK_DAYS[index].label.toLowerCase()}`;
    else when = `na ${WEEK_DAYS[index].label.toLowerCase()}`;

    return {
      dayKey: WEEK_DAYS[index].key,
      dayLabel: WEEK_DAYS[index].label,
      dayOffset: offset,
      time: day.open,
      text: `${when} às ${day.open}`,
    };
  }
  return null;
}

/**
 * Determine order availability using Recife local time (BRT), not the visitor's
 * device timezone. Overnight hours are supported. A manual pause always wins.
 */
export function getBusinessHoursStatus(weeklyHours, {
  manualOpen = true,
  now = Date.now(),
  timeZone = BUSINESS_TIME_ZONE,
} = {}) {
  const schedule = normalizeWeeklyHours(weeklyHours);
  const { dayIndex, minutes } = getLocalClock(now, timeZone);
  const today = WEEK_DAYS[dayIndex];
  const todayHours = schedule[today.key];
  const scheduledOpen = isScheduleOpenAt(schedule, dayIndex, minutes);
  const nextOpening = scheduledOpen ? null : findNextOpening(schedule, dayIndex, minutes);
  const allowedManually = manualOpen !== false;

  return {
    open: allowedManually && scheduledOpen,
    scheduledOpen,
    manualOpen: allowedManually,
    reason: !allowedManually ? "manual" : scheduledOpen ? "open" : "closed",
    dayKey: today.key,
    todayHours: todayHours.enabled ? `${todayHours.open}–${todayHours.close}` : "Fechado hoje",
    nextOpening,
  };
}

export function formatWeeklyHoursSummary(weeklyHours) {
  const schedule = normalizeWeeklyHours(weeklyHours);
  if (WEEK_DAYS.every(({ key }) => !schedule[key].enabled)) return "Horários ainda não configurados";

  const groups = [];
  let index = 0;
  while (index < WEEK_DAYS.length) {
    const day = schedule[WEEK_DAYS[index].key];
    let end = index;
    while (end + 1 < WEEK_DAYS.length) {
      const next = schedule[WEEK_DAYS[end + 1].key];
      const same = day.enabled === next.enabled && (
        !day.enabled || (day.open === next.open && day.close === next.close)
      );
      if (!same) break;
      end += 1;
    }

    const label = index === end
      ? WEEK_DAYS[index].short
      : `${WEEK_DAYS[index].short}–${WEEK_DAYS[end].short}`;
    groups.push(day.enabled ? `${label} ${day.open}–${day.close}` : `${label} fechado`);
    index = end + 1;
  }

  return groups.join(" · ");
}

export function getClosedStoreMessage(status) {
  if (status?.manualOpen === false) return "PEDIDOS PAUSADOS";
  if (status?.nextOpening?.text) return `FECHADO — ABRE ${status.nextOpening.text.toUpperCase()}`;
  return "HORÁRIOS NÃO CONFIGURADOS";
}
