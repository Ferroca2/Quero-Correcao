<script setup lang="ts">
import SuggestionCard from 'components/suggestion-card.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { getFirestore, doc, getDocs, collection } from 'firebase/firestore';
import { Theme } from 'src/types';

const loading = ref(false);

const themes = ref<Theme[]>([]);



onMounted(async () => {
    loading.value = true;
    try{
        const themeRef = collection(getFirestore(), 'themes');

        const themeResponse = await getDocs(themeRef);

        const themesData = themeResponse.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            } as Theme;
        });

        themes.value = themesData as Theme[];

    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
});

</script>

<template>
    <q-page class="q-pa-md">
        <div class="text-h5 text-weight-bold text-center q-mb-md">
            Sugestões de tema
        </div>
        <div v-if="!loading">
            <suggestion-card
                v-for="theme in themes"
                :key="theme.id"
                :theme="theme"
            />
        </div>
        <div
            v-else
            class="full-width row align-center justify-center "
        >
            <q-spinner
                size="2rem"
                color="accent"
            />
        </div>
    </q-page>
</template>
types/index
