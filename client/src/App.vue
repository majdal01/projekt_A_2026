<template>
  <div>

    <Login
      v-if="!user"
      @login="handleLogin"
    />

    <Profile
      v-if="user"
      :user="user"
    />

    <Admin
      v-if="user && user.role === 'admin'"
    />

    <button v-if="user" @click="logout">
      Logout
    </button>

  </div>
</template>

<script>
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Admin from "./views/Admin.vue";

export default {
  components: {
    Login,
    Profile,
    Admin
  },
  data() {
    return {
      user: null
    }
  },
  methods: {
    handleLogin(credentials) {
      //Midlertidig fake login
      if (credentials.username === "admin") {
        this.user = { username: "admin", role: "admin" }
      }
      else if (credentials.username === "editor") {
        this.user = { username: "editor", role: "editor"}
      }
      else {
        this.user = { username: credentials.username, role: "viewer"}
      }
    },
    logout() {
      this.user = null
    }
  }
}
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
