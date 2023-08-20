<script setup lang="ts">
import { matChevronRight } from '@quasar/extras/material-icons';
import { Theme } from 'src/types';
import { ref } from 'vue';

defineProps<{
    theme: Theme;
}>();

const dialog = ref(false);

const maximizedToggle = ref(false);
</script>


<template>
    <q-card
        flat
        class="my-card q-mb-md"
    >
        <q-card-section
            class="bg-grey-8 text-white q-pa-md justify-between row align-center"
            horizontal
        >
            <div class="title column align-center justify-center text-subtitle1 text-weight-bold text-center">
                {{ theme.name }}
            </div>
            <q-btn
                round
                :icon="matChevronRight"
                flat
                text-color="accent"
                @click="dialog = true"
            />
        </q-card-section>
        <q-card-section
            class="column"
            align="start"
        >
            <div

                class="text-subtitle2 q-mb-sm"
            >
                <span class="text-weight-bold">Vestibular:</span> {{ theme.typeOfEssay }}
            </div>
            <div

                class="text-subtitle2  q-mb-sm"
            >
                <span class="text-weight-bold">Média dos alunos:</span> {{ theme.avarageNote }}
            </div>
            <div

                class="text-subtitle2  q-mb-sm"
            >
                <span class="text-weight-bold">Número de redações:</span> {{ theme.numberOfStudent }}
            </div>
        </q-card-section>
        <q-card-actions
            align="center"
            class="bg-accent text-white"
        >
            <q-btn
                flat
                class="text-subtitle2 text-weight-bold text-center"
                no-caps
                @click="dialog = true"
            >
                Textos motivadores
            </q-btn>
        </q-card-actions>
    </q-card>
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <q-card class="bg-grey-8 text-white">
            <q-bar>
                <q-space />

                <q-btn
                    dense
                    flat
                    icon="minimize"
                    :disable="!maximizedToggle"
                    @click="maximizedToggle = false"
                >
                    <q-tooltip
                        v-if="maximizedToggle"
                        class="bg-white text-primary"
                    >
                        Minimize
                    </q-tooltip>
                </q-btn>
                <q-btn
                    dense
                    flat
                    icon="crop_square"
                    :disable="maximizedToggle"
                    @click="maximizedToggle = true"
                >
                    <q-tooltip
                        v-if="!maximizedToggle"
                        class="bg-white text-primary"
                    >
                        Maximize
                    </q-tooltip>
                </q-btn>
                <q-btn
                    v-close-popup
                    dense
                    flat
                    icon="close"
                >
                    <q-tooltip class="bg-white text-primary">
                        Close
                    </q-tooltip>
                </q-btn>
            </q-bar>

            <q-card-section>
                <div class="text-h6">
                    Tema: {{ theme.name }}
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ theme.text }}
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

