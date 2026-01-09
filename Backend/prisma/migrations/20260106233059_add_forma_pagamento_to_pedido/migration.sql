/*
  Warnings:

  - Added the required column `formaPagamento` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "formaPagamento" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'realizado';
