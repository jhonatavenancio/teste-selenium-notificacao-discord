package utils;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Actions {

	private final WebDriver driver;

	public Actions(WebDriver driver) {
		this.driver = driver;
	}

	// ========== MÉTODOS PRIVADOS AUXILIARES ==========

	private WebElement localizarElementoComTentativas(By by) {
		int tentativas = 0;
		WebElement elemento = null;

		while (tentativas < 3) {
			try {
				WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
				elemento = wait.until(ExpectedConditions.presenceOfElementLocated(by));
				return elemento;
			} catch (Exception e) {
				Log.registrar("Tentativa " + (tentativas + 1) + " falhou para localizar: " + by + " - " + e.getMessage());
				esperar(500);
				tentativas++;
			}
		}
		Log.registrar("Elemento não localizado após 3 tentativas: " + by);
		throw new RuntimeException("Elemento não localizado após tentativas: " + by);
	}

	private void executarAcaoComTentativas(Runnable acao) {
		int tentativas = 0;
		Exception ultimaExcecao = null;

		while (tentativas < 3) {
			try {
				acao.run();
				return;
			} catch (Exception e) {
				Log.registrar("Tentativa " + (tentativas + 1) + " falhou ao executar ação: " + e.getMessage());
				esperar(500);
				ultimaExcecao = e;
				tentativas++;
			}
		}
		throw new RuntimeException("Ação falhou após tentativas", ultimaExcecao);
	}

	private void clicarElemento(WebElement elemento, String locatorInfo) {
		Log.registrar("Clicar em elemento: " + locatorInfo);
		executarAcaoComTentativas(elemento::click);
	}

	private void escreverNoElemento(WebElement elemento, String texto, String locatorInfo) {
		Log.registrar("Escrever '" + texto + "' em elemento: " + locatorInfo);
		executarAcaoComTentativas(() -> elemento.sendKeys(texto));
	}

	// ========== MÉTODOS PÚBLICOS POR TIPO DE LOCATOR ==========

	// ---------- CSS ----------
	public WebElement pegarElementoPeloCss(String css) {
		Log.registrar("Pegar elemento CSS: " + css);
		return localizarElementoComTentativas(By.cssSelector(css));
	}

	public void clicarBotaoPegandoPeloCss(String css) {
		clicarElemento(pegarElementoPeloCss(css), "CSS: " + css);
	}

	public void escreverPegandoPeloCss(String css, String texto) {
		escreverNoElemento(pegarElementoPeloCss(css), texto, "CSS: " + css);
	}

	public String lerTextoPegandoPeloCss(String css) {
		Log.registrar("Ler texto CSS: " + css);
		return pegarElementoPeloCss(css).getText();
	}

	public boolean validarVisibilidadeCss(String css) {
		try {
			WebElement elemento = pegarElementoPeloCss(css);
			Log.registrar("Validar visibilidade CSS: " + css);
			return elemento.isDisplayed();
		} catch (NoSuchElementException e) {
			Log.registrar("Elemento CSS não visível: " + css);
			return false;
		}
	}

	// ---------- ID ----------
	public WebElement pegarElementoPeloId(String id) {
		Log.registrar("Pegar elemento ID: " + id);
		return localizarElementoComTentativas(By.id(id));
	}

	public void clicarBotaoPegandoPeloId(String id) {
		clicarElemento(pegarElementoPeloId(id), "ID: " + id);
	}

	public void escreverPegandoPeloId(String id, String texto) {
		escreverNoElemento(pegarElementoPeloId(id), texto, "ID: " + id);
	}

	// ---------- CLASS NAME ----------
	public WebElement pegarElementoPeloClassName(String className) {
		Log.registrar("Pegar elemento CLASS NAME: " + className);
		return localizarElementoComTentativas(By.className(className));
	}

	public void clicarBotaoPegandoPeloClassName(String className) {
		clicarElemento(pegarElementoPeloClassName(className), "CLASS NAME: " + className);
	}

	public void escreverPegandoPeloClassName(String className, String texto) {
		escreverNoElemento(pegarElementoPeloClassName(className), texto, "CLASS NAME: " + className);
	}

	// ---------- XPATH ----------
	public WebElement pegarElementoPeloXpath(String xpath) {
		Log.registrar("Pegar elemento XPATH: " + xpath);
		return localizarElementoComTentativas(By.xpath(xpath));
	}

	public void clicarBotaoPegandoPeloXpath(String xpath) {
		clicarElemento(pegarElementoPeloXpath(xpath), "XPATH: " + xpath);
	}

	public void escreverPegandoPeloXpath(String xpath, String texto) {
		escreverNoElemento(pegarElementoPeloXpath(xpath), texto, "XPATH: " + xpath);
	}

	// ---------- NAME ----------
	public WebElement pegarElementoPeloName(String name) {
		Log.registrar("Pegar elemento NAME: " + name);
		return localizarElementoComTentativas(By.name(name));
	}

	public void clicarBotaoPegandoPeloName(String name) {
		clicarElemento(pegarElementoPeloName(name), "NAME: " + name);
	}

	public void escreverPegandoPeloName(String name, String texto) {
		escreverNoElemento(pegarElementoPeloName(name), texto, "NAME: " + name);
	}

	// ========== MÉTODOS DE ESPERA ==========

	public void esperar(int tempoEspera) {
		try {
			Log.registrar("Esperar " + tempoEspera + "ms");
			Thread.sleep(tempoEspera);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			Log.registrar("Erro na espera: " + e.getMessage());
		}
	}

	// ========== MÉTODO DE VALIDAÇÃO ==========

	public void validarNotificacao(String id, String textoEsperado) {
		Log.registrar("Validar notificação no ID: " + id + " com texto esperado: '" + textoEsperado + "'");
		WebElement elemento = pegarElementoPeloId(id);
		String textoAtual = elemento.getText();

		if (!textoAtual.equals(textoEsperado)) {
			String mensagem = "Texto da notificação não confere. Esperado: '" + textoEsperado + "', mas foi: '" + textoAtual + "'";
			Log.registrar(mensagem);
			throw new AssertionError(mensagem);
		}

		Log.registrar("Notificação validada com sucesso: '" + textoEsperado + "'");
	}
}
