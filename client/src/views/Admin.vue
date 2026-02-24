<template>
    <GenericCard>
        <template #header>
            Admin Panel
        </template>

        <template #body>
            <p>Kun admins må se dette.</p>
        </template>

        <template #footer>
            Systemindstillinger
        </template>
    </GenericCard>
</template>

<script>
import GenericCard from '../components/GenericCard.vue';

export default {
    components: { GenericCard }
}

</script>

<style lang="scss" scoped>

</style>