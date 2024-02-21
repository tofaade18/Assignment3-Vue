<!-- views/Menu.vue -->
<!-- <template>
  <div class="menu">
    <h1>Menu</h1>

    <div v-for="(section, index) in menuSections" :key="index" class="menu-section">
      <h2>{{ section.title }}</h2>

      <div v-for="(item, i) in section.items" :key="i" class="menu-item">
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>Price: ${{ item.price.toFixed(2) }}</p>
        </div>

        <div class="item-controls">
          <button @click="addToOrder(section.title, item)">+</button>
          <span>{{ getOrderQuantity(section.title, item) }}</span>
          <button @click="subtractFromOrder(section.title, item)">-</button>
        </div>
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

export default {
  name: 'Menu',
  data() {
    return {
      menuSections: [
        {
          title: 'Appetizers',
          items: [
            { name: 'Appetizer 1', description: 'Description 1', price: Math.random() * 10 },
            { name: 'Appetizer 2', description: 'Description 2', price: Math.random() * 10 },
            // Add more appetizers as needed
          ],
        },
        {
          title: 'Main Courses',
          items: [
            { name: 'Main Course 1', description: 'Description 1', price: Math.random() * 20 },
            { name: 'Main Course 2', description: 'Description 2', price: Math.random() * 20 },
            // Add more main courses as needed
          ],
        },
        {
          title: 'Desserts',
          items: [
            { name: 'Dessert 1', description: 'Description 1', price: Math.random() * 8 },
            { name: 'Dessert 2', description: 'Description 2', price: Math.random() * 8 },
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

.item-controls {
  display: flex;
  align-items: center;
}

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
</style> -->

<!-- <template>
  <div>
    <h1>Food Menu</h1>
    <button @click="showAddModal">Add Menu Item</button>
    <button @click="showEditModal">Edit Menu Item</button>

    <div v-if="showAddModalFlag" class="modal">
      <div class="modal-content">
        <span @click="closeAddModal" class="close">&times;</span>
        <h2>Add Menu Item</h2>
        <form @submit.prevent="addMenuItem">
          <label for="name">Name:</label>
          <input type="text" v-model="newMenuItem.items.name" required><br>

          <label for="price">Price:</label>
          <input type="number" v-model="newMenuItem.items.price" required><br>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>

    <div v-if="showEditModalFlag" class="modal">
      <div class="modal-content">
        <span @click="closeEditModal" class="close">&times;</span>
        <h2>Edit Menu Item</h2>
        <form @submit.prevent="editMenuItem">
          <label for="name">Name:</label>
          <input type="text" v-model="selectedMenuItem.name" required><br>

          <label for="price">Price:</label>
          <input type="number" v-model="selectedMenuItem.price" required><br>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FoodMenu',
  data() {
    return {
      showAddModalFlag: false,
      showEditModalFlag: false,
      newMenuItem: [
        {
          title: 'Appetizers',
          items: [
            { name: 'Appetizer 1', description: 'Description 1', price: Math.random() * 10 },
            { name: 'Appetizer 2', description: 'Description 2', price: Math.random() * 10 },
          ],
        },
        {
          title: 'Main Courses',
          items: [
            { name: 'Main Course 1', description: 'Description 1', price: Math.random() * 20 },
            { name: 'Main Course 2', description: 'Description 2', price: Math.random() * 20 },
            // Add more main courses as needed
          ],
        },
        {
          title: 'Desserts',
          items: [
            { name: 'Dessert 1', description: 'Description 1', price: Math.random() * 8 },
            { name: 'Dessert 2', description: 'Description 2', price: Math.random() * 8 },
            // Add more desserts as needed
          ],
        },
      ],
      selectedMenuItem: null,
    };
  },
  methods: {
    showAddModal() {
      this.showAddModalFlag = true;
    },
    closeAddModal() {
      this.showAddModalFlag = false;
    },
    addMenuItem() {
      const apiUrl = 'http://localhost:5174/menus';
      const requestBody = {
        name: this.newMenuItem.items.name,
        desc: this.newMenuItem.items.description,
        price: this.newMenuItem.items.price
      };

      // Fetch options
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      };

      // Make API call
      fetch(apiUrl, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add menu item');
          }
          // Close the modal upon successful submission
          this.closeAddModal();
        })
        .catch(error => {
          console.error('Error adding menu item:', error);
          // Handle error
        });
    },
    showEditModal() {
      this.showEditModalFlag = true;
      // Fetch menu item details from API based on selected item
      // Assign fetched data to this.selectedMenuItem
    },
    closeEditModal() {
      this.showEditModalFlag = false;
    },
    editMenuItem() {
      // Submit edited menu item to API
      // Use fetch or Axios to make the API call
      // After successful submission, close the modal
      this.closeEditModal();
    },
  },
};
</script> -->

<!-- <style>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style> -->


<!-- <template>
  <div class="container p-5">
    <button @click="showAddModal = true">Add Menu Item</button>
    <button @click="showEditModal = true">Edit Menu Item</button>
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>Add Menu</h2>
        <form @submit.prevent ="addMenuItem">
          <label for="name">Name</label>
          <input type="text" required> <br>
          
          <label for="price">Price</label>
          <input type="number" required> <br>
          <button type="submit">Submit</button>
        </form>
        <button @click="showAddModal = false">Close</button>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit Menu</h2>
        <h6>KOK GABISA SIH COKKKK</h6>
        <button @click="showEditModal = false">Close</button>
      </div>
    </div>
  </div>
</template> -->

<!-- <script>
export default {
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
    };
  },
};
</script> -->

<template>
  <div class="container p-5">
    <button @click="showAddModal = true">Add your order</button>
    <button @click="showEditModal = true">Edit Menu Item</button>

    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>Add Menu</h2>
        <form @submit.prevent="addMenuItem">
          <label for="name">Name</label>
          <select v-model="newMenuItem.name" required>
          <option disabled value="">Select one</option><option>PotatoWedges</option><option>Spring Mix Salad</option><option>Hotplate Steak</option><option>Spaghetti Carbonara</option><option>Panacotta</option><option>Ice Cream Cake</option></select>
          <label for="Quantity">Quantity</label>
          <input type="number" v-model="newMenuItem.quantity" required><br>
          <button type="submit">Submit</button>
        </form>
        <button @click="closeAddModal">Close</button>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit Menu</h2>
        <form @submit.prevent="editMenuItem">
          <label for="name">Name:</label>
          <input type="text" v-model="selectedMenuItem.name" required><br>

          <label for="price">Price:</label>
          <input type="number" v-model="selectedMenuItem.price" required><br>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
const selected = ref('')
export default {
  setup() {
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const newMenuItem = ref({ name: selected , quantity: 0 });
    const selectedMenuItem = ref(null);
    const menus = ref([]);
    let ids = localStorage.getItem('lastUsedId') || 0; // Retrieve last used ID from localStorage
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://localhost:5174/menus');
        if (!response.ok){
          throw new Error ('failed')
        }
        menus.value = await response.json()
      } catch (error) {
        console.error('error',error)
      }
    }
    onMounted(fetchMenus)
    const addMenuItem = () => {
      const apiUrl = 'http://localhost:5174/menus';
      const requestBody = {
        id : ++ids,
        name: newMenuItem.value.name,
        quantity: newMenuItem.value.quantity
      };
      localStorage.setItem('lastUsedId', ids);

      // Fetch options
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      };

      // Make API call
      fetch(apiUrl, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add menu item');
          }
          showAddModal.value = false;
        })
        .catch(error => {
          console.error('Error adding menu item:', error);
        });
    };
    const closeAddModal = () => {
      showAddModal.value = false;
    };

    const closeEditModal = () => {
      showEditModal.value = false;
    };
    const editMenuItem = async () => {
      const selectedItem = menus.value.find(menu => menu.id === selectedMenuItem.value);
      console.log(selectedItem.id)
      if (!selectedItem) {
        console.error('Selected menu item not found');
        return;
      }
      const apiUrl2 = `http://localhost:5174/menus/${selectedItem.id}`;
      const requestBody2 = { name: selectedItem.name, price: selectedItem.price };

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody2)
      };
      fetch(apiUrl2, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add menu item');
          }
          showAddModal.value = false;
        })
        .catch(error => {
          console.error('Error adding menu item:', error);
        });
      closeEditModal();
    };
    return {
      showAddModal,
      showEditModal,
      newMenuItem,
      selectedMenuItem,
      addMenuItem,
      closeAddModal,
      closeEditModal,
      editMenuItem
    };
  }
};
</script>


<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>





<!-- <style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style> -->
