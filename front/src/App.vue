<script setup lang="ts">
import { useSessionStore } from './stores/session';

const session = useSessionStore();

</script>

<template>
    <router-view v-if="!session.loading" />
    <div
        v-else
        class="loading-container"
    >
        <q-spinner
            color="accent"
            size="5rem"
        />
    </div>
</template>

<style scoped lang="scss">
.loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2E2E2E;
}
</style>
