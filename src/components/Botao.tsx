import { Pressable, StyleSheet, Text } from 'react-native'; // componentes básicos do React Native
import { CORES } from '../constants/tema'; // cores do app

// Propriedades que o botão recebe de quem o usa.
type Props = {
  texto: string; // texto escrito no botão
  onPress: () => void; // função chamada ao tocar
  variante?: 'principal' | 'contorno' | 'whatsapp'; // principal = azul cheio (padrão); contorno = só a borda; whatsapp = verde
};

export function Botao({ texto, onPress, variante = 'principal' }: Props) {
  return (
    <Pressable
      onPress={onPress} // ação do toque
      accessibilityRole="button" // leitores de tela anunciam como "botão"
      style={({ pressed }) => [
        styles.base, // estilo comum a todos os tipos
        styles[variante], // cor conforme a variante (o nome da variante é o nome do estilo)
        pressed && styles.pressionado, // fica mais transparente enquanto o dedo está em cima
      ]}
    >
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 15, // espaço em cima e embaixo (igual ao botão "Começar")
    paddingHorizontal: 20, // espaço nas laterais
    borderRadius: 8, // cantos arredondados (igual ao botão "Começar")
    alignItems: 'center', // centraliza o texto
  },
  principal: { backgroundColor: CORES.botao }, // azul cheio
  contorno: { borderWidth: 1.5, borderColor: CORES.borda }, // só a borda, fundo transparente
  whatsapp: { backgroundColor: CORES.whatsapp }, // verde do WhatsApp
  pressionado: { opacity: 0.8 }, // efeito visual do toque
  texto: { color: CORES.texto, fontSize: 16, fontWeight: 'bold' }, // texto branco em negrito
});
