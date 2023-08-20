/* eslint-disable camelcase */
import openai from '../utils/openai';
import azureRequest from '../utils/azure';
import buildPrompt from '../utils/prompt';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export async function getEssayGrade (userId: string, essayId: string, pictureUrl: string, topic: string) {
    const content = await azureRequest(pictureUrl);

    const prompt = buildPrompt(content, topic);

    const texts = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'system', content: `Você é um corretor Enem.`},
            {role: 'user', content: prompt},
        ],
        temperature: 0.55,
        max_tokens: 1000,
    });

    const json = JSON.parse(texts.data.choices[0]!.message!.content!);

    let sum = 0;

    for(let i = 0; i < 5; i++) {
        sum += json[`nota${i + 1}`];
    }

    return {content, sum, correction: json};
}
