/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Usa ts-jest para transformar arquivos TypeScript
  preset: 'ts-jest',
  
  // Ambiente de execução dos testes (node para backend)
  testEnvironment: 'node',
  
  // Padrão para encontrar arquivos de teste (colocation pattern)
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/*.test.ts',
    '**/*.spec.ts'
  ],
  
  // Diretório raiz dos testes
  roots: ['<rootDir>/src'],
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/server.ts',
    '!src/**/*.d.ts'
  ],
  
  // Diretório de saída da cobertura
  coverageDirectory: 'coverage',
  
  // Reporters de cobertura
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Limites mínimos de cobertura (opcional)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // Módulos a serem mockados automaticamente
  clearMocks: true,
  
  // Configurações de performance
  maxWorkers: '50%', // Usa 50% dos cores da CPU para paralelizar
  
  // Setup files (executados antes de cada arquivo de teste)
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  
  // Timeout padrão para testes (5 segundos - suficiente para testes unitários)
  testTimeout: 5000,
  
  // Ignora node_modules e dist
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/'
  ],
  
  // Transformações de arquivos
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }]
  },
  
  // Aliases de módulos (mapeia @ para src)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // Desativa verbose para performance
  verbose: false,
  
  // Cache para acelerar execuções
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
};
