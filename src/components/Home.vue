<template>
  <div id="app">
    <div class="carousel">
      <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
          :class="{ 'active': currentSlide === index }"
        >
          <img :src="slide.imageSrc" :alt="slide.text" class="slide-image">
          <p class="slide-text"></p>
        </div>
      </div>
      <div class="buttons">
        <button @click="prev" :disabled="currentSlide === 0" class="arrow left"></button>
        <button @click="next" :disabled="currentSlide === slides.length - 1" class="arrow right"></button>
      </div>
    </div>
  </div>
  <div class="container-xxl">
    <div class="content wow fadeInUp" data-wow-delay="0.2s">
      <div class="Home" style="color: firebrick;">
        <h1>Welcome to My Restaurant</h1>
        <p>
          We strive to provide you with an exceptional dining experience. Explore our menu and reserve a table
          for an unforgettable culinary journey.
        </p>
        <div class="navigate-btn">
          <router-link
            to="/menu"
            custom
            v-slot="{ navigate }"
          >
            <button
              @click="navigate"
              role="link"
              class="button-spacing"
            >
              Explore Menu
            </button>
          </router-link>

          <router-link
            to="/booking"
            custom
            v-slot="{ navigate }"
          >
            <button
              @click="navigate"
              role="link"
            >
              Book a table
            </button>
          </router-link>
        </div>
        <div class="col-lg-6 col-md-6" style="margin-top: 10px; font-size: larger; color: darkmagenta;" data-wow-delay="0.3s">
          <h2 class="section-title ff-secondary text-start text-primary fw-normal" style="margin-bottom: 5px;">Contact</h2>
          <h4 class="mb-2"><font-awesome-icon icon="map-marker-alt" class="me-3"/>  Sudirman Street, Jakarta, Indonesia</h4>
          <h4 class="mb-2"><font-awesome-icon icon="phone-alt" class="me-3"/>  +6281101010101</h4>
          <h4 class="mb-2"><font-awesome-icon icon="envelope" class="me-3"/>  restaurant@yahoo.co.id</h4>
          </div>
      </div>
      </div>
      </div>
      <footer class="footer">
        <p>&copy; 2024 The Restaurant SCBD Jakarta. All rights reserved.</p>
      </footer>
</template>

<script>
import image1 from '@/assets/img1.jpg'
import image2 from '@/assets/img2.jpg'
import image3 from '@/assets/img4.jpg'

export default {
  name: "Home",
  data() {
    return {
      currentSlide: 0,
      slides: [
        { text: 'Slide 1', imageSrc: image1 },
        { text: 'Slide 2', imageSrc: image2 },
        { text: 'Slide 3', imageSrc: image3 },
      ],
    };
  },
  methods: {
    prev() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    next() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
      }
    },
    goToSlide(index) {
      if (this.currentSlide !== index) {
        this.animateSlideTransition(this.currentSlide, index);
      }
    },
    animateSlideTransition(from, to) {
      this.slides[from].in = false;
      this.slides[from].inActive = true;
      this.slides[from].out = true;
      this.slides[from].outActive = false;

      this.currentSlide = to;

      this.slides[to].in = true;
      this.slides[to].inActive = false;
      this.slides[to].out = false;
      this.slides[to].outActive = true;
    },
  },
};
</script>

<style scoped>

#app {
  background-color: gray;
  width: 600px;
  height: 99%;
  margin-right: 50px;
}
.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  width: 560px;
  right: 2%;
  top: 0.55%;
}
.slides {
  display: flex;
  transition: transform 0.5s ease;
  height: 300px;
}
.navigate-btn {
  margin-top: 15px;
}
.button-spacing {
  margin-right: 30px;
}
.slide {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slide-image {
  width:100%;
  height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.slide-text {
  margin-top: 10px;
  font-size: 18px;
}

.slides.animated {
  animation: slide 0.5s forwards;
}

.slides.slide-in {
  transform: translateX(100%);
}

.slides.slide-in-active {
  transform: translateX(0%);
}

.slides.slide-out {
  transform: translateX(-100%);
}

.slides.slide-out-active {
  transform: translateX(0%);
}

/* .buttons {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
}

button {
  margin: 0 10px;
} */
.buttons {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
}

button {
  padding: 10px;
  outline: none;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.2;
    cursor: no-drop;
  }
}
.dots {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}
.arrow {
  cursor: pointer;
  border: none;
  font-size: 24px;
  padding: 10px;
}

.arrow.left::before {
  content: '\2039'; /* Left arrow Unicode character */
}

.arrow.right::before {
  content: '\203A'; /* Right arrow Unicode character */
}
.footer {
  background-color: palevioletred;
  color: white;
  text-align: center;
  padding: 0.5rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
/* button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
} */
/* .dots li {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
}

.dots li.active {
  background-color: #000;
}

@keyframes slide {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
} */
</style>