<template>
    <GenericCard>
        <template #header>
            Profil
        </template>

        <template #body>
            <p>Brugernavn: {{ useReducer.username }}</p>
            <p>Rolle: {{ user.role }}</p>
        </template>
        
        <template #footer>
            Kun synlig når man er logget ind
        </template>
    </GenericCard>
</template>

<script>
import GenericCard from '../components/GenericCard.vue';

export default {
    props: ["user"],
    components: { GenericCard }
}
</script>

<style lang="scss" scoped>

</style>