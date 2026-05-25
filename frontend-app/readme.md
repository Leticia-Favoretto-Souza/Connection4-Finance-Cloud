# 🚀 Módulo Frontend: Hospedagem e Deploy (Firebase Hosting)

Este guia documenta o processo de preparação do ambiente local e a implantação da interface web utilizando o Firebase Hosting para garantir um ambiente seguro e contornar restrições locais de CORS.

---

## Passo 1: Preparação do Ambiente Local

* Instalação do **Node.js** para habilitação do gerenciador de pacotes (`npm`).
* Configuração de permissões de execução de scripts no Windows PowerShell (caso necessário) utilizando o comando abaixo:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
---

## Passo 2: Instalação do CLI do Firebase

* Execução do comando de instalação global da ferramenta do Firebase via terminal do VSCode: **npm install -g firebase-tools**


## Passo 3: Autenticação e Inicialização

* Vínculo da conta Google responsável pelo projeto através do comando: **firebase login**
* Criação do ecossistema de hospedagem na pasta raiz do projeto rodando: **firebase init hosting**
* Durante a inicialização, seguimos as seguintes definições interativas:
  * Vinculamos ao projeto já existente no Google Cloud.
  * Definimos a raiz pública como . (ponto).
  * Respondemos Não (N) para evitar sobrescrever o arquivo index.html original.

---

## Passo 4: Deploy Final

* Envio dos arquivos de produção (HTML/CSS/JS) para os servidores globais do Google via comando final: **firebase deploy**
* Validação da funcionalidade através da URL segura (https://seu-projeto.web.app) gerada no console, sanando em definitivo os bloqueios de origem nula (null origin) impostos pelos navegadores durante os testes locais.
