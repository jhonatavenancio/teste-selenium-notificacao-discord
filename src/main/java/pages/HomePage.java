package pages;

import org.openqa.selenium.WebDriver;
import utils.Actions;

public class HomePage {

	private final WebDriver driver;
	private final Actions actions;

	public HomePage(WebDriver driver) {
		this.driver = driver;
		this.actions = new Actions(this.driver);
	}
	
	public void btnReserva(String lugar) {
		String botaoId;

		switch (lugar.toUpperCase()) {
			case "BH": botaoId = "reserve-btn-2"; break;
			case "BA": botaoId = "reserve-btn-3"; break;
			case "SC": botaoId = "reserve-btn-4"; break;
			case "OP": botaoId = "reserve-btn-5"; break;
			case "RS": botaoId = "reserve-btn-6"; break;
			case "RJ":
			default:
				botaoId = "reserve-btn-1"; break;
		}

		actions.clicarBotaoPegandoPeloId(botaoId);
	}
	
	public void btnPagamento() {
		actions.clicarBotaoPegandoPeloCss("#root > div > div > div > form > button");
	}

	public void inputNomeHospede(String nome) {
		actions.escreverPegandoPeloId("guest-name", nome);
	}
	
	public void dropdownQuantidadeHospede(int quantidade) {
		actions.clicarBotaoPegandoPeloId("guest-count");
		actions.esperar(300);

		int index = Math.max(1, Math.min(quantidade, 6));
		String seletor = String.format("#guest-count > option:nth-child(%d)", index);
		actions.clicarBotaoPegandoPeloCss(seletor);
	}
}
