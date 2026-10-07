// Tipos (formatos de dados) usados em todo o app.
// Centralizar aqui evita que cada arquivo invente seu próprio formato.

// Identificador de cada área do teste. Só estes 9 textos são aceitos.
export type AreaId =
  | 'beleza' // Beleza (cabelo, pele, unhas)
  | 'saude' // Saúde e bem-estar (massagem, óptica)
  | 'comercio' // Comércio e marketing (vendas, redes sociais)
  | 'gestao' // Gestão (administração, contabilidade, RH, logística)
  | 'comunicacao' // Comunicação e artes (oratória, fotografia)
  | 'design' // Design (gráfico, interiores)
  | 'ti' // Tecnologia da Informação (informática, programação)
  | 'ambiente' // Meio ambiente e segurança do trabalho
  | 'idiomas'; // Idiomas (inglês)

// Dados de uma área, mostrados na tela de resultado.
export type Area = {
  id: AreaId; // identificador da área (um dos 9 acima)
  nome: string; // nome que aparece para a pessoa
  descricao: string; // frase curta explicando o que a área faz
  cor: string; // cor da barra de percentual dessa área
};

// Nível do curso no Senac.
export type Nivel = 'livre' | 'tecnico' | 'idioma'; // livre = curto, tecnico = formação longa

// Modalidade do curso.
export type Modalidade = 'presencial' | 'ead'; // ead = educação a distância

// Um curso do catálogo (formato de cada item do arquivo cursos.json).
export type Curso = {
  id: string; // identificador único, sem espaços (ex.: "barbeiro")
  nome: string; // nome oficial do curso
  area: AreaId; // área do teste a que o curso pertence
  nivel: Nivel; // livre, técnico ou idioma
  modalidades: Modalidade[]; // lista, porque alguns cursos têm presencial e EAD
  link: string; // página oficial do curso no site do Senac
};

// Uma pergunta do teste vocacional.
export type Pergunta = {
  id: string; // identificador único (ex.: "p01")
  texto: string; // frase que a pessoa avalia de 1 a 5
  area: AreaId; // área que recebe os pontos desta pergunta
};

// Respostas da pessoa: chave = id da pergunta, valor = nota de 1 a 5.
export type Respostas = Record<string, number>;

// Preferências da tela "filtro de realidade".
export type Filtros = {
  modalidade: Modalidade | 'tanto-faz'; // presencial, EAD ou qualquer uma
  duracao: 'curto' | 'tecnico' | 'tanto-faz'; // curso livre, técnico ou qualquer um
  querGratuito: boolean; // true = mostrar informação sobre vagas gratuitas (PSG)
};

// Resultado de uma área depois do cálculo.
export type ResultadoArea = {
  area: Area; // dados da área
  percentual: number; // de 0 a 100, já arredondado
};
