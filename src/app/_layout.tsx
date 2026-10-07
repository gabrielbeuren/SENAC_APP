import { Stack } from 'expo-router'; // navegação em pilha: uma tela por cima da outra, com botão de voltar
import { StatusBar } from 'expo-status-bar'; // barra do relógio/bateria do celular
import { CORES } from '../constants/tema'; // cores do app
import { TesteProvider } from '../contexto/TesteContext'; // guarda as respostas para todas as telas

// Layout raiz: troca as abas do modelo do Expo por uma pilha de telas
// e envolve tudo com o TesteProvider, para as telas compartilharem as respostas.
export default function RootLayout() {
  return (
    <TesteProvider>
      <StatusBar style="light" /* ícones brancos, porque o fundo é escuro */ />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: CORES.fundo }, // cabeçalho com o mesmo azul-escuro das telas
          headerTintColor: CORES.texto, // título e seta de voltar em branco
          headerTitleStyle: { fontWeight: 'bold' }, // título em negrito
          headerShadowVisible: false, // sem linha separando o cabeçalho da tela
          contentStyle: { backgroundColor: CORES.fundo }, // fundo azul-escuro em todas as telas
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} /* tela inicial ocupa a tela toda */ />
        <Stack.Screen name="teste" options={{ title: 'Teste vocacional' }} /* tela das perguntas */ />
      </Stack>
    </TesteProvider>
  );
}
