<script setup lang="ts">
import { ref } from 'vue';

import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
} from 'firebase/firestore';

import { useQuasar } from 'quasar';

import useError from 'src/hooks/useError';

import { useSessionStore } from 'stores/session';

import { essaysApi } from 'boot/axios';
import { Essay } from 'types/index';

import SingleCriteriaCard from 'src/components/single-criteria-card.vue';

const session = useSessionStore();

const $q = useQuasar();

const theme = ref('');
const essayImageFile = ref();
const essayImageFileUrl = ref('');

const essay = ref<Essay>();

const loading = ref(false);

const dialog = ref(false);

const maximizedToggle = ref(true);

const imgFilePickerChanged = () => {
    essayImageFileUrl.value = essayImageFile.value
        ? URL.createObjectURL(essayImageFile.value)
        : '';
};

const error = useError();

async function createEssay () {
    loading.value = true;

    if (!essayImageFile.value) return;

    try{
        const date = new Date();

        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const essayRef = await addDoc(collection(getFirestore(), `users/${session.user!.uid}/essays`), {
            theme: theme.value,
            imageUrl: '',
            status: 'pending',
            createdAt: formattedDate,
        });

        const imageExtension = essayImageFile.value.type.split('/')[1];

        const imagesRef = storageRef(
            getStorage(),
            `public/essays/images/${essayRef.id}.${imageExtension}`
        );

        const uploadImage = await uploadBytes(imagesRef, essayImageFile.value);

        const imageUrl = await getDownloadURL(uploadImage.ref);

        await updateDoc(essayRef, { imageUrl, status: 'published'});

        const { data } = await essaysApi.post('', {
            userId: session.user!.uid,
            essayId: essayRef.id,
            pictureUrl: imageUrl,
            topic: theme.value,
        });

        await updateDoc(essayRef, { ...data });

        essay.value = {
            id: essayRef.id,
            theme: theme.value,
            imageUrl: imageUrl,
            status: 'published',
            createdAt: formattedDate,
            ...data,
        };

        theme.value = '';
        essayImageFile.value = null;
        essayImageFileUrl.value = '';
        console.log(essay.value?.correction);

        $q.notify({
            type: 'positive',
            message: 'Pulished',
            position: 'top',
        });

        loading.value = false;

        dialog.value = true;
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
    <q-page class="relative q-pa-md full-height">
        <div class="text-h5 text-weight-bold text-center q-mb-md">
            Corrija sua redação
        </div>
        <q-input
            v-model="theme"
            outlined
            label="Escreva o tema da sua redação"
            type="text"
            color="accent"
        />
        <q-file
            v-model="essayImageFile"
            clearable
            label="Selecione uma foto"
            filled
            accept=".jpg, image/*"
            class="self-end q-my-lg text-black"
            bg-color="accent"
            color="black"
            @update:model-value="imgFilePickerChanged"
        >
            <template #prepend>
                <q-icon name="attach_file" />
            </template>
        </q-file>
        <q-img
            v-if="essayImageFileUrl"
            :src="essayImageFileUrl"
            ratio="1"
            width="100%"
            :style="{ minHeight: '120px', maxHeight: '500px' }"
            class="rounded-borders"
        />
        <q-btn
            type="submit"
            color="accent"
            class="q-ma-sm text-subtitle1 text-weight-bold q-pa-sm absolute-bottom"
            no-caps
            rounded
            :disable="!theme || !essayImageFile"
            :loading="loading"
            @click="createEssay"
        >
            Corrigir Redação
        </q-btn>
    </q-page>
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
                    Tema: {{ essay!.theme }}
                </div>
                <div class="text-h6">
                    Nota: {{ essay!.sum }}
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
                    :grade="essay!.correction.nota1"
                    :feedback="essay!.correction.feedback1"
                />
                <single-criteria-card
                    criteria="Critério 2"
                    :grade="essay!.correction.nota2"
                    :feedback="essay!.correction.feedback2"
                />
                <single-criteria-card
                    criteria="Critério 3"
                    :grade="essay!.correction.nota3"
                    :feedback="essay!.correction.feedback3"
                />
                <single-criteria-card
                    criteria="Critério 4"
                    :grade="essay!.correction.nota4"
                    :feedback="essay!.correction.feedback4"
                />
                <single-criteria-card
                    criteria="Critério 5"
                    :grade="essay!.correction.nota5"
                    :feedback="essay!.correction.feedback5"
                />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
