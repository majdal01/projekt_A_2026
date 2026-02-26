<template>
    <GenericCard>
        <template #header>
            <h1>Tekst eksempel</h1>
        </template>

        <template #body>
            <label for="content-textarea" class="sr-only">Indhold:</label>
            <textarea id="content-textarea" v-model="content" :readonly="!canEdit"></textarea>
        </template>

        <template #footer>
            <button @click="saveContent" :disabled="!canEdit">
                Gem ændringer
            </button>
            <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
        </template>        

    </GenericCard>  
</template>

<script setup>
import { ref, onMounted, computed } from "vue"; // Importer computed for at beregne redigeringstilladelse og onMounted for at hente indhold ved komponentens oprettelse
import GenericCard from "../components/GenericCard.vue";

const content = ref(""); // Reaktiv variabel til at holde indholdet af textarea'en
const successMessage = ref(""); 

const props = defineProps({ // Definer props for at modtage brugerdata fra forælderen
    user: Object
});

const canEdit = computed(() => {
    return props.user?.role === "admin" || props.user?.role === "editor";
});

onMounted(async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/content", {
        headers: {
            Authorization: `Bearer ${token}` // Inkluder token i headeren for at autentificere anmodningen. Bearer-token bruges til at identificere og autorisere brugeren på serveren, så kun godkendte brugere kan hente indholdet.
        }
    });

    const data = await res.json();
    content.value = data.text;
});

async function saveContent() {
    console.log("Saving as:", props.user?.role);
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/content", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: content.value })
    });

    if (res.ok) {
        successMessage.value = "Ændringerne er gemt!";
        setTimeout(() => {
            successMessage.value = "";
        }, 3000); // Fjern beskeden efter 3 sekunder
    }
}

</script>

<style scoped>
h1 {
    font-size: 1.4rem;
}
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
#content-textarea {
    width: 100%;
    height: 8rem;
    padding: 0.5rem;
    font-size: 1.1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    box-sizing: border-box;
    margin-bottom: 1rem;
}
button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>