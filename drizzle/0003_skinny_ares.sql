CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitorId` varchar(64) NOT NULL,
	`visitorName` varchar(100),
	`visitorEmail` varchar(320),
	`message` text NOT NULL,
	`sender` enum('visitor','ai','admin') NOT NULL,
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
