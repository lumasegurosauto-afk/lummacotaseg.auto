import { pgTable, text } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: text('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  cpf: text('cpf').notNull(),
  plate: text('plate').notNull(),
  zipcode: text('zipcode').notNull(),
  usage: text('usage').notNull(), // 'Comercial' | 'Particular/Lazer'
  youngDriver: text('young_driver').notNull(), // 'Sim' | 'Não'
  status: text('status').notNull().default('PENDENTE'), // 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO'
  createdAt: text('created_at').notNull(),
});
