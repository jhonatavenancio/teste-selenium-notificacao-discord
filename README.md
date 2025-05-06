# 🐞 AirBug - Testes Automatizados 

Projeto de testes automatizados para o sistema de hospedagem **AirBug**, inspirado em plataformas como o Airbnb. Os testes têm como objetivo validar a experiência do usuário em cenários de reserva e comunicação com anfitriões, garantindo a confiabilidade da aplicação hospedada em:

🔗 [Link do airBug no Netflify](https://shiny-tanuki-037144.netlify.app)


![image](https://github.com/user-attachments/assets/0be1e8dc-8be8-4bcb-b38b-d39ca01b29eb)
Projeto AirBug gerado por IA no repositório, caso link esteja indisponível.

---

## 📂 Estrutura do Projeto de testes automatizados

```
airBug/
├── src/
│   ├── main/java/
│   │   ├── data/                 # Dados de acesso e informações de teste (dados fake com Faker)
│   │   ├── drivers/              # Configuração e controle do navegador (WebDriver)
│   │   ├── pages/                # Page Objects representando cada tela do sistema
│   │   └── utils/                # Utilitários como ações genéricas, logs e disparo no Discord
│   └── test/java/
│       ├── logs/                 # Geração de logs por classe de teste
│       └── tests/                # Casos de teste com JUnit5
```

---

## 🧪 Tecnologias Utilizadas

* **Java 11**
* **Selenium WebDriver**
* **JUnit 5 (Jupiter)**
* **Java Faker** – Geração de dados dinâmicos (nome do hóspede, cartão, etc.)
* **OkHttp** – Envio dos resultados para **Discord Webhook**
* **Maven** – Gerenciamento de dependências e build
* **Padrão Page Object Model (POM)**

---

## 🚀 Como Executar os Testes

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/airbug-teste-automatizado.git
cd airbug-teste-automatizado
```

### 2. Execute os testes com Maven:

```bash
mvn clean test
```

> Os testes são executados automaticamente no navegador configurado (modo headless ativável via `Access.java`), e os resultados são enviados para um canal do Discord, se configurado.

---

## 💬 Notificações via Discord

O projeto possui uma funcionalidade para enviar os resultados dos testes (início e finalização) diretamente para um canal do Discord via Webhook, para equipe acompanhar a execução dos testes. Para habilitar:

1. Configure seu Webhook no arquivo `DisparoNotificacaoDiscord.java`.
2. Certifique-se de que o método `@ExtendWith(DisparoResultadoDiscord.class)` esteja presente na classe de teste.

![image](https://github.com/user-attachments/assets/d0d7fd0c-6fbf-48eb-99f4-70257641a218)


---

## 📄 Exemplos de Testes Automatizados

A classe `ReservaTest.java` cobre os seguintes cenários:

* ✅ Reserva confirmada com dados válidos
* 💬 Início de conversa com o anfitrião após reserva
* ❌ Reserva indisponível por manutenção
* 🚫 Falha ao reservar propriedades não disponíveis

![image](https://github.com/user-attachments/assets/2812878d-2465-4777-bb54-305c2db324ee)


---

## 🧠 Boas práticas adotadas

* **Separação clara de responsabilidades** usando POM
* **Reutilização de componentes** (Page Objects, Actions, Drivers)
* **Logs centralizados** por classe de teste
* **Execução com ou sem interface gráfica** (`headless` configurável)
* **Notificações externas integradas** (Discord)

