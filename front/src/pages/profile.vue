<script setup lang="ts">
import Dashboard from 'components/dashboard.vue';
import MyEssayCard from 'components/my-essay-card.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { Essay } from 'src/types';
import { useSessionStore } from 'stores/session';

const session = useSessionStore();

const loading = ref(false);

const essays = ref<Essay[]>([]);

onMounted(async () => {
    loading.value = true;

    try{
        const essaysRef = collection(getFirestore(), `users/${session.user!.uid}/essays`);

        const essaysResponse = await getDocs(essaysRef);

        const essaysData = essaysResponse.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            } as Essay;
        });

        essays.value = essaysData;

    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="q-pa-md">
        <div class="text-h5 text-weight-bold text-center q-mb-md">
            Veja suas estatísticas e suas redações ja feitas
        </div>
        <div
            v-if="loading"
            class="full-width row align-center justify-center"
        >
            <q-spinner
                size="2rem"
                color="accent"
            />
        </div>
        <div v-else>
            <dashboard />

            <div class="text-h6 text-weight-bold text-center q-mb-md">
                Suas redações
            </div>
            <div
                v-if="essays.length === 0"
                class="text-center"
            >
                Você ainda não fez nenhuma redação
            </div>
            <my-essay-card
                v-for="essay in essays"
                :key="essay.id"
                :essay="essay"
            />
        </div>
    </div>
</template>
