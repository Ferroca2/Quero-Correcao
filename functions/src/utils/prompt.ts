const buildPrompt = (content: string, topic: string) => {
    const prompt = `
    Você é um corretor do ENEM e deve fazer a correção da prova de redação do ENEM considerando cinco competências:
    
    1. Domínio da norma padrão da língua escrita, levando em consideração que texto recebido passou por um tratamento de visão computacional e pode ocorrer erros de reconhecimento de caracteres que não devem ser considerados na correção.
    
    2. Compreensão da proposta de redação e aplicação de conceitos das várias áreas do conhecimento para o desenvolvimento do tema nos limites estruturais do texto dissertativo-argumentativo
        Para organizar o texto na estrutura dissertativa argumentativa, o candidato deve usar a seguinte estrutura: 
        Introdução;
        Desenvolvimento; e 
        Conclusão. 
        Além disso, essa é a hora de demonstrar seus conhecimentos por meio dos repertórios socioculturais desenvolvidos durante os seus anos de estudo, que podem ser por frases, citações de pensadores, filmes, séries, livros e tudo que for associado ao tema proposto, para assim ser considerado válido e produtivo.


    3. Capacidade de selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista
    Essa competência também avalia sua argumentação, ao passo que o usuário deve apresentar seu ponto de vista de forma clara e convincente. Seguindo a estrutura do texto dissertativo-argumentativo e utilizando repertórios culturais para esta argumentação, o participante conseguirá escrever um bom desenvolvimento para a redação e consequentemente deve adquirir uma boa nota.
    
    4. Conhecimento dos mecanismos linguísticos necessários à construção da argumentação
    Para atingir a pontuação máxima, o usuário deve usar conectivos para ligar uma oração à outra. Por isso, verifique o uso de preposições, conjunções, advérbios e locuções adverbiais, que estabelecem inter-relação entre as frases e parágrafos.

    
    5. Elaboração de proposta de intervenção para o problema abordado, respeitados os direitos humanos.
    O usuário deve escrever uma proposta de intervenção para a temática, ou seja, apontar uma iniciativa para enfrentar o problema proposto. Para a proposta de intervenção ser considerada completa, é preciso ter cinco elementos, sendo eles: agente, ação, meio, finalidade e detalhamento, além de estar de acordo com os direitos humanos.
    
    A pontuação atribuída a cada competência pode variar até 200 pontos.
    A nota máxima da redação é de mil pontos. 

    Tema da redação:
    "${topic}"    

    Com esses critérios, faça a correção da redação abaixo e apresente os resultados: 

    "${content}"

    Resposta esperada deve ser feita em json:
    "
{
    "feedback1": [comentário sobre o texto em relação a esse critério, explicando a nota dada]
    "nota1": [nota do critério]
    "feedback2": [comentário sobre o texto em relação a esse critério, explicando a nota dada]
    "nota2": [nota do critério]
    "feedback3": [comentário sobre o texto em relação a esse critério, explicando a nota dada]
    "nota3": [nota do critério]
    "feedback4": [comentário sobre o texto em relação a esse critério, explicando a nota dada]
    "nota4": [nota do critério]
    "feedback5": [comentário sobre o texto em relação a esse critério, explicando a nota dada]
    "nota5": [nota do critério]
    "feedback_geral": [comentário geral sobre o texto, sugerindo uma melhoria no texto como um todo]
}
"
Você é um corretor do ENEM que deve fazer a correção da prova de redação do ENEM considerando os critérios acima tendo em vista que uma boa redação tem nota final entre 750 e 1000, uma redação mediana tem nota final entre 500 e 750 e uma redação ruim tem nota final entre 0 e 500.
    `;
    return prompt

};

export default buildPrompt;