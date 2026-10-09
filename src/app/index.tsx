import { router } from 'expo-router';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTeste } from '../contexto/TesteContext';

export default function HomeScreen() {
  const { reiniciar } = useTeste();

  function comecar() {
    reiniciar();
    router.push('/teste');
  }

  return (
    <ImageBackground
      source={require('../../assets/images/estudante.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay escuro para garantir o contraste */}
      <View style={styles.overlay}>
        
        {/* Bloco do Logo, Texto CURSOS e Subtítulo no topo */}
        <View style={styles.headerContent}>
          <Image 
            source={require('../../assets/images/senac.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
          <Text style={styles.textoCursos}>CURSOS</Text>
          <Text style={styles.subtitulo}>Destrave seu futuro</Text>
        </View>

        {/* Card inferior com a descrição e o botão */}
        <View style={styles.cardContent}>
          <Text style={styles.descricao}>
            O Senac Cursos App é um guia para te ajudar a escolher dentre as inúmeras opções de cursos oferecidos pelo Senac qual opção se adequa mais a você, oferecendo um teste vocacional que filtra opções de acordo com suas habilidades, gostos e disponibilidade.
          </Text>

          <Pressable style={styles.botao} onPress={comecar}>
            <Text style={styles.textoBotao}>Começar</Text>
          </Pressable>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010a66',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 32, 0.78)',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 10, // Reduzido drasticamente para colar bem no topo
    paddingBottom: 40,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 0, // Removido qualquer espaço extra do topo
  },
  logoImage: {
    width: 600,  // Mantido o tamanho imponente que você pediu
    height: 250, // Mantida a proporção exata
    marginBottom: -15, // Puxa o texto "CURSOS" levemente para perto da logo se necessário
  },
  textoCursos: {
    fontSize: 22,    // Um pouco menor que o logo, criando hierarquia
    fontWeight: '800',
    color: '#ffb703', // Amarelo característico do Senac
    letterSpacing: 3,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#38bdf8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
  },
  descricao: {
    fontSize: 14,
    textAlign: 'center',
    color: '#f1f5f9',
    lineHeight: 22,
    marginBottom: 24,
  },
  botao: {
    backgroundColor: '#0284c7',
    paddingVertical: 16,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});