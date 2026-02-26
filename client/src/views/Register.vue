<template>
     <GenericCard>
        <template #header>
            <h1>Opret bruger</h1>
        </template>

        <template #body>
            <form class="form" @submit.prevent="handleLogin">
                <input v-model="username" placeholder="Brugernavn" />
                <input 
                    v-model="password"
                    type="password"
                    placeholder="Adgangskode"
                />
                <button @click="register">Opret</button>
            </form>
        </template>
        
        <template #footer>
            <p v-if="message">{{ message }}</p>
            <p>Har du allerede en bruger?</p>
            <button @click="emit('show-login')">Tilbage til login</button>
        </template>
    </GenericCard>
</template>

<script setup>
import { ref } from "vue"
import GenericCard from "../components/GenericCard.vue";

const username = ref("")
const password = ref("")
const message = ref("")

const emit = defineEmits(["show-login"])

async function register() {
    console.log("Register clicked")
    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value, 
            password: password.value
        })
    })

    const data = await res.json()

    if (res.ok) {
        alert("Bruger oprettet! Log ind.")
        emit("show-login")
    } else {
        message.value = data.message
    }

}



</script>

<style lang="scss" scoped>

</style>