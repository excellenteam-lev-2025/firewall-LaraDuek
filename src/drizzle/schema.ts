import {pgTable,serial,text,integer,timestamp,pgEnum, boolean } from 'drizzle-orm/pg-core'

export const ruleModeEnum = pgEnum('rule_mode', ['blacklist', 'whitelist']);

export const ipRules = pgTable('ip_rules', {
  id: serial('id').primaryKey(),
  value: text('value').notNull(), 
  mode: ruleModeEnum('mode').notNull(),
  active: boolean('active').notNull().default(true),
});

export const urlRules = pgTable('url_rules', {
  id: serial('id').primaryKey(),
  value: text('value').notNull(),
  mode: ruleModeEnum('mode').notNull(),
  active: boolean('active').notNull().default(true),
});

export const portRules = pgTable('port_rules', {
  id: serial('id').primaryKey(),
  value: integer('value').notNull(),
  mode: ruleModeEnum('mode').notNull(),
  active: boolean('active').notNull().default(true),
});
