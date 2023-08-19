import { initializeApp } from 'firebase/app';
import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(() => {
    initializeApp({
        apiKey: 'AIzaSyC6F6VZ7Nk5MJxkrI1GMPnEfLFXhxLM8uU',
        authDomain: 'quero-redacao.firebaseapp.com',
        projectId: 'quero-redacao',
        storageBucket: 'quero-redacao.appspot.com',
        messagingSenderId: '556762143417',
        appId: '1:556762143417:web:c48c62cf0e1c03b684d968',
        measurementId: 'G-RHWG857QCY',
    });
});
