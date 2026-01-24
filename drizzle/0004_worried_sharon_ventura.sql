CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(100) NOT NULL,
	`clientEmail` varchar(320) NOT NULL,
	`service` varchar(100) NOT NULL,
	`rating` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`content` text NOT NULL,
	`imageUrl` varchar(500),
	`isApproved` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
