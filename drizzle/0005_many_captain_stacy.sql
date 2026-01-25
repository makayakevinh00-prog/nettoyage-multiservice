CREATE TABLE `feedbacks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingId` int NOT NULL,
	`userId` int,
	`email` varchar(320) NOT NULL,
	`name` varchar(100) NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`serviceQuality` int,
	`punctuality` int,
	`professionalism` int,
	`isApproved` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `feedbacks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `bookings` ADD `userId` int;--> statement-breakpoint
ALTER TABLE `bookings` ADD `status` enum('pending','confirmed','completed','cancelled') DEFAULT 'pending' NOT NULL;