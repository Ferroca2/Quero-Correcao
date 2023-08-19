import { FirestoreErrorCode } from 'firebase/firestore';
import { FunctionsErrorCode } from 'firebase/functions';
import type { AuthErrorCodes } from 'firebase/auth';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
            VUE_ROUTER_BASE: string | undefined;
        }
    }

    interface Error {
        code?:
        | FirestoreErrorCode
        | FunctionsErrorCode
        | typeof AuthErrorCodes[keyof typeof AuthErrorCodes];
    }
}
