const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = {
  from: (tableName: string) => ({
    insert: async (data: any[]) => {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey || '',
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return { data: null, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },
    select: async (columns = '*') => {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=${columns}`, {
          method: 'GET',
          headers: {
            'apikey': supabaseAnonKey || '',
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error(await response.text());
        return { data: await response.json(), error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    }
  }),
  channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: () => {}
};
