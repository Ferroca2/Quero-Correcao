/* eslint-disable camelcase */
import openai from '../utils/openai';
import azureRequest from '../utils/azure';
import buildPrompt from '../utils/prompt';
import fs from 'fs';
import { User } from '../types/user';
import * as admin from 'firebase-admin';

const db = admin.firestore();

const callChat: any = async (content: string, topic: string) => {
    try {
        const prompt = buildPrompt(content, topic);
            
        const texts = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: `Você é um corretor Enem.` },
                { role: 'user', content: prompt },
            ],
            temperature: 0.55,
            max_tokens: 1000,
        });

        const json = JSON.parse(texts.data.choices[0]!.message!.content);

        let sum = 0;

        for (let i = 1; i <= 5; i++) {
            const roundedGrade =  Math.round(((json[`nota${i}`] + 1)/ 40) ) * 40;
            json[`nota${i}`] = roundedGrade;
            sum += roundedGrade;
        }

        const chatObject = {
            content: content,
            correction: json,
            sum: sum,
        };
        return chatObject;
    } catch (error) {
        console.log('An error occurred:', error);
        return callChat(content, topic); // Recursive call if an error occurred
    }
}


export async function getEssayGrade (userId: string, essayId: string, pictureUrl: string, topic: string) {
    const content = await azureRequest(pictureUrl);

    const chatPromises = Array(10).fill(null).map(() => callChat(content, topic));
    let chatResults = await Promise.all(chatPromises);

    let averages: any = { sum: 0, content: content, correction: {} };

    for (let i = 1; i <= 5; i++) {
        const grades = chatResults.map(result => result.correction[`nota${i}`]);
        const mean = grades.reduce((a, b) => a + b) / grades.length;
        const stdDev = Math.sqrt(grades.map(grade => (grade - mean) ** 2).reduce((a, b) => a + b) / grades.length);

        chatResults = chatResults.filter(result => {
            const grade = result.correction[`nota${i}`];
            return grade >= mean - 1.5 * stdDev && grade <= mean + 1.5 * stdDev;
        });
        
        console.log(chatResults.length);
    }

    for (let i = 1; i <= 5; i++) {
        let sumCriteria = 0;
        for (const result of chatResults) {
            sumCriteria += result.correction[`nota${i}`];
        }
        const averageCriteria = Math.round(( (sumCriteria + 1) / chatResults.length) / 40) * 40;
        averages.correction[`nota${i}`] = averageCriteria;

        const feedbackResult = chatResults.find(result => result.correction[`nota${i}`] === averageCriteria);
        if (feedbackResult) {
            averages.correction[`feedback${i}`] = feedbackResult.correction[`feedback${i}`];
        }

        averages.sum += averageCriteria;
        if(i === 1 && averages.correction.nota1 !== 200) {
            averages.correction.nota1 = 40;
            averages.sum += 40;
        }
    }

    let closestResult: any = null;
    let closestDifference = Infinity;
    for (const result of chatResults) {
        let sum = 0;
        for (let i = 1; i <= 5; i++) {
            sum += result.correction[`nota${i}`];
        }

        const difference = Math.abs(sum - averages.sum);
        if (difference < closestDifference) {
            closestDifference = difference;
            closestResult = result;
        }
    }

    // Add the "feedback_geral" to the json
    if (closestResult) {
        averages.correction["feedback_geral"] = closestResult.correction["feedback_geral"];
    }

    return averages


}
