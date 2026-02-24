<!--Styrer login og roller-->

<template>
  <div class="container">
    <Login v-if="!user" @login="handleLogin" />

    <div v-if="user">

      <nav>
        <button @click="currentView = 'profile'">Profil</button>
        <button
          v-if="user.role === 'admin'"
          @click="currentView = 'dashboard'"
        >Dashboard</button>
        <button @click="currentView = 'logout'">Logout</button>
      </nav>
    
    <Profile v-if="currentView === 'profile'" :user="user" />

    <Admin v-if="currentView === 'admin'" />

    <GenericCard v-if="currentView === 'logout'">
      <template #header>Logget ud</template>
      <template #body>
        <p>Du er nu logget ud.</p>
        <button @click="logout">Gå til login</button>
      </template>
      <template #footer>Tak for besøget</template>
    </GenericCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Admin from "./views/Admin.vue";
import GenericCard from "./components/GenericCard.vue";

const user = ref(null)
const currentView = ref("profile")

function handleLogin(credentials) {
  // senere : fetch til express
  /*user.value = {
    username: credentials.username,
    role: "admin"
  }*/
  //midlertidig fake login
  if (credentials.username === "admin") {
    user.value = { username: "admin", role: "admin" }
  } else if (credentials.username === "editor") {
    user.value = { username: "editor", role: "editor" }
  } else {
    user.value = { username: credentials.username, role: "viewer" }
  }
  currentView.value = "profile"
}

function logout() {
  user.value = null
  currentView.value = "profile"
}
</script>


<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
