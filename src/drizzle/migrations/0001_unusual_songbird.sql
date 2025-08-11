CREATE TYPE "public"."rule_mode" AS ENUM('blacklist', 'whitelist');--> statement-breakpoint
CREATE TABLE "ip_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip" text NOT NULL,
	"mode" "rule_mode" NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "port_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"port" integer NOT NULL,
	"mode" "rule_mode" NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "url_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"mode" "rule_mode" NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
