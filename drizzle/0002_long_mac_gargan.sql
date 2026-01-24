ALTER TABLE `bookings` ADD `serviceOptions` text;--> statement-breakpoint
ALTER TABLE `bookings` ADD `totalPrice` int DEFAULT 0 NOT NULL;