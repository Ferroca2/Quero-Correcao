import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export interface LoginOptions {
    email: string;
    password: string;
}

export interface RegisterOptions {
    name: string;
    email: string;
    password: string;
}

export const useSessionStore = defineStore('session', () => {
    const router = useRouter();

    const user = ref<User | null>(null);
    const loading = ref(true);


    onIdTokenChanged(getAuth(), async currentUser => {
        loading.value = false;
        user.value = currentUser;
    });

    return {
        user,
        loading,
        async login({ email, password }: LoginOptions) {
            await signInWithEmailAndPassword(getAuth(), email, password);

            await router.replace('/essays');
        },
        async register(options: RegisterOptions) {
            const { user } = await createUserWithEmailAndPassword(
                getAuth(), options.email, options.password
            );
            await updateProfile(user, { displayName: options.name });

            const userRef = doc(getFirestore(), 'users', user.uid);

            await setDoc(userRef, {
                name: options.name,
            }, { merge: true });

            await user.getIdToken(true);

            await router.replace('/essays');
        },
        async logout() {
            await signOut(getAuth());
            await router.replace('/');
        },
    };
});
