-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_itens_pedido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pedidoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" REAL NOT NULL,
    CONSTRAINT "itens_pedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "itens_pedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_itens_pedido" ("id", "pedidoId", "precoUnitario", "produtoId", "quantidade") SELECT "id", "pedidoId", "precoUnitario", "produtoId", "quantidade" FROM "itens_pedido";
DROP TABLE "itens_pedido";
ALTER TABLE "new_itens_pedido" RENAME TO "itens_pedido";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
