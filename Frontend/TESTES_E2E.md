# Testes E2E - Catálogo Amim Mobile

## Estratégia de Testes

Este projeto implementa testes em três níveis:

1. **Testes Unitários** (Jest) - Testam funções e componentes isolados
2. **Testes de Integração** (Jest + Supertest) - Testam integração entre módulos e API
3. **Testes E2E** (Playwright) - Testam fluxos completos do usuário

## Funcionalidades Testadas com Playwright

### 1. Navegação no Catálogo
**Justificativa:** Fluxo principal da aplicação. Testa se o usuário consegue navegar pela interface e visualizar produtos.

### 2. Visualização de Produtos  
**Justificativa:** Funcionalidade crítica que envolve carregamento de dados, renderização e interação do usuário.

### 3. Interação com Carrinho (planejado)
**Justificativa:** Fluxo de negócio completo que integra múltiplas telas e estados da aplicação.


## Instalação

```bash
cd Frontend
npm install
npx playwright install
```

## Executar Testes E2E

```bash
# Rodar testes (headless)
npm run test:e2e

# Rodar com interface visual
npm run test:e2e:ui
```

## Estrutura

```
Frontend/
├── tests/
│   └── e2e/
│       ├── catalogo.spec.ts      # Testes do catálogo
│       └── pages/
│           └── CatalogoPage.ts   # Page Object
├── playwright.config.ts           # Configuração do Playwright
└── package.json
```

## Page Object Pattern

Seguimos o padrão **Page Object** (usado no exemplo do professor) para:
- Centralizar seletores
- Facilitar manutenção
- Reutilizar código

```typescript
// Exemplo de uso
const catalogoPage = new CatalogoPage(page);
await catalogoPage.goto();
await catalogoPage.clickPrimeiroProduto();
```

## Testes Implementados

| Teste | Descrição |
|-------|-----------|
| ✅ Carregar página | Verifica se app inicia e renderiza |
| ✅ Renderizar conteúdo | Valida que há conteúdo na página |
| ✅ Navegar para carrinho | Testa navegação entre telas (Início → Carrinho) |

## Relatórios

Após executar os testes, um relatório HTML é gerado automaticamente em `playwright-report/`.

Para visualizar:
```bash
npx playwright show-report
```

---

**Desenvolvido para disciplina de Programação para Dispositivos Móveis (PDM)**
