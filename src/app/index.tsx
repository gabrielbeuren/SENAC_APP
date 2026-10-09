import { LinearGradient } from 'expo-linear-gradient'; // degradê: a foto vai escurecendo até o rodapé
import { router } from 'expo-router'; // troca de tela
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'; // componentes básicos
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // espaço da barra do relógio e dos botões do celular
import { useTeste } from '../contexto/TesteContext'; // respostas compartilhadas entre as telas

// Pequenas etiquetas que mostram, de cara, que o teste é rápido e fácil.
const ETIQUETAS = ['18 perguntas', '3 minutos', 'Sem cadastro'];

export default function HomeScreen() {
  const { reiniciar } = useTeste(); // apaga respostas de um teste anterior
  const margens = useSafeAreaInsets(); // altura da barra de cima (relógio) e de baixo (botões do Android)

  function comecar() {
    reiniciar(); // garante que o teste começa do zero
    router.push('/teste'); // abre a tela de perguntas
  }

  return (
    <ImageBackground
      source={require('../../assets/images/estudante.png')} // foto da estudante (do Gabriel)
      style={styles.container} // ocupa a tela toda
      resizeMode="cover" // preenche a tela sem deformar
    >
      {/* Degradê por cima da foto: escuro em cima (para o logo), transparente no meio (rosto) e azul sólido embaixo (texto) */}
      <LinearGradient
        colors={['rgba(1,10,102,0.55)', 'rgba(1,10,102,0)', 'rgba(1,10,102,0)', 'rgba(1,10,102,0.92)', '#010a66']}
        locations={[0, 0.2, 0.42, 0.66, 1]} // onde cada cor começa (0 = topo, 1 = rodapé)
        style={[styles.degrade, { paddingTop: margens.top + 12, paddingBottom: margens.bottom + 24 }]}
      >
        {/* ---------- TOPO: logo branco e etiqueta da unidade ---------- */}
        <View style={styles.topo}>
          <Image
            source={require('../../assets/images/senac-logo-branco.png')} // logo do Senac em branco (recortado, 800 px)
            style={styles.logo} // tamanho do logo
            resizeMode="contain" // mostra o logo inteiro
            accessibilityLabel="Senac" // leitor de tela
          />
          <Text style={styles.unidade}>Taquara · RS</Text>
        </View>

        {/* ---------- RODAPÉ: nome, título, texto, etiquetas e botão ---------- */}
        <View style={styles.rodape}>
          <Text style={styles.marca}>SENAC CURSOS</Text>
          <Text style={styles.titulo}>Destrave seu futuro</Text>
          <Text style={styles.descricao}>
            Responda perguntas rápidas e descubra quais cursos do Senac combinam com seus gostos, suas habilidades e a
            sua rotina.
          </Text>

          <View style={styles.etiquetas /* etiquetas lado a lado */}>
            {ETIQUETAS.map((texto) => ( // uma pílula para cada etiqueta
              <Text key={texto} style={styles.etiqueta}>
                {texto}
              </Text>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]} // escurece ao tocar
            onPress={comecar} // começa o teste
            accessibilityRole="button" // leitor de tela anuncia como botão
          >
            <Text style={styles.textoBotao}>Começar o teste  →</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa a tela toda
    backgroundColor: '#010a66', // azul de fundo enquanto a foto carrega
  },
  degrade: {
    flex: 1, // cobre a foto inteira
    justifyContent: 'space-between', // topo em cima, rodapé embaixo
    paddingHorizontal: 24, // espaço nas laterais
  },
  topo: {
    flexDirection: 'row', // logo e etiqueta lado a lado
    alignItems: 'center', // alinhados pelo meio
    justifyContent: 'space-between', // logo na esquerda, etiqueta na direita
  },
  logo: {
    width: 104, // logo pequeno: identifica sem cobrir a foto
    height: 104 * (469 / 800), // altura proporcional ao arquivo (800 x 469)
  },
  unidade: {
    color: '#ffffff', // texto branco
    fontSize: 13, // pequeno
    fontWeight: '700',
    paddingHorizontal: 12, // espaço nas laterais da pílula
    paddingVertical: 6, // espaço em cima e embaixo
    borderRadius: 999, // formato de pílula
    borderWidth: 1, // contorno
    borderColor: 'rgba(255,255,255,0.5)', // contorno branco transparente
    overflow: 'hidden', // necessário no iOS para o arredondamento
  },
  rodape: {
    gap: 10, // espaço entre os itens do rodapé
  },
  marca: {
    color: '#f7941d', // laranja oficial do Senac
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 3, // letras afastadas, estilo "etiqueta"
    textShadowColor: 'rgba(1,10,102,0.9)', // sombra azul-escura: o texto continua legível em cima da foto (celular pequeno)
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  titulo: {
    color: '#ffffff', // branco
    fontSize: 34, // título grande
    fontWeight: '900',
    lineHeight: 40,
    textShadowColor: 'rgba(1,10,102,0.9)', // sombra azul-escura: o texto continua legível em cima da foto (celular pequeno)
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  descricao: {
    color: '#d6def5', // branco azulado, menos chamativo que o título
    fontSize: 16,
    lineHeight: 23,
    textShadowColor: 'rgba(1,10,102,0.9)', // sombra azul-escura: o texto continua legível em cima da foto (celular pequeno)
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  etiquetas: {
    flexDirection: 'row', // lado a lado
    flexWrap: 'wrap', // quebra linha se não couber
    gap: 8, // espaço entre as etiquetas
    marginTop: 4,
    marginBottom: 10,
  },
  etiqueta: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999, // pílula
    backgroundColor: 'rgba(255,255,255,0.12)', // fundo branco quase transparente
    overflow: 'hidden',
  },
  botao: {
    backgroundColor: '#f7941d', // laranja Senac: o botão é o que mais chama atenção
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center', // texto centralizado
  },
  botaoPressionado: {
    backgroundColor: '#d97c0c', // laranja mais escuro enquanto o dedo está em cima
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
});
