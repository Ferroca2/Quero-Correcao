import { Request, Response } from 'firebase-functions';
import { getEssayGrade } from './getEssayGrade';

export default async function getGrade(req: Request, res: Response) {
    if (req.method.toUpperCase() !== 'POST') {
        return res.status(405).json({
            message: 'Método não permitido',
        });
    }

    if (req.query.batch) {
        return res.status(422).json({
            message: 'Requisições em lote não suportadas',
        });
    }

    const {userId, essayId, pictureUrl, topic} = req.body;

    try {
        const essayData = await getEssayGrade(userId, essayId, pictureUrl, topic);

        return res.status(200).json({ ...essayData });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: 'Erro ao corrigir redação',
        });
    }
}
