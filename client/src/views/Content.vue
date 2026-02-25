<template>
    <GenericCard>
        <template #header>
            <h2>Tekst eksempel</h2>
        </template>

        <template #body>
            <textarea v-model="content" :readonly="!canEdit"></textarea>
        </template>

        <template #footer>
            <button @click="saveContent" :disabled="!canEdit">
                Gem ændringer
            </button>
        </template>        

    </GenericCard>  
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import GenericCard from "../components/GenericCard.vue"

const content = ref("")

const props = defineProps({
    user: Object
})

const canEdit = computed(() => {
    return props.user?.role === "admin" || props.user?.role === "editor"
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
    console.log("Saving as:", props.user?.role)
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
button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>