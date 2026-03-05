# Valentine's Quest

Site interativo que eu criei como atividade/surpresa para a minha namorada.

A proposta e uma mini aventura romantica em 5 etapas pelo Porto: cada parada tem uma pista, uma pergunta sobre Friends e validacao por geolocalizacao ate chegar na surpresa final.

## O que esse projeto faz

- Fluxo de onboarding com pedido de permissao de localizacao
- 4 etapas com pista + quiz tematico de Friends
- Validacao de presenca por distancia (raio de 100m)
- Etapa final com desbloqueio progressivo de 2 codigos
- Barra de progresso e feedback visual (incluindo confetti)
- Persistencia de estado no `localStorage` para continuar de onde parou
- `dev mode` para facilitar testes sem precisar estar fisicamente nos locais

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 + CSS customizado
- lucide-react (icones)

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Depois abra `http://localhost:3000`.

Observacao: geolocalizacao no navegador exige HTTPS fora de `localhost`.

## Scripts

```bash
pnpm dev      # ambiente de desenvolvimento
pnpm build    # build de producao
pnpm start    # roda a build
pnpm lint     # lint
```

## Estrutura rapida

```text
src/app          # layout global e pagina principal
src/components   # UI (cards, quiz, progresso, confetti, etc.)
src/hooks        # controle de progresso e geolocalizacao
src/lib          # dados das quests e utilitarios
public           # assets estaticos
```

## Contexto

Projeto pessoal, feito como atividade de Dia dos Namorados.

