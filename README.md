# Mil Grau — Pizzaria e Forno a Lenha

Aplicação full-stack para operação da Mil Grau Pizzaria: cardápio online, carrinho, checkout, acompanhamento do pedido, painel administrativo, cozinha, expedição, entregadores, caixa, relatórios, impressão térmica e sincronização em tempo real.

A estrutura operacional foi trazida do projeto **Tô no Sarro** e retematizada para pizzaria. A identidade visual segue a paleta aprovada da Mil Grau. O catálogo foi importado do cardápio público do WhatsMenu; itens sem preço visível ficam desativados até confirmação.

## Rodar localmente

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run dev:all
```

O Vite abre a interface e encaminha `/api`, `/img-up` e `/ws` para o backend local.

Para iniciar somente uma parte:

```bash
npm run dev          # interface (Vite)
npm run dev:server   # API e WebSocket
```

Build e execução em produção:

```bash
npm run build
npm start
```

## Painéis

| Endereço | Uso |
|---|---|
| `/` | Cardápio, carrinho, checkout e acompanhamento do cliente |
| `/admin` | Pedidos, produtos, categorias, caixa, estoque, financeiro e configurações |
| `/cozinha` | Fila de preparo (KDS) |
| `/expedicao` | Conferência e despacho |
| `/entregador` | Entregas atribuídas e confirmação de entrega |
| `/paineltv` | Painel de pedidos prontos |

Contas locais de demonstração: `admin` / `admin123`, `cozinha` / `cozinha123`, `expedicao` / `expedicao123` e `rafael` / `entregador123`. Troque as senhas antes de usar o sistema em produção.

## O que já está incluído

- Catálogo com categorias, tamanhos, bordas, adicionais e montagem de pizza.
- Carrinho persistente, cupons, delivery/retirada e checkout.
- Atualização de status em tempo real por WebSocket.
- Cadastro e edição de produtos, fotos, grupos de opcionais e disponibilidade.
- Painéis de administração, cozinha, expedição, entregadores e TV.
- Caixa/PDV, mesas, relatórios, estoque e exportação CSV.
- Impressão ESC/POS, InfinitePay, Pix, WhatsApp e integrações externas configuráveis.
- API REST, SQLite, sessões seguras e permissões por função.

## Cardápio e marca

- **Catálogo importado:** `server/whatsmenuCatalog.js`, a partir de [whatsmenu.com.br/pizzariamilgrau](https://whatsmenu.com.br/pizzariamilgrau). São 98 itens, com descrições, preços e fotos públicas quando disponíveis. Os itens explicitamente indisponíveis no site permanecem desativados; os 9 itens sem preço visível aparecem como “Preço a confirmar” e não podem ser pedidos.
- **Horários:** configurados a partir da mesma página, todos os dias das 17:45 às 23:45, no fuso `America/Recife`.
- **Loja:** cadastre endereço, WhatsApp, taxa e prazo em Admin → Configurações → Loja & Operação.
- **Logo:** `public/assets/mil-grau-logo.svg` e `public/assets/mil-grau-logo.png` são a versão completa (SVG e PNG transparente); `public/assets/mil-grau-mark.svg` é o símbolo compacto usado nos painéis e como favicon. São adaptações vetoriais feitas a partir da prévia anexada; o PNG original não ficou disponível no checkout para uma cópia pixel a pixel.
- **Imagens:** fotos públicas do WhatsMenu são vinculadas aos produtos quando disponíveis; fotos enviadas pelo Admin ficam em `server/data/uploads` e `public/img/products/` permanece como fallback.
- **Paleta:** espresso `#130E0B`, vermelho tomate `#C33B2E`, verde manjericão `#8BA578` e creme `#FFF6E8`; o âmbar `#E9A94F` fica reservado a avisos e detalhes pontuais.

O banco local fica em `server/data/pizzeria.db` (ignorado pelo Git). Para recriar a demonstração do zero, rode `npm run seed`.

## Deploy

O projeto inclui `Dockerfile` e `render.yaml`. No Render, use Node 22, `npm install --include=dev && npm run build` como build e `npm start` como comando de início. Configure armazenamento persistente para `DATA_DIR` caso queira preservar pedidos e catálogo entre deploys.
