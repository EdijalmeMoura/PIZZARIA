# Mil Grau — Pizzaria e Forno a Lenha

Aplicação full-stack para operação da Mil Grau Pizzaria: cardápio online, carrinho, checkout, acompanhamento do pedido, painel administrativo, cozinha, expedição, entregadores, caixa, relatórios, impressão térmica e sincronização em tempo real.

A estrutura operacional foi trazida do projeto **Tô no Sarro** e retematizada para pizzaria. A identidade agora usa a marca Mil Grau fornecida como referência. O catálogo e os valores em `server/data.js` continuam demonstrativos e devem ser trocados pelo cardápio oficial antes de publicar.

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

- **Catálogo temporário:** `server/data.js` — os nomes, descrições, preços, grupos e pedidos iniciais servem apenas para visualizar a interface. Substitua-os pelo cardápio da plataforma antes de vender.
- **Loja:** cadastre nome final, endereço, WhatsApp, horário, taxa e prazo em Admin → Configurações → Loja & Operação.
- **Logo:** `public/assets/mil-grau-logo.svg` e `public/assets/mil-grau-logo.png` são a versão completa (SVG e PNG transparente); `public/assets/mil-grau-mark.svg` é o símbolo compacto usado nos painéis e como favicon. São adaptações vetoriais feitas a partir da prévia anexada; o PNG original não ficou disponível no checkout para uma cópia pixel a pixel.
- **Fotos do catálogo:** `public/img/products/`; imagens carregadas pelo Admin ficam em `server/data/uploads`.
- **Paleta provisória:** espresso `#130E0B`, vermelho tomate `#C33B2E`, dourado `#E9A94F` e creme `#FFF6E8`.

O banco local fica em `server/data/pizzeria.db` (ignorado pelo Git). Para recriar a demonstração do zero, rode `npm run seed`.

## Deploy

O projeto inclui `Dockerfile` e `render.yaml`. No Render, use Node 22, `npm install --include=dev && npm run build` como build e `npm start` como comando de início. Configure armazenamento persistente para `DATA_DIR` caso queira preservar pedidos e catálogo entre deploys.
