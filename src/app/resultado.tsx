import { router, Stack } from 'expo-router'; // navegação; Stack.Screen define o título desta tela
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'; // Linking abre o link do PSG
import { BarraArea } from '../components/BarraArea'; // uma linha do gráfico de percentuais
import { Botao } from '../components/Botao'; // nosso botão
import { CartaoCurso } from '../components/CartaoCurso'; // cartão de um curso com botões de site e WhatsApp
import { ESCOLA } from '../constants/escola'; // contatos do Senac Taquara
import { CORES } from '../constants/tema'; // cores do app
import { useTeste } from '../contexto/TesteContext'; // respostas das perguntas + escolhas do filtro
import { buscarArea } from '../data/areas'; // nome e descrição de uma área a partir do id
import { CURSOS } from '../data/catalogo'; // todos os cursos
import { recomendarCursos } from '../logica/pontuacao'; // calcula percentuais e escolhe os cursos

export default function TelaResultado() {
  const { respostas, filtros, reiniciar } = useTeste(); // dados guardados pelas telas anteriores

  // Uma chamada só faz todo o cálculo (ver logica/pontuacao.ts):
  // resultados = percentual de cada área | areas = 2 mais fortes | cursosPorArea = cursos já filtrados
  const { resultados, areas, cursosPorArea } = recomendarCursos(CURSOS, respostas, filtros);
  const semInteresse = areas.length === 0; // true se a pessoa marcou "Nada a ver comigo" em tudo

  function refazer() {
    reiniciar(); // apaga respostas e filtros
    router.dismissTo('/'); // volta para a tela inicial fechando as telas abertas
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Stack.Screen options={{ title: 'Seu resultado' }} /* título do cabeçalho */ />

      {/* ---------- 1) PERFIL EM PERCENTUAIS ---------- */}
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Seu perfil</Text>
        {semInteresse ? ( // caso especial: nenhuma área recebeu pontos
          <Text style={styles.texto}>
            Você não marcou interesse em nenhuma área. Que tal conversar com a nossa equipe para descobrir juntos?
          </Text>
        ) : (
          resultados.map((r) => (
            <BarraArea
              key={r.area.id} // identificador da linha
              resultado={r} // área + percentual
              destaque={areas.includes(r.area.id)} // negrito nas 2 áreas recomendadas
            />
          ))
        )}
      </View>

      {/* ---------- 2) CURSOS DAS ÁREAS RECOMENDADAS ---------- */}
      {cursosPorArea.map(({ areaId, cursos }) => {
        const area = buscarArea(areaId); // nome e descrição da área
        return (
          <View key={areaId} style={styles.secao}>
            <Text style={styles.titulo}>Cursos de {area.nome}</Text>
            <Text style={styles.texto}>{area.descricao}</Text>
            {cursos.length === 0 ? ( // nenhum curso passou no filtro de realidade
              <Text style={styles.vazio}>
                Nenhum curso desta área combina com a rotina que você escolheu. Volte e marque "Tanto faz" para ver
                mais opções.
              </Text>
            ) : (
              cursos.map((curso) => <CartaoCurso key={curso.id} curso={curso} />) // um cartão por curso
            )}
          </View>
        );
      })}

      {/* ---------- 3) VAGAS GRATUITAS (só aparece se marcou "Sim" no filtro) ---------- */}
      {filtros.querGratuito && (
        <View style={styles.cartao}>
          <Text style={styles.titulo}>Vagas gratuitas</Text>
          <Text style={styles.texto}>
            O Programa Senac de Gratuidade (PSG) oferece turmas 100% gratuitas para pessoas de baixa renda. As vagas são
            limitadas e preenchidas por ordem de inscrição.
          </Text>
          <Botao texto="Ver vagas gratuitas" variante="contorno" onPress={() => Linking.openURL(ESCOLA.psg)} />
        </View>
      )}

      {/* ---------- 4) AVISO E AÇÕES FINAIS ---------- */}
      <Text style={styles.aviso}>
        Este resultado é um ponto de partida, não uma decisão. Fale com o {ESCOLA.nome}: {ESCOLA.telefone},{' '}
        {ESCOLA.endereco}.
      </Text>
      <Botao texto="Refazer o teste" onPress={refazer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo }, // fundo azul-escuro em toda a tela
  conteudo: { padding: 20, paddingBottom: 40, gap: 26, maxWidth: 640, width: '100%', alignSelf: 'center' }, // área útil
  cartao: {
    backgroundColor: CORES.cartao, // fundo branco quase transparente
    borderRadius: 12, // cantos arredondados
    borderWidth: 1, // borda fina
    borderColor: CORES.borda, // borda branca transparente
    padding: 18, // espaço interno
    gap: 14, // espaço entre os itens
  },
  secao: { gap: 12 }, // bloco de cursos de uma área
  titulo: { fontSize: 21, fontWeight: 'bold', color: CORES.laranja }, // títulos em laranja, como o "SENAC CURSOS"
  texto: { fontSize: 15, color: CORES.textoSuave, lineHeight: 22 }, // textos explicativos
  vazio: { fontSize: 15, color: CORES.texto, fontStyle: 'italic', lineHeight: 22 }, // aviso de área sem cursos
  aviso: { fontSize: 13, color: CORES.textoSuave, textAlign: 'center', lineHeight: 19 }, // aviso final
});
