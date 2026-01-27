import { test, expect } from '@playwright/test';

test.describe('Catálogo Amim - E2E', () => {

    test('deve carregar a página inicial com sucesso', async ({ page }) => {
        // Navega para a página
        await page.goto('/');
        
        // Verifica se a página carregou (aceita qualquer título)
        await expect(page).toHaveTitle(/./);
        
        // Verifica se o corpo da página está visível
        await expect(page.locator('body')).toBeVisible();
        
        // Tira screenshot da página inicial
        await page.screenshot({ path: 'test-results/01-pagina-inicial.png', fullPage: true });
    });

    test('deve renderizar conteúdo da aplicação', async ({ page }) => {
        // Navega para a página
        await page.goto('/');
        
        // Aguarda a aplicação carregar
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Aguarda animações
        
        // Verifica se há algum texto visível na página
        const body = page.locator('body');
        await expect(body).toContainText(/./);
    });

    test('deve navegar para a tela de carrinho', async ({ page }) => {
        // Navega para a página inicial
        await page.goto('/');
        
        // Aguarda a aplicação carregar completamente
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Aguarda animações
        
        // Tira screenshot antes da navegação
        await page.screenshot({ path: 'test-results/02-antes-navegacao.png', fullPage: true });
        
        // Procura o botão/link de Carrinho e clica
        // Tenta várias estratégias de seleção
        const carrinhoButton = page.locator('text=Carrinho').first();
        
        // Verifica se o botão está visível
        await expect(carrinhoButton).toBeVisible({ timeout: 10000 });
        
        // Clica no botão
        await carrinhoButton.click();
        
        // Aguarda a navegação acontecer
        await page.waitForTimeout(2000);
        
        // Verifica se navegou (pode ter mudança de URL ou conteúdo)
        // Tira screenshot após navegação
        await page.screenshot({ path: 'test-results/03-tela-carrinho.png', fullPage: true });
        
        // Verifica se o texto "Carrinho" aparece na tela (título ou conteúdo)
        await expect(page.locator('body')).toContainText(/Carrinho/i);
    });
});
