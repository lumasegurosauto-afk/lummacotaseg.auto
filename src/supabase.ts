// COLA O SEU LINK DO SUPABASE AQUI (Ex: https://supabase.co)
const supabaseUrl = 'https://hkwxwzklkiegrcfyljjm.supabase.co/rest/v1/';

// COLA A SUA CHAVE ANON PUBLIC AQUI (Aquela cheia de letras e números)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhrd3h3emtsa2llZ3JjZnlsamptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NDQ5OTUsImV4cCI6MjA5OTUyMDk5NX0.CwFbQuKYBVasF4aZwzHk04v0MCC5tNR3B00_ilj4uDg';

export const supabase = {
  from: (tableName: string) => ({
    insert: async (data: any[]) => {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return { data: null, error: null };
      } catch (error: any) {
        console.error('Erro na requisição INSERT:', error);
        return { data: null, error };
      }
    },
    select: async (columns = '*') => {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=${columns}`, {
          method: 'GET',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error(await response.text());
        return { data: await response.json(), error: null };
      } catch (error: any) {
        console.error('Erro na requisição SELECT:', error);
        return { data: [], error };
      }
    }
  }),
  channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: () => {}
};
