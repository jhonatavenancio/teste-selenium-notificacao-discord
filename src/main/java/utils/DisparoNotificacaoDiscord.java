package utils;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class DisparoNotificacaoDiscord {
    private static final String WEBHOOK_URL = "https://discordapp.com/api/webhooks/1369350232462332026/-ICvfEbhBxJPsSpfSJEvD0D5vwLnbmomLvjNTJ-HITG7IVwr5AjuoqbNmOZ4NciNzNva";

    public static void sendMessage(String message) {
        try {
            URL url = new URL(WEBHOOK_URL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);
            
            String jsonPayload = "{\"content\":\"" + message.replace("\n", "\\n").replace("\"", "\\\"") + "\"}";

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonPayload.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            
            Log.registrar("Notificação enviada ao Discord: " + responseCode);

            connection.disconnect();
        } catch (Exception e) {
        	
        	Log.registrar("Erro ao enviar notificação ao Discord: " + e.getMessage());
        }
    }
}
