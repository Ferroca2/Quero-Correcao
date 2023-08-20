/* eslint-disable camelcase */
import openai from '../utils/openai';
import azureRequest from '../utils/azure';
import buildPrompt from '../utils/prompt';
import fs from 'fs';
import { User } from '../types/user';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export async function getEssayGrade (userId: string, essayId: string, pictureUrl: string, topic: string) {
    const content = await azureRequest(pictureUrl);
    
    console.log(content);

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

    const json = JSON.parse(texts.data.choices[0]!.message!.content);

    let sum = 0;

    for(let i = 0; i < 5; i++) {
        sum += json[`nota${i + 1}`];
    }

    await db.collection('users').doc(userId).collection('essays').doc(essayId).update({
        content: content,
        correction: JSON.parse(texts.data.choices[0]!.message!.content),
        sum: sum
    }); 
    // const formatted = texts.data.choices[0]!.message!.content.replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');
    // fs.writeFileSync('texts.txt', JSON.stringify(texts.data), 'utf8');
    fs.writeFileSync('texts.json', JSON.stringify(JSON.parse(texts.data.choices[0]!.message!.content)), 'utf8');


    
}
