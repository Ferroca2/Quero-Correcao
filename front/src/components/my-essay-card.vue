<script setup lang="ts">
import { matChevronRight } from '@quasar/extras/material-icons';
import { Essay } from 'src/types';
import { ref } from 'vue';
import SingleCriteriaCard from 'src/components/single-criteria-card.vue';

defineProps<{
    essay: Essay;
}>();

const dialog = ref(false);

const maximizedToggle = ref(true);

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
            <div class="column align-center justify-center text-subtitle2 text-weight-bold text-center">
                {{ essay.theme }}
            </div>
            <q-card-section
                horizontal
                class="q-ml-sm"
            >
                <div class="column align-center justify-center text-weight-bold text-subtitle1">
                    {{ essay.sum }}
                </div>
                <q-btn
                    round
                    :icon="matChevronRight"
                    flat
                    text-color="accent"
                    @click="dialog = true"
                />
            </q-card-section>
        </q-card-section>
    </q-card>
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <q-card class="bg-grey-9 text-white">
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

            <q-card-section
                horizontal
                class="bg-grey-8 align-center justify-between q-pa-md q-ma-md"
            >
                <div class="theme text-h6 text-accent">
                    Tema: {{ essay.theme }}
                </div>
                <div class="text-h6">
                    Nota: {{ essay.sum }}
                </div>
            </q-card-section>

            <q-card-section
                class="align-center justify-between q-pa-md"
            >
                <div class="theme text-h6 q-mb-md">
                    Correção:
                </div>
                <single-criteria-card
                    criteria="Critério 1"
                    :grade="essay.correction.nota1"
                    :feedback="essay.correction.feedback1"
                />
                <single-criteria-card
                    criteria="Critério 2"
                    :grade="essay.correction.nota2"
                    :feedback="essay.correction.feedback2"
                />
                <single-criteria-card
                    criteria="Critério 3"
                    :grade="essay.correction.nota3"
                    :feedback="essay.correction.feedback3"
                />
                <single-criteria-card
                    criteria="Critério 4"
                    :grade="essay.correction.nota4"
                    :feedback="essay.correction.feedback4"
                />
                <single-criteria-card
                    criteria="Critério 5"
                    :grade="essay.correction.nota5"
                    :feedback="essay.correction.feedback5"
                />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style lang="scss" scoped>
.theme{
    width: 70%;
}
</style>
