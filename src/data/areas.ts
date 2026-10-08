import { Area, AreaId } from './tipos'; // importa os formatos de dados

// As 9 áreas do teste, na mesma ordem do documento do projeto.
// As cores são claras para aparecerem bem no fundo azul-escuro do app.
export const AREAS: Area[] = [
  {
    id: 'beleza', // identificador usado nas perguntas e nos cursos
    nome: 'Beleza', // nome mostrado na tela
    descricao: 'Cuidar da aparência e da autoestima das pessoas.', // explicação curta
    cor: '#D6457A', // rosa
  },
  {
    id: 'saude',
    nome: 'Saúde e bem-estar',
    descricao: 'Ajudar pessoas a se sentirem melhor no corpo.',
    cor: '#2EC4B0', // verde-água
  },
  {
    id: 'comercio',
    nome: 'Comércio e marketing',
    descricao: 'Vender, negociar e divulgar marcas.',
    cor: '#F7941D', // laranja Senac
  },
  {
    id: 'gestao',
    nome: 'Gestão',
    descricao: 'Organizar processos, pessoas e finanças de empresas.',
    cor: '#5C9DFF', // azul claro (o azul Senac some no fundo escuro)
  },
  {
    id: 'comunicacao',
    nome: 'Comunicação e artes',
    descricao: 'Falar em público, fotografar e se expressar.',
    cor: '#B57EDC', // roxo claro
  },
  {
    id: 'design',
    nome: 'Design',
    descricao: 'Criar com cores, formas e ambientes.',
    cor: '#EF6B5B', // vermelho claro
  },
  {
    id: 'ti',
    nome: 'Tecnologia da Informação',
    descricao: 'Usar e criar programas, apps e sistemas.',
    cor: '#2E86DE', // azul claro
  },
  {
    id: 'ambiente',
    nome: 'Meio ambiente e segurança',
    descricao: 'Prevenir acidentes e cuidar da natureza.',
    cor: '#5DBB4A', // verde
  },
  {
    id: 'idiomas',
    nome: 'Idiomas',
    descricao: 'Aprender outras línguas e culturas.',
    cor: '#C49A6C', // marrom claro
  },
];

// Função auxiliar: devolve os dados de uma área a partir do id.
export function buscarArea(id: AreaId): Area {
  const area = AREAS.find((a) => a.id === id); // procura a área com esse id
  if (!area) throw new Error(`Área não encontrada: ${id}`); // erro se o id não existir
  return area; // devolve a área encontrada
}
