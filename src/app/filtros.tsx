import { router, Stack } from 'expo-router'; // navegação: Stack.Screen define o título desta tela
import { ScrollView, StyleSheet, Text, View } from 'react-native'; // componentes básicos
import { Botao } from '../components/Botao'; // nosso botão
import { Opcao } from '../components/Opcao'; // opção marcável (a mesma das perguntas)
import { CORES } from '../constants/tema'; // cores do app
import { useTeste } from '../contexto/TesteContext'; // guarda os filtros para a tela de resultado ler
import { AREAS } from '../data/areas'; // as 9 áreas (usado no contador de cursos)
import { CURSOS } from '../data/catalogo'; // todos os cursos do Senac Taquara
import { Filtros } from '../data/tipos'; // formato dos filtros
import { filtrarCursos } from '../logica/pontuacao'; // a mesma regra que o resultado vai usar

// ---------------------------------------------------------------------------
// FILTRO DE REALIDADE
// Depois de descobrir do que a pessoa gosta, perguntamos o que cabe na rotina dela.
// Estas respostas NÃO mudam os percentuais: só escondem cursos que ela não conseguiria fazer.
// ---------------------------------------------------------------------------

// Opções de cada pergunta. "valor" é o que vai para a lógica; "texto" é o que a pessoa lê.
const OPCOES_MODALIDADE: { valor: Filtros['modalidade']; texto: string }[] = [
  { valor: 'presencial', texto: 'Presencial, indo até a escola' }, // aulas no Senac Taquara
  { valor: 'ead', texto: 'EAD, estudando de casa' }, // educação a distância
  { valor: 'tanto-faz', texto: 'Tanto faz' }, // não filtra por modalidade
];

const OPCOES_DURACAO: { valor: Filtros['duracao']; texto: string }[] = [
  { valor: 'curto', texto: 'Um curso curto (curso livre)' }, // poucas semanas ou meses
  { valor: 'tecnico', texto: 'Uma formação técnica completa' }, // curso técnico, mais longo
  { valor: 'tanto-faz', texto: 'Tanto faz' }, // não filtra por duração
];

export default function TelaFiltros() {
  const { filtros, setFiltros } = useTeste(); // filtros atuais e a função que os altera

  // Troca só um campo dos filtros e mantém os outros como estavam.
  // Ex.: alterar({ modalidade: 'ead' }) muda só a modalidade.
  function alterar(campo: Partial<Filtros>) {
    setFiltros({ ...filtros, ...campo }); // "..." copia os campos antigos; o novo sobrescreve
  }

  // Contador: quantos cursos (de todas as áreas) passam nos filtros escolhidos até agora.
  // Serve para a pessoa ver na hora o efeito de cada escolha.
  const totalCursos = AREAS.reduce(
    (soma, area) => soma + filtrarCursos(CURSOS, area.id, filtros).length, // soma os cursos de cada área
    0, // começa a soma em zero
  );

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Stack.Screen options={{ title: 'Sua rotina' }} /* título do cabeçalho desta tela */ />

      <Text style={styles.intro}>
        Agora conte um pouco da sua rotina. Assim mostramos só os cursos que cabem na sua vida.
      </Text>

      {/* ---------- PERGUNTA 1: MODALIDADE ---------- */}
      <View style={styles.grupo}>
        <Text style={styles.titulo}>Como você prefere estudar?</Text>
        {OPCOES_MODALIDADE.map((op) => ( // uma opção para cada modalidade
          <Opcao
            key={op.valor} // identificador da opção na lista
            texto={op.texto} // texto que aparece
            selecionada={filtros.modalidade === op.valor} // marcada se for a escolhida
            onPress={() => alterar({ modalidade: op.valor })} // grava a escolha
          />
        ))}
      </View>

      {/* ---------- PERGUNTA 2: DURAÇÃO ---------- */}
      <View style={styles.grupo}>
        <Text style={styles.titulo}>Que tipo de curso você procura?</Text>
        {OPCOES_DURACAO.map((op) => ( // uma opção para cada duração
          <Opcao
            key={op.valor}
            texto={op.texto}
            selecionada={filtros.duracao === op.valor}
            onPress={() => alterar({ duracao: op.valor })}
          />
        ))}
      </View>

      {/* ---------- PERGUNTA 3: VAGAS GRATUITAS ---------- */}
      <View style={styles.grupo}>
        <Text style={styles.titulo}>Tem interesse em vagas gratuitas?</Text>
        <Text style={styles.ajuda}>
          O Senac tem turmas 100% gratuitas (PSG) para pessoas de baixa renda. Se marcar "sim", o resultado mostra como
          se inscrever.
        </Text>
        <Opcao
          texto="Sim, quero saber"
          selecionada={filtros.querGratuito} // marcada quando querGratuito é true
          onPress={() => alterar({ querGratuito: true })}
        />
        <Opcao
          texto="Não, obrigado"
          selecionada={!filtros.querGratuito} // marcada quando querGratuito é false
          onPress={() => alterar({ querGratuito: false })}
        />
      </View>

      {/* ---------- CONTADOR E BOTÃO ---------- */}
      <Text style={styles.contador}>
        {totalCursos === 0 // nenhum curso passou: avisa para afrouxar os filtros
          ? 'Nenhum curso combina com essas escolhas. Experimente marcar "Tanto faz" em alguma pergunta.'
          : totalCursos === 1 // singular e plural: "1 curso combina" / "5 cursos combinam"
            ? '1 curso do Senac Taquara combina com a sua rotina.'
            : `${totalCursos} cursos do Senac Taquara combinam com a sua rotina.`}
      </Text>

      <Botao
        texto="Ver meu resultado"
        onPress={() => router.push('/resultado')} // abre a tela de resultado (resultado.tsx)
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo }, // fundo azul-escuro em toda a tela
  conteudo: { padding: 20, gap: 28, maxWidth: 640, width: '100%', alignSelf: 'center' }, // largura máxima no PC
  intro: { fontSize: 17, color: CORES.textoSuave, lineHeight: 25 }, // texto de abertura
  grupo: { gap: 10 }, // espaço entre o título da pergunta e as opções
  titulo: { fontSize: 20, fontWeight: 'bold', color: CORES.texto }, // pergunta do filtro
  ajuda: { fontSize: 14, color: CORES.textoSuave, lineHeight: 20 }, // explicação pequena do PSG
  contador: { fontSize: 15, color: CORES.laranja, fontWeight: 'bold', textAlign: 'center' }, // "X cursos combinam..."
});
