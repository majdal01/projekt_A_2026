<!--Styrer login og roller-->

<template>
  <div class="container">
    <Login v-if="!user" @login="handleLogin" />

    <div v-if="user">

      <nav>
        <button
          @click="currentView = 'profile'"
          :class="{ active: currentView === 'profile' }"
        >Profil</button>
        <button
          v-if="user.role === 'admin'"
          @click="currentView = 'dashboard'"
          :class="{ active: currentView === 'dashboard' }"
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

nav button {
  background: #eee;
  padding: 0.5rem 1.2rem;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 800;
  border-radius: 8px 8px 0 0;
}
nav button.active {
  background: #00474B;
  color: #fff;
  font-weight: 800;
  border-radius: 8px 8px 0 0;
  cursor:default;
}
</style>
