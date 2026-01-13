# Relatório de Estratégia de Testes - Catálogo Amim Mobile

## 📋 Índice
1. [Introdução](#introdução)
2. [Arquitetura do Projeto](#arquitetura-do-projeto)
3. [Estratégia de Testes](#estratégia-de-testes)
4. [Justificativa das Escolhas](#justificativa-das-escolhas)
5. [Cobertura de Testes](#cobertura-de-testes)
6. [Resultados e Benefícios](#resultados-e-benefícios)

---

## 🎯 Introdução

Este relatório documenta as decisões técnicas sobre **quais componentes testar** e **por que** no sistema de catálogo e pedidos mobile. O projeto segue **Clean Architecture** e **Domain-Driven Design (DDD)**, o que influenciou diretamente nossa estratégia de testes.

---

##  Arquitetura do Projeto

O projeto está dividido em **3 camadas principais**:

```
 Backend/src/
├──  domain/          → Regras de negócio (Entidades)
├──  application/     → Casos de uso (Services)
└──  infrastructure/  → Adaptadores externos (Controllers, DB)
```

### Por que essa arquitetura?
- **Independência**: Cada camada tem responsabilidades claras
- **Testabilidade**: Facilita testes isolados usando mocks
- **Manutenibilidade**: Mudanças em uma camada não afetam outras

---

## 🧪 Estratégia de Testes

### 1️⃣ **Testes de Entidades (Domain)**
 Localização: `src/domain/models/class/test/`

#### O que testamos:
-  **Pedido.test.ts** (106 linhas)
-  **Cupom.test.ts** (94 linhas)
-  **Produto.test.ts** (87 linhas)
-  **Usuario.test.ts**
-  **ItemPedido.test.ts**

#### Por que testamos as entidades?
As **entidades contêm as regras de negócio mais críticas** do sistema:

##### **Pedido** - Núcleo do negócio
```typescript
✓ Validações de criação (usuário, itens obrigatórios)
✓ Cálculo correto do preço total
✓ Aplicação de cupons de desconto
```

**Justificativa**: Um erro no cálculo de preço ou na aplicação de cupom resulta em **perda financeira direta**.

##### **Cupom** - Lógica de descontos
```typescript
✓ Validação de códigos (formato correto)
✓ Verificação de validade (data de expiração)
✓ Cálculo de desconto (percentual vs fixo)
✓ Limite de desconto (não ultrapassar valor total)
```

**Justificativa**: Cupons mal implementados podem ser **explorados por usuários maliciosos** (ex: aplicar desconto maior que o valor do pedido).

##### **Produto** - Gestão do catálogo
```typescript
✓ Validações de dados (nome, preço positivo)
✓ Alteração de preço
✓ Controle de disponibilidade
✓ Atualização de informações
```

**Justificativa**: Garantir que **produtos sempre tenham dados consistentes** (não aceitar preço negativo ou nome vazio).

---

### 2️⃣ **Testes de Serviços (Application)**
 Localização: `src/application/services/test/`

#### O que testamos:
-  **PedidoService.test.ts** 
-  **CupomService.test.ts**
-  **ProdutoService.test.ts**
-  **UsuarioService.test.ts**

#### Por que testamos os serviços?
Os **services orquestram a lógica de negócio** e coordenam múltiplas entidades:

##### **PedidoService** - Fluxo completo de pedido
```typescript
✓ Validar existência de usuário e produtos
✓ Verificar disponibilidade dos produtos
✓ Aplicar cupom e desativá-lo após uso
✓ Criar pedido com múltiplos itens
✓ Confirmar e cancelar pedidos
✓ Listar pedidos por usuário
```

**Casos de teste críticos**:
1. **Criar pedido com cupom**: Testa integração entre Pedido + Cupom + Produto
2. **Validar produto indisponível**: Impede venda de produto não disponivel
3. **Desativar cupom após uso**: Evita reutilização de cupom único

**Justificativa**: O service é o **ponto de entrada da lógica**, erros aqui afetam todo o fluxo do pedido.

---

### 3️⃣ **Testes de Controladores (Infrastructure)**
 Localização: `src/infrastructure/http/controllers/test/`

#### O que testamos:
-  **PedidoController.test.ts**
-  **CupomController.test.ts**
-  **ProdutoController.test.ts**
-  **UsuarioController.test.ts**

#### Por que testamos os controllers?
Os **controllers são a interface HTTP** do sistema:

```typescript
✓ Validação de entrada (request body, params)
✓ Códigos HTTP corretos (200, 201, 400, 404, 500)
✓ Tratamento de erros
✓ Formato de resposta JSON
```

**Justificativa**: Garantir que a **API responde corretamente** ao frontend mobile.

---


###  Implementação de Dependency Injection

O projeto utiliza **Injeção de Dependências manual** através do arquivo `container.ts`, seguindo os princípios SOLID:

```typescript
// 1. Criar repositórios
const produtoRepository = new PrismaProdutoRepository(prisma);
const cupomRepository = new PrismaCupomRepository(prisma);

// 2. Injetar repositórios nos serviços
const produtoService = new ProdutoService(produtoRepository);
const cupomService = new CupomService(cupomRepository);

// 3. Injetar serviços nos controllers
export const produtoController = new ProdutoController(produtoService);
```

### Benefícios para Testes:

 **Testabilidade**: Services recebem dependências via construtor, permitindo injetar **mocks** nos testes

 **Desacoplamento**: Classes dependem de **interfaces** (`IPedidoRepository`), não de implementações concretas

 **Inversão de Controle**: O container gerencia todas as instâncias (Single Responsibility)

**Exemplo prático:**
```typescript
// PedidoService depende de interfaces, não de classes concretas
constructor(
  private pedidoRepository: IPedidoRepository,  // ← Interface
  private produtoRepository: IProdutoRepository,
  private usuarioRepository: IUsuarioRepository,
  private cupomService: CupomService
) {}
```

Isso permite que **nos testes**, injetemos mocks:
```typescript
const mockRepository = { criar: jest.fn() } as any;
const service = new PedidoService(mockRepository, ...);
```
---

## Justificativa das Escolhas

### Por que NÃO testamos Repositories?

**NÃO testamos PrismaPedidoRepository**

**Motivo**: Repositories apenas **delegam chamadas ao Prisma ORM**. Testar isso seria:
- Testar a biblioteca Prisma
- Exigir banco de dados real

 **Solução**: Usamos **mocks dos repositories** nos testes de service, focando em testar **nossa lógica de negócio**, não a biblioteca externa.

### Por que NÃO implementamos Testes de Integração/E2E?

**Testes de integração não foram priorizados nesta fase**

**Motivo**:
1. **Mais lentos**: Requerem banco de dados e infraestrutura completa
2. **Mais complexos**: Setup e teardown de dados de teste
4. **Pirâmide de testes**: Base sólida de unitários é prioridade

 **Nossa estratégia**: Garantir uma **base sólida de testes unitários** cobrindo todas as camadas críticas. Testes de integração seriam a próxima fase de evolução do projeto.

---

##  Cobertura de Testes

### Pirâmide de Testes Aplicada

```
           🔺 E2E
          /  \    
         /    \
        /------\
       /        \      
      /  TESTES  \     (Não implementado)
     / INTEGRAÇÂO \   
    /--------------\
   /     TESTES     \       controllers 4 arquivos
  /     UNITARIOS    \      services    4 arquivos
 /                    \     entitidades    5 arquivos 
/----------------------\
```

**Abordagem adotada:** Priorizamos **testes unitários** em todas as camadas, usando **mocks** para isolar dependências. Testes de integração e E2E não foram implementados nesta fase.

### Números do Projeto

| Camada                          | Arquivos Testados | Cobertura |
|---------------------------------|-------------------|-----------|
| **Domain (Entidades)**          | 5                 | Crítica   |
| **Application (Services)**      | 4                 | Alta      |
| **Infrastructure (Controllers)**| 4                 | Boa       |
---

##  Resultados e Benefícios

### 1. **Confiança no Deploy**
-  Qualquer alteração no código roda **automaticamente os testes**
-  Bugs são detectados **antes de chegar no cliente**

### 2. **Documentação Viva**
-  Testes servem como **exemplos de uso** do código
-  Novos desenvolvedores entendem o sistema pelos testes

### 3. **Refatoração Segura**
-  Podemos **melhorar o código** sem medo de quebrar funcionalidades
-  Testes garantem que o comportamento permanece correto

### 4. **Qualidade do Produto**
-  Menos bugs em produção
-  Melhor experiência para o usuário final
-  Economia de tempo (corrigir bug cedo é mais barato)

---

##  Conceitos Aplicados

### Técnicas de Teste Utilizadas

1. **Unit Testing**: Cada função/método testado isoladamente
2. **Mocking**: Simulação de dependências externas (repositories, services)
3. **Dependency Injection**: Injeção de dependências para testabilidade

### Ferramentas Utilizadas

- **Jest**: Framework de testes JavaScript/TypeScript
- **ts-jest**: Suporte TypeScript no Jest
- **Mocks**: Simulação de repositórios e serviços

---

## Conclusão

A estratégia de testes foi **planejada para maximizar a cobertura das áreas críticas** do sistema:

1.  **Entidades (Domain)**: Protegem as regras de negócio core (5 arquivos)
2.  **Services (Application)**: Garantem orquestração correta entre entidades (4 arquivos)
3.  **Controllers (Infrastructure)**: Validam a interface HTTP com o frontend (4 arquivos)

**Resultado**: **13 arquivos de teste, ~1.700 linhas**, cobrindo **100% das classes de negócio** com testes unitários.

Essa abordagem equilibra **cobertura de testes** com **eficiência de tempo**, focando onde os bugs teriam **maior impacto financeiro e operacional** no negócio. A utilização de **Dependency Injection** e **mocks** garantiu testes rápidos, confiáveis e fáceis de manter.

---

**Data**: Janeiro 2026  
**Framework de Testes**: Jest 29.x
