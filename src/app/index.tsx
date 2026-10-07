import { router } from 'expo-router'; // usado para trocar de tela
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTeste } from '../contexto/TesteContext'; // respostas compartilhadas entre as telas

export default function HomeScreen() {
  const { reiniciar } = useTeste(); // função que apaga respostas de um teste anterior

  function comecar() {
    reiniciar(); // garante que o teste começa do zero
    router.push('/teste'); // abre a tela de perguntas
  }

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>SENAC CURSOS</Text>

      <Text style={styles.subtitulo}>
        Destrave seu futuro
      </Text>

      <Text style={styles.descricao}>
        O Senac Cursos App é um guia para te ajudar a escolher
        dentre as inúmeras opções de cursos oferecidos pelo
        Senac qual opção se adequa mais a você, oferecendo um
        teste vocacional que filtra opções de acordo com suas
        habilidades, gostos e disponibilidade.
      </Text>

      <Pressable style={styles.botao} onPress={comecar /* ao tocar, começa o teste */}>
        <Text style={styles.textoBotao}>
          Começar
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#010a66',
  },

  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffa600',
    marginBottom: 20,
  },


  subtitulo: {
    fontSize: 20,
    textAlign: 'center',
    color: '#238ef8',
    marginBottom: 25,
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 35,

  },

  botao: {
    backgroundColor: '#0054a6',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});