package pages;

import org.openqa.selenium.WebDriver;

import utils.Actions;

public class CheckoutPage {

	private WebDriver driver;
	private Actions actions;

	public CheckoutPage(WebDriver driver) {
		this.driver = driver;
		this.actions = new Actions(this.driver);
	}

	public void preencherCartaoCredito(String numero, String vencimento, String cvv) {
		actions.escreverPegandoPeloId("card-number", numero);
		actions.escreverPegandoPeloId("card-expiry", vencimento);
		actions.escreverPegandoPeloId("card-cvv", cvv);
	}
	
	public void btnPagarAgora() {
		actions.clicarBotaoPegandoPeloId("pay-button");
	}

}
