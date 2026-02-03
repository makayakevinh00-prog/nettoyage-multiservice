CREATE TABLE `integrationLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingId` int NOT NULL,
	`service` varchar(50) NOT NULL,
	`status` enum('success','error','pending','retry') NOT NULL,
	`message` text,
	`details` text,
	`externalId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `integrationLogs_id` PRIMARY KEY(`id`)
);
