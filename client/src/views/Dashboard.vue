<template>
    <GenericCard>
        <template #header>
            Admin Dashboard
        </template>

        <template #body>
            <div v-for="user in users" :key="user.username">
                <p> {{ user.username }} - Rolle: {{ user.role }}</p>

                <select v-model="user.role" @change="updateSourceFile(user)">
                    <option value="admin">admin</option>
                    <option value="editor">editor</option>
                    <option value="viewer">viewer</option>
                </select>
            </div>
        </template>

        <template #footer>
            Kun admin kan ændre roller
        </template>
    </GenericCard> 
</template>

<script setup>
import { ref } from "vue"
import GenericCard from '../components/GenericCard.vue';

//Midlertidig fake data (senere hentes fra Express)
const users = ref([
    { username: "admin", role: "admin" },
    { username: "editor", role: "editor" },
    { username: "viewer", role: "viewer" }
])

function updateRole(user) {
    console.log("Opdater rolle:", user)

    //Senere:
    //fetch("/update-role", { ... })
}

</script>

<style lang="scss" scoped>

</style>