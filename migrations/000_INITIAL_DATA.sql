create extension if not exists pgcrypto;

drop table if exists messages;
drop table if exists conversations;
drop table if exists visitors;
drop table if exists accounts;

create table if not exists accounts(
	"id_account" int generated by default as identity primary key,
	"id" uuid not null unique default gen_random_uuid(),
	"created_at" timestamp not null default timezone('utc'::text, now()),
	"name" varchar(50) not null
);

create table if not exists visitors(
	"id" uuid not null unique default gen_random_uuid(),
	"created_at" timestamp not null default timezone('utc'::text, now()),
	"id_account" integer not null references accounts,
	"connection_id" varchar null,
	"ip" inet not null
);

create table if not exists conversations(
	"id" uuid not null unique default gen_random_uuid(),
	"created_at" timestamp not null default timezone('utc'::text, now()),
	"id_account" integer not null references accounts,
	"visitor_id" uuid not null references visitors("id")
);

create table if not exists messages(
	"id" uuid not null unique default gen_random_uuid(),
	"created_at" timestamp not null default timezone('utc'::text, now()),
	"id_account" integer not null references accounts,
	"conversation_id" uuid not null references conversations("id"),
	"content" text null,
	"visitor_id" uuid null references visitors("id")
);
