import { Curso } from './tipos'; // formato de um curso
import cursosJson from './cursos.json'; // lista de cursos (arquivo de dados, sem código)

// O catálogo fica em cursos.json para ser atualizado a cada semestre sem mexer na lógica.
// Para incluir um curso: copie um bloco { ... } do JSON, mude o id, o nome, a área e o link.
// Campos aceitos: veja o tipo "Curso" em tipos.ts.

// "as Curso[]" diz ao TypeScript que o JSON segue o formato Curso.
export const CURSOS: Curso[] = cursosJson as Curso[];
