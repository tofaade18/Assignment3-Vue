<template>
    <div class="popup">
      <div class="popup-content">
        <h2>Edit Menu</h2>
        <form @submit.prevent="updateMenu">
          <label for="name">Nama Menu:</label>
          <input type="text" v-model="editedMenu.name" required>
          <label for="price">Harga:</label>
          <input type="number" v-model="editedMenu.price" required>
          <button type="submit">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Import necessary modules
  
    props: ['menu'],
  
    data() {
      return {
        editedMenu: {
          id: this.menu.id,
          name: this.menu.name,
          price: this.menu.price,
        },
      };
    },
  
    methods: {
      async updateMenu() {
        try {
          const response = await fetch(`http://localhost:5173/menu/${this.menu.id}`, {
            method: 'PUT', // or 'PATCH' depending on your API
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedMenu),
          });
  
          if (response.ok) {
            // Menu updated successfully, handle any UI updates or notifications
            console.log('Menu updated successfully');
            this.$emit('close');
          } else {
            // Handle error response
            console.error('Failed to update menu:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating menu:', error);
        }
      },
    },
  };
  </script>  
  
  <style scoped>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .popup-content h2 {
    margin-bottom: 10px;
  }
  </style>
  