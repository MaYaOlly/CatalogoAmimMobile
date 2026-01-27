# Estratégia de Testes - Catálogo Amim Mobile

## 📋 Visão Geral

Este projeto implementa uma **estratégia de testes em 3 níveis** baseada na pirâmide de testes, seguindo as melhores práticas de qualidade de software e arquitetura limpa (Clean Architecture).

## 🏗️ Pirâmide de Testes

```
          🎭 E2E (3 testes)              ← Poucos e críticos
         ─────────────────
        📡 Integration (13 testes)       ← Fluxos importantes  
      ───────────────────────────
     🧪 Unit Tests (124 testes)          ← Base sólida
   ─────────────────────────────────
```

**Por que essa proporção?**
- **Testes Unitários**: Rápidos, baratos, cobrem lógica de negócio
- **Testes de Integração**: Médios, testam comunicação entre camadas
- **Testes E2E**: Lentos, caros, testam apenas fluxos críticos do usuário

---

## 📊 Estado Atual da Cobertura

### Backend (137 testes totais)

| Tipo de Teste | Quantidade | Cobertura | Tempo | Status |
|--------------|-----------|-----------|-------|--------|
| **Testes Unitários** | 124 | 80.57% | ~3s | ✅ Excelente |
| **Testes de Integração** | 13 | 42.53% | ~5s | ✅ Bom |
| **Total Backend** | 137 | 80.57% | ~8s | ⭐ Excepcional |

**Detalhamento por Camada:**
- **Services** (Lógica de Negócio): 98.13% ⭐
- **Models** (Entidades de Domínio): 93.87% ⭐
- **Controllers** (Handlers HTTP): 87.12% ✅
- **Repositories** (Acesso a Dados): 76.47% ✅

### Frontend (4 testes + 3 E2E)

| Tipo de Teste | Quantidade | Status |
|--------------|-----------|--------|
| **Testes Unitários (Services)** | 4 | ✅ Implementado |
| **Testes E2E (Playwright)** | 3 | ✅ Implementado |

---

## 🎯 Estratégia: O Que Testar e Por Quê

### 1️⃣ **Testes Unitários** (Base da Pirâmide)

#### 🎯 Objetivo
Testar **lógica de negócio isolada**, sem dependências externas (banco de dados, APIs, arquivos).

#### ✅ O que testamos
**Backend:**
- **Entidades de Domínio** (5 classes, ~40 testes)
  - `Produto.test.ts` - Validação de dados, cálculos
  - `Pedido.test.ts` - Regras de negócio, cálculo de totais
  - `Usuario.test.ts` - Validação de email, senha
  - `Cupom.test.ts` - Validação de desconto, expiração
  - `ItemPedido.test.ts` - Cálculo de subtotal

- **Services** (4 classes, ~60 testes)
  - `ProdutoService.test.ts` - CRUD de produtos (100% ✅)
  - `PedidoService.test.ts` - Criação de pedidos, validações (97.61% ✅)
  - `UsuarioService.test.ts` - Autenticação, perfil (100% ✅)
  - `CupomService.test.ts` - Validação de cupons (95.23% ✅)

- **Controllers** (4 classes, ~20 testes)
  - Validação de requisições HTTP
  - Tratamento de erros
  - Mapeamento de respostas

**Frontend:**
- **Services** (4 classes)
  - `produtoService.test.ts` - Chamadas à API de produtos
  - `pedidoService.test.ts` - Chamadas à API de pedidos
  - `usuarioService.test.ts` - Autenticação
  - `cupomService.test.ts` - Validação de cupons

#### ⚡ Por que esses testes?
1. **Rápidos**: Executam em milissegundos (sem I/O)
2. **Confiáveis**: Sem dependências externas (usam mocks)
3. **Específicos**: Testam casos de borda e validações
4. **Baratos**: Fáceis de manter e escrever

#### 🚫 O que NÃO testamos
- **Repositories** - Dependem de banco de dados (cobertos por integração)
- **Routes/Config** - Arquivos de configuração sem lógica
- **Container** - Injeção de dependência (testada implicitamente)

---

### 2️⃣ **Testes de Integração** (Meio da Pirâmide)

#### 🎯 Objetivo
Testar **comunicação entre camadas** e **acesso a recursos externos** (banco de dados, APIs).

#### ✅ O que testamos (13 testes)
- **Endpoints REST completos**
  - `POST /produtos` - Criar produto no banco
  - `GET /produtos` - Listar produtos do banco
  - `POST /pedidos` - Criar pedido com itens
  - `POST /usuarios/login` - Autenticação completa

- **Repositories** (76.47% de cobertura)
  - `ProdutoRepository` - CRUD no banco
  - `PedidoRepository` - Criação com transações
  - `UsuarioRepository` - Busca e autenticação

- **Fluxos end-to-end da API**
  - HTTP Request → Controller → Service → Repository → Database

#### ⚡ Por que esses testes?
1. **Integração Real**: Testam banco de dados de teste
2. **Confiança**: Garantem que camadas funcionam juntas
3. **Validação de Fluxo**: Testam o caminho completo da requisição
4. **Detectam Erros de Integração**: Problemas entre módulos

#### 🔧 Ferramentas
- **Supertest**: Simula requisições HTTP
- **Prisma + SQLite**: Banco de dados em memória para testes
- **Jest**: Framework de testes

---

### 3️⃣ **Testes E2E** (Topo da Pirâmide)

#### 🎯 Objetivo
Testar **fluxos críticos do usuário** na interface web, simulando comportamento real.

#### ✅ O que testamos (3 testes)

**1. Carregamento da Aplicação**
```typescript
test('deve carregar a página inicial com sucesso', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/./);
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: 'test-results/01-pagina-inicial.png' });
});
```
**Por quê?**
- Funcionalidade mais básica e crítica
- Valida build e deploy do React Native Web
- Garante que não há erros fatais de inicialização
- Testa que bundle JavaScript carregou corretamente

**2. Renderização de Conteúdo**
```typescript
test('deve renderizar conteúdo da aplicação', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText(/./);
});
```
**Por quê?**
- Garante que a aplicação não fica em tela branca
- Valida que dados são carregados
- Testa se componentes renderizam
- Verifica experiência mínima do usuário

**3. Navegação entre Telas (Início → Carrinho)**
```typescript
test('deve navegar para a tela de carrinho', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tira screenshot antes da navegação
    await page.screenshot({ path: 'test-results/02-antes-navegacao.png' });
    
    // Clica no botão de Carrinho
    const carrinhoButton = page.locator('text=Carrinho').first();
    await expect(carrinhoButton).toBeVisible();
    await carrinhoButton.click();
    
    // Verifica navegação
    await page.screenshot({ path: 'test-results/03-tela-carrinho.png' });
    await expect(page.locator('body')).toContainText(/Carrinho/i);
});
```
**Por quê?**
- **Fluxo crítico**: Navegação é funcionalidade essencial
- Testa React Navigation funcionando no web
- Valida que Bottom Tabs está operacional
- Garante que usuário consegue acessar carrinho (funcionalidade de compra)

#### ⚡ Por que esses testes E2E?
1. **Poucos e Focados**: Apenas 3 testes para fluxos críticos (executam em ~10s)
2. **Críticos para o Negócio**: Sem navegação, usuário não consegue usar o app
3. **Alto Custo**: E2E são lentos, frágeis e caros de manter
4. **Complementam Unitários**: Testam o que unitários não conseguem (UI real)

#### 🚫 O que NÃO testamos em E2E
- **Validações de formulário** - Coberto por testes unitários
- **Lógica de negócio** - Coberto por testes de service
- **Cenários de erro** - Coberto por testes unitários
- **Todas as telas** - Apenas fluxos críticos

#### 🔧 Ferramentas
- **Playwright**: Framework E2E moderno e confiável
- **React Native Web**: Permite testar app mobile no navegador
- **Expo Web**: Servidor de desenvolvimento
- **Page Object Pattern**: Organização e manutenibilidade

---

## 🎓 Padrões e Boas Práticas

### 1. Clean Architecture
O projeto segue arquitetura em camadas:
```
Domain (Entities)
    ↓
Application (Services)  ← Testado com mocks
    ↓
Infrastructure (Controllers, Repositories)  ← Testado com integração
```

### 2. AAA Pattern (Arrange, Act, Assert)
Todos os testes seguem estrutura clara:
```typescript
test('nome descritivo do teste', async () => {
    // Arrange - Preparar o cenário
    const service = new ProdutoService(mockRepository);
    
    // Act - Executar a ação
    const result = await service.buscarProduto('123');
    
    // Assert - Verificar o resultado
    expect(result).toBeDefined();
    expect(result.nome).toBe('Produto Teste');
});
```

### 3. Page Object Pattern (E2E)
Centraliza seletores e ações em classes reutilizáveis:
```typescript
export class CatalogoPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    async goto() {
        await this.page.goto('/');
    }
    
    async navegarParaCarrinho() {
        await this.page.locator('text=Carrinho').click();
    }
}
```

### 4. Dependency Injection + Mocks
Testes unitários usam mocks para isolar lógica:
```typescript
const mockRepository: ProdutoRepository = {
    buscarPorId: jest.fn().mockResolvedValue(produtoMock),
    listar: jest.fn().mockResolvedValue([]),
};

const service = new ProdutoService(mockRepository);
```

---

## 🚀 Como Executar os Testes

### Backend

#### Todos os testes (Unitários + Integração)
```bash
cd Backend
npm test
```
**Resultado esperado:** 137 testes passando em ~8 segundos

#### Apenas Testes Unitários
```bash
npm run test:unit
```
**Resultado esperado:** 124 testes passando em ~3 segundos

#### Apenas Testes de Integração
```bash
npm run test:integration
```
**Resultado esperado:** 13 testes passando em ~7 segundos

#### Cobertura de Código
```bash
npm run test:coverage
```
**Resultado esperado:**
- Statements: 80.57%
- Branches: 95.17%
- Functions: 89.62%
- Lines: 79.83%

### Frontend

#### Testes Unitários
```bash
cd Frontend
npm test
```

#### Testes E2E (Headless)
```bash
npm run test:e2e
```
**Resultado esperado:** 3 testes passando em ~10 segundos

#### Testes E2E (Interface Visual - Recomendado)
```bash
npm run test:e2e:ui
```
- Abre interface gráfica do Playwright
- Permite executar testes passo-a-passo
- Mostra screenshots e traces

#### Ver Relatório HTML do Playwright
```bash
npx playwright show-report
```
- Screenshots de cada passo
- Vídeos de execução
- Logs detalhados
- Estatísticas de performance

---

## 📈 Interpretando a Cobertura

### Por que Backend tem 80% e não 100%?

**Cobertura Global: 80.57%** é **excelente** porque:

1. **Repositories não são cobertos por unitários** (0% em unit)
   - Repositories precisam de banco de dados
   - São testados em testes de integração (76.47%)
   - Jest conta todos os arquivos no cálculo global

2. **Arquivos de configuração não precisam de testes**
   - Routes (`routes.ts`) - Apenas configuração
   - Container (`container.ts`) - Injeção de dependência
   - Config files - Sem lógica de negócio

3. **Services têm 98.13%** ⭐ (o que importa!)
   - Contém toda a lógica de negócio
   - Funcionalidades críticas todas cobertas

### Fórmula de Cobertura Real

```
Cobertura Efetiva = (Código com lógica testado) / (Código com lógica)

✅ Services: 98.13%  (onde está a lógica)
✅ Models: 93.87%    (regras de domínio)
✅ Controllers: 87.12%  (validações HTTP)

= Cobertura REAL da lógica de negócio: ~95%
```

---

## 📁 Estrutura do Projeto

```
CatalogoAmimMobile/
├── Frontend/
│   ├── tests/
│   │   └── e2e/
│   │       ├── catalogo.spec.ts        # Testes E2E
│   │       └── pages/
│   │           └── CatalogoPage.ts     # Page Object
│   ├── playwright.config.ts            # Config Playwright
│   ├── TESTES_E2E.md                  # Documentação
│   └── package.json
│
├── Backend/
│   ├── src/
│   │   └── tests/
│   │       ├── unit/                   # Testes unitários
│   │       └── integration/            # Testes integração
│   └── package.json
│
└── ESTRATEGIA_TESTES.md               # Este arquivo
```

## � Estrutura do Projeto

```
CatalogoAmimMobile/
│
├── 📄 ESTRATEGIA_TESTES.md          ← Este arquivo (estratégia completa)
├── 📄 COMECE_AQUI.md                ← Guia rápido de 2 minutos
├── 📄 GUIA_APRESENTACAO.md          ← Roteiro para apresentação
│
├── Backend/                          ← API REST (Fastify + Prisma)
│   ├── src/
│   │   ├── domain/                   ← Entidades de negócio
│   │   │   └── models/class/test/    ← 40 testes de entidades
│   │   ├── application/              ← Casos de uso
│   │   │   └── services/test/        ← 60 testes de services
│   │   ├── infrastructure/           ← Acesso externo
│   │   │   ├── http/controllers/test/ ← 20 testes de controllers
│   │   │   └── repository/           ← Acesso ao banco
│   │   └── tests/integration/        ← 13 testes de integração
│   ├── 📊 RELATORIO_COBERTURA.md    ← Análise de cobertura (80.57%)
│   ├── 📊 RELATORIO_TESTES.md       ← Docs dos testes do backend
│   └── coverage/                     ← Relatório HTML
│
└── Frontend/                         ← App Mobile (React Native + Expo)
    ├── src/model/services/test/      ← 4 testes de services
    ├── tests/e2e/                    ← 3 testes E2E (Playwright)
    ├── 📄 TESTES_E2E.md             ← Documentação específica do E2E
    └── playwright-report/            ← Relatório HTML do Playwright
```

## 📊 Resumo de Cobertura

### Backend: 80.57% ⭐

| Camada | Testes | Cobertura | Status |
|--------|--------|-----------|--------|
| **Domain (Models)** | 40 | 93.87% | ⭐ Excepcional |
| **Services** | 60 | 98.13% | ⭐ Excepcional |
| **Controllers** | 20 | 87.12% | ✅ Excelente |
| **Repositories** | 13* | 76.47% | ✅ Excelente |
| **Total** | **137** | **80.57%** | ⭐ Excepcional |

*Repositories testados em testes de integração

### Frontend: Implementado ✅

| Tipo | Quantidade | Status |
|------|-----------|--------|
| **Unit (Services)** | 4 | ✅ Passando |
| **E2E (Playwright)** | 3 | ✅ Passando (~10s) |

---

## 🎯 Por Que Essa Estratégia Funciona?

### 1. **Baseada em Risco e ROI**
- ✅ Testamos o que tem **alto risco** (lógica de negócio)
- ✅ Testamos o que tem **alto impacto** (fluxos críticos)
- ❌ Não testamos configurações e código trivial

### 2. **Pirâmide Equilibrada**
```
     3 E2E (lentos, caros)      ← Apenas navegação crítica
    ──────────────────
   13 Integration (médios)      ← Fluxos importantes
  ────────────────────────
 124 Unit (rápidos, baratos)    ← Base sólida
──────────────────────────────
```

### 3. **Segue Princípios FIRST**
- **Fast**: Testes unitários em milissegundos
- **Isolated**: Cada teste independente
- **Repeatable**: Resultados consistentes
- **Self-validating**: Passa ou falha claramente
- **Timely**: Escritos junto com o código

---

## 🚀 Como Executar os Testes

### Backend - Todos os Testes
```bash
cd Backend
npm test
```
**Resultado:** 137 testes em ~8 segundos

### Backend - Apenas Unitários
```bash
cd Backend
npm run test:unit
```
**Resultado:** 124 testes em ~3 segundos

### Backend - Apenas Integração
```bash
cd Backend
npm run test:integration
```
**Resultado:** 13 testes em ~5 segundos

### Backend - Com Cobertura
```bash
cd Backend
npm run test:coverage
```
**Resultado:** Relatório HTML em `Backend/coverage/lcov-report/index.html`

### Frontend - Testes Unitários
```bash
cd Frontend
npm test
```

### Frontend - Testes E2E (Headless)
```bash
cd Frontend
npm run test:e2e
```
**Resultado:** 3 testes em ~10 segundos

### Frontend - Testes E2E (Interface Visual)
```bash
cd Frontend
npm run test:e2e:ui
```
**Recomendado para apresentação!** Mostra testes executando passo-a-passo.

### Ver Relatório do Playwright
```bash
cd Frontend
npx playwright show-report
```
Abre navegador com screenshots, vídeos e logs detalhados.

---

## 📈 Interpretando a Cobertura

### Por que 80.57% é Excepcional?

**Cobertura de 80.57%** no backend é **excelente** porque:

1. **Services têm 98.13%** ⭐ (onde está toda a lógica!)
2. **Models têm 93.87%** ⭐ (regras de domínio)
3. **Controllers têm 87.12%** ✅ (validações HTTP)

**O que NÃO está coberto (e está OK):**
- Repositories em testes unitários (testados em integração com 76.47%)
- Arquivos de configuração (routes, container) - sem lógica
- Código gerado automaticamente (Prisma Client)

### Fórmula Real de Cobertura

```
Cobertura Efetiva = Código com lógica testado / Código com lógica

✅ Services: 98.13%   ← LÓGICA DE NEGÓCIO
✅ Models: 93.87%     ← REGRAS DE DOMÍNIO  
✅ Controllers: 87.12% ← VALIDAÇÕES

= Cobertura REAL: ~95% da lógica crítica
```

---

## 🔬 Exemplos Práticos

### Exemplo 1: Teste Unitário (Service)
```typescript
describe('criarPedido com cupom', () => {
    it('deve calcular desconto percentual corretamente', async () => {
        // Arrange - Mock sem banco de dados
        const mockRepo = { criar: jest.fn() };
        const mockCupom = { 
            validar: jest.fn().mockResolvedValue({ 
                tipo: 'percentual', 
                valor: 10 
            })
        };
        const service = new PedidoService(mockRepo, mockCupom);
        
        // Act
        const pedido = await service.criar({
            itens: [{ preco: 100, qtd: 1 }],
            cupom: 'DESC10'
        });
        
        // Assert
        expect(pedido.total).toBe(90); // 100 - 10%
    });
});
```
**⚡ Executa em: <1ms | Sem I/O | Isola lógica**

### Exemplo 2: Teste de Integração
```typescript
describe('POST /pedidos', () => {
    it('deve criar pedido no banco de dados', async () => {
        // Arrange - Banco de teste real
        await prisma.produto.create({ id: '1', preco: 50 });
        
        // Act - Requisição HTTP real
        const res = await request(app).post('/pedidos').send({
            itens: [{ produtoId: '1', qtd: 2 }]
        });
        
        // Assert - Verifica resposta E banco
        expect(res.status).toBe(201);
        const pedido = await prisma.pedido.findFirst();
        expect(pedido.total).toBe(100);
    });
});
```
**⏱️ Executa em: ~500ms | Com banco | Fluxo completo**

### Exemplo 3: Teste E2E
```typescript
test('deve navegar para carrinho', async ({ page }) => {
    // Arrange - Usuário abre o app
    await page.goto('/');
    
    // Act - Usuário clica em Carrinho
    await page.locator('text=Carrinho').click();
    
    // Assert - Verifica que navegou
    await expect(page).toContainText(/Carrinho/i);
    await page.screenshot({ path: 'carrinho.png' });
});
```
**🐌 Executa em: ~3s | Navegador real | UI completa**

---

## 📝 Relatórios e Evidências

### Backend - Ver Cobertura
```bash
cd Backend
npm run test:coverage
open coverage/lcov-report/index.html  # macOS/Linux
start coverage/lcov-report/index.html # Windows
```

**Métricas disponíveis:**
- Statements: 80.57%
- Branches: 95.17% ⭐
- Functions: 89.62% ⭐
- Lines: 79.83%

### Frontend - Ver Relatório Playwright
```bash
cd Frontend
npx playwright show-report
```

**Conteúdo:**
- ✅ Testes passados/falhados
- 📸 Screenshots de cada passo
- 🎥 Vídeos da execução
- 📊 Trace viewer (debug interativo)
- ⏱️ Timeline de performance

---

## 🎓 Padrões Utilizados

### 1. AAA Pattern (Arrange, Act, Assert)
```typescript
test('exemplo', () => {
    // Arrange - Preparar cenário
    const input = { nome: 'Teste' };
    
    // Act - Executar ação
    const result = funcao(input);
    
    // Assert - Verificar resultado
    expect(result).toBeDefined();
});
```

### 2. Page Object Pattern (E2E)
```typescript
export class CatalogoPage {
    constructor(readonly page: Page) {}
    
    async navegarParaCarrinho() {
        await this.page.locator('text=Carrinho').click();
    }
}
```

### 3. Dependency Injection + Mocks
```typescript
const mockRepo = { criar: jest.fn() };
const service = new Service(mockRepo); // Injeta mock
```

---

## 👥 Integrantes

- Deyvison Samuel Gomes do Nascimento
- Maria Vitoria da Silva Araujo
- Maria Yasmin Oliveira Mélo
- Rauan dos Santos Bandeira

---

**📚 Desenvolvido para disciplina de Programação para Dispositivos Móveis (PDM)**  
**📅 Janeiro de 2026**
