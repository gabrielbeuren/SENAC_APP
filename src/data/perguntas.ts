import { Pergunta } from './tipos'; // formato de uma pergunta

// 18 perguntas: 2 para cada uma das 9 áreas.
// Cada área tem o MESMO número de perguntas, para nenhuma área sair na frente só por ter mais perguntas.
// A ordem está misturada de propósito, para a pessoa não perceber o padrão.
export const PERGUNTAS: Pergunta[] = [
  { id: 'p01', area: 'ti', texto: 'Tenho curiosidade de saber como apps e computadores funcionam por dentro.' }, // TI 1
  { id: 'p02', area: 'beleza', texto: 'Gosto de cuidar do cabelo, da pele ou das unhas, minhas ou de outras pessoas.' }, // Beleza 1
  { id: 'p03', area: 'gestao', texto: 'Gosto de organizar papéis, planilhas e tarefas.' }, // Gestão 1
  { id: 'p04', area: 'comunicacao', texto: 'Falo em público sem muito medo, ou gostaria de perder esse medo.' }, // Comunicação 1
  { id: 'p05', area: 'ambiente', texto: 'Me preocupo com regras de segurança e com a prevenção de acidentes.' }, // Ambiente 1
  { id: 'p06', area: 'comercio', texto: 'Gosto de vender, negociar ou convencer alguém de uma ideia.' }, // Comércio 1
  { id: 'p07', area: 'design', texto: 'Presto atenção em cores, formas e em como as coisas combinam.' }, // Design 1
  { id: 'p08', area: 'saude', texto: 'Me sinto bem ajudando alguém a relaxar ou a aliviar uma dor.' }, // Saúde 1
  { id: 'p09', area: 'idiomas', texto: 'Gosto de aprender palavras e expressões em outra língua.' }, // Idiomas 1
  { id: 'p10', area: 'ti', texto: 'Gosto de resolver problemas de lógica, passo a passo.' }, // TI 2
  { id: 'p11', area: 'comercio', texto: 'Fico curioso com o jeito que as marcas fazem propaganda nas redes sociais.' }, // Comércio 2
  { id: 'p12', area: 'beleza', texto: 'Acompanho tendências de visual, maquiagem ou cortes.' }, // Beleza 2
  { id: 'p13', area: 'gestao', texto: 'Me imagino coordenando uma equipe ou cuidando das finanças de uma empresa.' }, // Gestão 2
  { id: 'p14', area: 'design', texto: 'Gosto de imaginar como decorar ou reorganizar um ambiente.' }, // Design 2
  { id: 'p15', area: 'saude', texto: 'Tenho interesse em como o corpo humano funciona e em cuidar da saúde das pessoas.' }, // Saúde 2
  { id: 'p16', area: 'comunicacao', texto: 'Gosto de fotografar, filmar ou editar imagens.' }, // Comunicação 2
  { id: 'p17', area: 'ambiente', texto: 'Me interesso por natureza, reciclagem e preservação do meio ambiente.' }, // Ambiente 2
  { id: 'p18', area: 'idiomas', texto: 'Tenho vontade de viajar ou de trabalhar com pessoas de outros países.' }, // Idiomas 2
];

// Textos da escala de resposta, do 1 ao 5 (posição 0 do array = nota 1).
export const ESCALA = [
  'Nada a ver comigo', // nota 1
  'Pouco', // nota 2
  'Mais ou menos', // nota 3
  'Bastante', // nota 4
  'Tudo a ver comigo', // nota 5
];
