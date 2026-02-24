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
const token = ref(null)
const currentView = ref("profile")

console.log("User before:", user.value)

function handleLogin(data) {
  token.value = data.token
  localStorage.setItem("token", data.token)

  // decode token for at få rolle
  const payload = JSON.parse(atob(data.token.split(".")[1]))

  user.value = {
    role: payload.role
  }

  currentView.value = "profile"

  console.log("Decoded payload:", payload)
}

function logout() {
  user.value = null;
  token.value = null;
  localStorage.removeItem("token");
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
