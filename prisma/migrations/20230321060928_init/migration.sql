/*
  Warnings:

  - You are about to drop the `user_link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_link` DROP FOREIGN KEY `user_link_userId_fkey`;

-- DropTable
DROP TABLE `user_link`;

-- CreateTable
CREATE TABLE `link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tagIds` VARCHAR(191) NULL,
    `tagGroupIds` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `thumb` VARCHAR(191) NULL,
    `like_degree` INTEGER NOT NULL DEFAULT 0,
    `has_read` BOOLEAN NOT NULL DEFAULT false,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `link_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `link` ADD CONSTRAINT `link_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
