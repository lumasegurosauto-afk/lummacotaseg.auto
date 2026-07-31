import { eq, desc } from 'drizzle-orm';
// MODIFICADO: Ajustado para usar a extensão ".js" nas importações internas
import { getDb, isDbConfigured } from './index.js';
import { leads } from './schema.js';
import type { Lead } from '../types';

// In-memory fallback apenas para falhas críticas
let inMemoryLeads: Lead[] = [];

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
    console.warn("⚠️ Failed to fetch leads from PostgreSQL/Supabase. Error:", error);
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
    
    // Normaliza o status para garantir compatibilidade com o banco
    let dbStatus = newLead.status || 'PENDENTE';
    if (dbStatus === 'Novo') dbStatus = 'PENDENTE';
    if (dbStatus === 'Em Atendimento') dbStatus = 'CANCELADO';
    if (dbStatus === 'Finalizado') dbStatus = 'CONCLUÍDO';

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
      status: dbStatus,
      createdAt: newLead.createdAt,
    });
    return { lead: newLead, isOffline: false };
  } catch (error) {
    console.warn("⚠️ Failed to insert lead into PostgreSQL/Supabase. Saving to memory. Error:", error);
    inMemoryLeads = [newLead, ...inMemoryLeads];
    return { lead: newLead, isOffline: true };
  }
}

// CORRIGIDO: Aceita tanto os termos antigos em caixa alta quanto os novos em português
export async function updateLeadStatus(id: string, status: string): Promise<{ success: boolean; isOffline: boolean }> {
  // Normalização rígida de segurança antes de injetar no banco ou memória
  let normalizedStatus = status;
  if (status === 'Novo') normalizedStatus = 'PENDENTE';
  if (status === 'Em Atendimento') normalizedStatus = 'CANCELADO';
  if (status === 'Finalizado') normalizedStatus = 'CONCLUÍDO';

  if (!isDbConfigured()) {
    let updated = false;
    inMemoryLeads = inMemoryLeads.map(lead => {
      if (lead.id === id) {
        updated = true;
        return { ...lead, status: normalizedStatus as any };
      }
      return lead;
    });
    return { success: updated, isOffline: true };
  }
  try {
    const db = getDb();
    await db.update(leads)
      .set({ status: normalizedStatus })
      .where(eq(leads.id, id));
    return { success: true, isOffline: false };
  } catch (error) {
    console.warn("⚠️ Failed to update lead status in PostgreSQL/Supabase. Error:", error);
    let updated = false;
    inMemoryLeads = inMemoryLeads.map(lead => {
      if (lead.id === id) {
        updated = true;
        return { ...lead, status: normalizedStatus as any };
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
    console.warn("⚠️ Failed to delete lead from PostgreSQL/Supabase. Error:", error);
    const originalLength = inMemoryLeads.length;
    inMemoryLeads = inMemoryLeads.filter(lead => lead.id !== id);
    return { success: inMemoryLeads.length < originalLength, isOffline: true };
  }
}
