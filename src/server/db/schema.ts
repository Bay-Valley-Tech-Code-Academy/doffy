// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  pgTableCreator,
  text,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `doffy_${name}`);

export const users = createTable(
  'user',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    firstName: varchar('first_name', { length: 256 }),
    lastName: varchar('last_name', { length: 256 }),
    email: varchar('email', { length: 256 }),
    // We use the `text` data type but we will still hash the password when we store it
    password: text('password').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    emailIndex: index('email_idx').on(example.email),
  }),
);

export const jobs = createTable('jobs', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  title: varchar('title', { length: 256 }),
  company: varchar('company', { length: 256 }),
  location: varchar('location', { length: 256 }),
  description: text('description'),
});
