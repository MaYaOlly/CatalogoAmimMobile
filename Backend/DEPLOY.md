# 🚀 Guia de Deploy - Catálogo Amim Backend

## 📋 Informações do Projeto

- **Tipo:** Trabalho de Faculdade
- **Hospedagem API:** AWS Lightsail ($3.50-5/mês)
- **Banco de Dados:** Supabase (GRÁTIS ✅)
- **Deploy:** Simples e direto (sem Docker)
- **Autenticação:** Sem JWT (API aberta)

---

## ✅ Checklist Pré-Deploy (Simplificado)

### Obrigatório
- [x] ✅ Banco de dados configurado (Supabase - GRÁTIS)
- [ ] Ter instância Lightsail criada
- [ ] Configurar variáveis de ambiente (`.env`)
- [ ] Rodar testes: `npm run test:coverage`
- [ ] Gerar build: `npm run build`

### Opcional (para trabalho de faculdade, pode pular)
- [ ] Configurar SSL/TLS
- [ ] Adicionar rate limiting
- [ ] Configurar monitoramento

---

## 🎯 DEPLOY NO AWS LIGHTSAIL (RECOMENDADO)

### Passo 1: Criar Instância Lightsail

1. **Acesse o AWS Lightsail**
   - Vá em [lightsail.aws.amazon.com](https://lightsail.aws.amazon.com)

2. **Criar Instância**
   - Clique em "Create Instance"
   - Plataforma: **Linux/Unix**
   - Blueprint: **Node.js** (já vem com Node.js instalado)
   - Plano: **$3.50/mês** ou **$5/mês** (suficiente para trabalho de faculdade)
   - Nome: `catalogoamim-api`

3. **~~Criar Banco de Dados~~** ✅ JÁ TEM (Supabase - Grátis!)
   - ~~Vá em "Databases" → "Create database"~~
   - ~~Engine: **PostgreSQL**~~
   - ~~Plano: **$15/mês** (o mais barato)~~
   - **Você já tem banco Supabase configurado no `.env`!** 🎉

### Passo 2: Conectar via SSH

1. **Acessar a instância**
   - No painel Lightsail, clique na sua instância
   - Clique em "Connect using SSH" (abre terminal no navegador)
   
   **OU** use SSH local:
   ```bash
   # Baixe a chave SSH do Lightsail
   ssh -i LightsailDefaultKey.pem bitnami@seu-ip-publico
   ```

### Passo 3: Preparar o Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Verificar Node.js (deve estar instalado)
node --version
npm --version

# Instalar Git (se não tiver)
sudo apt install git -y

# Instalar PM2 (mantém a aplicação rodando)
sudo npm install -g pm2
```

### Passo 4: Clonar e Configurar Projeto

```bash
# Ir para diretório apropriado
cd /home/bitnami

# Clonar repositório
git clone https://github.com/seu-usuario/CatalogoAmimMobile.git
cd CatalogoAmimMobile/Backend

# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate
```

### Passo 5: Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env
nano .env
```

**Cole o seguinte (ajuste com seus dados):**

```env
# Database Supabase (JÁ CONFIGURADO - GRÁTIS! ✅)
DATABASE_URL="postgresql://postgres.oqhqtasblhdgcgepapbm:AminCatalogo1@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.oqhqtasblhdgcgepapbm:AminCatalogo1@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

# Server
NODE_ENV="production"
PORT=3333
HOST="0.0.0.0"

# CORS (URL do seu frontend, ou * para aceitar tudo)
CORS_ORIGIN="*"

# Logs
LOG_LEVEL="info"
```

**Salvar:** `Ctrl+O` → `Enter` → `Ctrl+X`

### Passo 6: Aplicar Migrations

```bash
# Aplicar migrations no banco de produção
npx prisma migrate deploy

# (Opcional) Verificar se funcionou
npx prisma studio
```

### Passo 7: Gerar Build

```bash
# Compilar TypeScript para JavaScript
npm run build

# Verificar se dist/ foi criado
ls dist/
```

### Passo 8: Iniciar Aplicação com PM2

```bash
# Iniciar com PM2
pm2 start dist/server.js --name catalogoamim-api

# Configurar para iniciar automaticamente após reinicialização
pm2 startup
# Copie e execute o comando que aparece (algo como: sudo env PATH=...)

# Salvar configuração
pm2 save

# Ver logs
pm2 logs catalogoamim-api

# Ver status
pm2 status
```

### Passo 9: Configurar Firewall

```bash
# Permitir tráfego na porta 3333
sudo ufw allow 3333

# Verificar status do firewall
sudo ufw status
```

**No painel do Lightsail:**
1. Vá em "Networking"
2. Adicione regra de firewall:
   - Application: **Custom**
   - Protocol: **TCP**
   - Port: **3333**

### Passo 10: Testar

```bash
# Testar localmente no servidor
curl http://localhost:3333/health

# Pegar IP público da instância (no painel Lightsail)
# Testar no navegador:
# http://SEU-IP-PUBLICO:3333/health
# http://SEU-IP-PUBLICO:3333/docs
```

---

## 🔄 Atualizar a Aplicação (Após Mudanças)

```bash
# Conectar via SSH
ssh -i LightsailDefaultKey.pem bitnami@seu-ip-publico

# Ir para o diretório do projeto
cd /home/bitnami/CatalogoAmimMobile/Backend

# Puxar últimas mudanças
git pull origin main

# Reinstalar dependências (se mudou package.json)
npm install

# Gerar Prisma Client (se mudou schema.prisma)
npx prisma generate

# Aplicar migrations (se houver novas)
npx prisma migrate deploy

# Gerar novo build
npm run build

# Reiniciar aplicação
pm2 restart catalogoamim-api

# Ver logs
pm2 logs catalogoamim-api
```

---

## 📊 Comandos Úteis PM2

```bash
# Ver status de todas as aplicações
pm2 status

# Ver logs em tempo real
pm2 logs catalogoamim-api

# Parar aplicação
pm2 stop catalogoamim-api

# Reiniciar aplicação
pm2 restart catalogoamim-api

# Remover aplicação
pm2 delete catalogoamim-api

# Ver informações detalhadas
pm2 info catalogoamim-api

# Limpar logs
pm2 flush
```

---

## ❓ Troubleshooting

### Aplicação não inicia

```bash
# Ver logs de erro
pm2 logs catalogoamim-api

# Tentar iniciar manualmente para ver erro
cd /home/bitnami/CatalogoAmimMobile/Backend
npm start
```

### Erro de conexão com banco

```bash
# Testar conexão com banco
npx prisma db pull

# Verificar se variáveis de ambiente estão corretas
cat .env

# Verificar se banco está acessível
# No painel Lightsail → Database → Endpoint
```

### Porta 3333 não acessível

1. **Verificar firewall no Lightsail:**
   - Painel → Networking → Add rule
   - Protocol: TCP, Port: 3333

2. **Verificar se aplicação está rodando:**
   ```bash
   pm2 status
   curl http://localhost:3333/health
   ```

### Build falhando

```bash
# Limpar e reinstalar
rm -rf node_modules dist
npm install
npm run build
```

---

## 📱 Conectar Frontend Mobile

Após deploy, sua API estará disponível em:
```
http://SEU-IP-PUBLICO:3333
```

**No seu app mobile (React Native/Expo):**
```javascript
const API_URL = 'http://SEU-IP-PUBLICO:3333';

// Exemplo de requisição
fetch(`${API_URL}/produtos`)
  .then(res => res.json())
  .then(data => console.log(data));
```

**⚠️ Importante:** Para produção real (não trabalho de faculdade), configure HTTPS/SSL.

---

## 🐳 Sobre Docker (Opcional - Mais Complexo)

Os arquivos Docker criados são **opcionais**:

- **`Dockerfile`**: Empacota a aplicação em um container
- **`docker-compose.yml`**: Orquestra API + PostgreSQL + Redis
- **`.dockerignore`**: Exclui arquivos desnecessários

**Para seu caso (Lightsail + trabalho de faculdade):**
- ❌ **NÃO precisa** usar Docker
- ✅ **Use o guia acima** (mais simples)
- Docker é útil para ambientes mais complexos

Se quiser usar Docker no futuro:
```bash
# Na sua máquina local
docker-compose up -d

# Acesse: http://localhost:3333
```

---

## 💰 Custos Estimados (AWS Lightsail)

Para trabalho de faculdade:

| Recurso | Plano | Custo/mês |
|---------|-------|-----------|
| Instância (API) | $3.50 ou $5 | $3.50 - $5 |
| Database (PostgreSQL) | $15 | $15 |
| **TOTAL** | | **~$20/mês** |

**~~Database (PostgreSQL)~~ | ~~$15~~ | **GRÁTIS (Supabase)** ✅ |
| **TOTAL** | | **$3.50 - $5/mês** 💰 |

**Economia:** $15/mês usando Supabase ao invés de Lightsail Database!
---

## 📝 Checklist Final

Antes de apresentar o trabalho:

- [ ] API respondendo em `http://SEU-IP:3333/health`
- [ ] Swagger acessível em `http://SEU-IP:3333/docs`
- [ ] Todos os endpoints funcionando
- [ ] Banco de dados com dados de teste (se necessário)
- [ ] Frontend mobile conectado à API
- [ ] PM2 configurado (aplicação reinicia automaticamente)

---

## 🎓 Dicas para Apresentação do Trabalho

1. **Mostre a documentação Swagger:** `http://SEU-IP:3333/docs`
2. **Demonstre o health check:** `http://SEU-IP:3333/health`
3. **Explique a arquitetura:** Clean Architecture + DDD
4. **Mostre os testes:** "137 testes com 80% de cobertura"
5. **Mostre o código no GitHub:** Repositório organizado

**Pronto! Sua API está no ar e funcionando! 🚀**
