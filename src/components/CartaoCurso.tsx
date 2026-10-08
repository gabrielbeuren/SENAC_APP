import { Linking, StyleSheet, Text, View } from 'react-native'; // Linking abre links e o WhatsApp
import { ESCOLA } from '../constants/escola'; // número de WhatsApp da escola
import { CORES } from '../constants/tema'; // cores do app
import { Curso } from '../data/tipos'; // formato de um curso
import { Botao } from './Botao'; // nosso botão

// Textos amigáveis para mostrar no lugar dos códigos do JSON.
const NOMES_NIVEL = { livre: 'Curso livre', tecnico: 'Curso técnico', idioma: 'Idioma' }; // nível do curso
const NOMES_MODALIDADE = { presencial: 'Presencial', ead: 'EAD' }; // modalidade

export function CartaoCurso({ curso }: { curso: Curso }) {
  // Mensagem que já vai escrita quando o WhatsApp abrir.
  const mensagem = `Olá! Fiz o teste vocacional e me interessei pelo curso ${curso.nome}. Pode me passar mais informações?`;
  // encodeURIComponent troca espaços e acentos por códigos que podem ir num link
  const linkWhatsapp = `https://wa.me/${ESCOLA.whatsapp}?text=${encodeURIComponent(mensagem)}`;

  return (
    <View style={styles.cartao}>
      <Text style={styles.nome}>{curso.nome}</Text>

      <View style={styles.etiquetas /* nível e modalidades lado a lado */}>
        <Text style={styles.etiqueta}>{NOMES_NIVEL[curso.nivel]}</Text>
        {curso.modalidades.map((m) => ( // uma etiqueta para cada modalidade (alguns cursos têm as duas)
          <Text key={m} style={styles.etiqueta}>
            {NOMES_MODALIDADE[m]}
          </Text>
        ))}
      </View>

      <View style={styles.botoes}>
        <View style={styles.botao}>
          <Botao texto="Ver no site" variante="contorno" onPress={() => Linking.openURL(curso.link)} />
        </View>
        <View style={styles.botao}>
          <Botao texto="WhatsApp" variante="whatsapp" onPress={() => Linking.openURL(linkWhatsapp)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: CORES.cartao, // fundo branco quase transparente
    borderRadius: 12, // cantos arredondados
    borderWidth: 1, // borda fina
    borderColor: CORES.borda, // borda branca transparente
    padding: 16, // espaço interno
    gap: 12, // espaço entre nome, etiquetas e botões
  },
  nome: { fontSize: 17, fontWeight: 'bold', color: CORES.texto }, // nome do curso
  etiquetas: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, // quebra linha se não couber
  etiqueta: {
    fontSize: 13, // texto pequeno
    color: CORES.azulClaro, // texto azul claro
    borderWidth: 1, // contorno da etiqueta
    borderColor: CORES.azulClaro, // contorno azul claro
    paddingHorizontal: 10, // espaço nas laterais
    paddingVertical: 3, // espaço em cima e embaixo
    borderRadius: 999, // formato de pílula
  },
  botoes: { flexDirection: 'row', gap: 10 }, // dois botões lado a lado
  botao: { flex: 1 }, // cada botão ocupa metade da largura
});
