<template>
    <GenericCard>
        <template #header>
            <h1>Profil</h1>
        </template>

        <template #body>
            <div id="profil-wrapper">
                <img src="#" alt="profilbillede">
                <div id="profil-oplysninger">
                    <p>Brugernavn: {{ user.username }}</p>
                    <p>Rolle: {{ user.role }}</p>
                </div>
            </div>
        </template>
        
        <template #footer>
            <p>Du er nu logget ind</p>
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
h1 {
    font-size: 1.4rem;
}
#profil-wrapper {
    background-color: #028a92;
    padding: 0.8rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#profil-oplysninger {
    position: relative;
}
#profil-oplysninger::before {
    content: "";
    display: block;
    position: absolute;
    left: -20px;
    top: 10px;
    height: calc(100% - 20px);
    width: 2px;
    background: white;
    border-radius: 2px;
}

</style>