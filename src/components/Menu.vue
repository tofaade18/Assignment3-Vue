<script setup>
import { ref, reactive } from 'vue';
import { useFoodmenuStore } from '@/stores/foodmenu'

const foodmenustore = useFoodmenuStore()
foodmenustore.fetchItems();
// const ids = localStorage.getItem('lastUsedId') || 0;
const editobj = reactive({
    id: '',
    name: '',
    price: '',
    description: '',
    photolink: ''
})

const createobj = reactive({
  name: '',
  price: '',
  description:''
})
const onClickEdit= (id, name, price, description, photolink) => {
  editobj.id = id;
  editobj.name = name;
  editobj.price = price,
  editobj.description = description
  editobj.photolink = photolink
};

const onClickDelete= (id) => {

    foodmenustore.deleteItem(id);

};

const onHandleCreate = async () => {
  if (!createobj.name.trim() || !createobj.price || !createobj.description.trim()) {
        alert('Please fill in all required fields.');
        return;
    }
  try {
        // Fetch all items to get the latest ID
        await foodmenustore.fetchItems();
        
        // Find the maximum ID among the existing items
        const maxId = foodmenustore.items.reduce((max, item) => Math.max(max, item.id), 0);

        // Generate the new ID
        const newId = maxId + 1;

        // Create the new item
        const data = {
            id: `${newId}`,
            name: createobj.name.trim(),
            price: createobj.price,
            description: createobj.description.trim(),
            photolink: `https://picsum.photos/id/${newId}/200`
        };

        // Add the new item to the store
        await foodmenustore.addItem(data);

        // Reset the form fields
        createobj.name = '';
        createobj.price = '';
        createobj.description = '';
    } catch (error) {
        console.error('Error creating item:', error);
    }
};


const onHandleEdit= () => {
  if (!editobj.name.trim() || !editobj.price || !editobj.description.trim()) {
        alert('Please fill in all required fields.');
        return;
    }
  const data = {
    id: editobj.id,
    name: editobj.name,
    price: editobj.price,
    description: editobj.description,
    photolink: editobj.photolink
    }
    
    foodmenustore.updateItem(data);

};


</script>

<template>
    <!-- Add Menu Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Menu</h1>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        </div>
        <div class="modal-body" style="display: inline-flex;">
            <form class="row g-3">
                <div class="form-floating col-md-6">
                  <label for="floatingName" style="display: flex; color: darkblue;">Menu Name</label>
                  <input type="text" class="form-control" id="floatingName" placeholder="Duck Breast" v-model="createobj.name" required>
                </div>
                <div class="form-floating col-md-6">
                  <label for="floatingPrice" style="display: flex; color: darkblue;">Menu Price</label>
                  <input type="number" class="form-control" id="floatingPrice" placeholder="10" v-model="createobj.price" required>                </div>
                <div class="form-floating col-12" id="textareaform">
                  <label for="floatingTextarea2" style="display: flex; color: darkblue;">Description</label>
                  <textarea class="form-control" placeholder="Leave a description here" id="floatingTextarea2" v-model="createobj.description" style="height: 120px" required></textarea>                </div>
            </form>
              <div class="col-md-6">
                <img src="@/assets/img4.jpg" alt="Image" class="img-fluid" style="width: 420px; margin-left: 40px;">
            </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" @click="onHandleCreate()" data-bs-dismiss="modal">Add Menu</button>
          <button type="button" class="btn btn-secondary" style="background-color: gray;" data-bs-dismiss="modal">Close</button>        </div>
        </div>
    </div>
    </div>
    <!-- Edit Menu Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">Edit Menu</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="display: inline-flex;">
            <form class="row g-3">
                <div class="form-floating col-md-6">
                  <label for="floatingName" style="display: flex; color: darkgoldenrod;">Menu Name</label>
                  <input type="text" class="form-control" id="floatingName" placeholder="Chicken Burger" v-model="editobj.name">                </div>
                <div class="form-floating col-md-6">
                  <label for="floatingPrice" style="display: flex; color: darkgoldenrod;">Menu Price</label>
                  <input type="number" class="form-control" id="floatingPrice" placeholder="100" v-model="editobj.price">                </div>
                <div class="form-floating col-12" id="textareaform">
                  <label for="floatingTextarea2" style="display: flex; color: darkgoldenrod;">Link</label>
                  <textarea class="form-control" placeholder="Leave a description here" id="floatingTextarea2" v-model="editobj.photolink" style="height: 125px" ></textarea>
                </div>
            </form>
            <div class="col-md-6">
              <img src="@/assets/img4.jpg" alt="Image" class="img-fluid" style="width: 420px; margin-left: 40px;">
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="onHandleEdit()" data-bs-dismiss="modal">Save changes</button>
          <button type="button" class="btn btn-secondary" style="background-color: gray;" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>

    <!-- Menu Start -->
    <div class="container-xxl py-5">
        <div class="container" style="margin-top: 70px; margin-left: 30px;">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h2 class="section-title ff-secondary text-center text-primary fw-bolder">Food Menu</h2>
                <button type="button" class="addmenubutton" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Menu</button>
            </div>
            <hr>
            <div class="tab-class text-center wow fadeInUp mt-5" data-wow-delay="0.1s">
                <div class="row g-4">
                    <div 
                        class="col-lg-6"
                        v-for="item in foodmenustore.items"
                        :key="item.id"
                    >
                        <div class="d-flex align-items-center" style="margin-top: 10px;">
                            <img class="flex-shrink-0 img-fluid rounded" :src="item.photolink" alt="" style="width: 200px;">
                            <div class="w-100 d-flex flex-column text-start ps-4">
                                <h4 class="d-flex justify-content-between border-bottom pb-2">
                                    <h2 style="color: blueviolet; font-weight: bolder;">{{ item.name }}</h2>
                                    <small class="fst-italic" style="color: black;">{{ item.description }}</small>
                                    <h4 class="text-primary fw-bold" style="font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', 'sans-serif';">Price: {{ `$${item.price}` }}</h4>
                                </h4>
                                <div class="mt-3" >
                                <button type="button" class="btn me-3" @click="onClickEdit(item.id, item.name, item.price, item.description, item.photolink)" data-bs-toggle="modal" data-bs-target="#editModal" style="width: 48%; margin-right: 10px; background-color: greenyellow;">Edit Menu</button>
                                <button type="button" class="btn btn-outline-primary" @click="onClickDelete(item.id)" style="width: 48%; background-color: maroon; color: white;">Delete</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Menu End -->
    <footer class="footer">
      <p>&copy; 2024 The Restaurant SCBD Jakarta. All rights reserved.</p>
    </footer>
</template>



<style scoped>
/* Styles for modals and overlay */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
/* Modal Header */
.modal-header {
  background-color: #343a40;
  color: #fff;
  border-bottom: 1px solid #454d55;
  text-align: center;
}

/* Modal Title */
.modal-title {
  font-size: 2rem;
  margin: 5px;
}

/* Modal Body */
.modal-body {
  background-color: #f8f9fa;
  margin-top: 10px;
}

/* Modal Footer */
.modal-footer {
  margin-top: 10px;
}

/* Close Button */
.btn-close {
  color: #fff;
}

/* Form Input Styles */
.form-floating input[type="text"],
.form-floating input[type="number"] {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  width: 500px;
  height: 30px;
}
/* Textarea Style */
.form-floating textarea {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  width: 500px;
  height: 100px; /* Adjust height as needed */
  margin-top: 5px;
  margin-bottom: 5px;
}

/* Textarea Label Style */
.form-floating textarea + label {
  color: #495057;
  margin-top: 0.5rem; /* Adjust spacing from textarea */
}
.footer {
  background-color: rgba(241, 4, 103, 0.8);
  color: white;
  text-align: center;
  padding: 0.5rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

/* Form Label Styles */
.form-floating label {
  color: #495057;
}
.addmenubutton{
  background-color: pink;
  border-radius: 5px;
  height: 30px;
  width: 200px;
  margin-top: 5px;
  margin-bottom: 10px;
}
/* Primary Button */
.btn-primary {
  background-color: #007bff;
  color: #fff;
  margin-left: 20px;
  height: 40px;
  width: 450px;
  margin-right: 30px;
}

/* Secondary Button */
.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  height: 40px;
  width: 450px;
  margin-left: 10px;
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


