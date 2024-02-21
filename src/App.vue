<script setup>
  import { useRoute , RouterView } from 'vue-router'
  import Hero from './components/Hero.vue'
  import SectionHead from './components/SectionHead.vue'
  import Footer from './components/Footer.vue'
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
    <div class="container-fluid-xxl" style="display: inline-flex;">
      <font-awesome-icon icon="utensils" size="3x" class="text-primary mb-4"/>
      <nav style="text-align: right ;">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/menu">Menu</RouterLink>
        <RouterLink to="/booking">Book a Table</RouterLink>
      </nav>
    </div>
  </header>

  <div class="container-xl bg-white p-0">
    <RouterView />
    
    <!-- Footer Start -->
    <Footer />
    <!-- Footer End -->
      
    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top" v-show="showBackToTop" @click="scrollToTop"><i class="bi bi-arrow-up"></i></a>
  </div>
</template>

<style scoped>

</style>