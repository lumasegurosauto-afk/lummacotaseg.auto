// Chaves de conexão oficiais e fixas do seu banco de dados Supabase
const supabaseUrl = 'https://supabase.co';

// Chave pública anônima que permite o envio seguro a partir do site
const supabaseAnonKey = 'sb_publishable_M7epZMdf6n7wunK7v_7rUeY8qS_YvDcl-GZ-2S';

export const supabase = {
  from: (tableName: string) => ({
    insert: async (data: any[]) => {
      try {
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
        console.error('Erro na requisição INSERT:', error);
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
        console.error('Erro na requisição SELECT:', error);
        return { data: [], error };
      }
    }
  }),
  channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: () => {}
};
