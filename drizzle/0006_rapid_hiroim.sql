CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serviceKey` varchar(50) NOT NULL,
	`serviceName` varchar(100) NOT NULL,
	`optionName` varchar(200) NOT NULL,
	`description` text,
	`price` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'EUR',
	`sku` varchar(100) NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_sku_unique` UNIQUE(`sku`)
);
