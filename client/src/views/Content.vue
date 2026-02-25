<template>
    <GenericCard>
        <template #header>
            <h2>Tekst eksempel</h2>
        </template>

        <template #body>
            <textarea v-model="content" :readonly="user.role === 'viewer'"></textarea>
        </template>

        <template #footer>
            <button v-if="user.role === 'admin' || user.role === 'editor'" @click="saveContent">
                Gem ændringer
            </button>
        </template>        

    </GenericCard>  
</template>

<script setup>
import { ref, onMounted } from "vue"
import GenericCard from "../components/GenericCard.vue"

const content = ref("")

defineProps({
    user: Object
})

onMounted(async () => {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:3000/content", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()
    content.value = data.text
})

async function saveContent() {
    const token = localStorage.getItem("token")

    await fetch("http://localhost:3000/content", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: content.value })
    })
}

</script>

<style scoped>

</style>