import { createContext, ReactNode, useContext, useState } from 'react'; // ferramentas do React para estado compartilhado
import { Filtros, Respostas } from '../data/tipos'; // formatos de dados

// O "contexto" guarda as respostas num lugar só, para todas as telas lerem e alterarem.
// Sem ele, teríamos que passar as respostas de tela em tela pela navegação.

const FILTROS_INICIAIS: Filtros = {
  modalidade: 'tanto-faz', // começa sem preferência de modalidade
  duracao: 'tanto-faz', // começa sem preferência de duração
  querGratuito: false, // começa sem pedir vagas gratuitas
};

// Tudo o que as telas podem usar do contexto.
type TesteContextTipo = {
  respostas: Respostas; // notas dadas em cada pergunta
  responder: (perguntaId: string, nota: number) => void; // grava a nota de uma pergunta
  filtros: Filtros; // preferências do filtro de realidade
  setFiltros: (filtros: Filtros) => void; // altera as preferências
  reiniciar: () => void; // apaga tudo para refazer o teste
};

const TesteContext = createContext<TesteContextTipo | null>(null); // cria o contexto (vazio no início)

// Componente que "envolve" o app e fornece os dados para todas as telas.
export function TesteProvider({ children }: { children: ReactNode }) {
  const [respostas, setRespostas] = useState<Respostas>({}); // começa sem respostas
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIAIS); // começa com filtros padrão

  function responder(perguntaId: string, nota: number) {
    setRespostas((anteriores) => ({ ...anteriores, [perguntaId]: nota })); // copia as respostas antigas e troca só esta
  }

  function reiniciar() {
    setRespostas({}); // limpa as respostas
    setFiltros(FILTROS_INICIAIS); // volta os filtros ao padrão
  }

  return (
    <TesteContext.Provider value={{ respostas, responder, filtros, setFiltros, reiniciar }}>
      {children /* as telas do app ficam aqui dentro */}
    </TesteContext.Provider>
  );
}

// Atalho para as telas usarem o contexto: const { respostas } = useTeste();
export function useTeste() {
  const contexto = useContext(TesteContext); // lê o contexto
  if (!contexto) throw new Error('useTeste precisa estar dentro do TesteProvider'); // proteção contra uso errado
  return contexto; // devolve os dados e funções
}
