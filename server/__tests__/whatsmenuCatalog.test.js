import { afterEach, describe, expect, it } from "vitest";
import { DatabaseSync } from "node:sqlite";
import {
  WHATS_MENU_CATEGORIES,
  WHATS_MENU_PRODUCTS,
  WHATS_MENU_WEEKLY_HOURS,
} from "../whatsmenuCatalog.js";
import { up as importWhatsMenuCatalog } from "../migrations/006_whatsmenu_catalog.js";

let db;
afterEach(() => {
  db?.close();
  db = undefined;
});

describe("catálogo importado do WhatsMenu", () => {
  it("tem 98 produtos únicos ligados a categorias existentes", () => {
    const ids = WHATS_MENU_PRODUCTS.map((product) => product.id);
    expect(ids).toHaveLength(98);
    expect(new Set(ids).size).toBe(ids.length);
    expect(WHATS_MENU_PRODUCTS.every((product) =>
      WHATS_MENU_CATEGORIES.some((category) => category.id === product.cat)
    )).toBe(true);
  });

  it("não publica itens sem preço e não representa preço desconhecido como grátis", () => {
    const pending = WHATS_MENU_PRODUCTS.filter((product) => product.price === 0);
    expect(pending).toHaveLength(9);
    expect(pending.every((product) => product.available === false)).toBe(true);
    expect(WHATS_MENU_PRODUCTS.filter((product) => product.available).every((product) => product.price > 0)).toBe(true);
  });

  it("inclui o horário divulgado para os sete dias", () => {
    expect(Object.keys(WHATS_MENU_WEEKLY_HOURS)).toHaveLength(7);
    expect(Object.values(WHATS_MENU_WEEKLY_HOURS).every((day) =>
      day.enabled && day.open === "17:45" && day.close === "23:45"
    )).toBe(true);
  });
});

describe("migration do catálogo do WhatsMenu", () => {
  function createDb({ withLegacyProduct = true } = {}) {
    db = new DatabaseSync(":memory:");
    db.exec(`
      CREATE TABLE categories (id TEXT PRIMARY KEY, label TEXT NOT NULL, icon TEXT, pos INTEGER);
      CREATE TABLE products (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, cat TEXT NOT NULL, emoji TEXT,
        description TEXT, ingredients TEXT DEFAULT '[]', price REAL NOT NULL,
        promo REAL, time INTEGER DEFAULT 15, badges TEXT DEFAULT '[]',
        available INTEGER DEFAULT 1, groups TEXT DEFAULT '[]', stock INTEGER DEFAULT 0,
        builder INTEGER DEFAULT 0
      );
      CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT);
    `);
    if (withLegacyProduct) {
      db.prepare(`
        INSERT INTO products (id, name, cat, price, available)
        VALUES ('p1', 'Margherita demonstrativa', 'tradicionais', 36.9, 1)
      `).run();
    }
    return db;
  }

  it("importa o catálogo, arquiva os produtos de demonstração e aplica os horários uma vez", () => {
    createDb();
    importWhatsMenuCatalog(db);

    expect(db.prepare("SELECT COUNT(*) AS n FROM products WHERE id LIKE 'wm-%'").get().n).toBe(98);
    expect(db.prepare("SELECT cat, available FROM products WHERE id = 'p1'").get()).toEqual({ cat: "arquivo", available: 0 });

    const pending = db.prepare("SELECT price, available FROM products WHERE id = ?").get("wm-pizza-grande-1-sabor");
    expect(pending).toEqual({ price: 0, available: 0 });
    const clone = db.prepare("SELECT price, available, img FROM products WHERE id = ?").get("wm-clone-de-pizzas");
    expect(clone.price).toBe(64.9);
    expect(clone.available).toBe(1);

    const hours = JSON.parse(db.prepare("SELECT value FROM settings WHERE key = 'weekly_hours'").get().value);
    expect(hours).toEqual(WHATS_MENU_WEEKLY_HOURS);
    expect(db.prepare("SELECT value FROM settings WHERE key = 'hours'").get().value).toBe("Seg–Dom 17:45–23:45");
  });

  it("deixa a semente normal popular um banco novo", () => {
    createDb({ withLegacyProduct: false });
    importWhatsMenuCatalog(db);
    expect(db.prepare("SELECT COUNT(*) AS n FROM products").get().n).toBe(0);
    expect(db.prepare("SELECT COUNT(*) AS n FROM categories").get().n).toBe(0);
  });
});
