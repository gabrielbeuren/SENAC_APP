import { router, Stack, useFocusEffect } from 'expo-router'; // troca de tela; Stack.Screen muda o cabeçalho; useFocusEffect roda código só enquanto esta tela está visível
import { useCallback, useEffect, useRef, useState } from 'react'; // useRef = trava contra toques repetidos; useEffect = limpeza ao sair da tela
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'; // componentes básicos; BackHandler = botão/gesto voltar do Android
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // mede as barras do sistema deste aparelho
import { Botao } from '../components/Botao'; // nosso botão
import { Opcao } from '../components/Opcao'; // opção marcável
import { CORES } from '../constants/tema'; // cores do app
import { useTeste } from '../contexto/TesteContext'; // respostas compartilhadas entre as telas
import { ESCALA, PERGUNTAS } from '../data/perguntas'; // perguntas e textos da escala

export default function TelaTeste() {
  const { respostas, responder } = useTeste(); // respostas já dadas e função para gravar
  const [indice, setIndice] = useState(0); // posição da pergunta atual (0 = primeira)
  const insets = useSafeAreaInsets(); // insets.bottom = altura da barra de navegação deste celular
  const travado = useRef(false); // true = já tem um avanço em andamento, ignora novos toques
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null); // guarda o setTimeout agendado para poder cancelar

  // Cancela um avanço automático pendente e abre a trava.
  // Assim a trava nunca fica "presa" fechada, e o Voltar sempre funciona.
  function cancelarAvanco() {
    if (timer.current) clearTimeout(timer.current); // desmarca o setTimeout agendado (se houver)
    timer.current = null; // não há mais avanço pendente
    travado.current = false; // abre a trava
  }

  useEffect(() => {
    return cancelarAvanco; // roda quando a tela é fechada: não navega depois de sair
  }, []); // [] = configura só uma vez, quando a tela abre

  const pergunta = PERGUNTAS[indice]; // pergunta mostrada agora
  const notaAtual = respostas[pergunta.id]; // nota já dada nesta pergunta (ou undefined)
  const ehUltima = indice === PERGUNTAS.length - 1; // true na última pergunta
  const progresso = ((indice + 1) / PERGUNTAS.length) * 100; // percentual da barra de progresso

  function avancar() {
    if (ehUltima) router.push('/filtros'); // acabou: vai para o filtro de realidade
    else setIndice((i) => Math.min(i + 1, PERGUNTAS.length - 1)); // próxima pergunta, sem nunca passar da última (segunda proteção)
  }

  function escolher(nota: number) {
    if (travado.current) return; // já está avançando: ignora este toque
    travado.current = true; // fecha a trava
    responder(pergunta.id, nota); // grava a nota no contexto
    timer.current = setTimeout(() => { // espera 1/4 de segundo para a pessoa ver a opção marcada
      timer.current = null; // o avanço agendado já está acontecendo
      travado.current = false; // abre a trava ANTES de navegar, para ela nunca ficar presa
      avancar(); // avança uma única vez
    }, 250);
  }

  function botaoAvancar() {
    if (notaAtual === undefined) return; // sem resposta nesta pergunta: não avança (proteção extra além do botão desabilitado)
    if (travado.current) return; // se o avanço automático já está agendado, não avança de novo
    avancar(); // avanço manual pelo botão
  }

  function voltar() {
    cancelarAvanco(); // se tinha um avanço agendado, cancela: o Voltar tem prioridade e nunca fica bloqueado
    if (indice === 0) router.back(); // na primeira pergunta, volta para a tela inicial
    else setIndice((i) => i - 1); // senão, volta uma pergunta
  }

  // Botão/gesto "voltar" do Android: em vez de fechar a tela inteira, volta uma pergunta.
  // useFocusEffect liga isso só enquanto ESTA tela está aparecendo; quando a pessoa vai para
  // os filtros, o "desligar" roda e o voltar do Android volta a funcionar normal lá.
  useFocusEffect(
    useCallback(() => {
      const assinatura = BackHandler.addEventListener('hardwareBackPress', () => {
        voltar(); // mesma ação do botão Voltar de baixo
        return true; // true = "já tratei", o Android não fecha a tela sozinho
      });
      return () => assinatura.remove(); // desliga ao sair da tela
    }, [indice]), // refaz quando muda a pergunta, para usar o índice atualizado
  );

  // ---------- TELA DA PERGUNTA ----------
  return (
    // paddingBottom somado ao inset: numa pergunta longa o conteúdo rola, e sem isso
    // os botões Voltar/Avançar terminam atrás da barra de navegação do Android.
    <ScrollView style={styles.tela} contentContainerStyle={[styles.conteudo, { paddingBottom: insets.bottom + 24 }]}>
      {/* Troca a seta ← do topo por uma nossa, que volta UMA pergunta (a seta padrão fechava o teste inteiro) */}
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={voltar} // mesma ação do botão Voltar de baixo
              hitSlop={12} // aumenta a área de toque em volta da seta
              accessibilityRole="button" // leitor de tela anuncia como botão
              accessibilityLabel="Voltar" // o que o leitor de tela fala
              style={styles.setaBotao} // espaço entre a seta e o título
            >
              <Text style={styles.seta}>←</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.progressoBloco}>
        <Text style={styles.progressoTexto}>
          Pergunta {indice + 1} de {PERGUNTAS.length}
        </Text>
        <View style={styles.trilho /* fundo da barra (100%) */}>
          <View style={[styles.preenchido, { width: `${progresso}%` }]} />
        </View>
      </View>

      <Text style={styles.pergunta}>{pergunta.texto}</Text>

      <View style={styles.opcoes}>
        {ESCALA.map((texto, posicao) => { // desenha as 5 opções da escala
          const nota = posicao + 1; // posição 0 vira nota 1, posição 4 vira nota 5
          return (
            <Opcao
              key={nota} // identificador da opção na lista
              numero={nota} // número no círculo
              texto={texto} // texto da opção
              selecionada={notaAtual === nota} // marcada se for a nota já escolhida
              onPress={() => escolher(nota)} // grava e avança
            />
          );
        })}
      </View>

      <View style={styles.rodape}>
        <Botao texto="Voltar" variante="contorno" onPress={voltar} />
        <Botao
          texto={ehUltima ? 'Concluir' : 'Avançar'} // na última pergunta vira "Concluir"
          onPress={botaoAvancar} // versão com trava
          desabilitado={notaAtual === undefined} // fica sempre visível, mas apagado até a pessoa escolher uma opção
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo }, // fundo azul-escuro em toda a tela
  conteudo: { padding: 20, gap: 24, maxWidth: 640, width: '100%', alignSelf: 'center' }, // largura máxima no PC
  progressoBloco: { gap: 8 }, // texto e barra de progresso
  progressoTexto: { fontSize: 15, color: CORES.azulClaro, fontWeight: 'bold' }, // "Pergunta 3 de 18"
  trilho: { height: 8, borderRadius: 4, backgroundColor: CORES.cartao, overflow: 'hidden' }, // fundo da barra
  preenchido: { height: '100%', backgroundColor: CORES.laranja }, // parte laranja da barra
  pergunta: { fontSize: 23, fontWeight: 'bold', color: CORES.texto, lineHeight: 31 }, // texto da pergunta
  opcoes: { gap: 10 }, // espaço entre as opções
  rodape: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 }, // botões Voltar e Avançar
  setaBotao: { paddingRight: 16 }, // afasta a seta do título "Teste vocacional"
  seta: { fontSize: 24, color: CORES.texto }, // seta branca, do tamanho da seta padrão
});
