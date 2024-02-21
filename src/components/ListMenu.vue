<template>
  <div class="menu">
    <h1>Menu</h1>

    <div v-for="(section, index) in menuSections" :key="index" class="menu-section">
      <h2>{{ section.title }}</h2>

      <div v-for="(item, i) in section.items" :key="i" class="menu-item">
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>Price: ${{ item.price.toFixed(2) }}</p>
          <img :src="item.photo" alt="Item Photo" class="item-photo" style="width: 150px;"> <!-- Bind item photo to src attribute -->
        </div>  

        <!-- <div class="item-controls">
          <button @click="addToOrder(section.title, item)">+</button>
          <span>{{ getOrderQuantity(section.title, item) }}</span>
          <button @click="subtractFromOrder(section.title, item)">-</button>
        </div> -->
      </div>
    </div>

    <h2>Your Order</h2>
    <ul>
      <li v-for="(quantity, itemName) in order" :key="itemName">
        {{ itemName }}: {{ quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import appetizer1 from '@/assets/PotatoWedges.jpg';
import appetizer2 from '@/assets/SpringMixSalad.jpg';
import maincourse1 from '@/assets/PattyLucyHotplateSteak.jpg';
import maincourse2 from '@/assets/Carbonara.jpg';
import dessert1 from '@/assets/Panacotta.jpg';
import dessert2 from '@/assets/icecreamloafcake.jpg';
export default {
  name: 'Menu',
  data() {
    return {
      menuSections: [
        {
          title: 'Appetizers',
          items: [
            { name: 'Potato Wedges', description: 'Kentang Goreng Amerika', price: Math.random() * 10, photo: appetizer1},
            { name: 'Spring Mix Salad', description: 'Sayur-sayuran segar', price: Math.random() * 10, photo: appetizer2},
            // Add more appetizers as needed
          ],
        },
        {
          title: 'Main Courses',
          items: [
            { name: 'Hotplate Steak', description: 'Daging juicy yang sangat high class', price: Math.random() * 20, photo: maincourse1 },
            { name: 'Spaghetti Carbonara', description: 'Spaghetti Carbonara ala italia yang creamy af :)', price: Math.random() * 20, photo: maincourse2 },
            // Add more main courses as needed
          ],
        },
        {
          title: 'Desserts',
          items: [
            { name: 'Panacotta', description: 'Panacotta terbaik dengan strawberry cream', price: Math.random() * 8, photo: dessert1 },
            { name: 'Ice Cream Cake', description: 'Kue dingin yang dicampur dengan es krim', price: Math.random() * 8, photo: dessert2 },
            // Add more desserts as needed
          ],
        },
      ],
      order: {},
    };
  },
  methods: {
    addToOrder(sectionTitle, item) {
      const key = `${sectionTitle}-${item.name}`;
      this.order[key] = (this.order[key] || 0) + 1;
    },
    subtractFromOrder(sectionTitle, item) {
      const key = `${sectionTitle}-${item.name}`;
      if (this.order[key] > 0) {
        this.order[key]--;
        if (this.order[key] === 0) {
          delete this.order[key];
        }
      }
    },
    getOrderQuantity(sectionTitle, item) {
      const key = `${sectionTitle}-${item.name}`;
      return this.order[key] || 0;
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the Menu component here */
.menu {
  max-width: 800px;
  margin: auto;
}

.menu-section {
  margin-bottom: 20px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
/* .item-controls {
  display: flex;
  align-items: center;
} */

button {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  margin-left: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>