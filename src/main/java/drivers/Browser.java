package drivers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;

public class Browser {

	private static WebDriver driver;

	public enum TipoNavegador {
		CHROME, FIREFOX, EDGE
	}

	/**
	 * Inicializa o navegador especificado com ou sem interface gráfica.
	 *
	 * @param navegador Tipo de navegador a ser utilizado
	 * @param headless  Se verdadeiro, executa em modo headless
	 * @return Instância do WebDriver
	 */
	public static WebDriver iniciarNavegador(String navegador, boolean headless) {
		TipoNavegador tipo;

		try {
			tipo = TipoNavegador.valueOf(navegador.trim().toUpperCase());
		} catch (IllegalArgumentException e) {
			System.out.println("Navegador inválido. Usando CHROME como padrão.");
			tipo = TipoNavegador.CHROME;
		}

		switch (tipo) {
		case FIREFOX:
			driver = iniciarFirefox(headless);
			break;
		case EDGE:
			driver = iniciarEdge(headless);
			break;
		case CHROME:
		default:
			driver = iniciarChrome(headless);
			break;
		}

		return driver;
	}

	private static WebDriver iniciarFirefox(boolean headless) {
		FirefoxProfile profile = new FirefoxProfile();
		profile.setPreference("layout.css.devPixelsPerPx", "1.35");

		FirefoxOptions options = new FirefoxOptions();
		options.setProfile(profile);

		if (headless) {
			options.addArguments("--headless");
		}

		return new FirefoxDriver(options);
	}

	private static WebDriver iniciarEdge(boolean headless) {
		EdgeOptions options = new EdgeOptions();
		options.addArguments("force-device-scale-factor=1.35");

		if (headless) {
			options.addArguments("--headless");
		}

		return new EdgeDriver(options);
	}

	private static WebDriver iniciarChrome(boolean headless) {
		ChromeOptions options = new ChromeOptions();
		options.addArguments("force-device-scale-factor=1.35");
		options.addArguments("--use-fake-ui-for-media-stream");
		options.addArguments("--use-fake-device-for-media-stream");
		options.addArguments("--disable-notifications");

		if (headless) {
			options.addArguments("--headless=new"); // headless mais recente e compatível
		}

		return new ChromeDriver(options);
	}

	/**
	 * Fecha o navegador atual se estiver aberto.
	 *
	 * @param fechar Se verdadeiro, encerra o WebDriver
	 */
	public static void fecharNavegador(boolean fechar) {
		if (fechar && driver != null) {
			driver.quit();
			driver = null;
		}
	}
}
