<!-- views/Home.vue -->
<template>
  <div>
    <h1>Welcome to My Restaurant</h1>
    <p>
      We strive to provide you with an exceptional dining experience. Explore our menu and reserve a table
      for an unforgettable culinary journey.
    </p>

    <!-- Navigation links to Menu and Book Table pages -->
    <!-- <nav>
      <router-link to="/menu" class="Menuu">Explore Menu</router-link>
      <router-link to="/book-table">Book a Table</router-link>
    </nav> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
/* Add your custom styles for the Home component here */
nav {
  margin-top: 20px;
}
.Menuu {
  margin-right:20px;
}
router-link {
  margin-right: 20px;
  text-decoration: none;
  color: #007bff; /* Adjust color as needed */
}

router-link:hover {
  text-decoration: underline;
}
</style>
