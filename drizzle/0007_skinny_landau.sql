CREATE TABLE `slotCapacity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service` enum('automobile','terrasse','tapis','balcon','jardinage','facade','panneaux','professionnel','piscine') NOT NULL,
	`date` varchar(50) NOT NULL,
	`time` varchar(10) NOT NULL,
	`maxCapacity` int NOT NULL DEFAULT 3,
	`currentBookings` int NOT NULL DEFAULT 0,
	`isAvailable` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `slotCapacity_id` PRIMARY KEY(`id`)
);
