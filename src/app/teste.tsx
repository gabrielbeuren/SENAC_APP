import { router } from 'expo-router'; // troca de tela
import { useState } from 'react'; // estado local da tela
import { ScrollView, StyleSheet, Text, View } from 'react-native'; // componentes básicos
import { Botao } from '../components/Botao'; // nosso botão
import { Opcao } from '../components/Opcao'; // opção marcável
import { CORES } from '../constants/tema'; // cores do app
import { useTeste } from '../contexto/TesteContext'; // respostas compartilhadas entre as telas
import { ESCALA, PERGUNTAS } from '../data/perguntas'; // perguntas e textos da escala

export default function TelaTeste() {
  const { respostas, responder } = useTeste(); // respostas já dadas e função para gravar
  const [indice, setIndice] = useState(0); // posição da pergunta atual (0 = primeira)

  const pergunta = PERGUNTAS[indice]; // pergunta mostrada agora
  const notaAtual = respostas[pergunta.id]; // nota já dada nesta pergunta (ou undefined)
  const ehUltima = indice === PERGUNTAS.length - 1; // true na última pergunta
  const progresso = ((indice + 1) / PERGUNTAS.length) * 100; // percentual da barra de progresso

  function avancar() {
    if (ehUltima) router.push('/filtros'); // acabou: vai para o filtro de realidade
    else setIndice((i) => i + 1); // senão: próxima pergunta
  }

  function escolher(nota: number) {
    responder(pergunta.id, nota); // grava a nota no contexto
    setTimeout(avancar, 250); // espera 1/4 de segundo para a pessoa ver a opção marcada e avança
  }

  function voltar() {
    if (indice === 0) router.back(); // na primeira pergunta, volta para a tela inicial
    else setIndice((i) => i - 1); // senão, volta uma pergunta
  }

  // ---------- TELA DA PERGUNTA ----------
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
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
        {notaAtual !== undefined && ( // "Avançar" só aparece se a pergunta já tem resposta
          <Botao texto={ehUltima ? 'Concluir' : 'Avançar'} onPress={avancar} />
        )}
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
});
