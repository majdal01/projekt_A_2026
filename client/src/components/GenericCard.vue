<template>
  <div class="card">
    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot name="body"></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
.card {
  background: #00474B;
  color: white;
  width: 350px;
  padding: 1.5rem;
  border-radius: 8px;
}
</style>
