import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: varchar('id', { length: 255 }).primaryKey(),
  fullName: text('full_name').notNull(),         // Mapeia fullName para full_name no banco
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  cpf: varchar('cpf', { length: 20 }),
  plate: varchar('plate', { length: 10 }),
  zipcode: varchar('zipcode', { length: 15 }),
  usage: text('usage'),
  youngDriver: varchar('young_driver', { length: 5 }), // Mapeia para young_driver
  status: text('status').default('Novo'),
  createdAt: timestamp('created_at').defaultNow().notNull(), // Mapeia para created_at
});
