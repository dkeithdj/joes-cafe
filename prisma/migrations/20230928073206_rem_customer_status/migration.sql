/*
  Warnings:

  - You are about to drop the column `statusId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_customerId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `statusId`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `customerId`;

-- DropTable
DROP TABLE `customer`;

-- DropTable
DROP TABLE `order_status`;
