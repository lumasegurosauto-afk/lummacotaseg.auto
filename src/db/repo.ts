import { eq, desc } from 'drizzle-orm';
// MODIFICADO: Ajustado para usar a extensão ".js" nas importações internas
import { getDb, isDbConfigured } from './index.js';
import { leads } from './schema.js';
import type { Lead } from '../types';

// In-memory fallback for offline/unconfigured environments
let inMemoryLeads: Lead[] = [
  {
    id: "LUM-1001",
    fullName: "Ana Silva",
    email: "ana.silva@exemplo.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    plate: "LUM-1234",
    zipcode: "01311-200",
    usage: "Particular/Lazer",
    youngDriver: "Não",
    status: "PENDENTE",
    createdAt: "13 Jul, 10:30"
  },
  {
    id: "LUM-1002",
    fullName: "Carlos Souza",
    email: "carlos.souza@exemplo.com",
    phone: "(21) 99876-5432",
    cpf: "987.654.321-11",
    plate: "ABC-5678",
    zipcode: "22040-010",
    usage: "Comercial",
    youngDriver: "Sim",
    status: "CONCLUÍDO",
    createdAt: "12 Jul, 15:45"
  }
];

export async function isDbConnected(): Promise<boolean> {
  if (!isDbConfigured()) return false;
  try {
    const db = getDb();
    if (!db) return false;
    await db.select().from(leads).limit(1);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getAllLeads(): Promise<{ leadsList: Lead[]; isOffline: boolean }> {
  if (!isDbConfigured()) {
    return { leadsList: inMemoryLeads, isOffline: true };
  }
  try {
    const db = getDb();
    const result = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return { leadsList: result as Lead[], isOffline: false };
  } catch (error) {
    console.warn("⚠️ Failed to fetch leads from PostgreSQL/Supabase. Falling back to in-memory store. Error:", error);
    return { leadsList: inMemoryLeads, isOffline: true };
  }
}

export async function createLead(newLead: Lead): Promise<{ lead: Lead; isOffline: boolean }> {
  if (!isDbConfigured()) {
    inMemoryLeads = [newLead, ...inMemoryLeads];
    return { lead: newLead, isOffline: true };
  }
  try {
    const db = getDb();
    await db.insert(leads).values({
      id: newLead.id,
      fullName: newLead.fullName,
      email: newLead.email,
      phone: newLead.phone,
      cpf: newLead.cpf,
      plate: newLead.plate,
      zipcode: newLead.zipcode,
      usage: newLead.usage,
      youngDriver: newLead.youngDriver,
      status: newLead.status,
      createdAt: newLead.createdAt,
    });
    return { lead: newLead, isOffline: false };
  } catch (error) {
    console.warn("⚠️ Failed to insert lead into PostgreSQL/Supabase. Saving to in-memory store. Error:", error);
    inMemoryLeads = [newLead, ...inMemoryLeads];
    return { lead: newLead, isOffline: true };
  }
}

export async function updateLeadStatus(id: string, status: 'PENDENTE' | 'CONCLUÍDO' | 'CANCELADO'): Promise<{ success: boolean; isOffline: boolean }> {
  if (!isDbConfigured()) {
    let updated = false;
    inMemoryLeads = inMemoryLeads.map(lead => {
      if (lead.id === id) {
        updated = true;
        return { ...lead, status };
      }
      return lead;
    });
    return { success: updated, isOffline: true };
  }
  try {
    const db = getDb();
    await db.update(leads)
      .set({ status })
      .where(eq(leads.id, id));
    return { success: true, isOffline: false };
  } catch (error) {
    console.warn("⚠️ Failed to update lead status in PostgreSQL/Supabase. Updating in-memory store. Error:", error);
    let updated = false;
    inMemoryLeads = inMemoryLeads.map(lead => {
      if (lead.id === id) {
        updated = true;
        return { ...lead, status };
      }
      return lead;
    });
    return { success: updated, isOffline: true };
  }
}

export async function deleteLead(id: string): Promise<{ success: boolean; isOffline: boolean }> {
  if (!isDbConfigured()) {
    const originalLength = inMemoryLeads.length;
    inMemoryLeads = inMemoryLeads.filter(lead => lead.id !== id);
    return { success: inMemoryLeads.length < originalLength, isOffline: true };
  }
  try {
    const db = getDb();
    await db.delete(leads).where(eq(leads.id, id));
    return { success: true, isOffline: false };
  } catch (error) {
    console.warn("⚠️ Failed to delete lead from PostgreSQL/Supabase. Deleting from in-memory store. Error:", error);
    const originalLength = inMemoryLeads.length;
    inMemoryLeads = inMemoryLeads.filter(lead => lead.id !== id);
    return { success: inMemoryLeads.length < originalLength, isOffline: true };
  }
}
