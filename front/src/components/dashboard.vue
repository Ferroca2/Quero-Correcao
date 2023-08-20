<script setup lang="ts">

</script>


<template>
    <q-card
        flat
        class="my-card q-mb-md"
    >
        <q-card-section class="bg-grey-8 text-white">
            <div class="text-subtitle1 text-weight-bold text-center">
                Suas estatisticas
            </div>
        </q-card-section>

        <q-card-section
            horizontal
            align="center"
        >
            <q-card-section>
                <q-circular-progress
                    :value="80"
                    size="130px"
                    :thickness="0.25"
                    color="accent"
                    track-color="grey"
                    class="q-ma-sm"
                />
                <div class="text-caption text-weight-bold">
                    Meta mensal:
                    <span class="text-weight-bold">4 redações</span>
                </div>
            </q-card-section>
            <q-card-section class="column full-width justify-center align-center">
                <div class="q-ma-sm">
                    Sua média: <span class="text-weight-bold">900</span>
                </div>
                <div class="q-ma-sm">
                    Numero de redações: <span class="text-weight-bold">9</span>
                </div>
                <div class="q-ma-sm">
                    Vestibular meta: <span class="text-weight-bold">ENEM</span>
                </div>
                <div class="q-ma-sm">
                    Data do vestibular: <span class="text-weight-bold">10/07/2023</span>
                </div>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<style scoped lang="scss">
.descripton {
    font-size: 0.6rem;
}
</style>
