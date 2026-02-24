<template>
    <GenericCard>
        <template #header>
            <h1>Admin Dashboard</h1>
        </template>

        <template #body>
            <div id="dashboard-wrapper">
                <div v-for="user in users" :key="user.username">
                    <p> {{ user.username }} - Rolle: {{ user.role }}</p>

                    <select v-model="user.role" @change="updateSourceFile(user)">
                        <option value="admin">admin</option>
                        <option value="editor">editor</option>
                        <option value="viewer">viewer</option>
                    </select>
                </div>
            </div>
        </template>

        <template #footer>
            <p>Kun admin kan ændre roller</p>
        </template>
    </GenericCard> 
</template>

<script setup>
import { ref, onMounted } from "vue"
import GenericCard from '../components/GenericCard.vue';

//Midlertidig fake data (senere hentes fra Express)
const users = ref([])

const token = localStorage.getItem("token")

onMounted(async () => {
    const response = await fetch("http://localhost:3000/users", {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    const data = await response.json()
    users.value = data
})

function updateRole(user) {
    console.log("Opdater rolle:", user)

    //Senere:
    //fetch("/update-role", { ... })
}

</script>

<style scoped>
h1 {
    font-size: 1.4rem;
}
#dashboard-wrapper {
    background-color: #00666c;
    padding: 0.6rem 1.2rem 1.8rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>