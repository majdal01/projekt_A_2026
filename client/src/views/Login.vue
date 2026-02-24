<template>
    <GenericCard>
        <template #header>
            <h1>Login</h1>
        </template>

        <template #body>
            <form class="form" @submit.prevent="handleLogin">
                <label for="username">Indtast brugernavn</label>
                <input v-model="username" placeholder="Brugernavn">
                <label for="password">Indtast adgangskode</label>
                <input v-model="password" type="password" placeholder="Adgangskode">
                <button type="submit">Login</button>
            </form>
        </template>
        
        <template #footer>
            <p class="footer">@2026</p>
        </template>
    </GenericCard>
</template>

<script setup>
import { ref } from "vue"
import GenericCard from '../components/GenericCard.vue'

const username = ref("")
const password = ref("")

const emit = defineEmits(["login"])

async function handleLogin() {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        const data = await response.json()
        console.log("Response:", data)

        if (!response.ok) {
            alert(data.message)
            return
        }

        emit("login", data) //sender token videre
    } catch (error) {
        console.error(error)
    }
}

</script>

<style scoped>
   .form {
    display: inline-flex;
    flex-direction: column;
    text-align: left;

    input {
        margin-bottom: 1.5rem;
        height: 1.5rem;
        min-width: 20rem;
        padding: 0.2rem;
        font-size: 1.1rem;
    }
    input::placeholder {
        font-size: 1.1rem;
        align-self: center;
        
    }
   }
   .footer {
    margin-top: 2rem;
   }
</style>