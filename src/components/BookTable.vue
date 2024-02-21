<!-- views/BookTable.vue -->
<template>
  <!-- Reservation Start -->
  <!-- <div class="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
      <div class="row g-0">
          <div class="col-md-6">
              <div class="video">
                  <button type="button" class="btn-play" data-bs-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
                      <span></span>
                  </button>
              </div>
          </div>
          <div class="col-md-6 bg-dark d-flex align-items-center">
              <div class="p-5 wow fadeInUp" data-wow-delay="0.2s">
                  <h5 class="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
                  <h1 class="text-white mb-4">Book A Table Online</h1>
                  <form>
                      <div class="row g-3">
                          <div class="col-md-6">
                              <div class="form-floating">
                                  <input type="text" class="form-control" v-model="text" id="name" placeholder="Your Name">
                                  <label for="name">Your Name</label>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-floating">
                                  <input type="email" class="form-control" v-model="email" id="email" placeholder="Your Email">
                                  <label for="email">Your Email</label>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-floating date" id="date3" >
                                  <input type="date" class="form-control datetimepicker-input" v-model="duedate" id="datetime" placeholder="Date & Time" />
                                  <label for="datetime">Date & Time</label>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-floating">
                                  <select class="form-select" v-model="npeople" id="select1">
                                      <option value="1">People 1</option>
                                      <option value="2">People 2</option>
                                      <option value="3">People 3</option>
                                  </select>
                                  <label for="select1">No Of People</label>
                                  </div>
                          </div>
                          <div class="col-12">
                              <div class="form-floating">
                                  <textarea class="form-control" v-model="srequest" placeholder="Special Request" id="message" style="height: 100px"></textarea>
                                  <label for="message">Special Request</label>
                              </div>
                          </div>
                          <div class="col-12">
                              <button class="btn btn-primary w-100 py-3" type="submit" @click.prevent="onSubmit">Book Now</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>

  <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog mb-5">
          <div class="modal-content rounded-0">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Youtube Video</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/keOaQm6RpBg?si=gfQ01J20bB9ewfEk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  </div>
              </div>
          </div>
      </div>
  </div> -->
  <!-- Reservation Start -->
<!-- </template>
<template> -->
  <div class="book-table">
    <h1>Book a Table</h1>
    <form @submit.prevent="handleBooking">
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" required />

      <label for="date">Date:</label>
      <input v-model="date" type="date" id="date" required />

      <label for="time">Time:</label>
      <input v-model="time" type="time" id="time" required />

      <button type="submit">Book Now</button>
    </form>
  </div>
</template>

<script>
// import { ref } from 'vue';
// import { useSeatbookingStore } from '@/stores/seatbooking'
// const seatbookingstore = useSeatbookingStore()
// const name = ref('');
// const date = ref('');
// const time = ref('');

// const onSubmit = () => {
//   if (!name.value || !date.value || !time.value) {
//     // Display a toast error message if either field is empty
//     alert('Please input all data')
//     return;
//   }
//   // const dueDate = new Date(duedate.value);
//   // const due = formatDate(dueDate);

//   const data = {
//     name: name.value,
//     date:date.value,
//     time:time.value,
//   };

//   console.log(data);

//   // Clear form fields
//   text.value = '';
//   email.value = '';
//   duedate.value = '';
//   npeople.value = '';
//   srequest.value = '';

//     seatbookingstore.addItem(data);
// };

export default {
  name: 'BookTable',
  data() {
    return {
      name: '',
      date: '',
      time: '',
    };
  },
  methods: {
    async handleBooking() {
      try {
        const response = await fetch('/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            date: this.date,
            time: this.time,
          }),
        });

        if (response.ok) {
          // Handle success, e.g., show a confirmation message or navigate to another page
          alert('Booking successful!');
        } else {
          // Handle non-successful response
          console.error('Error booking table:', response.statusText);
          alert('Booking failed. Please try again.');
        }
      } catch (error) {
        console.error('Error booking table:', error);
        alert('Booking failed. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the BookTable component here */
.book-table {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  margin-bottom: 16px;
  padding: 8px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
