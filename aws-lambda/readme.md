# ☁️ Módulo AWS: Cálculo de Juros Compostos

Este guia detalha os passos para configurar a função *Serverless* na AWS (Lambda) e expô-la publicamente (API Gateway) para realizar os cálculos da aplicação.

---

## Passo 1: Criando a Função (AWS Lambda)

1. No console da AWS, busque por **Lambda** na barra de pesquisa superior e clique no serviço.
2. Clique no botão laranja **Criar função** (Create function).
3. Deixe a opção **Criar do zero** (Author from scratch) selecionada.
4. **Nome da função:** Digite `calculadoraJuros` (ou o nome de sua preferência).
5. **Tempo de execução (Runtime):** Selecione **Node.js 20.x** (ou a versão mais recente do Node disponível).
6. Deixe o restante das configurações padrão e clique em **Criar função**.

---

## Passo 2: Criando o Ponto de Acesso (API Gateway)

Para que o painel web (Frontend) consiga enviar os dados para a AWS, precisamos expor o Lambda publicamente através de uma API.

1. Na tela da sua função Lambda recém-criada, no diagrama de "Visão geral da função", clique no botão **+ Adicionar gatilho** (Add trigger).
2. No menu suspenso, pesquise e selecione **API Gateway**.
3. Em **Intent**, selecione **Criar uma nova API**.
4. Em **Tipo de API**, selecione **HTTP API** (escolhida por ser mais moderna e com suporte nativo simplificado para CORS).
5. Em **Segurança** (Security), altere para **Aberto** (Open). *Isso é fundamental para evitar bloqueios de autenticação quando o frontend tentar acessar a rota.*
6. Clique em **Adicionar**.

---

## Passo 3: Configuração de Segurança (CORS) - ⚠️ Importante

Mesmo com a API aberta, os navegadores bloquearão a requisição caso as regras de CORS não estejam configuradas.

1. Clique no nome do seu novo API Gateway gerado no passo anterior para abrir o painel dele.
2. No menu lateral esquerdo, clique em **CORS**.
3. Configure os parâmetros com os "curingas universais" para garantir a passagem dos dados:
   * **Access-Control-Allow-Origin:** Digite `*` e adicione.
   * **Access-Control-Allow-Headers:** Digite `*` e adicione.
   * **Access-Control-Allow-Methods:** Adicione `*` (ou especifique `POST` e `OPTIONS`).
4. Clique em **Salvar**.
5. *Nota:* Anote a **URL de invocação** da sua API, ela será necessária para configurar o Frontend.

