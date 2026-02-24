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
import GenericCard from '../components/GenericCard.vue';

export default {
    components: { GenericCard },
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            this.$emit("login", {
                username: this.username, 
                password: this.password
            })
        }
    }
}

</script>

<style scoped>

</style>