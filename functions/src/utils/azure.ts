import axios from 'axios';

const filterContent = (content: string, words: any[]): string => {
    content = content.replace(/\n/g, 'ƕ'); // Replace '\n' with an unused character (emoji)
    let filteredContent = '';
    let nextWordIndex = 0;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const nextChar = content[i + 1] || '';
        const prevChar = content[i - 1] || '';
        const nextWord = words[nextWordIndex];
        if (nextWord?.span?.offset === i) {
            nextWordIndex++; // Move to the next word
        }
        if (char === 'ƕ') { // Check for the replaced newline character
            if (prevChar === '.' || nextChar === nextChar.toUpperCase()) {
                const boundingBoxValue = nextWord.boundingBox[0];

                const paragraphThreshold = 20;

                if (boundingBoxValue > paragraphThreshold) {
                    filteredContent += '\n'; // Keep newline for paragraph
                }
            }
            else if(prevChar !== '-') {
                filteredContent += ' ';
            }
        } else if (char !== '-' || nextChar !== 'ƕ') {
            filteredContent += char;
        }
    }
    return filteredContent;
}

const azureRequest = async (url: string) => {

    let content: string = '';
    const subscriptionKey = process.env.AZURE_KEY || '';
    const endpoint = process.env.AZURE_ENDPOINT || '';
    const parameters = 'features=read&model-version=latest&language=pt&api-version=2023-02-01-preview';
    const headers = {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json'
    };
    const data = {
        url: url,
    };

    await axios.post(`${endpoint}?${parameters}`, data, { headers })
    .then(response => {
        content = response.data.readResult.content;
        const words = response.data.readResult.pages[0].words;
        content = filterContent(content, words);
    })
    .catch(error => {
        console.error(error);
        console.error(error.response);
        content = 'ERROR';
    });
    return content;
}

export default azureRequest;