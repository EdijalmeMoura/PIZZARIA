import { WHATS_MENU_CATEGORIES, WHATS_MENU_PRODUCTS, WHATS_MENU_WEEKLY_HOURS } from "./whatsmenuCatalog.js";

// O catálogo de venda e os horários vêm do cardápio público oficial.
export const CATEGORIES = WHATS_MENU_CATEGORIES;

export const OPTION_GROUPS = [
  {
    id: "tamanho", name: "Escolha o tamanho", min: 1, max: 1, required: 1,
    options: [
      { id: "individual", name: "Individual · 4 pedaços", price: 0 },
      { id: "media", name: "Média · 6 pedaços", price: 12 },
      { id: "grande", name: "Grande · 8 pedaços", price: 24 },
    ],
  },
  {
    id: "borda", name: "Borda recheada", min: 0, max: 1, required: 0,
    options: [
      { id: "borda_tradicional", name: "Sem recheio", price: 0 },
      { id: "borda_catupiry", name: "Catupiry", price: 8 },
      { id: "borda_cheddar", name: "Cheddar", price: 8 },
      { id: "borda_chocolate", name: "Chocolate", price: 9 },
    ],
  },
  {
    id: "adicionais", name: "Adicionais", min: 0, max: 5, required: 0,
    options: [
      { id: "extra_mussarela", name: "Mussarela extra", price: 6 },
      { id: "extra_calabresa", name: "Calabresa extra", price: 7 },
      { id: "extra_bacon", name: "Bacon crocante", price: 7 },
      { id: "extra_tomate_seco", name: "Tomate seco", price: 6 },
      { id: "extra_azeitona", name: "Azeitonas", price: 4 },
    ],
  },
];

export const BUILDER = [
  {
    id: "tamanhoPizza", label: "Escolha o tamanho",
    options: [
      { id: "monte_individual", name: "Individual · 4 pedaços", price: 0 },
      { id: "monte_media", name: "Média · 6 pedaços", price: 12 },
      { id: "monte_grande", name: "Grande · 8 pedaços", price: 24 },
    ],
  },
  {
    id: "massaPizza", label: "Escolha a massa",
    options: [
      { id: "massa_tradicional", name: "Tradicional", price: 0 },
      { id: "massa_fina", name: "Fina e crocante", price: 0 },
      { id: "massa_integral", name: "Integral", price: 4 },
    ],
  },
  {
    id: "molhoPizza", label: "Escolha a base",
    options: [
      { id: "molho_tomate", name: "Molho de tomate", price: 0 },
      { id: "molho_branco", name: "Molho branco", price: 3 },
      { id: "molho_barbecue", name: "Barbecue", price: 3 },
    ],
  },
];

export const PRODUCTS = WHATS_MENU_PRODUCTS;

export const COUPONS = [
  { code: "PIZZA10", type: "percent", value: 10, min: 45, uses: 0, max_uses: 500, active: 1, note: "10% em pedidos acima de R$ 45" },
  { code: "BEMVINDO", type: "percent", value: 10, min: 0, uses: 0, max_uses: 1000, active: 1, note: "Desconto de boas-vindas" },
  { code: "FAMILIA20", type: "fixed", value: 20, min: 90, uses: 0, max_uses: 100, active: 1, note: "R$ 20 off acima de R$ 90" },
  { code: "FRETEGRATIS", type: "freeship", value: 0, min: 60, uses: 0, max_uses: 300, active: 1, note: "Entrega grátis acima de R$ 60" },
];

export const DRIVERS = [
  { id: "d1", name: "Rafael Lima", phone: "(81) 98812-0011", vehicle: "Moto CG 160", status: "livre", deliveries: 8 },
  { id: "d2", name: "Jonas Pereira", phone: "(81) 99640-2233", vehicle: "Moto Biz", status: "em rota", deliveries: 11 },
  { id: "d3", name: "Bia Santos", phone: "(81) 99177-8890", vehicle: "Moto Fan 150", status: "livre", deliveries: 6 },
];

export const CUSTOMERS = [
  { id: "c1", name: "João Silva", phone: "(81) 99123-4567", orders: 14, spent: 742.3, last: "Hoje", tier: "VIP", addr: "Endereço de demonstração", points: 74 },
  { id: "c2", name: "Marina Costa", phone: "(81) 98877-1020", orders: 6, spent: 289.4, last: "Ontem", tier: "Recorrente", addr: "Endereço de demonstração", points: 28 },
  { id: "c3", name: "Pedro Henrique", phone: "(81) 99555-3311", orders: 1, spent: 49.9, last: "Há 3 dias", tier: "Novo", addr: "Endereço de demonstração", points: 4 },
  { id: "c4", name: "Ana Beatriz", phone: "(81) 98220-7744", orders: 22, spent: 1310.8, last: "Há 2h", tier: "VIP", addr: "Endereço de demonstração", points: 131 },
  { id: "c5", name: "Carlos Mendes", phone: "(81) 99801-4455", orders: 3, spent: 152.7, last: "Há 46 dias", tier: "Inativo", addr: "Endereço de demonstração", points: 15 },
];

export const INVENTORY = [
  { id: "i1", name: "Farinha de trigo", unit: "kg", qty: 35, min: 10 },
  { id: "i2", name: "Molho de tomate", unit: "L", qty: 12, min: 4 },
  { id: "i3", name: "Mozzarella", unit: "kg", qty: 18, min: 6 },
  { id: "i4", name: "Calabresa", unit: "kg", qty: 8, min: 3 },
  { id: "i5", name: "Catupiry", unit: "kg", qty: 5, min: 2 },
  { id: "i6", name: "Manjericão", unit: "maço", qty: 9, min: 3 },
  { id: "i7", name: "Chocolate", unit: "kg", qty: 4, min: 1 },
  { id: "i8", name: "Caixas de pizza", unit: "un", qty: 120, min: 40 },
  { id: "i9", name: "Refrigerante lata", unit: "un", qty: 94, min: 48 },
];

export const PROMOS = [
  { id: "pr1", name: "Combo da Casa", rule: "Pizza grande + bebida — oferta de demonstração", active: 1, window: "Todos os dias" },
  { id: "pr2", name: "Noite da Calabresa", rule: "Oferta demonstrativa para a pizza de calabresa", active: 1, window: "Quarta-feira" },
  { id: "pr3", name: "Final doce", rule: "Oferta demonstrativa em pizzas doces", active: 0, window: "Após 20:00" },
];

// Usuários de demonstração — troque as senhas antes de colocar o sistema no ar.
export const USERS = [
  { id: "u1", name: "Administrador", username: "admin", password: "admin123", role: "ADMIN", driver_id: null },
  { id: "u2", name: "Gerente", username: "gerente", password: "gerente123", role: "GERENTE", driver_id: null },
  { id: "u3", name: "Cozinha", username: "cozinha", password: "cozinha123", role: "COZINHA", driver_id: null },
  { id: "u4", name: "Expedição", username: "expedicao", password: "expedicao123", role: "EXPEDICAO", driver_id: null },
  { id: "u5", name: "Rafael Lima", username: "rafael", password: "entregador123", role: "ENTREGADOR", driver_id: "d1" },
  { id: "u6", name: "Jonas Pereira", username: "jonas", password: "entregador123", role: "ENTREGADOR", driver_id: "d2" },
  { id: "u7", name: "Bia Santos", username: "bia", password: "entregador123", role: "ENTREGADOR", driver_id: "d3" },
];

export const SETTINGS = {
  store_name: "Mil Grau Pizzaria",
  open: 1,
  fee: 7.9,
  min_order: 35,
  eta: "A definir",
  whatsapp: "",
  address: "",
  hours: "Seg–Dom 17:45–23:45",
  weekly_hours: JSON.stringify(WHATS_MENU_WEEKLY_HOURS),
  seq: 1047,
  pay_handle: "",
  app_base_url: "",
  whatsapp_enabled: 0,
  wa_phone_number_id: "",
  wa_access_token: "",
  wa_verify_token: "",
  wa_template: "pizzaria_status",
  ifood_enabled: 0,
  ifood_client_id: "",
  ifood_client_secret: "",
  ifood_merchant_id: "",
  printer_enabled: 0,
  printer_host: "",
  printer_port: "9100",
  printer_auto: 1,
};
