<script setup>
import { ref } from 'vue';
import { useSeatbookingStore } from '@/stores/seatbooking'
const seatbookingstore = useSeatbookingStore()
const text = ref('');
const email = ref('');
const duedate = ref('');
const npeople = ref('');

const formatDate = (tgl) => {

  // Define arrays for short weekday and month names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get individual date components
  const dayOfWeek = weekdays[tgl.getDay()];
  const month = months[tgl.getMonth()];
  const dayOfMonth = tgl.getDate();
  const year = tgl.getFullYear();

  // Create the formatted date string
  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;
  return formattedDate
};

const onSubmit = () => {
  if (!text.value || !email.value || !duedate.value || !npeople.value) {
    // Display a toast error message if either field is empty
    alert('Please input all data')
    return;
  }
  const dueDate = new Date(duedate.value);
  const due = formatDate(dueDate);
  const maxId = seatbookingstore.items.reduce((max, item) => Math.max(max, item.id), 0);
  const newId = maxId + 1;
  const data = {
    id: newId,
    name: text.value,
    email:email.value,
    date: due,
    npeople:npeople.value,
  };
  // Clear form fields
  text.value = '';
  email.value = '';
  duedate.value = '';
  npeople.value = '';

    seatbookingstore.addItem(data)
    alert('Booking Berhasil');
};
</script>

<template>
    <!-- Reservation Start -->
    <div class="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
        <div class="row g-0">
            <div class="col-md-6">
                <div class="video">
                    <button type="button" class="btn-play" data-bs-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
                    </button>
                </div>
            </div>
            <div class="col-md-6 bg-dark d-flex align-items-center">
                <h5 class="section-title ff-secondary text-start text-primary fw-normal" style="text-align: center; margin-top: 30px;">Reservation</h5>
                <div class="reservation-form-container p-5 wow fadeInUp" data-wow-delay="0.4s">
                    <h1 class="mb-4" style="color: salmon; text-align: center;">Book A Table Online</h1>
                    <form>
                    <div class="row g-3">
                        <div class="col-md-6">
                        <div class="form-floating">
                            <label for="name" style="color: white;">Name</label> <br>
                            <input type="text" class="form-control" v-model="text" id="name" placeholder="Your Name">
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-floating">
                            <label for="email" style="color: white;">Email</label> <br>
                            <input type="email" class="form-control" v-model="email" id="email" placeholder="Your Email">                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-floating date" id="date3" >
                            <label for="datetime" style="color: white;">Date</label> <br>
                            <input type="date" class="form-control datetimepicker-input" v-model="duedate" id="datetime"/>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-floating">
                            <label for="npeople" style="color: white;">Number of People</label><br>
                            <input type="number" class="form-control" placeholder="Number of People" v-model="npeople">
                            <!-- <label for="npeople" style="color: white;">Number of People</label> -->
                        </div>
                        </div>
                        <div class="col-12">
                        <button class="btn-custom w-100 py-3" type="submit" @click.prevent="onSubmit">Book Now</button>
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
                    <h1 class="modal-title" id="exampleModalLabel" style="text-align: center;">Youtube Video</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 16:9 aspect ratio -->
                    <div class="ratio ratio-16x9">
                        <iframe width="600" height="390" src="https://www.youtube.com/embed/keOaQm6RpBg?si=gfQ01J20bB9ewfEk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Reservation Start -->
    <footer class="footer">
        <p>&copy; 2024 The Restaurant SCBD Jakarta. All rights reserved.</p>
      </footer>
</template>

<style scoped>

.reservation-form-container {
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: blue;
  margin-right: 15px;
  margin-top: 15px;
}
/* Adjust form layout */
.form-floating {
    margin-bottom: 20px;
    margin-left: 10px;
}

/* Adjust label styles */
.form-floating label {
    color: #6c757d; /* Set label color */
}

/* Adjust input styles */
.form-control {
    height: 30px;
    border-radius: 10px;
    width: 500px;
}

.btn-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.btn-play span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #ffffff;
}

.section-title {
  font-size: 32px;
}


.btn-custom {
  background-color: #ff6347; /* Custom background color */
  color: #ffffff; /* Custom text color */
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add transition for smooth color change */
  width: 490px;
  height: 35px;
  margin-left: 15px;
  margin-bottom: 20px;
  margin-top: 5px;
}

.btn-custom:hover {
  background-color: #ff4500; /* Change background color on hover */
}
.modal-title {
    margin-top: 30px;
}

.footer {
  background-color: rgba(245, 3, 120, 0.8);
  color: white;
  text-align: center;
  padding: 0.5rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
