<template>
    <GenericCard>
        <template #header>Login</template>

        <template #body>
            <input v-model="username" placeholder="Brugernavn">
            <input v-model="password" type="password" placeholder="Password">
            <button @click="login">Login</button>
        </template>
        
        <template #footer>
            Indtast dine oplysninger
        </template>
    </GenericCard>
</template>

<script setup>
import { ref } from "vue"
import GenericCard from '../components/GenericCard.vue'

const username = ref("")
const password = ref("")

const emit = defineEmits(["login"])

function login() {
    emit("login", {
        username: username.value,
        password: password.value
    })
}

</script>

<style scoped>

</style>