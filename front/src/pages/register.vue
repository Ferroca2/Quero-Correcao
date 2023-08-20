<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
    mdiCardAccountDetails,
    mdiAccountCircle,
    mdiLock,
} from '@quasar/extras/mdi-v6';
import { useSessionStore } from 'stores/session';
import useError from 'src/hooks/useError';

const session = useSessionStore();
const error = useError();

const loading = ref(false);

const data = reactive({
    name: '',
    email: '',
    password: '',
});

async function signUp() {
    try {
        loading.value = true;
        await session.register(data);
        loading.value = false;
    }
    catch(err) {
        error(err);
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
    <q-page class="page column items-center">
        <q-form
            class="form"
            @submit.prevent="signUp"
        >
            <div class="title">
                <h3 class="text-secondary text-weight-bold q-ma-none">
                    Crie sua conta
                </h3>
                <span class="subtitle">
                    Preencha os campos e crie sua conta gratuitamente.
                </span>
            </div>
            <div class="form__contents column">
                <q-input
                    v-model="data.name"
                    outlined
                    label="Nome"
                    color="accent"
                    :rules="[val => !!val || 'Preencha esse campo']"
                >
                    <template #prepend>
                        <q-icon :name="mdiCardAccountDetails" />
                    </template>
                </q-input>
                <q-input
                    v-model="data.email"
                    outlined
                    label="Email"
                    type="email"
                    color="accent"
                    :rules="[val => !!val || 'Preencha esse campo']"
                >
                    <template #prepend>
                        <q-icon :name="mdiAccountCircle" />
                    </template>
                </q-input>
                <q-input
                    v-model="data.password"
                    outlined
                    label="Senha"
                    type="password"
                    color="accent"
                    :rules="[val => !!val || 'Preencha esse campo']"
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
                Cadastrar-se
                <template #loading>
                    <q-spinner
                        color="white"
                        size="1.5rem"
                    />
                </template>
            </q-btn>
            <div class="form__login">
                Já tem uma conta?
                <router-link to="/">
                    Clique aqui e faça login.
                </router-link>
            </div>
        </q-form>
    </q-page>
</template>

<style scoped lang="scss">
.title {
    text-align: center;
}

.page {
    padding: 30px;
}

.form {
    margin-top: 110px;
    max-width: 369px;

    &__contents {
        gap: 0.8rem;
        margin-top: 2rem;
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
