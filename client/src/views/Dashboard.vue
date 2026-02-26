<template>
    <GenericCard>
        <template #header>
            <h1>Admin Dashboard</h1>
        </template>

        <template #body>
            <div id="dashboard-wrapper">
                <ul>
                    <li v-for="user in users" :key="user.id">
                        <span class="user-label">Bruger:</span>
                        <span class="brugernavn">{{ user.username }}</span>
                        <label :for="'role-' + user.id">Rolle:</label>
                        <select :id="'role-' + user.id" v-model="user.role" @change="updateRole(user)">
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                        </select>
                    </li>
                </ul>
                <button @click="saveChanges">Gem ændringer</button>
                <p v-if="error" class="error">{{ error }}</p>
                <p v-if="success" class="success">{{ success }}</p>
            </div>
        </template>

        <template #footer>
            <p>Kun admin kan ændre roller</p>
        </template>
    </GenericCard> 
</template>

<script setup>
import { ref, onMounted } from "vue";
import GenericCard from '../components/GenericCard.vue';

const users = ref([]);
const originalUsers = ref([]); // gem original til sammenligning
const error = ref("");
const success = ref("");

onMounted(async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    users.value = JSON.parse(JSON.stringify(data)); // dyb kopi for at undgå referenceproblemer
    originalUsers.value = data;
});

async function saveChanges() {
    error.value = "";
    success.value = "";

    // Tjek om mindst én admin findes
    const hasAdmin = users.value.some(u => u.role === "admin");

    if (!hasAdmin) {
        error.value = "Der skal være mindst én administrator.";
        return;
    }

    const token = localStorage.getItem("token");

    for (const user of users.value) { // sammenlign med original for at undgå unødvendige opdateringer
        const original = originalUsers.value.find(u => u.id === user.id);

        if (original.role !== user.role) {
            await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ role: user.role })
            });
        }
    }

    originalUsers.value = JSON.parse(JSON.stringify(users.value));
    success.value = "Ændringer gemt!";
}

</script>

<style scoped>
h1 {
    font-size: 1.4rem;
}
.user-label {
    font-size: 1.2rem;
    font-weight: 400;
}
label {
    font-size: 1.2rem;
}
#dashboard-wrapper {
    background-color: #00666c;
    padding: 0.6rem 4rem 2.2rem;
    border-radius: 5px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);;
}
#dashboard-wrapper ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;
}
.brugernavn {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 1rem;
}
#dashboard-wrapper ul li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#dashboard-wrapper ul li:last-of-type {
    border-bottom: none;
}
.success {
    color: white;
    margin-top: 1rem;
    margin-bottom: 0;
}
.error {
    color: #ff6b6b;
    margin-top: 1rem;
    margin-bottom: 0;
}
</style>