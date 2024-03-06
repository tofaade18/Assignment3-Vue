import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFoodmenuStore = defineStore('menu', () => {

  const items = ref([])

  // Fetch all items
  async function fetchItems() {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5174/menus');
      const data = await response.json();
      items.value = data;
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  // Add a new item
  async function addItem(newItem) {
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5174/menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      const addedItem = await response.json();
      items.value.push(addedItem);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  // Update an existing item
  async function updateItem(updatedItem) {

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:5174/menus/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      const index = items.value.findIndex((item) => item.id === updatedItem.id);
      items.value[index] = updatedItem;
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  // Delete an item
  async function deleteItem(itemId) {
    try {
      // Replace with your actual API endpoint
      await fetch(`http://localhost:5174/menus/${itemId}`, {
        method: 'DELETE',
      });
      console.log(itemId)
      items.value = items.value.filter((item) => item.id !== itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  return { items, fetchItems, addItem, updateItem, deleteItem }
})