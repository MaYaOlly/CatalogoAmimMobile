"use strict";
/**
 * Setup global para testes
 * Este arquivo é executado antes de todos os testes
 */
// Configuração de timeout global
jest.setTimeout(10000);
// Mock de variáveis de ambiente para testes
process.env.NODE_ENV = 'test';
// Para testes de integração, use o banco real
// Certifique-se de ter um .env com DATABASE_URL válida
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
});
afterAll(() => {
    jest.restoreAllMocks();
});
