# ☁️ Módulo Azure: Conversão de Câmbio Fictícia

Este guia detalha a criação de uma API baseada em *Azure Functions* com Gatilho HTTP. Optamos pelo plano "Consumo" tradicional para viabilizar a edição direta do código no portal web, dispensando configurações complexas na máquina local.

---

## Passo 1: Criar o Aplicativo de Funções (O "Guarda-Chuva")

1. No portal do Azure, pesquise por **Aplicativo de Funções** (Function App) e clique no serviço.
2. Clique no botão azul **Criar** (Create).
3. Na tela de seleção de planos, vá até a última opção à direita e selecione **Consumo** (ou Consumo Windows). Clique em **Selecionar**.
4. Preencha a aba **Básico** (Basics):
   * **Nome do Aplicativo:** Escolha um nome único (ex: `saas-cambio-app-v2`).
   * **Pilha de Tempo de Execução (Runtime stack):** Selecione **Node.js**.
   * **Versão:** Selecione a versão LTS mais recente (ex: 20 LTS).
   * **Região:** Escolha a mais próxima (como *East US* ou *Brazil South*).
5. Você pode pular as outras abas. Clique em **Revisar + criar** (Review + create) e, em seguida, em **Criar**.
6. Aguarde a mensagem de *"Sua implantação está concluída"* e clique no botão **Ir para o recurso** (Go to resource).

---

## Passo 2: Criar a Função e Liberar Acesso (Autorização)

1. No menu lateral esquerdo do seu novo Aplicativo de Funções, procure a seção "Criação" e clique em **Funções**.
2. Clique no botão **+ Criar** no topo da página.
3. No painel que abrir, selecione o modelo **Gatilho HTTP** (HTTP trigger).
4. Role para baixo até o campo **Nível de autorização** (Authorization level) e mude de `Function` para **Anônimo** (Anonymous).
   * ⚠️ **Atenção:** Isso é o que garante que o seu painel web consiga acessar a API pública sem necessidade de envio de chaves de acesso.
5. Clique em **Criar**.

---

## Passo 3: Colar o Código no Navegador

Após criar a função, você será redirecionada para a página dela.

1. No menu lateral esquerdo, clique em **Código + Teste** (Code + Test).
2. O editor de código em nuvem aparecerá com o arquivo `index.js` aberto.
3. Apague todo o código padrão e cole o script do conversor
4. Clique em salvar

---

## Passo 4: Configuração de CORS (Obrigatório)

Diferente do código, o CORS no Azure é configurado diretamente no portal (por isso não incluímos cabeçalhos manuais no arquivo `index.js`).

1. No menu lateral esquerdo, role um pouco para cima e clique em **Visão geral** (Overview) para voltar à tela principal do aplicativo.
2. Role o menu lateral esquerdo para baixo até a seção **API** e clique em **CORS**.
3. Em **Origens Permitidas** (Allowed Origins), apague as URLs padrão que a Azure insere automaticamente clicando na lixeira ao lado de cada uma.
4. Adicione uma nova linha e digite apenas um asterisco: `*`
   * *Isso libera as requisições de origem cruzada para qualquer Frontend.*
5. Clique em **Salvar** na parte superior da tela.

---

## Passo 5: Obter a URL de Integração

1. Volte para a sua função através do Menu lateral -> **Funções** -> clique no nome da sua função -> **Código + Teste**.
2. Clique no botão **Obter URL da função** (Get function URL) no menu superior.
3. Copie essa URL e insira no arquivo `index.html` do Frontend para estabelecer a conexão entre os serviços.