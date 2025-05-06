package pages;

import org.openqa.selenium.WebDriver;

import utils.Actions;

public class ChatPage {

	private WebDriver driver;
	private Actions actions;

	public ChatPage(WebDriver driver) {
		this.driver = driver;
		this.actions = new Actions(this.driver);
	}
	
	public void inputChat(String msg) {
		actions.escreverPegandoPeloId("chat-input", msg);
	}
	
	public void btnEnviarChat() {
		actions.clicarBotaoPegandoPeloId("chat-send-button");
	}
	
	
}