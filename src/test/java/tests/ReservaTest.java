package tests;

import java.time.Duration;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import data.Access;
import data.Info;
import drivers.Browser;
import pages.CheckoutPage;
import pages.HomePage;
import pages.ChatPage;
import utils.Actions;
import utils.Log;

@ExtendWith(DisparoResultadoDiscord.class)
public class ReservaTest {

	private WebDriver driver;
	private WebDriverWait wait;
	private Actions actions;
	private HomePage home;
	private CheckoutPage checkout;
	private ChatPage chat;

	@BeforeAll
	public static void iniciarLog() {
		Log.criarArquivoLog("Log.ReservaTest");
	}

	@BeforeEach
	public void setUp() {
		driver = Browser.iniciarNavegador(Access.navegador, Access.headless);
		driver.get(Access.url);

		wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		actions = new Actions(driver);
		home = new HomePage(driver);
		checkout = new CheckoutPage(driver);
		chat = new ChatPage(driver);
	}

	@AfterEach
	public void tearDown() {
		Browser.fecharNavegador(Access.fecharNavegador);
	}

	@AfterAll
	public static void encerrarLog() {
		Log.encerrarLog();
	}

	@Test
	public void reservaConfirmada() {
		Log.registrar("TESTE REALIZADO - Reserva Confirmada");

		home.btnReserva("RJ");
		home.inputNomeHospede(Info.nomeHospede);
		home.dropdownQuantidadeHospede(1);
		home.btnPagamento();

		checkout.preencherCartaoCredito(Info.numeroCartaoCredito, Info.vencimento, Info.cvv);
		checkout.btnPagarAgora();

		actions.esperar(300);
		actions.validarNotificacao("reservation-confirmation", "Reserva confirmada!");
	}

	@Test
	public void conversarComAnfitriao() {
		Log.registrar("TESTE REALIZADO - Conversa com Anfitrião");

		String nomeAnfitriao = driver.findElement(By.id("host-name-1"))
				.getText().replace("Anfitrião: ", "").trim();

		home.btnReserva("RJ");
		home.inputNomeHospede(Info.nomeHospede);
		home.dropdownQuantidadeHospede(1);
		home.btnPagamento();

		checkout.preencherCartaoCredito(Info.numeroCartaoCredito, Info.vencimento, Info.cvv);
		checkout.btnPagarAgora();

		actions.esperar(300);
		actions.validarNotificacao("reservation-confirmation", "Reserva confirmada!");

		WebElement conversa = wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.cssSelector(".flex:nth-child(1) > .font-medium")));

		String textoConversa = conversa.getText().replace("Conversar com ", "").trim();
		Assertions.assertEquals(nomeAnfitriao, textoConversa,
			"O nome do anfitrião na conversa está incorreto!");

		String mensagem = "Olá, chego em 3 horas!";
		chat.inputChat(mensagem);
		chat.btnEnviarChat();

		WebElement ultimaMensagem = wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.cssSelector(".max-w-\\[80\\%\\]"))); // Sugestão: usar ID ou data-testid

		Assertions.assertEquals(mensagem, ultimaMensagem.getText(),
			"A mensagem enviada pelo hóspede não foi exibida corretamente no chat!");
	}

	@Test
	public void reservaIndisponivel() {
		Log.registrar("TESTE REALIZADO - Reserva Indisponível");

		home.btnReserva("BA");
		actions.esperar(300);

		String mensagemErro = "Desculpe, esta propriedade está temporariamente indisponível devido a problemas de manutenção.";

		WebElement mensagem = wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.cssSelector(".text-red-700")));

		Assertions.assertEquals(mensagemErro, mensagem.getText(),
			"A mensagem de erro não foi exibida corretamente!");
	}

	@Test
	public void falhaAoReservar() {
		Log.registrar("TESTE REALIZADO - Falha ao Reservar");

		home.btnReserva("OP");
		home.inputNomeHospede(Info.nomeHospede);
		home.dropdownQuantidadeHospede(1);
		home.btnPagamento();

		checkout.preencherCartaoCredito(Info.numeroCartaoCredito, Info.vencimento, Info.cvv);
		checkout.btnPagarAgora();

		actions.esperar(300);

		String mensagemErro = "Desculpe, esta propriedade está temporariamente indisponível para reservas.";

		WebElement mensagem = wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.cssSelector(".text-red-700")));

		Assertions.assertEquals(mensagemErro, mensagem.getText(),
			"A mensagem de erro não foi exibida corretamente!");
	}
}
