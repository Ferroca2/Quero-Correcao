<script setup lang="ts">
import { matChevronRight } from '@quasar/extras/material-icons';
import { ref } from 'vue';

interface Props {
    feedback: string;
    grade: number;
    criteria: string;
}
defineProps<Props>();

const dialog = ref(false);

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
                {{ criteria }}
            </div>
            <q-card-section
                horizontal
                class="q-ml-sm"
            >
                <div class="column align-center justify-center text-weight-bold text-subtitle1">
                    {{ grade }}
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
    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">
                    Comentários
                </div>
                <q-space />
                <q-btn
                    v-close-popup
                    icon="close"
                    flat
                    round
                    dense
                />
            </q-card-section>

            <q-card-section>
                {{ feedback }}
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style lang="scss" scoped>
.theme{
    width: 70%;
}
</style>
