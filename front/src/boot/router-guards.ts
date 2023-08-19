import resolveWhen from '../utils/resolveWhen';
import { boot } from 'quasar/wrappers';
import { useSessionStore } from 'stores/session';

export default boot(({ router }) => {

    router.beforeEach(async to => {
        const session = useSessionStore();

        await resolveWhen(() => !session.loading);

        if (to.meta.access === 'auth-only' && !session.user) {
            return {
                path: '/',
            };
        }
    });

});
