import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSeatbookingStore = defineStore('booking', () => {
    const items = ref([]);

    async function addItem(newItem) {
        try {
            const response = await fetch('http://localhost:5174/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            console.log(response);
            if (response.ok) {
                const addedItem = await response.json();
                items.value.push(addedItem);
                console.log(items);
            } else {
                console.error('Error adding item. Response status:', response.status);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    return { items, addItem };
});
