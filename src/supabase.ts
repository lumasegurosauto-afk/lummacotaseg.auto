// Mantenha os seus links reais e chaves reais salvos nestas duas variáveis:
const supabaseUrl = 'SUA_URL_REAL_DO_SUPABASE'; 
const supabaseAnonKey = 'SUA_CHAVE_ANON_REAL';

export const supabase = {
  from: (tableName: string) => ({
    insert: async (data: any[]) => {
      try {
        // Correção de rota: garante o endpoint limpo
        const baseUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl;
        const response = await fetch(`${baseUrl}/rest/v1/${tableName}`, {
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
        console.error('Erro INSERT:', error);
        return { data: null, error };
      }
    },
    select: async (columns = '*') => {
      try {
        const baseUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl;
        const response = await fetch(`${baseUrl}/rest/v1/${tableName}?select=${columns}`, {
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
        console.error('Erro SELECT:', error);
        return { data: [], error };
      }
    }
  }),
  channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: () => {}
};
