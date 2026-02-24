<!--Styrer login og roller-->

<template>
  <div class="container">
    <Login v-if="!user" @login="handleLogin" />

    <Profile v-if="user" :user="user" />

    <Admin v-if="user && user.role === 'admin'" />

    <button v-if="user" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Admin from "./views/Admin.vue";

const user = ref(null)

async function handleLogin(credentials) {
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
}

function logout() {
  user.value = null
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
