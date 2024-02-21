<template>
    <div class="popup">
      <div class="popup-content">
        <h2>Tambah Menu Baru</h2>
        <form @submit.prevent="submitMenu">
          <label for="name">Nama Menu:</label>
          <input type="text" v-model="newMenu.name" required>
          <label for="price">Harga:</label>
          <input type="number" v-model="newMenu.price" required>
          <button type="submit">Tambah Menu</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Import necessary modules
  
    methods: {
      async submitMenu() {
        try {
          const response = await fetch('http://localhost:5173/menu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.newMenu),
          });
  
          if (response.ok) {
            // Menu added successfully, handle any UI updates or notifications
            console.log('Menu added successfully');
            this.$emit('close');
          } else {
            // Handle error response
            console.error('Failed to add menu:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding menu:', error);
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
  