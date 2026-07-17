import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { getAllLeads, createLead, updateLeadStatus, deleteLead, isDbConnected } from './src/db/repo.ts';

// Declaramos o app do lado de fora para que a Vercel consiga importá-lo
const app = express();
app.use(express.json());

// API Routes
app.get('/api/db-status', async (req, res) => {
  const connected = await isDbConnected();
  res.json({ connected, hasEnv: !!process.env.DATABASE_URL });
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

async function startServer() {
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Apenas inicia o listen se não estiver rodando na Vercel (Serverless)
  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Full-stack server running on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

// Exportação essencial para que as rotas funcionem na Vercel
export default app;
