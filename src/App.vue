<script setup>
  import { useRoute , RouterView } from 'vue-router'
  import Footer from './components/Footer.vue'
  import Home from './components/Home.vue'
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

  const route = useRoute()
  const currentRouteName = computed(() => route.name);
  // Reactive variable to track sticky status
  const isSticky = ref(false);
  const showBackToTop = ref(false);

  // Function to handle scroll event
  const handleScroll = () => {
    isSticky.value = window.scrollY > 45;
    showBackToTop.value = window.scrollY > 300;
  };

  const scrollToTop = () => {
    // You can use a smooth scroll library or implement your own logic here
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Attach scroll event listener on component mount
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  // Remove scroll event listener on component destroy
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <header>
    <div class="logo">
      <a href="/"><font-awesome-icon icon="utensils" size="1x" class="text-primary mb-4" style="color: wheat;"/></a>
      <a href="/" style="font-size: large; margin-left: 10px; color: wheat;">Restoran</a>
    </div>
    <nav>
      <RouterLink to="/" :class="{ 'active': $route.path === '/' }">Home</RouterLink>
      <RouterLink to="/about" :class="{ 'active': $route.path === '/about' }">About</RouterLink>
      <RouterLink to="/menu" :class="{ 'active': $route.path === '/menu' }">Menu</RouterLink>
      <RouterLink to="/booking" :class="{ 'active': $route.path === '/booking' }">Book a Table</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: rgba(30,30,30, 0.9); /* Semi-transparent background */
  color: black;
  z-index: 1;
}

nav {
  display: flex;
  gap: 10px;
}

nav a {
  color: white;;
  text-decoration: none;
  font-size: 18px;
}

nav a.active {
  font-weight: bold; /* Example style for active link */
}
.container {
  padding-top: 80px; /* Adjust the padding to accommodate the fixed header */
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure the background is behind other content */
  background-image: url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chan-walrus-941861.jpg&fm=jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.main-content {
  margin-top: 80px; /* Adjust the margin to push content below the fixed header */
}
</style>
