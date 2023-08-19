import { emulators } from '../../../../firebase.json';
import { boot } from 'quasar/wrappers';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

let run = true;

export default boot(() => {
    if (!run) return;

    connectAuthEmulator(
        getAuth(),
        `http://localhost:${emulators.auth.port}`,
        { disableWarnings: true }
    );

    connectFirestoreEmulator(
        getFirestore(),
        'localhost',
        emulators.firestore.port
    );

    connectFunctionsEmulator(
        getFunctions(),
        'localhost',
        emulators.functions.port
    );

    connectStorageEmulator(
        getStorage(),
        'localhost',
        emulators.storage.port
    );

    run = false;
});
