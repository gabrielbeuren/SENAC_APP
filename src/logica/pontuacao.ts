import { AREAS } from '../data/areas'; // lista das 9 áreas
import { PERGUNTAS } from '../data/perguntas'; // lista das perguntas
import { AreaId, Curso, Filtros, Respostas, ResultadoArea } from '../data/tipos'; // formatos de dados

// ---------------------------------------------------------------------------
// 1) PERCENTUAIS POR ÁREA
// Cada resposta vale de 1 a 5. Subtraímos 1 para que "Nada a ver comigo" valha 0 pontos.
// Percentual da área = pontos da área ÷ pontos de todas as áreas × 100.
// ---------------------------------------------------------------------------
export function calcularPercentuais(respostas: Respostas): ResultadoArea[] {
  const pontos: Record<string, number> = {}; // guarda os pontos de cada área
  AREAS.forEach((area) => (pontos[area.id] = 0)); // começa todas as áreas com 0

  PERGUNTAS.forEach((pergunta) => {
    const nota = respostas[pergunta.id] ?? 1; // nota dada (se não respondeu, conta como 1)
    pontos[pergunta.area] += nota - 1; // soma os pontos na área da pergunta (0 a 4)
  });

  const total = Object.values(pontos).reduce((soma, valor) => soma + valor, 0); // soma de todas as áreas

  const resultados = AREAS.map((area) => ({
    area, // dados da área
    percentual: total === 0 ? 0 : Math.round((pontos[area.id] / total) * 100), // regra de três; evita dividir por zero
  }));

  return resultados.sort((a, b) => b.percentual - a.percentual); // ordena do maior para o menor
}

// ---------------------------------------------------------------------------
// 2) ÁREAS RECOMENDADAS
// Pega as 2 áreas com maior percentual (desde que tenham algum ponto).
// ---------------------------------------------------------------------------
export function areasRecomendadas(resultados: ResultadoArea[], quantidade = 2): AreaId[] {
  return resultados
    .filter((r) => r.percentual > 0) // ignora áreas sem nenhum ponto
    .slice(0, quantidade) // fica só com as primeiras (já estão ordenadas)
    .map((r) => r.area.id); // devolve apenas os ids
}

// ---------------------------------------------------------------------------
// 3) FILTRO DE REALIDADE
// Mantém só os cursos da área pedida que combinam com a rotina da pessoa.
// ---------------------------------------------------------------------------
export function filtrarCursos(cursos: Curso[], area: AreaId, filtros: Filtros): Curso[] {
  return cursos.filter((curso) => {
    if (curso.area !== area) return false; // curso de outra área: fora

    // Modalidade: se a pessoa escolheu presencial ou EAD, o curso precisa ter essa opção.
    if (filtros.modalidade !== 'tanto-faz' && !curso.modalidades.includes(filtros.modalidade)) {
      return false; // não oferece a modalidade desejada: fora
    }

    // Duração: "curto" aceita cursos livres e idiomas; "técnico" aceita só os técnicos.
    if (filtros.duracao === 'curto' && curso.nivel === 'tecnico') return false; // queria curto, curso é longo
    if (filtros.duracao === 'tecnico' && curso.nivel !== 'tecnico') return false; // queria técnico, curso é curto

    return true; // passou em todos os filtros
  });
}
