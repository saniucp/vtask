<template>
  <div>
    <div v-if="loading" class="loading-overlay">
      <div class="loader">
    <div class="shape1"></div>
    <div class="shape2"></div>
    <div class="shape3"></div>
    <div class="shape4"></div>
</div>
    </div>   
     <div v-else>
      <div class="page">
        <div class="tHeading">
          <h1 style="text-align: center; justify-content: center; padding: 10px;">User's Information Table</h1>

        </div>
      <div class="content">
    <table class="user-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Details</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in items" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button class="button" @click="openModal(user)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <!-- Bootstrap modal for user details -->
    <div class="modal" v-if="selectedUser">
      <div class="modal-dialog">
        <button style="margin-left: 90%;" type="button-m" class="close" @click="selectedUser = null">
              X
            </button>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" style="margin-left: 35%;"> <b style="color: brown;"><img  src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Admin" class="rounded-circle" width="100">
            </b><br><b style="font-size: 25px;">{{ selectedUser.name }}</b></h5>

          </div>
          <div>
          <div class="modal-body" style="float: left;">
            <p><strong>Email:</strong> {{ selectedUser.email }}</p>
            <p><strong>Phone:</strong> {{ selectedUser.phone }}</p>
            <p><strong>Address:</strong> {{ selectedUser.address.city }}, {{ selectedUser.address.zipcode }}</p>
            <p><strong>Website:</strong> {{ selectedUser.website }}</p>
          </div>
          <div class="modal-body" style="float: right;">
            <p><strong>Email:</strong> {{ selectedUser.email }}</p>
            <p><strong>Phone:</strong> {{ selectedUser.phone }}</p>
            <p><strong>Address:</strong> {{ selectedUser.address.city }}, {{ selectedUser.address.zipcode }}</p>
            <p><strong>Website:</strong> {{ selectedUser.website }}</p>
          </div>
        </div>
      </div>
      </div>

        </div>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      loading: true,
      selectedUser: null 
    };
  },
  mounted() {
    setTimeout(() => {
      this.getRequest();
    }, 1750);
  },
  methods: {
    getRequest() {
      axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/users"
      }).then((response) => {
        this.items = response.data;
        this.loading = false;
      }).catch((error) => {
        console.error("Error fetching data:", error);
        this.loading = false;
      });
    },
    openModal(user) {
      this.selectedUser = user; 
    }
  }
};
</script>



  <style scoped>


.tHeading{
  background: rgb(50, 166, 205) ;
    width: 60%;
    height: 70px;
    justify-content: center;
    margin-top: 3%;
    border-radius: 10px;
    margin-left: 19%;
    color: white;
}
.loader{
    background: #ffcb0e;
    width: 50px;
    height: 50px;
    margin: 50px auto 0;
    border-radius: 10%;
    position: relative;
    animation: loader_rotate 3.6s linear infinite;
    margin-top: 290px;
}
.loader .shape1,.loader .shape2, 
.loader .shape3,.loader .shape4{
    width: 25px;
    height: 25px;
    border-radius: 20%;
    position: absolute;
    top: 12.5px;
    left: 12.5px;
}
.loader .shape1{
    background-color: #cc0a3e;
    animation: shape1 1.8s infinite;
}
.loader .shape2{
    background-color: #543bad;
    animation: shape2 1.8s infinite;
}
.loader .shape3{
    background-color: #81c01b;
    animation: shape3 1.8s infinite;
}
.loader .shape4{
    background-color: #0ca18b;
    animation: shape4 1.8s infinite;
}
@keyframes loader_rotate{
    0%{ transform: rotate(0deg); }
    100%{ transform: rotate(360deg); }
}
@keyframes shape1{
    0%{ transform: translateX(0); }
    50%{ transform: translateX(50px) rotate(360deg); }
    100%{ transform: translateX(0); }
}
@keyframes shape2{
    0%{ transform: translateY(0); }
    50%{ transform: translateY(50px) rotate(360deg); }
    100%{ transform: translateX(0); }
}
@keyframes shape3{
    0%{ transform: translate(0); }
    50%{ transform: translate(-50px) rotate(360deg); }
    100%{ transform: translateX(0); }
}
@keyframes shape4{
    0%{ transform: translateY(0); }
    50%{ transform: translateY(-50px) rotate(360deg);}
    100%{ transform: translateX(0); }
}

  /* Styling for the user table */

  .user-table {
    background: linear-gradient(to right, #2980b9, #2c3e50);
    padding: 0;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 0 30px rgba(0,0,0,0.05),0 0 0 30px rgba(0,0,0,0.05);
  }
  
  .user-table thead th {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 12px;
    border: none;
  }
  
  .user-table tbody td {
    color: #fff;
    font-size: 15px;
    padding: 10px 12px;
    vertical-align: middle;
    border: none;
  }
  
  .user-table tbody tr:nth-child(even) {
    background-color: #1C4E80;
  }
  
  .user-table tbody tr:hover {
    background-color: #374f66;

  }

  .user-table tbody tr:hover {
    color: #ffffff;
  }

  /* Styling for the Bootstrap modal */
         

  button {
    background-image: linear-gradient(to right, #e52d27 0%, #b31217  51%, #e52d27  100%);
            margin: 10px;
            padding: 10px 20px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            border-radius: 10px;
            display: block;
}

button:hover {
            background-position: right center; /* change the direction of the change here */
            color: #fff;
            text-decoration: none;
            box-shadow: 0 0 10px #eee;
          }
            

.button {
  background: #289F61;

  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #289F61;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 600px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
  
}

.modal-header .modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #4ca93b;
  text-align: center;
  margin-left: 140px;
}

.modal-header .close {
  cursor: pointer;
}

.modal-body {
  line-height: 1.6;
}

.content {
  max-height: 500px; 
  overflow-y: auto;
  border: 1px solid #ddd;
  margin-top: 20px;
  width: 80%;
  margin-left: 10%;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}


  </style>