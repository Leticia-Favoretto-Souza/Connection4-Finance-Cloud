export const handler = async (event) => {
  // 1. Configuração de CORS (O "crachá" de liberação)
  const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

  // 2. Interceptador do Pré-voo (O segredo para o navegador não bloquear)
  const method = event.httpMethod || (event.requestContext && event.requestContext.http && event.requestContext.http.method);
  
  if (method === 'OPTIONS') {
      return {
          statusCode: 200, 
          headers: headers,
          body: JSON.stringify({ message: "CORS liberado com sucesso!" })
      };
  }

  // 3. Lógica Matemática
  try {
      if (!event.body) {
          return {
              statusCode: 400,
              headers: headers,
              body: JSON.stringify({ erro: "Nenhum dado recebido do formulário." })
          };
      }

      const body = JSON.parse(event.body);
      const aporte = parseFloat(body.aporte);
      const taxa = parseFloat(body.taxa) / 100; // Converte para decimal
      const tempo = parseInt(body.tempo);

      // Fórmula: M = C * (1 + i)^t
      const montante = aporte * Math.pow((1 + taxa), tempo);

      return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ resultadoBRL: montante.toFixed(2) }),
      };
  } catch (error) {
      return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ erro: "Dados inválidos." }),
      };
  }
};
