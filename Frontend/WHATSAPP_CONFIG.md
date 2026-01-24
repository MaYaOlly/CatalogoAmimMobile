# Configuração do WhatsApp

## Número do WhatsApp da Empresa

O número do WhatsApp está configurado no arquivo:
`src/ViewModel/useCheckoutViewModel.ts`

### Alterando o Número

Na linha 118 do arquivo `useCheckoutViewModel.ts`, altere o número:

```typescript
const numeroWhatsApp = "5586999999999"; // Formato: código do país + DDD + número
```

### Formato do Número

- **Código do país**: 55 (Brasil)
- **DDD**: 2 dígitos (ex: 86 para Teresina)
- **Número**: 9 dígitos com o 9 na frente (ex: 999999999)

### Exemplo

Para o número **(86) 98765-4321**:
```typescript
const numeroWhatsApp = "5586987654321";
```

## Como Funciona

1. Quando o usuário clica em "ENVIAR PEDIDO" na tela de checkout
2. O sistema:
   - Valida todos os dados
   - Cria o pedido na API
   - Formata uma mensagem completa com:
     - Dados do cliente
     - Itens do pedido
     - Endereço de entrega
     - Forma de pagamento
     - Valor total
3. Abre o WhatsApp com a mensagem pré-formatada
4. O cliente finaliza o envio no WhatsApp

## Mensagem Enviada

```
🛍️ *NOVO PEDIDO - Catálogo Amim*

👤 *Cliente:* João Silva
📱 *Telefone:* (11) 98765-4321

📦 *ITENS DO PEDIDO:*
1. Bolo de Chocolate
   Qtd: 2 | R$ 25,00 cada
   Subtotal: R$ 50,00

2. Brigadeiro Gourmet
   Qtd: 10 | R$ 3,50 cada
   Subtotal: R$ 35,00

💰 *VALOR TOTAL:* R$ 90,00

📍 *ENDEREÇO DE ENTREGA:*
Rua das Flores, 123, Centro, CEP: 64000-000

💳 *FORMA DE PAGAMENTO:*
PIX

_Pedido realizado pelo app Catálogo Amim_
```
