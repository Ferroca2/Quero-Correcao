<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
    mdiAccountCircle,
    mdiLock,
} from '@quasar/extras/mdi-v6';
import { useSessionStore } from 'stores/session';
import useError  from 'src/hooks/useError';

const session = useSessionStore();

const error = useError();

const data = reactive({
    email: '',
    password: '',
});

const loading = ref(false);

async function login() {
    loading.value = true;
    try {
        await session.login(data);
    }
    catch (err) {
        error(err);
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
    <q-page class="page column full-height align-center q-pa-lg">
        <div class="text-center text-h3 text-weight-bold q-mt-xl">
            <span class="text-accent">Quero</span> Correção
        </div>
        <div class="row justify-center align-center">
            <q-form
                class="form"
                @submit.prevent="login"
            >
                <div class="form__contents column">
                    <q-input
                        v-model="data.email"
                        outlined
                        label="Email"
                        type="email"
                        color="accent"
                    >
                        <template #prepend>
                            <q-icon :name="mdiAccountCircle" />
                        </template>
                    </q-input>
                    <q-input
                        v-model="data.password"
                        outlined
                        label="Password"
                        type="password"
                        color="accent"
                    >
                        <template #prepend>
                            <q-icon :name="mdiLock" />
                        </template>
                    </q-input>
                </div>
                <q-btn
                    class="form__submit"
                    no-caps
                    rounded
                    color="accent"
                    type="submit"
                    :loading="loading"
                >
                    Login
                    <template #loading>
                        <q-spinner
                            color="white"
                            size="1.5rem"
                        />
                    </template>
                </q-btn>
                <div class="form__login">
                    Ainda não cadastrado?
                    <router-link to="/register">
                        Clique aqui e crie sua conta.
                    </router-link>
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<style scoped lang="scss">

.page{
    padding-top: 8rem;
}
.form {
    max-width: 500px;
    width: 100%;

    &__contents {
        gap: 2rem;
        margin-top: 5rem;
    }

    &__submit {
        margin-top: 2rem;
        width: 100%;
        height: 50px;

        font-size: 13pt;
    }
    &__login {
        width: 100%;
        text-align: center;
        font-size: 13px;
        margin-top: .7rem;

        & > a {
            color: $accent;
        }
    }
}
</style>
