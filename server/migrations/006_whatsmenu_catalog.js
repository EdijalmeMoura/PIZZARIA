import {
  WHATS_MENU_CATEGORIES,
  WHATS_MENU_PRODUCTS,
  WHATS_MENU_WEEKLY_HOURS,
} from "../whatsmenuCatalog.js";

export const name = "006_whatsmenu_catalog";

export function up(db) {
  // Em bancos novos a semente oficial já vem de server/data.js. O importador
  // aqui atualiza somente bancos que já tinham um catálogo anterior.
  const existingCount = db.prepare("SELECT COUNT(*) AS n FROM products").get().n;
  if (existingCount === 0) return;

  const productColumns = new Set(db.prepare("PRAGMA table_info(products)").all().map((column) => column.name));
  if (!productColumns.has("img")) db.exec("ALTER TABLE products ADD COLUMN img TEXT");

  const insertCategory = db.prepare(`
    INSERT INTO categories (id, label, icon, pos)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      label = excluded.label,
      icon = excluded.icon,
      pos = excluded.pos
  `);
  WHATS_MENU_CATEGORIES.forEach((category, index) => {
    insertCategory.run(category.id, category.label, category.icon, index);
  });

  // Mantém os snapshots dos pedidos antigos, mas tira os oito produtos
  // ilustrativos do cardápio e os coloca no arquivo administrativo.
  db.prepare(`
    UPDATE products
    SET cat = 'arquivo', available = 0, promo = NULL, time = 0,
        badges = '[]', groups = '[]', stock = 0, builder = 0, img = NULL
    WHERE id IN ('p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8')
  `).run();

  const upsertProduct = db.prepare(`
    INSERT INTO products (
      id, name, cat, emoji, description, ingredients, price, promo, time,
      badges, available, groups, stock, builder, img
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      cat = excluded.cat,
      emoji = excluded.emoji,
      description = excluded.description,
      ingredients = excluded.ingredients,
      price = excluded.price,
      promo = excluded.promo,
      time = excluded.time,
      badges = excluded.badges,
      available = excluded.available,
      groups = excluded.groups,
      stock = excluded.stock,
      builder = excluded.builder,
      img = excluded.img
  `);
  for (const product of WHATS_MENU_PRODUCTS) {
    upsertProduct.run(
      product.id,
      product.name,
      product.cat,
      product.emoji,
      product.desc,
      JSON.stringify(product.ingredients),
      product.price,
      product.promo,
      product.time,
      JSON.stringify(product.badges),
      product.available ? 1 : 0,
      JSON.stringify(product.groups),
      product.stock,
      product.builder ? 1 : 0,
      product.img || null,
    );
  }

  const schedule = JSON.stringify(WHATS_MENU_WEEKLY_HOURS);
  db.prepare(`
    INSERT INTO settings (key, value) VALUES ('weekly_hours', ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(schedule);
  db.prepare(`
    INSERT INTO settings (key, value) VALUES ('hours', ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run("Seg–Dom 17:45–23:45");
}
