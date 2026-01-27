import { type Locator, type Page } from '@playwright/test';

export class CatalogoPage {
    readonly page: Page;
    readonly produtoCard: Locator;
    readonly btnAdicionarCarrinho: Locator;
    readonly carrinhoIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        // Usando seletores genéricos que funcionam com React Native Web
        this.produtoCard = page.locator('[role="button"]').first();
        this.btnAdicionarCarrinho = page.getByText(/adicionar|carrinho/i).first();
        this.carrinhoIcon = page.getByText(/carrinho/i).first();
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickPrimeiroProduto() {
        await this.produtoCard.click();
    }

    async adicionarAoCarrinho() {
        await this.btnAdicionarCarrinho.click();
    }
}
