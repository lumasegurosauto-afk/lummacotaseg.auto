// Sistema inteligente de leitura dupla de credenciais (Vite e Next.js/Process)
const supabaseUrl = (
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL || 
  typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL ||
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL ||
  ''
).replace(/\/$/, '');

const supabaseAnonKey = (
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY || 
  typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY ||
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ''
);

export const supabase = {
  from: (tableName: string) => ({
    insert: async (data: any[]) => {
      try {
        if (!supabaseUrl || !supabaseAnonKey) {
          console.error('Erro: Chaves de conexão vazias no envio.');
          return { data: null, error: new Error('Falta de credenciais') };
        }
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
        if (!supabaseUrl || !supabaseAnonKey) {
          console.error('Erro: Chaves de conexão vazias na leitura.');
          return { data: [], error: new Error('Falta de credenciais') };
        }
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
