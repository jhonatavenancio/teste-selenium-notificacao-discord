package tests;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;

import utils.DisparoNotificacaoDiscord;

import org.junit.jupiter.api.extension.BeforeTestExecutionCallback;
import org.junit.jupiter.api.extension.AfterTestExecutionCallback;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import utils.Log;

public class DisparoResultadoDiscord implements TestWatcher, BeforeTestExecutionCallback, AfterTestExecutionCallback {

    private final ConcurrentHashMap<String, Long> temposDeInicio = new ConcurrentHashMap<>();

    @Override
    public void beforeTestExecution(ExtensionContext context) {
        String id = context.getUniqueId();
        temposDeInicio.put(id, System.currentTimeMillis());
    }

    @Override
    public void afterTestExecution(ExtensionContext context) {
    	   String nomeMetodo = context.getDisplayName();
    	   long duracao = calcularDuracao(context);
    	   Log.registrar(String.format("🏁 Teste finalizado: %s | Duração: %d ms", nomeMetodo, duracao));
    }

    @Override
    public void testSuccessful(ExtensionContext context) {
        String nomeMetodo = context.getDisplayName();
        long duracao = calcularDuracao(context);
        String mensagem = String.format("✅ **Teste passou**: `%s`\n⏱️ Duração: %d ms", nomeMetodo, duracao);
        DisparoNotificacaoDiscord.sendMessage(mensagem);
    }

    @Override
    public void testFailed(ExtensionContext context, Throwable cause) {
        String nomeMetodo = context.getDisplayName();
        long duracao = calcularDuracao(context);
        String mensagem = String.format("❌ **Teste falhou**: `%s`\n💥 Erro: %s\n⏱️ Duração: %d ms",
                nomeMetodo, cause.getMessage(), duracao);
        DisparoNotificacaoDiscord.sendMessage(mensagem);
    }

    @Override
    public void testDisabled(ExtensionContext context, Optional<String> reason) {
        String nomeMetodo = context.getDisplayName();
        String mensagem = String.format("⚠️ **Teste desativado**: `%s`\nMotivo: %s",
                nomeMetodo, reason.orElse("sem motivo informado"));
        DisparoNotificacaoDiscord.sendMessage(mensagem);
    }

    private long calcularDuracao(ExtensionContext context) {
        String id = context.getUniqueId();
        Long inicio = temposDeInicio.getOrDefault(id, System.currentTimeMillis());
        return System.currentTimeMillis() - inicio;
    }
}
