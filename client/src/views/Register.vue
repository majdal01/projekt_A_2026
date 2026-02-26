<template>
     <GenericCard>
        <template #header>
            <h1>Opret bruger</h1>
        </template>

        <template #body>
            <form class="form" @submit.prevent="register">
                <label for="username">Brugernavn</label>
                <input 
                    id="username"
                    v-model="username"
                    name="username"
                    type="text"
                    placeholder="Brugernavn"
                />
                <label for="password">Adgangskode</label>
                <input 
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    placeholder="Adgangskode"
                />
                <button type="submit">Opret</button>
            </form>
        </template>
        
        <template #footer>
            <div class="footer">
                <p v-if="message" aria-live="polite">{{ message }}</p>
                <p>Har du allerede en bruger?</p>
                <button @click="emit('show-login')">Tilbage til login</button>
            </div>
        </template>
    </GenericCard>
</template>

<script setup>
import { ref } from "vue";
import GenericCard from "../components/GenericCard.vue";

const username = ref("");
const password = ref("");
const message = ref("");

const emit = defineEmits(["show-login"]);

async function register() {
    console.log("Register clicked");
    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value, 
            password: password.value
        })
    });

    const data = await res.json();

    if (res.ok) {
        alert("Bruger oprettet! Log ind.");
        emit("show-login");
    } else {
        message.value = data.message;
    }
}
</script>

<style lang="scss" scoped>
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