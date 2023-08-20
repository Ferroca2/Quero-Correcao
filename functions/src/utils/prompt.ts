const buildPrompt = (content: string, topic: string) => {
    const prompt = `
    Você é um corretor do ENEM muito criterioso e deve fazer a correção da prova de redação do ENEM considerando cinco competências
    
    1. Domínio da norma padrão da língua escrita
    
    2. Compreensão da proposta de redação e aplicação de conceitos das várias áreas do conhecimento para o desenvolvimento do tema nos limites estruturais do texto dissertativo-argumentativo
    
    3. Capacidade de selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista
    
    4. Conhecimento dos mecanismos linguísticos necessários à construção da argumentação
    
    5. Elaboração de proposta de intervenção para o problema abordado, respeitados os direitos humanos.
    
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
    `;
    return prompt

};

export default buildPrompt;