import React, { useState, useEffect } from "react";
import { C } from "../../constants/theme.js";
import { api } from "../../utils/api.js";
import { Card, Btn } from "../ui/index.jsx";
import { Row } from "./_shared.jsx";
import {
  WEEK_DAYS,
  formatWeeklyHoursSummary,
  getWeeklyHoursValidationError,
  normalizeWeeklyHours,
} from "../../../shared/businessHours.js";

export default function AdminStoreCard({ store }) {
  const st = store.settings || {};
  const [name, setName] = useState(st.storeName || "Mil Grau Pizzaria");
  const [wa, setWa] = useState(st.whatsapp || "");
  const [addr, setAddr] = useState(st.address || "");
  const [weeklyHours, setWeeklyHours] = useState(() => normalizeWeeklyHours(st.weeklyHours));
  const [fee, setFee] = useState(String(st.fee ?? 0).replace(".", ","));
  const [minOrder, setMinOrder] = useState(String(st.minOrder ?? 0).replace(".", ","));
  const [eta, setEta] = useState(st.eta || "A definir");
  const [busy, setBusy] = useState(false);
  const settings = store.settings || {};
  const weeklyHoursSnapshot = JSON.stringify(settings.weeklyHours || {});

  useEffect(() => {
    if (settings.storeName) setName(settings.storeName);
    if (settings.whatsapp !== undefined) setWa(settings.whatsapp || "");
    if (settings.address !== undefined) setAddr(settings.address || "");
    if (settings.weeklyHours) setWeeklyHours(normalizeWeeklyHours(settings.weeklyHours));
    if (settings.fee !== undefined) setFee(String(settings.fee).replace(".", ","));
    if (settings.minOrder !== undefined) setMinOrder(String(settings.minOrder).replace(".", ","));
    if (settings.eta) setEta(settings.eta);
  }, [
    settings.storeName,
    settings.whatsapp,
    settings.address,
    weeklyHoursSnapshot,
    settings.fee,
    settings.minOrder,
    settings.eta,
  ]);

  const updateDay = (key, changes) => {
    setWeeklyHours((current) => ({
      ...current,
      [key]: { ...current[key], ...changes },
    }));
  };

  const save = async () => {
    const scheduleError = getWeeklyHoursValidationError(weeklyHours);
    if (scheduleError) {
      store.toast(scheduleError);
      return;
    }

    setBusy(true);
    try {
      const numFee = parseFloat(String(fee).replace(",", ".")) || 0;
      const numMin = parseFloat(String(minOrder).replace(",", ".")) || 0;
      await api("/api/settings", {
        method: "PATCH",
        body: {
          store_name: name.trim(),
          whatsapp: wa.trim(),
          address: addr.trim(),
          weekly_hours: weeklyHours,
          fee: numFee,
          min_order: numMin,
          eta: eta.trim(),
        },
      });
      store.toast("Loja e horários salvos ✓");
    } catch (e) {
      store.toast(e.message);
    }
    setBusy(false);
  };

  const manualOpen = st.manualOpen !== false;
  const fieldStyle = { background: C.black, border: `1px solid ${C.gray800}`, color: C.white, fontSize: 12.5 };
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-between mb-2 gap-3">
        <div style={{ color: C.white, fontWeight: 900, fontSize: 15 }}>🏪 Loja & Operação</div>
        <Btn small disabled={busy} onClick={save}>{busy ? "Salvando…" : "💾 Salvar loja"}</Btn>
      </div>
      <Row label="Nome da Loja"><input value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg px-2.5 py-1.5 outline-none text-right" style={{ ...fieldStyle, width: 230 }} /></Row>
      <Row label="WhatsApp"><input value={wa} onChange={(e) => setWa(e.target.value)} className="rounded-lg px-2.5 py-1.5 outline-none text-right" style={{ ...fieldStyle, width: 150 }} /></Row>
      <Row label="Endereço"><input value={addr} onChange={(e) => setAddr(e.target.value)} className="rounded-lg px-2.5 py-1.5 outline-none text-right" style={{ ...fieldStyle, width: 260 }} /></Row>

      <section className="rounded-xl p-3 mt-3" style={{ background: C.gray900, border: `1px solid ${C.gray800}` }}>
        <div style={{ color: C.white, fontSize: 13, fontWeight: 900 }}>🕒 Horários de funcionamento</div>
        <div style={{ color: "#999", fontSize: 11, lineHeight: 1.45, marginTop: 4 }}>
          Ative cada dia e informe os horários. Fuso local de Recife (BRT); turnos que passam da meia-noite também são aceitos.
        </div>
        <div className="space-y-2 mt-3">
          {WEEK_DAYS.map((day) => {
            const hours = weeklyHours[day.key];
            return (
              <div key={day.key} className="rounded-lg p-2.5" style={{ background: C.black, border: `1px solid ${C.gray800}` }}>
                <div className="flex items-center justify-between gap-2">
                  <span style={{ color: C.white, fontSize: 12, fontWeight: 800 }}>{day.label}</span>
                  <button
                    type="button"
                    aria-label={`${hours.enabled ? "Desativar" : "Ativar"} ${day.label}`}
                    aria-pressed={hours.enabled}
                    onClick={() => updateDay(day.key, { enabled: !hours.enabled })}
                    className="rounded-full px-2.5 py-1 font-bold"
                    style={{
                      minWidth: 88,
                      background: hours.enabled ? `${C.green}20` : C.gray800,
                      border: `1px solid ${hours.enabled ? `${C.green}77` : C.gray700}`,
                      color: hours.enabled ? C.green : "#999",
                      fontSize: 10.5,
                    }}
                  >
                    {hours.enabled ? "Aberto" : "Fechado"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <label className="min-w-0">
                    <span style={{ display: "block", color: "#999", fontSize: 10.5, marginBottom: 3 }}>Abre às</span>
                    <input
                      type="time"
                      value={hours.open}
                      disabled={!hours.enabled}
                      aria-label={`${day.label}: horário de abertura`}
                      onChange={(e) => updateDay(day.key, { open: e.target.value })}
                      className="w-full rounded-lg px-2 py-1.5 outline-none"
                      style={{ ...fieldStyle, opacity: hours.enabled ? 1 : 0.5, colorScheme: "dark" }}
                    />
                  </label>
                  <label className="min-w-0">
                    <span style={{ display: "block", color: "#999", fontSize: 10.5, marginBottom: 3 }}>Fecha às</span>
                    <input
                      type="time"
                      value={hours.close}
                      disabled={!hours.enabled}
                      aria-label={`${day.label}: horário de fechamento`}
                      onChange={(e) => updateDay(day.key, { close: e.target.value })}
                      className="w-full rounded-lg px-2 py-1.5 outline-none"
                      style={{ ...fieldStyle, opacity: hours.enabled ? 1 : 0.5, colorScheme: "dark" }}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ color: C.yellowLight, fontSize: 10.5, lineHeight: 1.5, marginTop: 10 }}>
          Resumo: {formatWeeklyHoursSummary(weeklyHours)}
        </div>
      </section>

      <Row label="Taxa entrega"><div className="flex items-center gap-1.5"><span style={{ color: "#777", fontSize: 12 }}>R$</span><input value={fee} onChange={(e) => setFee(e.target.value)} className="rounded-lg px-2.5 py-1.5 outline-none text-right" style={{ ...fieldStyle, width: 75 }} /></div></Row>
      <Row label="Pedido mínimo"><div className="flex items-center gap-1.5"><span style={{ color: "#777", fontSize: 12 }}>R$</span><input value={minOrder} onChange={(e) => setMinOrder(e.target.value)} className="rounded-lg px-2.5 py-1.5 outline-none text-right" style={{ ...fieldStyle, width: 75 }} /></div></Row>
      <Row label="ETA"><input value={eta} onChange={(e) => setEta(e.target.value)} className="rounded-lg px-2.5 py-1.5 outline-none text-right" style={{ ...fieldStyle, width: 120 }} /></Row>

      <div className="flex items-center justify-between gap-3 rounded-xl p-3 mt-2" style={{ background: C.gray900, border: `1px solid ${C.gray800}` }}>
        <div>
          <div style={{ color: C.white, fontSize: 12, fontWeight: 800 }}>Pausa manual de pedidos</div>
          <div style={{ color: "#999", fontSize: 10.5, lineHeight: 1.4, marginTop: 2 }}>Quando ativa, bloqueia pedidos mesmo durante o expediente.</div>
        </div>
        <button
          type="button"
          aria-pressed={!manualOpen}
          onClick={() => store.setOpen(!manualOpen)}
          className="rounded-full px-2.5 py-1 font-bold shrink-0"
          style={{
            background: manualOpen ? `${C.green}20` : `${C.red}20`,
            border: `1px solid ${manualOpen ? `${C.green}77` : `${C.red}77`}`,
            color: manualOpen ? C.green : C.red,
            fontSize: 10.5,
          }}
        >
          {manualOpen ? "Desativada" : "Ativada"}
        </button>
      </div>
      <Btn full disabled={busy} onClick={save}>{busy ? "Salvando…" : "💾 Salvar loja e horários"}</Btn>
    </Card>
  );
}
