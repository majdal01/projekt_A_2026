<template>
    <GenericCard>
        <template #header>
            <h1>Admin Dashboard</h1>
        </template>

        <template #body>
            <div id="dashboard-wrapper">
                <div v-for="user in users" :key="user.id">
                    <p> {{ user.username }} </p>

                    <select v-model="user.role" @change="updateRole(user)">
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
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

const users = ref([])

onMounted(async () => {
    const token = localStorage.getItem("token")

    const response = await fetch("http://localhost:3000/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    users.value = await response.json()
})

async function updateRole(user) {
    const token = localStorage.getItem("token")

    await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: user.role })
    })
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