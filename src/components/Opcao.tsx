import { Pressable, StyleSheet, Text, View } from 'react-native'; // componentes básicos
import { CORES } from '../constants/tema'; // cores do app

// Uma opção que pode ser marcada (usada na escala de 1 a 5 e, depois, nos filtros).
type Props = {
  texto: string; // texto da opção
  selecionada: boolean; // true = opção marcada
  onPress: () => void; // função chamada ao tocar
  numero?: number; // número opcional mostrado num círculo à esquerda (ex.: 1 a 5)
};

export function Opcao({ texto, selecionada, onPress, numero }: Props) {
  return (
    <Pressable
      onPress={onPress} // marca a opção
      accessibilityRole="radio" // leitor de tela anuncia como opção de escolha única
      accessibilityState={{ checked: selecionada }} // informa se está marcada
      style={[styles.caixa, selecionada && styles.caixaSelecionada]} // borda laranja quando marcada
    >
      {numero !== undefined && ( // só desenha o círculo se recebeu um número
        <View style={[styles.circulo, selecionada && styles.circuloSelecionado]}>
          <Text style={[styles.numero, selecionada && styles.numeroSelecionado]}>{numero}</Text>
        </View>
      )}
      <Text style={[styles.texto, selecionada && styles.textoSelecionado]}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  caixa: {
    flexDirection: 'row', // círculo e texto lado a lado
    alignItems: 'center', // alinha verticalmente no centro
    gap: 14, // espaço entre o círculo e o texto
    padding: 14, // espaço interno
    borderRadius: 10, // cantos arredondados
    borderWidth: 1.5, // espessura da borda
    borderColor: CORES.borda, // borda branca transparente
    backgroundColor: CORES.cartao, // fundo branco quase transparente
  },
  caixaSelecionada: { borderColor: CORES.laranja, backgroundColor: 'rgba(255, 166, 0, 0.15)' }, // laranja quando marcada
  circulo: {
    width: 34, // largura do círculo
    height: 34, // altura do círculo
    borderRadius: 17, // metade da largura = círculo perfeito
    borderWidth: 1.5, // borda do círculo
    borderColor: CORES.borda, // borda branca transparente
    alignItems: 'center', // centraliza o número na horizontal
    justifyContent: 'center', // centraliza o número na vertical
  },
  circuloSelecionado: { backgroundColor: CORES.laranja, borderColor: CORES.laranja }, // círculo laranja cheio
  numero: { fontSize: 16, fontWeight: 'bold', color: CORES.textoSuave }, // número claro
  numeroSelecionado: { color: CORES.fundo }, // número azul-escuro sobre o laranja
  texto: { fontSize: 17, color: CORES.texto, flexShrink: 1 }, // texto quebra linha se for longo
  textoSelecionado: { fontWeight: 'bold', color: CORES.laranja }, // texto laranja quando marcado
});
