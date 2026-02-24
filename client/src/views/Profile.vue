<template>
    <GenericCard>
        <template #header>
            Profil
        </template>

        <template #body>
            <p>Brugernavn: {{ user.username }}</p>
            <p>Rolle: {{ user.role }}</p>
        </template>
        
        <template #footer>
            Du er logget ind
        </template>
    </GenericCard>
</template>

<script setup>
import GenericCard from '../components/GenericCard.vue';

defineProps ({
    user: Object
})
</script>

<style scoped>

</style>