// Catálogo extraído do cardápio público da Pizzaria Mil Grau.
// Fonte: https://whatsmenu.com.br/pizzariamilgrau
// Preço 0 + available:false significa que o preço não aparece no cardápio
// público; não é preço grátis e o item não pode ser pedido até confirmação.

export const WHATS_MENU_SOURCE_URL = "https://whatsmenu.com.br/pizzariamilgrau";

export const WHATS_MENU_CATEGORIES = [
  { id: "pizzas-grandes", label: "Pizzas grandes", icon: "🍕" },
  { id: "combos-pizzas", label: "Combos de pizza", icon: "🍕" },
  { id: "hamburgueres-artesanais", label: "Hambúrgueres artesanais", icon: "🍔" },
  { id: "hamburgueres-tradicionais", label: "Hambúrgueres tradicionais", icon: "🍔" },
  { id: "combos-do-dia", label: "Combos do dia", icon: "🍟" },
  { id: "batata-frita", label: "Batata frita", icon: "🍟" },
  { id: "salgados", label: "Salgados", icon: "🥟" },
  { id: "outros", label: "Outros", icon: "🍽️" },
  { id: "sobremesas", label: "Sobremesas", icon: "🍰" },
  { id: "bebidas", label: "Bebidas", icon: "🥤" },
  { id: "sucos", label: "Sucos", icon: "🧃" },
  { id: "sucos-com-leite", label: "Sucos com leite", icon: "🥛" },
  { id: "pasteis-simples", label: "Pastéis simples", icon: "🥟" },
  { id: "pasteis-especiais", label: "Pastéis especiais", icon: "🥟" },
  { id: "pasteis-doces", label: "Pastéis doces", icon: "🍫" },
  { id: "arquivo", label: "Arquivo (não publicado)", icon: "📦" },
];

const image = (path) => `https://s3.us-west-2.amazonaws.com/whatsmenu/production/${path}`;
const product = (id, name, cat, price, desc = "", emoji = "🍕", available = true, img = null) => ({
  id: `wm-${id}`,
  name,
  cat,
  emoji,
  desc,
  ingredients: [],
  price,
  promo: null,
  time: 0,
  badges: [],
  available,
  groups: [],
  stock: null,
  builder: false,
  img,
});

export const WHATS_MENU_PRODUCTS = [
  // Pizzas grandes — o site não expõe sabores nem preços nesta página.
  product("pizza-grande-1-sabor", "Pizzas Grandes — 1 Sabor", "pizzas-grandes", 0, "", "🍕", false, "https://adm.whatsmenu.com.br/pizzas/1.jpg"),
  product("pizza-grande-2-sabores", "Pizzas Grandes — 2 Sabores", "pizzas-grandes", 0, "", "🍕", false, "https://adm.whatsmenu.com.br/pizzas/2.jpg"),

  // Combos de pizza — itens sem preço visível ficam pendentes e indisponíveis.
  product("combo-2-pizzas-1-sabor", "Combo: 2 Pizzas + Refrigerante 2L — 1 Sabor", "combos-pizzas", 0, "", "🍕", false, "https://adm.whatsmenu.com.br/pizzas/1.jpg"),
  product("combo-2-pizzas-2-sabores", "Combo: 2 Pizzas + Refrigerante 2L — 2 Sabores", "combos-pizzas", 0, "", "🍕", false, "https://adm.whatsmenu.com.br/pizzas/2.jpg"),
  product("clone-de-pizzas", "Clone de pizzas", "combos-pizzas", 64.9, "", "🍕"),
  product("combo-pizza-grande-2-sabores", "Combo de pizzas grande — 2 sabores", "combos-pizzas", 0, "", "🍕", false, "https://adm.whatsmenu.com.br/pizzas/2.jpg"),
  product("combo-1-pizza-refri-1l", "Combo: 1 pizza + refri 1L — 1 sabor", "combos-pizzas", 0, "", "🍕", false, "https://s3.us-west-2.amazonaws.com/whatsmenu/production/pizzariamilgrau/pizza-products/4bbd83/pizzariamilgrausmhPVfgcesKVOCnwebp"),

  // Hambúrgueres artesanais.
  product("classico-burguer", "Clássico Burguer", "hamburgueres-artesanais", 13.9, "pão brioche, blend bovino 130G, queijo, alface, tomate, cebola caramelizada e molho especial.", "🍔", true, image("pizzariamilgrau/products/1072157/pizzariamilgrau2dhs3eykalsvzxzwebp")),
  product("mad-max-burguer", "Mad Max Burguer", "hamburgueres-artesanais", 15.9, "pão brioche, blend bovino 130G, queijo, presunto, calabresa, alface, tomate, cebola caramelizada e molho especial.", "🍔", true, image("pizzariamilgrau/products/1072162/pizzariamilgraulukvrlji7m6r9pmwebp")),
  product("eldourado-burguer", "Eldourado Burguer", "hamburgueres-artesanais", 15.9, "pão brioche, blend bovino 130G, queijo, bacon, cheddar, alface, tomate, cebola caramelizada e molho especial.", "🍔", true, image("pizzariamilgrau/products/1072167/pizzariamilgraucnv8rsujyw7ytiawebp")),
  product("cartola-burguer", "Cartola burguer", "hamburgueres-artesanais", 13.9, "pão brioche, blend bovino 130G, queijo, banana caramelizada com canela, alface e molho especial.", "🍔", true, image("pizzariamilgrau/products/1072174/pizzariamilgrau00bcwktsdsujgflwebp")),
  product("mil-grau-burguer", "Mil Grau Burguer", "hamburgueres-artesanais", 21.9, "pão brioche, 2 blend bovino 130G, queijo, bacon, cheddar, alface, tomate, cebola caramelizada e molho especial.", "🍔", true, image("pizzariamilgrau/products/1072179/pizzariamilgrauwvltj0pzsrp3dsdwebp")),
  product("combo-classico-burguer", "Combo Clássico Burguer", "hamburgueres-artesanais", 20.9, "pão brioche, blend bovino 130G, queijo, alface, tomate, cebola caramelizada e molho especial. Batata e refrigerante.", "🍔", true, image("pizzariamilgrau/products/1072183/pizzariamilgraucvwxyjmtneyohzxwebp")),
  product("combo-mad-max-burguer", "Combo Mad Max Burguer", "hamburgueres-artesanais", 22.9, "pão brioche, blend bovino 130G, queijo, presunto, calabresa, alface, tomate, cebola caramelizada e molho especial. Acompanha batata e refrigerante.", "🍔", true, image("pizzariamilgrau/products/1072186/pizzariamilgraubsxo8fxkdqc7c0ywebp")),
  product("combo-eldourado-burguer", "Combo Eldourado Burguer", "hamburgueres-artesanais", 22.9, "pão brioche, blend bovino 130G, queijo, bacon, cheddar, alface, tomate, cebola caramelizada e molho especial. Batata e refrigerante.", "🍔", true, image("pizzariamilgrau/products/1072197/pizzariamilgrauei35f4vvo7sebmqwebp")),
  product("combo-cartola-burguer", "Combo Cartola Burguer", "hamburgueres-artesanais", 20.9, "pão brioche, blend bovino 130G, queijo, banana caramelizada com canela, alface e molho especial. Batata e refrigerante.", "🍔", true, image("pizzariamilgrau/products/1072198/pizzariamilgrauhk8o2ssrmna5clpwebp")),
  product("combo-mil-grau-burguer", "Combo Mil Grau Burguer", "hamburgueres-artesanais", 28.9, "pão brioche, 2 blend bovino 130G, queijo, bacon, cheddar, alface, tomate, cebola caramelizada e molho especial. Acompanha batata e refrigerante.", "🍔", true, image("pizzariamilgrau/products/1072202/pizzariamilgraui00jj8nrbeppojtwebp")),
  product("adicional-de-carne", "Adicional de Carne", "hamburgueres-artesanais", 6, "blend 130G.", "🍔", true, image("pizzariamilgrau/products/1072295/pizzariamilgrauDq9IHOLzFVYOvtvwebp")),

  // Hambúrgueres tradicionais.
  product("hamburguer", "Hambúrguer", "hamburgueres-tradicionais", 6, "PÃO BOLA, HAMBÚRGUER, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/646955/tindice2jpg")),
  product("x-burguer", "X Burguer", "hamburgueres-tradicionais", 7, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687226/txburguer.jpg")),
  product("x-calabresa", "X Calabresa", "hamburgueres-tradicionais", 10, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, CALABRESA, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687235/tEGG.jpg")),
  product("x-bacon", "X Bacon", "hamburgueres-tradicionais", 10, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, BACON, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687239/ttbaconpng.png")),
  product("cheddar-burguer", "Cheddar Burguer", "hamburgueres-tradicionais", 10, "PÃO BOLA, HAMBÚRGUER, QUEIJO CHEDDAR, DORITOS, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687253/tcheddar.jpg")),
  product("x-egg-bacon", "X Egg Bacon", "hamburgueres-tradicionais", 12, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, BACON, OVOS, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687266/ttbaconpng.png")),
  product("x-egg-calabresa", "X Egg Calabresa", "hamburgueres-tradicionais", 11, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, CALABRESA, OVOS, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687270/t48_55caab60827f5.jpg")),
  product("x-frango", "X Frango", "hamburgueres-tradicionais", 10, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, FRANGO, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687272/tFRANGO.jpg")),
  product("x-frango-bacon", "X Frango Bacon", "hamburgueres-tradicionais", 12, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, FRANGO, OVOS, BACON, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687276/tFRANGO.jpg")),
  product("x-tudinho", "X Tudinho", "hamburgueres-tradicionais", 12, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, SALSICHA, CALABRESA, OVOS, CHEDDAR, BACON, SALADA E MOLHO ESPECIAL", "🍔", true, image("pizzariamilgrau/products/687282/ttsalsichajpg.jpg")),
  product("x-tudo", "X Tudo", "hamburgueres-tradicionais", 20, "PÃO GRANDE, HAMBÚRGUER, QUEIJO MUSSARELA, SALSICHA, CALABRESA, OVOS, CHEDDAR, BACON, SALADA E MOLHO ESPECIAL. Serve 2 pessoas.", "🍔", true, image("pizzariamilgrau/products/687283/twhatsappimage20220811at195321jpeg")),
  product("x-tudo-especial", "X Tudo Especial", "hamburgueres-tradicionais", 37.9, "PÃO GIGANTE, HAMBÚRGUER, QUEIJO MUSSARELA, SALSICHA, CALABRESA, OVOS, CHEDDAR, BACON, SALADA E MOLHO ESPECIAL. Serve 4 pessoas.", "🍔", true, image("pizzariamilgrau/products/687291/pizzariamilgrauzgpuclfyjgxyxedwebp")),
  product("x-egg", "X Egg", "hamburgueres-tradicionais", 10, "PÃO BOLA, HAMBÚRGUER, QUEIJO MUSSARELA, OVOS, SALADA E MOLHO ESPECIAL", "🍔", true, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/2642216/1000584778"),

  // Combos do dia — aparecem como indisponíveis no cardápio consultado.
  product("combo-dia-segunda", "Combo do dia — Segunda-feira", "combos-do-dia", 23.9, "2 X CALABRESA · 1 BATATA · 1 REFRIGERANTE 269ML", "🍟", false, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/710066/4_20250711_194323_0000"),
  product("combo-dia-terca", "Combo do dia — Terça-feira", "combos-do-dia", 23.9, "2 CHEDDAR BURGUER · 1 BATATA · 1 REFRIGERANTE 269ML", "🍟", false, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/711805/5_20250711_194323_0001"),
  product("combo-dia-quarta", "Combo do dia — Quarta-feira", "combos-do-dia", 23.9, "2 X BACON · 1 BATATA · 1 REFRIGERANTE 269ML", "🍟", false),
  product("combo-dia-quinta", "Combo do dia — Quinta-feira", "combos-do-dia", 23.9, "2 X FRANGO · 1 BATATA · 1 REFRIGERANTE 269ML", "🍟", false, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/714510/7_20250711_194323_0003"),
  product("combo-dia-sexta", "Combo do dia — Sexta-feira", "combos-do-dia", 31.9, "1 X TUDO · 1 BATATA · 1 REFRIGERANTE 1 LITRO", "🍟", false, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/715907/8_20250711_194323_0004"),
  product("combo-dia-sabado", "Combo do dia — Sábado", "combos-do-dia", 49.9, "1 X TUDO ESPECIAL PARA 4 PESSOAS · 1 BATATA · 1 REFRIGERANTE 2 LITROS", "🍟", false, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/716926/9_20250711_194323_0005"),

  // Batata frita.
  product("porcao-batata-8", "Porção Batata (R$ 8,00)", "batata-frita", 8, "", "🍟", true, image("pizzariamilgrau/products/2381196/pizzariamilgrauggXHRRO2aAWT1tLwebp")),
  product("porcao-batata-10", "Porção Batata (R$ 10,00)", "batata-frita", 10, "", "🍟", true, image("pizzariamilgrau/products/2381197/pizzariamilgrausIyxk6EEf6OghtUwebp")),
  product("porcao-batata-12", "Porção Batata (R$ 12,00)", "batata-frita", 12, "", "🍟", true, image("pizzariamilgrau/products/2381198/pizzariamilgrauySDJFKKDXd4Heepwebp")),
  product("porcao-batata-recheada", "Porção Batata Recheada", "batata-frita", 20, "Batata frita com cheddar e bacon", "🍟", true, image("pizzariamilgrau/products/2381199/pizzariamilgrauwrab7aaoLZ0Tl56webp")),

  // Salgados.
  product("coxinha-frango", "Coxinha Frango", "salgados", 5, "Massa Batata, melhor coxinha da região!", "🥟", true, image("pizzariamilgrau/products/2381200/pizzariamilgrauzdXdQdkE2BAW6dSwebp")),
  product("coxinha-frango-cheddar", "Coxinha Frango c/ Cheddar", "salgados", 6, "Massa Batata, melhor coxinha da região!", "🥟", true, image("pizzariamilgrau/products/2381201/pizzariamilgrauyii1lU3mPxEsyI2webp")),
  product("coxinha-frango-catupiry", "Coxinha Frango c/ Catupiry", "salgados", 6, "Massa Batata, melhor coxinha da região!", "🥟", true, image("pizzariamilgrau/products/2381202/pizzariamilgrauYBVDiBPKhDbQxnMwebp")),
  product("coxinha-charque", "Coxinha de Charque", "salgados", 7, "Massa Batata, melhor coxinha da região!", "🥟", true, image("pizzariamilgrau/products/2381203/pizzariamilgrauAqWtJ1lxe8rweAowebp")),
  product("enroladinho", "Enroladinho", "salgados", 4, "Massa Batata!", "🥟", true, image("pizzariamilgrau/products/2381204/pizzariamilgrauO3i2Q02GIkRSPEOwebp")),
  product("pao-pizza", "Pão pizza", "salgados", 7, "", "🥟"),
  product("pastel-forno-queijo", "Pastel forno queijo", "salgados", 6, "", "🥟", false),
  product("pastel-forno-frango", "Pastel forno frango", "salgados", 6, "", "🥟", false),
  product("empada-frango", "Empada frango", "salgados", 5, "", "🥟", false),
  product("empada-queijo", "Empada queijo", "salgados", 5, "", "🥟", false),
  product("empadao-frango", "Empadão de frango", "salgados", 8, "", "🥟"),

  // Outros.
  product("lasanha-fatia", "Lasanha Fatia", "outros", 10, "Lasanha de frango com molho branco", "🍽️", true, image("prencher/products/579201/t1_shutterstock_79285255-6831.jpg")),
  product("fatia-pizza", "Fatia de Pizza", "outros", 5, "", "🍕", true, image("prencher/products/579209/tdnqnp701998mlb41359704494042020ojpg")),
  product("escondidinho-charque", "Escondidinho de Charque", "outros", 10, "", "🍽️", true, image("pizzariamilgrau/products/1035370/pizzariamilgraufV6BeodF9dfU2l9webp")),

  // Sobremesas.
  product("bolo-chocolate-fatia", "Bolo de Chocolate Fatia", "sobremesas", 8, "", "🍰", true, image("prencher/products/579202/t6b86a939e2cd42320e2cce49fa9b5e80bolochocolatebrigadeiroreceitasnestle1200600jpg")),
  product("bolo-prestigio-fatia", "Bolo de prestígio Fatia", "sobremesas", 8, "", "🍰", true, image("prencher/products/579204/tboloprestigio1pngjpg")),
  product("pudim-fatia", "Pudim Fatia", "sobremesas", 5, "", "🍮", true, image("prencher/products/579205/tconceicaopudimjpeg")),
  product("bolo-pote-chocolate", "Bolo de pote chocolate", "sobremesas", 8, "", "🍰", true, image("pizzariamilgrau/products/967060/pizzariamilgraua1qoujycxaoarufwebp")),
  product("mousse-maracuja", "Mousse maracujá", "sobremesas", 5, "", "🍮"),
  product("mousse-limao", "Mousse limão", "sobremesas", 5, "", "🍮"),
  product("bolo-pote-prestigio", "Bolo de pote prestígio", "sobremesas", 8, "", "🍰"),
  product("brigadeiro", "Brigadeiro", "sobremesas", 2.5, "", "🍫"),

  // Bebidas — preços que não aparecem na página ficam pendentes.
  product("refrigerante-2l", "Refrigerantes 2 Litros", "bebidas", 0, "Escolha seu sabor!!", "🥤", false, image("prencher/products/579222/trefripng")),
  product("refrigerante-1l", "Refrigerantes 1 Litro", "bebidas", 0, "Escolha seu sabor!!", "🥤", false, image("prencher/products/579229/t08f6e5d2comboguaranaantarcticaepepsi1litrounidadeporr28501634844726jpg")),
  product("agua-500ml", "Água 500ml", "bebidas", 2.5, "", "🥤", true, image("prencher/products/579235/trjpg")),
  product("cerveja-brahma-lata", "Cerveja Lata 450ml", "bebidas", 7, "Cerveja Brahma", "🍺", true, image("pizzariamilgrau/products/579236/pizzariamilgrau8hydwrv6xkrnq7cwebp")),
  product("coca-cola-500ml", "Coca-Cola 500ml", "bebidas", 8, "", "🥤", true, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/655684/1000636248"),
  product("refri-indaia-250ml", "Refri Indaiá 250ml", "bebidas", 3, "", "🥤"),
  product("refrigerante-lata-350ml", "Lata de refrigerante 350ml", "bebidas", 0, "", "🥤", false, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/2649247/1000599450"),
  product("h2o", "H2O", "bebidas", 7, "", "🥤", true, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/2650669/h2o"),
  product("coca-zero-600ml", "Coca 600ml zero", "bebidas", 8.5, "", "🥤", false, "https://whatsmenu.s3.amazonaws.com/production/pizzariamilgrau/products/2685440/1000636249"),

  // Sucos.
  product("suco-graviola", "Graviola", "sucos", 6, "", "🧃"),
  product("suco-caju", "Caju", "sucos", 6, "", "🧃"),
  product("suco-goiaba", "Goiaba", "sucos", 6, "", "🧃"),
  product("suco-acerola", "Acerola", "sucos", 6, "", "🧃"),
  product("suco-caja", "Cajá", "sucos", 6, "", "🧃"),
  product("suco-manga", "Manga", "sucos", 6, "", "🧃"),
  product("suco-maracuja", "Maracujá", "sucos", 6, "", "🧃"),

  // Sucos com leite.
  product("suco-maracuja-leite", "Suco maracujá com leite", "sucos-com-leite", 7, "", "🥛"),
  product("suco-goiaba-leite", "Suco goiaba com leite", "sucos-com-leite", 7, "", "🥛"),
  product("suco-graviola-leite", "Suco graviola com leite", "sucos-com-leite", 7, "", "🥛"),
  product("suco-acerola-leite", "Suco acerola com leite", "sucos-com-leite", 7, "", "🥛"),
  product("suco-caja-leite", "Suco cajá com leite", "sucos-com-leite", 7, "", "🥛"),

  // Pastéis simples.
  product("pastel-carne", "Pastel carne", "pasteis-simples", 7, "carne moída, queijo mussarela, orégano e salada", "🥟"),
  product("pastel-queijo", "Queijo mussarela", "pasteis-simples", 7, "queijo mussarela, orégano e salada", "🥟"),
  product("pastel-pizza", "Pastel pizza", "pasteis-simples", 7, "mussarela, presunto, orégano e salada", "🥟"),
  product("pastel-frango-mussarela", "Pastel frango com mussarela", "pasteis-simples", 7, "frango, mussarela, orégano e salada", "🥟"),
  product("pastel-calabresa", "Pastel calabresa", "pasteis-simples", 7, "calabresa, mussarela, orégano e salada", "🥟"),
  product("pastel-queijo-coalho", "Pastel queijo coalho", "pasteis-simples", 7, "queijo coalho, orégano e saladas", "🥟"),

  // Pastéis especiais.
  product("pastel-especial-frango", "Frango", "pasteis-especiais", 14.99, "frango desfiado, mussarela, presunto, catupiry e saladas", "🥟"),
  product("pastel-especial-charque", "Charque", "pasteis-especiais", 14.99, "charque, mussarela, presunto, catupiry e saladas", "🥟"),
  product("pastel-especial-calabresa", "Calabresa", "pasteis-especiais", 14.99, "calabresa, mussarela, presunto, catupiry e saladas", "🥟"),
  product("pastel-completao", "Pastel completão", "pasteis-especiais", 17.99, "carne moída, frango, queijo, bacon, calabresa, presunto, orégano e saladas", "🥟"),

  // Pastéis doces.
  product("pastel-doce-chocolate", "Chocolate ao leite", "pasteis-doces", 14.99, "chocolate ao leite e granulado", "🍫", false),
  product("pastel-doce-prestigio", "Prestígio", "pasteis-doces", 14.99, "chocolate ao leite e coco ralado", "🍫"),
  product("pastel-doce-banana-canela", "Banana e canela", "pasteis-doces", 14.99, "banana, canela e queijo mussarela", "🍫"),
  product("pastel-doce-misto", "Misto doce", "pasteis-doces", 19.99, "chocolate ao leite, granulado, coco ralado, banana, canela, queijo e goiabada", "🍫"),
];

export const WHATS_MENU_WEEKLY_HOURS = Object.fromEntries(
  ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => [
    day,
    { enabled: true, open: "17:45", close: "23:45" },
  ])
);
