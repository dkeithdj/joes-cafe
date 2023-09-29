-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_paymentId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_staffId_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `staffId` VARCHAR(191) NULL,
    MODIFY `paymentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `PaymentMethod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
