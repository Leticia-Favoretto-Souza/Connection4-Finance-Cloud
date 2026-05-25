# ☁️ Módulo GCP: Projeção de Poder de Compra (IPCA)

Este guia detalha a criação da função *Serverless* no Google Cloud Platform utilizando o **Cloud Run functions**. Esta API é responsável por descontar uma taxa fictícia de inflação do montante final para projetar o poder de compra real.

---

## Passo 1: Acesso e Configuração Básica

1. Acesse o console do Google Cloud, pesquise por **Cloud Run functions** (ou Cloud Functions) na barra de pesquisa superior e clique no serviço.
2. Clique no botão **Criar função** (Create function).
3. Na seção Ambiente, escolha a **2ª geração** (2nd gen).
4. Na seção Gatilho (Trigger):
   * Escolha **HTTPS**.
   * Marque a opção **Permitir invocações não autenticadas** (Allow unauthenticated invocations). 
   * ⚠️ *Atenção: Isso é obrigatório para que o frontend público consiga acessar a API sem erros de permissão (401/403).*
5. Clique em **Avançar** (Next).

---

## Passo 2: O Código e o CORS (index.js)

Assim como na AWS, o Google Cloud exige que as regras de CORS (Cross-Origin Resource Sharing) sejam configuradas diretamente dentro do código Node.js.

1. Na etapa de código, mude o **Ambiente de execução** (Runtime) para **Node.js** (versão 20 ou superior).
2. No campo **Ponto de entrada** (Entry point), digite o nome exato da função exportada: `projetorInflacao`.
3. No editor de código, selecione o arquivo `index.js`, apague tudo e cole o código projetorInflacao

---

## Passo 3: Dependências (package.json)

Para que a função entenda a biblioteca do Google Cloud que estamos utilizando no arquivo principal, precisamos declará-la nas dependências.

1. Ainda no editor de código, clique na aba do arquivo `package.json`.
2. Certifique-se de que o conteúdo esteja semelhante a este (especialmente a seção `dependencies`):

```json
{
  "name": "projetor-inflacao",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0"
  }
}

```

## Passo 4: Implantação e Obtenção da URL

1. Clique no botão azul **Implantar** (Deploy) na parte inferior da tela.
2. Aguarde alguns minutos enquanto o Google Cloud provisiona o servidor e sobe o seu código. Um ícone de confirmação verde aparecerá quando terminar.
3. Clique no nome da sua função recém-implantada e vá até a aba **Gatilhos** (Triggers).
4. Copie a **URL do Gatilho** exibida na tela.
5. Cole essa URL na variável correspondente do painel web (`index.html`) para finalizar a integração do ecossistema!
