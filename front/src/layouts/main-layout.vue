<script setup lang="ts">
import { useQuasar } from 'quasar';
import {
    matMenuBook,
    matCamera,
    matPerson,
    matLogout,
    matHelpOutline,
} from '@quasar/extras/material-icons';

import { ref } from 'vue';
import { useSessionStore } from 'stores/session';

const $q = useQuasar();

const tab = ref('mails');

$q.dark.set(true);

const session = useSessionStore();

</script>

<template>
    <q-layout
        view="hHh lpR fFf"
    >
        <q-header
            class="bg-dark text-white q-pa-sm"
            height-hint="98"
        >
            <q-toolbar>
                <q-btn
                    flat
                    round
                    dense
                    :icon="matHelpOutline"
                    class="q-mr-sm"
                />

                <q-toolbar-title class="text-center">
                    Quero Correção
                </q-toolbar-title>

                <q-btn
                    flat
                    round
                    dense
                    :icon="matLogout"
                    @click="session.logout"
                />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer class="footer bg-dark">
            <q-tabs
                v-model="tab"
                indicator-color="transparent"
                active-color="accent"
                class="full-width full-height text-grey-5 shadow-2"
            >
                <q-route-tab
                    name="mails"
                    :icon="matMenuBook"
                    to="/essays"
                />
                <q-route-tab
                    name="alarms"
                    :icon="matCamera"
                    to="/essays/correct"
                />
                <q-route-tab
                    name="movies"
                    :icon="matPerson"
                    to="/essays/profile"
                />
            </q-tabs>
        </q-footer>
    </q-layout>
</template>

<style lang="scss" scoped>
.footer {
    height: 8vh;
}
</style>
