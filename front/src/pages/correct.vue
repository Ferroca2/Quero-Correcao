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

const session = useSessionStore();

const $q = useQuasar();

const theme = ref('');
const essayImageFile = ref();
const essayImageFileUrl = ref('');

const loading = ref(false);


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

        theme.value = '';
        essayImageFile.value = null;
        essayImageFileUrl.value = '';

        $q.notify({
            type: 'positive',
            message: 'Pulished',
            position: 'top',
        });

        loading.value = false;
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
</template>
