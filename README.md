# 🤖 Sistema de Disparo Automatizado com Notificações no Discord

Este sistema de testes foi **gerado por inteligência artificial** com o objetivo de testar funcionalidades modernas de automação e integração, como:

- Execução automatizada de testes (Selenium + JUnit)
- Envio de mensagens para **Discord** via Webhook
- Uso de dados dinâmicos com **Faker**
- Relatórios automatizados e logs centralizados

> O foco principal do projeto é simular um sistema web de hospedagem e validar o sistema em um teste regressivo com notificações de status para acompanhamento no Discord.
🔗 [Link do airBug no Netflify](https://shiny-tanuki-037144.netlify.app)
---

![image](https://github.com/user-attachments/assets/0be1e8dc-8be8-4bcb-b38b-d39ca01b29eb)

## 📦 Principais Funcionalidades

✅ Execução de testes automatizados com Java + Selenium  
💬 Notificações automáticas no Discord ao iniciar e finalizar testes
🔁 Geração de dados falsos realistas com Java Faker  
🧪 Estrutura modular baseada em Page Object Model  
📊 Logs organizados por execução/teste  


---

## 📂 Estrutura do Projeto

```

automated-system/
├── src/
│   ├── main/java/
│   │   ├── data/                 # Dados fictícios de acesso (gerados com Faker)
│   │   ├── drivers/              # WebDriver para controle do navegador
│   │   ├── pages/                # Representação das telas da aplicação (Page Objects)
│   │   └── utils/                # Utilitários, incluindo envio de notificações ao Discord
│   └── test/java/
│       ├── logs/                 # Armazenamento dos logs por classe de teste
│       └── tests/                # Casos de testes com JUnit5

````

---

## 🔧 Tecnologias Utilizadas

- **Java 11**
- **Selenium WebDriver**
- **JUnit 5 (Jupiter)**
- **Java Faker** – Geração de dados realistas para os testes
- **OkHttp** – Envio de notificações para o Discord via Webhook
- **Maven** – Gerenciamento de dependências
- **Page Object Model (POM)** – Arquitetura organizada de testes

---

## 🧪 Como Executar os Testes

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sistema-disparo-discord.git
cd sistema-disparo-discord
````

### 2. Execute os testes com Maven

```bash
mvn clean test
```

> A execução ocorre automaticamente no navegador configurado (com suporte a modo `headless`). As mensagens são enviadas ao Discord antes, durante e depois da execução (através do webhook configurado).
---


## 💬 Notificações via Discord

A automação é integrada com Discord para **alertar a equipe sobre o status da execução dos testes**, ideal para ser executado integrado com pipelines de CI/CD.

![image](https://github.com/user-attachments/assets/d0d7fd0c-6fbf-48eb-99f4-70257641a218)
![image](https://github.com/user-attachments/assets/2812878d-2465-4777-bb54-305c2db324ee)

### ✔️ Como ativar:

1. Crie um **Webhook do Discord** no seu servidor.

2. Adicione o link no arquivo:

   ```
   src/main/java/utils/DisparoNotificacaoDiscord.java
   ```
   



