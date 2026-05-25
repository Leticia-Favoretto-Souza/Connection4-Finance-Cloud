# Connection4 Finance Cloud

Bem-vindo ao repositório oficial do projeto de SaaS Financeiro, desenvolvido pela equipe **Connection4** como requisito acadêmico para a Fatec Itapira.

Este projeto demonstra a implementação de um ecossistema *Serverless* (sem servidor) descentralizado, onde um único painel de controle (Frontend) orquestra serviços e cálculos matemáticos distribuídos simultaneamente entre três das maiores plataformas de nuvem pública do mercado: AWS, Microsoft Azure e Google Cloud Platform (GCP).

## 👥 Equipe Connection4
* Letícia Favoretto de Souza
* Guilherme Soriani de Amorin Chamon
* Marco Antonio Bubola
* Cauã Araujo Vaz de Lima

---

## 🏗️ Estrutura do Repositório

Para facilitar a leitura e a reprodução deste ambiente, documentamos o passo a passo detalhado da configuração de cada provedor em suas respectivas pastas. Escolha um módulo abaixo para ver as instruções específicas:

* 📁 **[aws-lambda/](./aws-lambda)** - API de Juros Compostos (AWS Lambda + API Gateway)
* 📁 **[azure-function/](./azure-function)** - API de Conversão de Câmbio (Azure Functions)
* 📁 **[google-function/](./function)** - API de Projeção de Inflação IPCA (Google Cloud Functions)
* 📁 **[frontend/](./frontend)** - Interface de Usuário e Deploy (Firebase Hosting)

---

## ⚙️ Como a Solução foi Montada (Visão Geral)

A construção deste ecossistema foi dividida em três fases principais, garantindo a independência e a resiliência de cada serviço:

1. **Desenvolvimento dos Backends Isolados (APIs):**
   * Criamos três funções independentes em Node.js/JavaScript.
   * Cada função foi implantada em seu respectivo provedor de nuvem utilizando gatilhos HTTP (HTTP Triggers).
   * Configuramos as políticas de CORS (Cross-Origin Resource Sharing) em cada API para permitir requisições externas de forma segura.

2. **Desenvolvimento do Frontend Orquestrador:**
   * Construímos uma interface em HTML/CSS/JS (Single Page Application).
   * O JavaScript nativo (`fetch`) foi encarregado de capturar os dados do formulário e disparar as requisições POST para as três URLs geradas pelas nuvens.
   * Implementamos um sistema de `try/catch` e `Promise.allSettled` para garantir a resiliência: se uma nuvem cair, o painel avisa o erro isoladamente, mas continua exibindo os resultados das outras nuvens ativas.

3. **Hospedagem e Integração Final:**
   * O frontend foi encapsulado e submetido a um deploy via terminal utilizando o Firebase Hosting, garantindo a entrega do site estático em ambiente seguro (HTTPS) e contornando bloqueios de origem nula (`null origin`) em navegadores modernos.

---

## 📊 Relatório Técnico de Arquitetura



Abaixo, detalhamos o comportamento da arquitetura integrada, com métricas de tempo de resposta e os desafios superados em cada plataforma.

### Métricas de Latência (Tempo de Resposta)

*Nota: Os tempos médios foram capturados através da ferramenta de desenvolvedor do navegador durante as simulações simultâneas de carga no painel.*

| Provedor de Nuvem | Serviço Utilizado | Tempo de Resposta Médio (ms) | Método |
| :--- | :--- | :--- | :--- |
| **AWS** | Lambda + API Gateway | ~180 ms | `POST` |
| **Microsoft Azure** | Azure Functions | ~220 ms | `POST` |
| **Google Cloud (GCP)** | Cloud Functions | ~195 ms | `POST` |

### Análise Comparativa e Dificuldades Técnicas

Durante o processo de *deploy* e gestão de identidades (IAM)/redes, observamos as seguintes particularidades em cada provedor:

* **AWS (Amazon Web Services)**
  * **Configuração:** Exigiu a maior curva de aprendizado em relação às regras de rede.
  * **Desafios:** Enfrentamos o "Falso Erro de CORS", gerado quando requisições *preflight* (`OPTIONS`) são barradas pelo API Gateway antes de atingirem o Lambda. A solução exigiu a alteração do método da rota para `ANY` e a implementação manual de um interceptador de cabeçalhos no código Node.js.

* **Microsoft Azure**
  * **Configuração:** Apresentou um painel visual extremamente simplificado para a gestão de CORS direto nas configurações da API.
  * **Desafios:** O modelo de implantação recente ("Consumo Flexível") bloqueia a injeção de código via portal web, forçando o uso do VSCode. Tivemos que recriar o ambiente utilizando o plano de "Consumo (Windows)" clássico para manter o desenvolvimento ágil em nuvem.

* **Google Cloud Platform (GCP)**
  * **Configuração:** Fluxo de implantação altamente linear e rápido.
  * **Desafios:** O principal ponto de fricção ocorreu no IAM. Para que a API ficasse pública para o SaaS, foi necessário identificar e conceder explicitamente o papel de "Invocador do Cloud Run" para o grupo `allUsers`.
