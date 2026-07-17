// Descrição: Arquivo modificado para interceptar as chamadas antigas do Supabase
// e redirecioná-las para as novas rotas do seu próprio servidor backend local/Vercel.

const API_BASE = '/api';

export const supabase = {
  from: (tableName: string) => {
    // Focamos na tabela de leads, que é o escopo do projeto
    if (tableName === 'leads') {
      return {
        // Intercepta a criação de um lead e envia para a rota POST do seu servidor
        insert: async (data: any[]) => {
          try {
            // Pegamos o primeiro item do array (comportamento padrão do form)
            const payload = Array.isArray(data) ? data[0] : data;
            
            const response = await fetch(`${API_BASE}/leads`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText);
            }

            const result = await response.json();
            return { data: [result.lead], error: null };
          } catch (error: any) {
            console.error('Erro na requisição INSERT local:', error);
            return { data: null, error };
          }
        },

        // Intercepta a listagem e busca da rota GET do seu servidor
        select: async (columns = '*') => {
          try {
            const response = await fetch(`${API_BASE}/leads`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText);
            }

            const result = await response.json();
            // Retorna a lista extraída do objeto unificado do repo.ts
            return { data: result.leadsList || [], error: null };
          } catch (error: any) {
            console.error('Erro na requisição SELECT local:', error);
            return { data: [], error };
          }
        }
      };
    }

    // Fallback genérico para outras tabelas não quebrarem a compilação
    return {
      insert: async () => ({ data: null, error: new Error(`Tabela ${tableName} não mapeada na API local.`) }),
      select: async () => ({ data: [], error: new Error(`Tabela ${tableName} não mapeada na API local.`) })
    };
  },
  // Mantém as funções de Realtime vazias para não quebrar escutas de eventos do front antigo
  channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: () => {}
};
