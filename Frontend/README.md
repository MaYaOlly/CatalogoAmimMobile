# Frontend - Catálogo Amim Mobile

## 📱 Visão Geral

O Frontend é uma aplicação mobile desenvolvida com **React Native** e **Expo**, que funciona como cliente para o aplicativo de catálogo e vendas da Amim. A aplicação permite que usuários naveguem por produtos, gerenciem carrinho de compras, realizem checkout e acessem informações de conta.

## 🛠️ Tecnologias Utilizadas

- **React 19.1.0** - Biblioteca UI
- **React Native 0.81.5** - Framework para desenvolvimento mobile
- **Expo 54.0.32** - Plataforma para desenvolvimento React Native
- **TypeScript 5.9.2** - Tipagem estática
- **React Navigation 7.1.26** - Navegação entre telas
- **Axios 1.13.2** - Cliente HTTP para requisições
- **Async Storage 2.2.0** - Armazenamento local de dados
- **Jest 29.7.0** - Framework de testes
- **Expo Vector Icons** - Ícones para a aplicação

## 📁 Arquitetura de Pastas

```
Frontend/
├── src/
│   ├── App.tsx                    # Componente principal da aplicação
│   ├── types.d.ts                 # Declarações de tipos globais
│   │
│   ├── contexts/                  # Contextos React para gerenciamento de estado global
│   │   ├── AuthContext.tsx        # Contexto de autenticação e dados do usuário
│   │   ├── CarrinhoContext.tsx    # Contexto do carrinho de compras
│   │   └── CheckoutContext.tsx    # Contexto do processo de checkout
│   │
│   ├── model/                     # Camada de dados e serviços
│   │   ├── entities/              # Tipos e interfaces de entidades
│   │   ├── helpers/               # Funções utilitárias e helpers
│   │   ├── infrastructure/        # Configuração de APIs e conexões
│   │   └── services/              # Serviços de negócio que se comunicam com o backend
│   │
│   ├── navigation/                # Configuração de navegação
│   │   ├── BottomTabs.tsx         # Navegação por abas inferiores
│   │   └── types.ts               # Tipos de navegação
│   │
│   ├── view/                      # Componentes de UI e páginas
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── home/                  # Componentes da tela inicial
│   │   └── pages/                 # Páginas da aplicação
│   │       ├── carrinho/          # Páginas relacionadas ao carrinho
│   │       ├── cupom/             # Página de cupons
│   │       ├── home/              # Página home
│   │       ├── logarCadastrar/    # Páginas de login e cadastro
│   │       └── user/              # Páginas de perfil e informações
│   │
│   └── ViewModel/                 # View Models com lógica de apresentação
│       ├── useAcessoUserViewModel.ts
│       ├── useCadastroViewModel.ts
│       ├── useCarrinhoViewModel.ts
│       ├── useCheckoutViewModel.ts
│       ├── useCupomViewModel.ts
│       ├── useLoginViewModel.ts
│       ├── useTelaInicialViewModel.ts
│       └── useUserViewModel.ts
│
├── assets/                        # Recursos estáticos
│   ├── icons/                     # Ícones da aplicação
│   ├── logo/                      # Logo da marca
│   ├── pictures/                  # Imagens diversas
│   └── systemicons/               # Ícones do sistema
│
├── app.json                       # Configuração do Expo
├── eas.json                       # Configuração de builds EAS
├── index.ts                       # Ponto de entrada
├── jest.config.js                 # Configuração de testes
├── package.json                   # Dependências e scripts
├── tsconfig.json                  # Configuração TypeScript
└── WHATSAPP_CONFIG.md             # Configuração de integração WhatsApp
```

## 🏗️ Padrão de Arquitetura

A aplicação segue o padrão **MVVM (Model-View-ViewModel)** com separação clara de responsabilidades:

### Model Layer (`/model`)
- **Entities**: Tipos e interfaces de dados
- **Services**: Lógica de negócio que se comunica com o backend
- **Infrastructure**: Configurações de API e conexões
- **Helpers**: Funções utilitárias reutilizáveis

### View Layer (`/view`)
- **Components**: Componentes reutilizáveis da UI
- **Pages**: Telas completas da aplicação

### ViewModel Layer (`/ViewModel`)
- Hooks customizados que centralizam a lógica de apresentação
- Conectam a View com a Model
- Gerenciam estado local da tela

### State Management
- **Contexts**: React Context API para estado global
  - `AuthContext`: Gerencia autenticação e dados do usuário
  - `CarrinhoContext`: Gerencia itens do carrinho
  - `CheckoutContext`: Gerencia dados do processo de compra

## 🎯 Fluxos Principais

### 1. Autenticação
```
TelaDeLogin → useLoginViewModel → AuthContext → Backend
```

### 2. Navegação de Produtos
```
Home → BottomTabs → Pages → Components
```

### 3. Carrinho de Compras
```
Produto → Carrinho → CarrinhoContext → TelaDeCheckout
```

### 4. Processo de Checkout
```
TelaDeCheckout1 → TelaDeCheckout2 → TelaDeCheckout3 → Backend
```

## 🚀 Como Executar

### Requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI instalado globalmente

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
# Iniciar o servidor Expo
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no navegador
npm run web
```

### Testes
```bash
# Executar testes
npm test

# Modo watch
npm test:watch

# Cobertura de testes
npm test:coverage
```

## 📱 Principais Funcionalidades

### 1. **Autenticação**
   - Login com email e senha
   - Cadastro de novos usuários
   - Persistência de sessão

### 2. **Catálogo de Produtos**
   - Listagem de produtos
   - Busca e filtros
   - Detalhes do produto

### 3. **Carrinho de Compras**
   - Adicionar/remover itens
   - Modificar quantidades
   - Cálculo automático de totais

### 4. **Checkout**
   - Processo em 3 etapas
   - Validação de informações
   - Múltiplas formas de pagamento

### 5. **Cupons**
   - Aplicar códigos de desconto
   - Validação de cupons

### 6. **Perfil do Usuário**
   - Visualizar informações da conta
   - Histórico de pedidos

## 🔄 Comunicação com Backend

A aplicação se comunica com o backend através da API REST usando **Axios**. Os endpoints são centralizados na camada de serviços (`/model/services`).

### Exemplo de Fluxo de Requisição
```typescript
Componente → ViewModel → Service → Axios → Backend → Response → Context → Componente
```

## 💾 Armazenamento Local

A aplicação utiliza **Async Storage** para persistir dados localmente:
- Credenciais de autenticação
- Dados do carrinho
- Preferências do usuário

## 🧪 Testes

A cobertura de testes abrange:
- Componentes React
- Hooks do ViewModel
- Serviços de negócio
- Contextos

Configure testes utilizando **Jest** e **ts-jest**.

## 📝 Convenções de Código

- **Componentes**: PascalCase (ex: `TelaDeLogin.tsx`)
- **Hooks/ViewModels**: camelCase com prefixo `use` (ex: `useLoginViewModel.ts`)
- **Funções utilitárias**: camelCase (ex: `formatCurrency.ts`)
- **Tipos/Interfaces**: PascalCase com prefixo `type` ou `interface`

## 🔐 Variáveis de Ambiente

Configure variáveis no arquivo `.env`:
```
REACT_APP_API_URL=http://seu-backend-url
REACT_APP_API_KEY=sua-chave
```

## 📞 Integração WhatsApp

Consulte [WHATSAPP_CONFIG.md](WHATSAPP_CONFIG.md) para detalhes sobre integração com WhatsApp.

## 🤝 Contribuindo

Ao contribuir com o projeto:
1. Siga o padrão MVVM
2. Mantenha a tipagem TypeScript
3. Adicione testes para novas funcionalidades
4. Siga as convenções de nomenclatura

## 📄 Licença

Consulte a licença do projeto no repositório principal.

---

**Última atualização:** Janeiro 2026
