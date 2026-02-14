export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  digit?: string;
}

export interface Quest {
  id: number;
  title: string;
  clue: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  quiz: QuizQuestion[];
}

export interface Quest5Data {
  id: number;
  title: string;
  intro: string;
  phase1: {
    title: string;
    description: string;
    questions: QuizQuestion[];
    codeLabel: string;
  };
  phase2: {
    title: string;
    description: string;
    questions: QuizQuestion[];
    codeLabel: string;
  };
  instructions: string[];
}

export const quests: Quest[] = [
  {
    id: 1,
    title: "onde tudo comeca",
    clue: "sua primeira pista ta bem aqui, no lugar que voce volta sempre que precisa ser amada, onde você busca meu abraço e meu calor!",
    location: {
      name: "minha casinha",
      lat: 41.1837795,
      lng: -8.6103667,
    },
    quiz: [
      {
        id: "q1_1",
        question: "Quantas categorias de toalhas a Monica tinha?",
        options: ["7 categorias", "11 categorias", "9 categorias", "5 categorias"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 2,
    title: "onde a vida comeca",
    clue: "lembra quando a Rachel teve a Emma e o Ross desmaiou? e quando a Phoebe ficou internada com os tripletos? vai ate o lugar onde a vida comeca aqui no Porto. o Dr. Drake Ramoray ia se sentir em casa.",
    location: {
      name: "Hospital Sao Joao",
      lat: 41.1832328,
      lng: -8.6022748,
    },
    quiz: [
      {
        id: "q2_1",
        question: "Quem era o pai dos tripletos que a Phoebe teve?",
        options: [
          "Frank Jr. Jr.",
          "David, o cientista",
          "O Frank Jr., irmao dela",
          "Foi inseminacao artificial de um desconhecido",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 3,
    title: "we were on a break!",
    clue: "o Ross falou \"we were on a break\" mais vezes do que a gente consegue contar. agora e sua vez de fazer uma paragem. vai ate o lugar mais bonito do Porto pra comecar uma viagem, onde os azulejos contam historias e os comboios partem. mas hoje a viagem e essa aventura.",
    location: {
      name: "Estacao Sao Bento",
      lat: 41.1454,
      lng: -8.6102,
    },
    quiz: [
      {
        id: "q3_1",
        question: "Qual era a profissao do pai da Rachel, Dr. Leonard Green?",
        options: [
          "Cirurgiao cardiaco",
          "Cirurgiao vascular",
          "Clinico geral",
          "Ele nao era medico",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 4,
    title: "could I BE mais perto?",
    clue: "quando o Chandler foi transferido pra Tulsa mas voltou porque nao conseguia ficar longe da Monica... as vezes a gente precisa de cambio. sobe a rua desde a estacao e procura o lugar onde trocam moedas e notas. voce ta quase la.",
    location: {
      name: "Unicambio",
      lat: 41.1462952,
      lng: -8.6103983,
    },
    quiz: [
      {
        id: "q4_1",
        question: "Qual era o trabalho real do Chandler que ninguem lembrava?",
        options: [
          "Statistical analysis and data reconfiguration",
          "Transponster",
          "IT procurement manager",
          "Data processing supervisor",
        ],
        correctIndex: 0,
      },
    ],
  },
];

export const quest5: Quest5Data = {
  id: 5,
  title: "a surpresa final",
  intro: "voce ta mais perto do que imagina. nao precisa ir pra lugar nenhum, a surpresa ta nesse predio. mas primeiro prova que voce e a maior fa de Friends pra desbloquear os codigos.",
  phase1: {
    title: "codigo da porta de entrada",
    description: "a entrada do predio e na Rua Sa da Bandeira, n. 5. as portas de vidro abrem com um codigo. responde as perguntas pra descobrir cada digito.",
    questions: [
      {
        id: "q5p1_1",
        question: "Em que andar moravam a Monica e a Rachel?",
        options: ["4o andar", "5o andar", "8o andar", "20o andar"],
        correctIndex: 2,
        digit: "8",
      },
      {
        id: "q5p1_2",
        question: "Quantas vezes o Ross casou ao longo da serie?",
        options: ["2 vezes", "4 vezes", "3 vezes", "5 vezes"],
        correctIndex: 2,
        digit: "4",
      },
      {
        id: "q5p1_3",
        question: "Qual o numero do apartamento da Monica (depois da correcao)?",
        options: ["Apartamento 12", "Apartamento 20", "Apartamento 19", "Apartamento 15"],
        correctIndex: 1,
        digit: "3",
      },
      {
        id: "q5p1_4",
        question: "Quantos irmaos o Chandler tem?",
        options: ["Nenhum", "1", "2", "3"],
        correctIndex: 0,
        digit: "3",
      },
      {
        id: "q5p1_5",
        question: "Qual nome falso o Joey usava pra se apresentar?",
        options: ["Ken Adams", "John Smith", "Drake Ramoray", "Joseph Stalin"],
        correctIndex: 0,
        digit: "3",
      },
      {
        id: "q5p1_6",
        question: "Em que ano estreou o primeiro episodio de Friends?",
        options: ["1993", "1994", "1995", "1996"],
        correctIndex: 1,
        digit: "7",
      },
      {
        id: "q5p1_7",
        question: "Pra completar o codigo, qual simbolo vem depois dos numeros no teclado?",
        options: ["* (asterisco)", "# (cardinal)", "0 (zero)", "Nenhum"],
        correctIndex: 1,
        digit: "#",
      },
    ],
    codeLabel: "codigo do teclado da entrada",
  },
  phase2: {
    title: "codigo da caixa da chave",
    description: "agora sobe ao 3o andar e procura um pequeno compartimento cinzento do lado direito. abre manualmente, insere o codigo e pressiona os botoes laterais ao mesmo tempo pra pegar a chave.",
    questions: [
      {
        id: "q5p2_1",
        question: "Quantas temporadas Friends tem no total?",
        options: ["8", "9", "10", "12"],
        correctIndex: 2,
        digit: "9",
      },
      {
        id: "q5p2_2",
        question: "Qual o nome do macaco do Ross?",
        options: ["Max", "Marcel", "George", "Clyde"],
        correctIndex: 1,
        digit: "1",
      },
      {
        id: "q5p2_3",
        question: "Quantos bebes a Phoebe teve de uma vez (os tripletos)?",
        options: ["2", "3", "4", "6"],
        correctIndex: 1,
        digit: "6",
      },
      {
        id: "q5p2_4",
        question: "Em qual episodio da 1a temporada a Rachel descobre que o Ross gosta dela?",
        options: [
          "Episodio 20",
          "Episodio 24 — The One Where Rachel Finds Out",
          "Episodio 18",
          "Episodio 3",
        ],
        correctIndex: 1,
        digit: "3",
      },
    ],
    codeLabel: "codigo da caixa cinzenta — 3o andar, lado direito",
  },
  instructions: [
    "A entrada do predio e a mesma da Unicambio, na Rua Sa da Bandeira, n. 5.",
    "As duas portas de vidro abrem com o codigo que voce acabou de desbloquear.",
    "Sobe ao 3o andar e procura um pequeno compartimento cinzento do lado direito.",
    "Abre manualmente, insere o segundo codigo e pressiona os botoes laterais ao mesmo tempo pra pegar a chave.",
    "Bem-vinda ao seu Valentine's Day.",
  ],
};

export const LOCATION_RADIUS = 100;
