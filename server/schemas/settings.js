import { z } from "zod";
import { WEEK_DAYS } from "../../shared/businessHours.js";

const timeSchema = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/).or(z.literal(""));
const dayHoursSchema = z.object({
  enabled: z.boolean(),
  open: timeSchema,
  close: timeSchema,
}).superRefine((day, ctx) => {
  if (!day.enabled) return;
  if (!day.open) {
    ctx.addIssue({ code: "custom", path: ["open"], message: "informe o horário de abertura" });
  }
  if (!day.close) {
    ctx.addIssue({ code: "custom", path: ["close"], message: "informe o horário de fechamento" });
  }
  if (day.open && day.close && day.open === day.close) {
    ctx.addIssue({ code: "custom", path: ["close"], message: "abertura e fechamento precisam ser diferentes" });
  }
});

export const weeklyHoursSchema = z.object(
  Object.fromEntries(WEEK_DAYS.map(({ key }) => [key, dayHoursSchema]))
);

export const settingsSchema = z.object({
  store_name: z.string().min(3).max(80).optional(),
  whatsapp: z.string().max(30).optional(),
  address: z.string().max(160).optional(),
  hours: z.string().max(80).optional(),
  weekly_hours: weeklyHoursSchema.optional(),
  fee: z.number().min(0).max(100).optional(),
  min_order: z.number().min(0).max(1000).optional(),
  eta: z.string().max(40).optional(),
  pix_key: z.string().max(100).optional(),
  pay_handle: z.string().max(30).optional(),
  app_base_url: z.string().url().optional().or(z.literal("")),
  tables_enabled: z.boolean().optional(),
  tables_count: z.number().int().min(1).max(50).optional(),
  service_charge_enabled: z.boolean().optional(),
  service_charge_percent: z.number().min(0).max(30).optional(),
  open: z.boolean().optional(),
}).passthrough();

export function validateSettings(body) {
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(msg);
  }
  return parsed.data;
}
