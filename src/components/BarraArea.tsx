import { StyleSheet, Text, View } from 'react-native'; // componentes básicos
import { CORES } from '../constants/tema'; // cores do app
import { ResultadoArea } from '../data/tipos'; // formato do resultado de uma área

// Uma linha do gráfico de resultado: nome da área, percentual e barra colorida.
type Props = {
  resultado: ResultadoArea; // área + percentual calculado
  destaque?: boolean; // true = área recomendada (texto em negrito)
};

export function BarraArea({ resultado, destaque = false }: Props) {
  const { area, percentual } = resultado; // separa os dados para escrever menos

  return (
    <View
      style={styles.linha}
      accessible // leitor de tela lê a linha inteira de uma vez
      accessibilityLabel={`${area.nome}: ${percentual} por cento`} // ex.: "Gestão: 25 por cento"
    >
      <View style={styles.cabecalho}>
        <Text style={[styles.nome, destaque && styles.negrito]}>{area.nome}</Text>
        <Text style={[styles.percentual, destaque && { color: CORES.laranja }]}>{percentual}%</Text>
      </View>
      <View style={styles.trilho /* fundo da barra (representa 100%) */}>
        <View style={[styles.preenchido, { width: `${percentual}%`, backgroundColor: area.cor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { gap: 6 }, // espaço entre o texto e a barra
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between' }, // nome à esquerda, % à direita
  nome: { fontSize: 15, color: CORES.textoSuave }, // nome da área
  negrito: { fontWeight: 'bold', color: CORES.texto }, // destaque das áreas recomendadas
  percentual: { fontSize: 15, fontWeight: 'bold', color: CORES.texto }, // número do percentual
  trilho: { height: 10, borderRadius: 5, backgroundColor: CORES.cartao, overflow: 'hidden' }, // barra de fundo
  preenchido: { height: '100%', borderRadius: 5 }, // parte colorida (largura = percentual)
});
