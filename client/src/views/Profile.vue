<template>
    <GenericCard>
        <template #header>
            <h1>Profil</h1>
        </template>

        <template #body>
            <div id="profil-wrapper">
                <img src="/public/profil.png" alt="profilbillede">
                <div id="skillelinje"></div>
                <div id="profil-oplysninger">
                    <p class="brugernavn">Brugernavn: </p>
                    <p class="bruger">{{ user.username }}</p>
                    <p class="brugernavn">Rolle: </p>
                    <p class="bruger">{{ user.role }}</p>
                </div>
            </div>
        </template>
        
        <template #footer>
            <p id="footer">Du er nu logget ind 😊</p>
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
    background-color: #00666c;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    img {
        width: 20%;
    }
}
#profil-oplysninger {

    .brugernavn {
        margin-bottom: 0;
        font-weight: 600;
    }
    .bruger {
        margin-top: 0;
    }
}
#skillelinje {
    height: 100px;
    width: 2px;
    background: white;
    border-radius: 2px;
}
#footer {
    margin-top: 2rem;
}

</style>