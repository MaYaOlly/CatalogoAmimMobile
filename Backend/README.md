# 🛍️ Catálogo Amim Mobile - Backend

API REST para gerenciamento de catálogo de produtos, pedidos e usuários de uma loja de doces e salgados. Desenvolvida com **Clean Architecture**, **DDD** e foco em alta testabilidade.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelo de Dados](#modelo-de-dados)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## 🎯 Sobre o Projeto

O **Catálogo Amim Mobile Backend** é uma API robusta desenvolvida para suportar um aplicativo mobile de pedidos de doces e salgados. O sistema permite:

- 📦 Gerenciamento completo de produtos (CRUD)
- 👥 Cadastro e autenticação de usuários
- 🛒 Criação e acompanhamento de pedidos
- 🎟️ Sistema de cupons de desconto (percentual e fixo)
- 📊 Controle de estoque e disponibilidade

A aplicação foi construída seguindo os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, garantindo:
- ✅ Separação clara de responsabilidades
- ✅ Alta testabilidade (cobertura >70%)
- ✅ Fácil manutenção e escalabilidade
- ✅ Independência de frameworks

---

## 🚀 Tecnologias

### Core
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.com/)** - Tipagem estática
- **[Fastify](https://www.fastify.io/)** - Framework web de alto desempenho

### Banco de Dados
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[Redis](https://redis.io/)** - Cache em memória (opcional)

### Autenticação & Segurança
- **[JWT](https://jwt.io/)** - Autenticação via tokens
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas

### Testes
- **[Jest](https://jestjs.io/)** - Framework de testes
- **[ts-jest](https://kulshekhar.github.io/ts-jest/)** - Preset Jest para TypeScript
- **[jest-mock-extended](https://www.npmjs.com/package/jest-mock-extended)** - Mocks tipados

### Documentação
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentação interativa da API

### DevOps
- **[ts-node-dev](https://www.npmjs.com/package/ts-node-dev)** - Hot reload em desenvolvimento
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente

---

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** dividido em 3 camadas:

```
┌─────────────────────────────────────────────┐
│         INFRASTRUCTURE LAYER                │
│  (Controllers, Routes, Database, HTTP)      │
├─────────────────────────────────────────────┤
│         APPLICATION LAYER                   │
│     (Services, Use Cases, DTOs)             │
├─────────────────────────────────────────────┤
│           DOMAIN LAYER                      │
│   (Entities, Business Rules, Interfaces)    │
└─────────────────────────────────────────────┘
```

### Camadas

#### 1. **Domain Layer** (`src/domain/`)
- 📦 **Entidades**: Modelos de negócio (`Produto`, `Pedido`, `Cupom`, `Usuario`)
- 📋 **Interfaces**: Contratos de repositórios e serviços
- 🎯 **Regras de Negócio**: Validações, cálculos de desconto, totais

#### 2. **Application Layer** (`src/application/`)
- 🔧 **Services**: Orquestração de casos de uso
- 🔄 **Lógica de Aplicação**: Coordenação entre entidades e repositórios

#### 3. **Infrastructure Layer** (`src/infrastructure/`)
- 🌐 **Controllers**: Handlers HTTP
- 🛣️ **Routes**: Definição de endpoints
- 💾 **Repositories**: Implementação Prisma
- 🔌 **HTTP**: Configuração Fastify

### Benefícios dessa Arquitetura
- ✅ **Testabilidade**: Cada camada pode ser testada isoladamente
- ✅ **Flexibilidade**: Fácil trocar Fastify por Express, Prisma por TypeORM
- ✅ **Manutenibilidade**: Mudanças em uma camada não afetam as outras
- ✅ **Escalabilidade**: Adicionar novas features sem quebrar o código existente

---

## ✨ Funcionalidades

### 👤 Usuários
- ✅ Cadastro de usuários
- ✅ Autenticação com JWT
- ✅ Atualização de perfil
- ✅ Gerenciamento de endereço e telefone

### 📦 Produtos
- ✅ Listagem de produtos disponíveis
- ✅ Filtro por categoria (doces/salgados)
- ✅ Busca por ID
- ✅ CRUD completo de produtos
- ✅ Controle de disponibilidade
- ✅ Upload de imagens

### 🛒 Pedidos
- ✅ Criação de pedidos com múltiplos itens
- ✅ Cálculo automático de total
- ✅ Aplicação de cupons de desconto
- ✅ Histórico de pedidos por usuário
- ✅ Atualização de status (pendente → confirmado → enviado → entregue)
- ✅ Escolha de forma de pagamento

### 🎟️ Cupons
- ✅ Criação de cupons (percentual ou fixo)
- ✅ Validação de data de validade
- ✅ Validação de código único
- ✅ Desativação automática após uso
- ✅ Limite de desconto (não pode exceder valor total)

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**
- **[PostgreSQL](https://www.postgresql.org/)** (versão 14 ou superior)
- **[Git](https://git-scm.com/)**
- **[Redis](https://redis.io/)** (opcional, para cache)

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/CatalogoAmimMobile.git
cd CatalogoAmimMobile/Backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados PostgreSQL

Crie um banco de dados no PostgreSQL:

```sql
CREATE DATABASE catalogo_amim;
```

---

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/catalogo_amim"
DIRECT_URL="postgresql://usuario:senha@localhost:5432/catalogo_amim"

# Redis (opcional)
REDIS_URL="redis://localhost:6379"

# API
PORT=3333
NODE_ENV="development"
```

### 2. Execute as Migrações do Prisma

```bash
npx prisma migrate dev
```

Este comando irá:
- Criar as tabelas no banco de dados
- Gerar o Prisma Client
- Executar as migrations existentes

### 3. (Opcional) Seed do Banco de Dados

Se você tiver um arquivo de seed, execute:

```bash
npx prisma db seed
```

---

## 🚀 Como Usar

### Modo Desenvolvimento (com hot reload)

```bash
npm run dev
```

A API estará disponível em: **http://localhost:3333**

### Modo Produção

1. Compile o TypeScript:

```bash
npm run build
```

2. Inicie o servidor:

```bash
npm start
```

### Acessar Documentação Swagger

Abra no navegador: **http://localhost:3333/docs**

---

## 🧪 Testes

O projeto possui **cobertura de testes >70%** seguindo as melhores práticas.

### Executar Todos os Testes

```bash
npm test
```

### Modo Watch (desenvolvimento)

```bash
npm run test:watch
```

### Cobertura de Código

```bash
npm run test:coverage
```

Relatório será gerado em: `coverage/lcov-report/index.html`

### Tipos de Testes

#### 1. **Testes de Entidades** (`domain/models/class/test/`)
Testam as regras de negócio puras:
- ✅ Validações de criação
- ✅ Cálculos de preço e desconto
- ✅ Aplicação de cupons
- ✅ Mudanças de estado

#### 2. **Testes de Services** (`application/services/test/`)
Testam a orquestração de casos de uso:
- ✅ Integração entre entidades
- ✅ Validações de negócio complexas
- ✅ Tratamento de erros

#### 3. **Testes de Controllers** (`infrastructure/http/controllers/test/`)
Testam os handlers HTTP:
- ✅ Status codes corretos
- ✅ Validação de entrada
- ✅ Formatação de resposta

### Exemplo de Execução

```bash
 PASS  src/domain/models/class/test/Pedido.test.ts
 PASS  src/domain/models/class/test/Cupom.test.ts
 PASS  src/application/services/test/PedidoService.test.ts

Test Suites: 3 passed, 3 total
Tests:       45 passed, 45 total
Snapshots:   0 total
Time:        3.142s
```

📄 Para detalhes completos sobre a estratégia de testes, consulte: [RELATORIO_TESTES.md](RELATORIO_TESTES.md)

---

## 📚 Documentação da API

### Swagger UI

Acesse a documentação interativa em: **http://localhost:3333/docs**

---

## 🛣️ Rotas Detalhadas

### 📦 Produtos

#### `GET /produtos`
Lista todos os produtos disponíveis.

**Request:**
```http
GET /produtos
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "nome": "Brigadeiro Gourmet",
    "descricao": "Brigadeiro de chocolate belga",
    "preco": 3.50,
    "categoria": "doce",
    "imagemUrl": "https://exemplo.com/brigadeiro.jpg",
    "disponivel": true
  }
]
```

**Erros:**
- `500` - Erro ao listar produtos

---

#### `GET /produtos/:id`
Busca um produto específico pelo ID.

**Request:**
```http
GET /produtos/uuid-do-produto
```

**Response (200):**
```json
{
  "id": "uuid-do-produto",
  "nome": "Brigadeiro Gourmet",
  "descricao": "Brigadeiro de chocolate belga",
  "preco": 3.50,
  "categoria": "doce",
  "imagemUrl": "https://exemplo.com/brigadeiro.jpg",
  "disponivel": true
}
```

**Erros:**
- `404` - Produto não encontrado
- `500` - Erro ao buscar produto

---

#### `POST /produtos`
Cria um novo produto.

**Request:**
```json
{
  "nome": "Bolo de Cenoura",
  "descricao": "Bolo fofinho com cobertura de chocolate",
  "preco": 25.00,
  "categoria": "doce",
  "imagem": "https://exemplo.com/bolo.jpg",
  "disponivel": true
}
```

**Response (201):**
```json
{
  "id": "uuid-gerado",
  "nome": "Bolo de Cenoura",
  "descricao": "Bolo fofinho com cobertura de chocolate",
  "preco": 25.00,
  "categoria": "doce",
  "imagemUrl": "https://exemplo.com/bolo.jpg",
  "disponivel": true
}
```

**Erros:**
- `500` - Erro ao criar produto

---

#### `PATCH /produtos/:id`
Atualiza um produto existente (campos opcionais).

**Request:**
```json
{
  "preco": 28.00,
  "disponivel": false
}
```

**Response (200):**
```json
{
  "id": "uuid-do-produto",
  "nome": "Bolo de Cenoura",
  "descricao": "Bolo fofinho com cobertura de chocolate",
  "preco": 28.00,
  "categoria": "doce",
  "imagemUrl": "https://exemplo.com/bolo.jpg",
  "disponivel": false
}
```

**Erros:**
- `404` - Produto não encontrado para atualização
- `500` - Erro ao atualizar produto

---

#### `DELETE /produtos/:id`
Deleta um produto.

**Request:**
```http
DELETE /produtos/uuid-do-produto
```

**Response (204):**
```
No Content
```

**Erros:**
- `404` - Produto não encontrado para deleção
- `500` - Erro ao deletar produto

---

### 👤 Usuários

#### `POST /usuarios`
Cadastra um novo usuário.

**Request:**
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123",
  "endereco": "Rua das Flores, 123",
  "telefone": "(11) 98765-4321"
}
```

**Response (201):**
```json
{
  "id": "uuid-gerado",
  "nome": "João Silva",
  "email": "joao@example.com"
}
```

**Erros:**
- `400` - Erro de validação (email já cadastrado, senha fraca, etc.)

---

#### `POST /usuarios/login`
Autentica um usuário.

**Request:**
```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "id": "uuid-do-usuario",
  "nome": "João Silva",
  "email": "joao@example.com",
  "message": "Login bem-sucedido!"
}
```

**Erros:**
- `401` - Credenciais inválidas

---

#### `PATCH /usuarios/:id`
Atualiza o perfil de um usuário (campos opcionais).

**Request:**
```json
{
  "nome": "João Silva Santos",
  "endereco": "Rua das Flores, 456",
  "telefone": "(11) 91234-5678"
}
```

**Response (200):**
```json
{
  "id": "uuid-do-usuario",
  "nome": "João Silva Santos",
  "email": "joao@example.com",
  "endereco": "Rua das Flores, 456",
  "telefone": "(11) 91234-5678"
}
```

**Erros:**
- `404` - Usuário não encontrado
- `400` - Erro de validação

---

### 🛒 Pedidos

#### `POST /pedidos`
Cria um novo pedido.

**Request:**
```json
{
  "usuarioId": "uuid-do-usuario",
  "itens": [
    {
      "produtoId": "uuid-do-produto-1",
      "quantidade": 10
    },
    {
      "produtoId": "uuid-do-produto-2",
      "quantidade": 5
    }
  ],
  "formaPagamento": "pix",
  "cupomCodigo": "DESCONTO10"
}
```

**Response (201):**
```json
{
  "id": "uuid-do-pedido",
  "usuarioId": "uuid-do-usuario",
  "itens": [
    {
      "id": "uuid-item-1",
      "produtoId": "uuid-do-produto-1",
      "quantidade": 10,
      "precoUnitario": 3.50
    },
    {
      "id": "uuid-item-2",
      "produtoId": "uuid-do-produto-2",
      "quantidade": 5,
      "precoUnitario": 25.00
    }
  ],
  "precoTotal": 156.50,
  "status": "realizado",
  "formaPagamento": "pix",
  "cupomId": "uuid-do-cupom",
  "data": "2026-01-20T14:30:00.000Z"
}
```

**Erros:**
- `400` - Usuário não encontrado, produto indisponível, cupom inválido
- `500` - Erro interno ao criar o pedido

---

#### `GET /pedidos/:id`
Busca um pedido específico pelo ID.

**Request:**
```http
GET /pedidos/uuid-do-pedido
```

**Response (200):**
```json
{
  "id": "uuid-do-pedido",
  "usuarioId": "uuid-do-usuario",
  "itens": [...],
  "precoTotal": 156.50,
  "status": "realizado",
  "formaPagamento": "pix",
  "cupomId": "uuid-do-cupom",
  "data": "2026-01-20T14:30:00.000Z"
}
```

**Erros:**
- `404` - Pedido não encontrado

---

#### `GET /pedidos/usuario/:usuarioId`
Lista todos os pedidos de um usuário.

**Request:**
```http
GET /pedidos/usuario/uuid-do-usuario
```

**Response (200):**
```json
[
  {
    "id": "uuid-pedido-1",
    "precoTotal": 156.50,
    "status": "entregue",
    "data": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "uuid-pedido-2",
    "precoTotal": 89.00,
    "status": "confirmado",
    "data": "2026-01-20T14:30:00.000Z"
  }
]
```

**Erros:**
- `500` - Erro interno ao listar os pedidos

---

#### `PATCH /pedidos/:id/confirmar`
Confirma um pedido (muda status).

**Request:**
```http
PATCH /pedidos/uuid-do-pedido/confirmar
```

**Response (200):**
```json
{
  "id": "uuid-do-pedido",
  "status": "confirmado",
  ...
}
```

**Erros:**
- `400` - Erro ao confirmar pedido (pedido já finalizado, etc.)

---

#### `PATCH /pedidos/:id/cancelar`
Cancela um pedido.

**Request:**
```http
PATCH /pedidos/uuid-do-pedido/cancelar
```

**Response (200):**
```json
{
  "id": "uuid-do-pedido",
  "status": "cancelado",
  ...
}
```

**Erros:**
- `400` - Erro ao cancelar pedido

---

### 🎟️ Cupons

#### `POST /cupons`
Cria um novo cupom de desconto.

**Request:**
```json
{
  "codigo": "DESCONTO10",
  "tipoDesconto": "percentual",
  "valorDesconto": 10,
  "dataValidade": "2026-12-31T23:59:59.000Z",
  "ativo": true
}
```

**Tipos de desconto:**
- `percentual` - Desconto em porcentagem (ex: 10 = 10%)
- `fixo` - Desconto em valor fixo (ex: 10 = R$ 10,00)

**Response (201):**
```json
{
  "id": "uuid-do-cupom",
  "codigo": "DESCONTO10",
  "tipoDesconto": "percentual",
  "valorDesconto": 10,
  "dataValidade": "2026-12-31T23:59:59.000Z",
  "ativo": true
}
```

**Erros:**
- `400` - Código já existe, valor inválido, data inválida

---

#### `GET /cupons`
Lista todos os cupons cadastrados.

**Request:**
```http
GET /cupons
```

**Response (200):**
```json
[
  {
    "id": "uuid-cupom-1",
    "codigo": "DESCONTO10",
    "tipoDesconto": "percentual",
    "valorDesconto": 10,
    "dataValidade": "2026-12-31T23:59:59.000Z",
    "ativo": true
  },
  {
    "id": "uuid-cupom-2",
    "codigo": "PRIMEIRACOMPRA",
    "tipoDesconto": "fixo",
    "valorDesconto": 15,
    "dataValidade": "2026-06-30T23:59:59.000Z",
    "ativo": true
  }
]
```

**Erros:**
- `400` - Erro ao buscar cupons

---

### 📝 Observações Importantes

1. **Autenticação**: Atualmente o sistema não utiliza JWT nas rotas. Para implementar autenticação, adicione o header:
   ```
   Authorization: Bearer {token}
   ```

2. **Validações de Pedido**:
   - O usuário deve existir
   - Todos os produtos devem estar disponíveis
   - Se informar cupom, ele deve ser válido e ativo

3. **Cupons**:
   - São desativados automaticamente após o uso
   - Desconto percentual não pode exceder 100%
   - Desconto fixo não pode ser maior que o valor total do pedido

4. **Status de Pedidos**:
   - `realizado` → `confirmado` → `enviado` → `entregue`
   - Pedidos podem ser cancelados antes de serem enviados

---

## 📁 Estrutura do Projeto

```
Backend/
├── prisma/
│   ├── schema.prisma              # Schema do banco de dados
│   └── migrations/                # Histórico de migrações
│
├── src/
│   ├── domain/                    # Camada de Domínio
│   │   └── models/
│   │       ├── class/             # Entidades (Produto, Pedido, etc)
│   │       │   └── test/          # ✅ Testes unitários das entidades
│   │       └── interfaces/        # Contratos (repositories, services)
│   │
│   ├── application/               # Camada de Aplicação
│   │   └── services/              # Serviços de caso de uso
│   │       └── test/              # ✅ Testes dos services
│   │
│   ├── infrastructure/            # Camada de Infraestrutura
│   │   ├── http/
│   │   │   ├── controllers/       # Controllers HTTP
│   │   │   │   └── test/          # ✅ Testes dos controllers
│   │   │   ├── routes/            # Definição de rotas
│   │   │   └── container.ts       # Dependency Injection
│   │   ├── prisma/
│   │   │   └── PrismaClient.ts    # Cliente Prisma
│   │   └── repository/            # Implementações de repositórios
│   │
│   ├── tests/
│   │   └── setup.ts               # Configuração global de testes
│   │
│   └── server.ts                  # Ponto de entrada da aplicação
│
├── coverage/                      # Relatórios de cobertura
├── dist/                          # Build de produção
├── node_modules/                  # Dependências
│
├── .env                           # Variáveis de ambiente (não versionado)
├── .gitignore                     # Arquivos ignorados pelo Git
├── jest.config.js                 # Configuração do Jest
├── package.json                   # Dependências e scripts
├── tsconfig.json                  # Configuração do TypeScript
├── RELATORIO_TESTES.md            # Documentação de testes
└── README.md                      # Este arquivo
```

---

## 💾 Modelo de Dados

### Diagrama ER Simplificado

```
┌─────────────┐         ┌──────────────┐
│  Usuario    │1──────n│   Pedido     │
│             │         │              │
│ - id        │         │ - id         │
│ - nome      │         │ - usuarioId  │
│ - email     │         │ - precoTotal │
│ - senha     │         │ - status     │
│ - endereco  │         │ - data       │
│ - telefone  │         └──────────────┘
└─────────────┘                │
                              │
                              │ n
                              │
                        ┌──────────────┐
                        │  ItemPedido  │
                        │              │
                        │ - id         │
                        │ - pedidoId   │
                        │ - produtoId  │
                        │ - quantidade │
                        └──────────────┘
                              │
                              │ n
                              │
┌─────────────┐               │
│   Cupom     │               │
│             │1──────────────┘
│ - id        │         ┌──────────────┐
│ - codigo    │         │   Produto    │
│ - desconto  │         │              │
│ - validade  │         │ - id         │
│ - ativo     │         │ - nome       │
└─────────────┘         │ - descricao  │
                        │ - preco      │
                        │ - categoria  │
                        │ - disponivel │
                        └──────────────┘
```

### Tabelas Principais

#### **produtos**
- Catálogo de doces e salgados
- Controle de disponibilidade
- Categorização (doce/salgado)

#### **usuarios**
- Dados de cadastro
- Senhas criptografadas com bcrypt
- Informações de contato

#### **pedidos**
- Histórico de compras
- Status do pedido
- Forma de pagamento
- Aplicação de cupons

#### **itens_pedido**
- Relacionamento N:N entre Pedido e Produto
- Armazena quantidade e preço no momento da compra

#### **cupons**
- Códigos de desconto únicos
- Desconto percentual ou fixo
- Controle de validade e ativação

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot reload

# Build & Produção
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia servidor em produção

# Testes
npm test                 # Executa todos os testes
npm run test:watch       # Modo watch para desenvolvimento
npm run test:coverage    # Gera relatório de cobertura
npm run test:unit        # Executa apenas testes unitários
npm run test:integration # Executa apenas testes de integração

# Prisma
npx prisma migrate dev   # Cria nova migration
npx prisma studio        # Abre interface visual do banco
npx prisma generate      # Gera Prisma Client
npx prisma db push       # Sincroniza schema sem migration
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrões de Código

- ✅ Use TypeScript estrito
- ✅ Siga Clean Architecture
- ✅ Escreva testes para novas features
- ✅ Mantenha cobertura >70%
- ✅ Documente com JSDoc

---

## 📝 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para o projeto Catálogo Amim Mobile

---

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

- 🐛 Abra uma [issue](https://github.com/seu-usuario/CatalogoAmimMobile/issues)
- 📧 Entre em contato via email
- 💬 Participe das discussões

---

## 🎉 Agradecimentos

Obrigado por usar o Catálogo Amim Mobile Backend! 

Se este projeto foi útil para você, considere dar uma ⭐ no repositório!

---

**Feito com TypeScript, Fastify e muito ☕**