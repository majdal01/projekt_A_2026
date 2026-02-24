<template>
    <GenericCard>
        <template #header>
            Admin Panel
        </template>

        <template #body>
            <p>Kun admins kan se dette.</p>
        </template>

        <template #footer>
            Systemindstillinger
        </template>
    </GenericCard>
</template>

<script setup>
import GenericCard from '../components/GenericCard.vue';

</script>

<style lang="scss" scoped>

</style>