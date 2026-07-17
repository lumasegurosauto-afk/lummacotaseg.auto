import express from 'express';
// MODIFICADO: Alterado para usar a extensão ".js" para compatibilidade ESM na Vercel
import { getAllLeads, createLead, updateLeadStatus, deleteLead, isDbConnected } from '../src/db/repo.js';

const app = express();
app.use(express.json());

// Rota de status do banco
app.get('/api/db-status', async (req, res) => {
  const connected = await isDbConnected();
  res.json({ connected, hasEnv: !!process.env.DATABASE_URL });
});

// Listar leads
app.get('/api/leads', async (req, res) => {
  try {
    const result = await getAllLeads();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Criar lead
app.post('/api/leads', async (req, res) => {
  try {
    const result = await createLead(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar status
app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateLeadStatus(id, status);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar lead
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteLead(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Exporta para a Vercel rodar como Serverless Function
export default app;
