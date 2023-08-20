import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const setEssay = functions.https.onRequest(
    (...args) => import('./essay')
        .then(async m => { await m.default(...args); })
);
