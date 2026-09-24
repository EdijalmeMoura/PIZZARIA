export const C = {
  black: "#130E0B",
  gray900: "#1B1410",
  gray850: "#241A15",
  gray800: "#362820",
  gray700: "#503B30",
  orange: "#C33B2E",
  yellow: "#E9A94F",
  yellowLight: "#F4D49A",
  white: "#FFF6E8",
  green: "#58A878",
  red: "#E75B4B",
  blue: "#68A9C5",
};

export const font = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'Inter', system-ui, -apple-system, Segoe UI, sans-serif",
};

export const STATUS = {
  NOVO: { label: "Novo", color: C.yellowLight, icon: "🆕" },
  CONFIRMADO: { label: "Confirmado", color: C.yellow, icon: "✅" },
  PREPARO: { label: "No forno", color: C.orange, icon: "🔥" },
  PRONTO: { label: "Pronto", color: C.green, icon: "🍕" },
  EMBALADO: { label: "Embalado", color: "#8FD14F", icon: "📦" },
  AGUARDANDO: { label: "Aguardando entregador", color: C.blue, icon: "⏳" },
  ROTA: { label: "Saiu para entrega", color: "#7C5CFF", icon: "🛵" },
  ENTREGUE: { label: "Entregue", color: "#5a5a5a", icon: "✓" },
  CANCELADO: { label: "Cancelado", color: C.red, icon: "✕" },
};

export const FLOW = [
  "NOVO", "CONFIRMADO", "PREPARO", "PRONTO", "EMBALADO",
  "AGUARDANDO", "ROTA", "ENTREGUE",
];

export const CHANNELS = {
  DIRECT: { label: "Cardápio próprio", short: "MIL GRAU", color: C.orange, icon: "🍕" },
  WHATSAPP: { label: "WhatsApp", short: "ZAP", color: "#25D366", icon: "💬" },
  IFOOD: { label: "iFood", short: "IFOOD", color: "#EA1D2C", icon: "🔴" },
  NNFOOD: { label: "99Food", short: "99", color: "#FFD400", icon: "🟡" },
};
