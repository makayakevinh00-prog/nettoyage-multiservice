CREATE TABLE `autoSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`plan` enum('express','confort') NOT NULL,
	`monthlyPrice` int NOT NULL,
	`stripeCustomerId` varchar(255) NOT NULL,
	`stripeSubscriptionId` varchar(255) NOT NULL,
	`status` enum('active','paused','cancelled','expired') NOT NULL DEFAULT 'active',
	`currentBillingCycleStart` timestamp,
	`currentBillingCycleEnd` timestamp,
	`nextBillingDate` timestamp,
	`cancellationDate` timestamp,
	`cancellationReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `autoSubscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptionInvoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscriptionId` int NOT NULL,
	`stripeInvoiceId` varchar(255) NOT NULL,
	`amount` int NOT NULL,
	`status` enum('draft','open','paid','void','uncollectible') NOT NULL,
	`paidDate` timestamp,
	`dueDate` timestamp,
	`pdfUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptionInvoices_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptionInvoices_stripeInvoiceId_unique` UNIQUE(`stripeInvoiceId`)
);
--> statement-breakpoint
CREATE TABLE `subscriptionOptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscriptionId` int NOT NULL,
	`optionName` varchar(200) NOT NULL,
	`optionPrice` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`addedDate` timestamp NOT NULL DEFAULT (now()),
	`appliedForMonth` varchar(7) NOT NULL,
	CONSTRAINT `subscriptionOptions_id` PRIMARY KEY(`id`)
);
