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
        <button @click="logout">Logout</button>
      </nav>
    
      <Profile v-if="currentView === 'profile'" :user="user" />

      <Dashboard v-if="currentView === 'dashboard'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Dashboard from "./views/Dashboard.vue"

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
  user.value = null;
  currentView.value = "profile";
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
