CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`service` enum('automobile','terrasse','tapis','balcon','jardinage') NOT NULL,
	`date` varchar(50) NOT NULL,
	`time` varchar(10) NOT NULL,
	`address` text NOT NULL,
	`message` text,
	`stripePaymentIntentId` varchar(255),
	`paymentStatus` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
