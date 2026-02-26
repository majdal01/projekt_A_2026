<template>
    <GenericCard>
        <template #header>
            <h1>Profil</h1>
        </template>

        <template #body>
            <section id="profil-wrapper">
                <img src="/profil.png" alt="profilbillede">
                <div id="skillelinje"></div>

                <dl id="profil-oplysninger">
                    <dt class="brugernavn">Brugernavn: </dt>
                    <dd class="bruger">{{ user.username }}</dd>
                    <dt class="brugernavn">Rolle: </dt>
                    <dd class="bruger">{{ user.role }}</dd>
                </dl>
            </section>
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
});

</script>

<style scoped>
h1 {
    font-size: 1.4rem;
}
#profil-wrapper {
    background-color: #00666c;
    padding: 1.5rem 1.2rem;
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
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    .brugernavn {
        font-size: 1.2rem;
        margin:0;
        font-weight: 600;
    }
    .bruger {
        font-size: 1.1rem;
        margin: 0 0 0.5rem 0;
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