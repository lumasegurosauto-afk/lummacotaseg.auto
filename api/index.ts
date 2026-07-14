import express from 'express';
import { getAllLeads, createLead, updateLeadStatus, deleteLead, isDbConnected } from '../src/db/repo.ts';

const app = express();
app.use(express.json());

// API Routes for Vercel Serverless Function
app.get('/api/db-status', async (req, res) => {
  try {
    const connected = await isDbConnected();
    res.json({ connected, hasEnv: !!process.env.DATABASE_URL });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const result = await getAllLeads();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const result = await createLead(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

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

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteLead(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
