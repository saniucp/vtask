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
 

    <div style=" background-color: rgb(50, 166, 205); margin-left: 100px; margin-right: 110px; border-radius: 10px;">
      <div style="margin-left: 130px; margin-bottom: 5px;">
    <label style="text-align: center; margin-left: 27%; color: azure; font-size: 20px; margin-top: 15px;"><b>Registered Users Table</b></label><br>
        <label style="color: azure;"><b>Sort Users &nbsp;</b></label>
    <select style="border-radius: 10px;" v-model="sortOrder" @change="sortUsers()">
    <option value="ASC">Ascending</option>
    <option value="DESC">Descending</option>
    <option value="APPROVED">Approved</option>
    <option value="DISAPPROVED">Disapproved</option>
  </select>
        <input v-model="searchQuery" @input="searchUsers" class="search-input" type="text" placeholder="Search users">
        <span class="search-icon">&#128269;</span>
</div>
</div>

<div v-if="showModal" class="modal">
  <div class="modal-dialog">
    <div style="margin-left: 10%;" class="modal-header">
      <h3 class="modal-title">Confirm Approval</h3>
      <span class="close" @click="showModal = false"><strong class="close">X</strong></span>
    </div>
    <div style="margin-left: 20%;" class="modal-body">
      Are you sure you want to {{ userToConfirm.approved ? 'approve' : 'reject' }} the user
      <strong>{{ userToConfirm.firstName }} {{ userToConfirm.lastName }}</strong>?
    </div> <br>
    <div style="margin-left: 29%;" class="modal-footer">
      <button class="button" @click="confirmApproval(userToConfirm)">Confirm</button>
      <button style="margin-left: 20px;" class="button" @click="showModal = false">Cancel</button>
    </div>
  </div>
</div>


    <div class="tablesize">
    <table class="user-table">
      <thead>
        <tr>
          <th>
            First Name
          </th>
          <th>
          Last Name
          </th>
          <th>
            Email
          </th>
          <th>Age</th>
          <th>Gender</th>
          <th>Education</th>
          <th>Address</th>
          <th>Download CV</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.Age }}</td>
          <td>{{ user.Gender }}</td>
          <td>{{ user.Education }}</td>
          <td>{{ user.address }}</td>

          <td>
                       <a class="buttonn" @click="download(user)"> <img  src="../assets/images/icons/icons8-cloud-download-66.png" style="height: 35px; width: 35px; margin-left: 30px;" alt="">
                        </a>
          </td>
          <td>{{ user.approved ? 'Approved' : 'Rejected' }}</td>
          <td>
            <label class="switch">
  <input type="checkbox" v-model="user.approved">
  <span class="slider round" :class="{'approved': user.approved, 'rejected': !user.approved}"
        @click="toggleApproval(user)"></span>
</label>

</td>

        </tr>
      </tbody>
    </table>
  </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" >Next</button>
    </div>
    
  </div>
</div>


</template>

<script>
import axios from 'axios';
import Vue from 'vue';


axios.defaults.baseURL = 'http://192.168.11.213:3000';
Vue.prototype.$http = axios;

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      sortAttribute: 'firstNameAsc',
      loading: true,
      sortOrder: 'ASC', 
      showModal: false, 
    userToConfirm: null


    };
  },
  computed: {
    getApprovalStatus() {
      return (approved) => {
        return approved ? 'Approved' : 'Rejected';
      };
    }
  },

  methods: {

    openConfirmationModal(user) {
    this.userToConfirm = user;
    this.showModal = true;
  },
  async getUsers(pageNumber) {
  try {
    const response = await axios.get(`http://192.168.11.213:3000/registration/get-all-user?page=${pageNumber}`);
    this.users = response.data.getall.map(user => ({
      ...user,
      originalApprovedState: user.approved
    }));
    console.log('Fetched users:' + pageNumber , this.users);
  } catch (error) {
    console.error('Error fetching users', error);
  } finally {
    this.loading = false;
  }
},

    async toggleApproval(user) {
  this.userToConfirm = user;
  this.showModal = true;
},

async confirmApproval(user) {
  this.showModal = false;
  if (user.approved !== user.originalApprovedState) {
    user.originalApprovedState = user.approved; // Store the original state
    if (user.approved) {
      await this.approveUser(user);
    } else {
      await this.rejectUser(user);
    }
  }
},


  

    async updateUserApproval(userId, approved) {
      try {
        const param = {
          id: userId,
          approved: approved ? 1 : 0
        };

        await axios.put('http://192.168.11.213:3000/registration/update-users', param);
      } catch (error) {
        console.error('Error updating user approval', error);
      }
    },
    performAction(user) {
      if (!user.action) {
        return; 
      }
      
      const confirmed = window.confirm('Are you sure you want to perform this action?');
      if (confirmed) {
        if (user.action === 'approve') {
          this.approveUser(user);
        } else if (user.action === 'reject') {
          this.rejectUser(user);
        }
        user.action = '';
      }
    },
    async approveUser(user) {
      try {
        const param = {
          id: user.id,
          approved: 1
        };

        await axios.put('http://192.168.11.213:3000/registration/update-users', param);
        console.log('aproved');
        user.approved = true; 
      } catch (error) {
        console.error('Error approving user', error);
      }
    },

    async rejectUser(user) {
      try {
        const param = {
          id: user.id,
          approved: 0
        };

        await axios.put('http://192.168.11.213:3000/registration/update-users', param);
        console.log('rejected');
        user.approved = false; 
      } catch (error) {
        console.error('Error rejecting user', error);
      }
    },


  

async download(user) {
  try {
   await axios
        .get(`http://192.168.11.213:3000/registration/download-cv?id=${user.id}`, {
          responseType: 'blob'
        })
        .then((response) => {
          console.log("CV download respone: ", response);
          const blob = new Blob([response.data], { type: response.headers['content- type'] });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const fileExtension = response.data.type.substring(response.data.type.lastIndexOf('/') + 1);
          let extension = '';

          if (fileExtension === 'pdf') {
            extension = fileExtension;
          } else if (fileExtension === 'jpg') {
            extension = fileExtension;
          } else if (fileExtension === 'png') {
            extension = fileExtension;
          } else if (fileExtension === 'jpeg') {
            extension = fileExtension;
          }

          link.download = `${user.firstName} ${user.lastName}` + '_cv' + '.' + extension;
          alert("Downloading CV");
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
  } catch (error) {
    console.error(error);
  }
},


    
    

        async nextPage() {
      console.log('Next button clicked');
      this.currentPage++;
      console.log('Current Page:', this.currentPage);
      await this.getUsers(this.currentPage);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getUsers(this.currentPage);
      }
    },

    async sortUsers() {
      try {
        console.log(this.sortOrder);
        if (this.sortOrder === 'APPROVED') {
          const response = await axios.get('http://192.168.11.213:3000/registration/get-all-user?isapprove=1');
          console.log("api hit");
          this.users = response.data.getall;
        } else if (this.sortOrder === 'DISAPPROVED') {
          const response = await axios.get('http://192.168.11.213:3000/registration/get-all-user?isapprove=0');
          this.users = response.data.getall;
        } else {
          const response = await axios.get(`http://192.168.11.213:3000/registration/get-all-user?order=${this.sortOrder}`);
          this.users = response.data.getall;
        }
      } catch (error) {
        console.error('Error sorting users', error);
      }
    },
    async descendingSort() {
            await axios.get('http://192.168.11.213:3000/registration/get-all-user?order=DESC').then((response) => {
                 console.log(response);
                this.users = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },

    async ascendingSort() {
      try {
        const response = await axios.get('http://192.168.11.213:3000/registration/get-all-user?order=ASC');
        this.users = response.data;
      } catch (error) {
        console.error('Error sorting users', error);
      }
    },

    async searchUsers() {
  if (this.searchQuery.trim() === '') {
    await this.getUsers(this.currentPage); 
    return;
  }

  try {
    const response = await axios.get(`http://192.168.11.213:3000/registration/get-all-user?name=${this.searchQuery}`);
    this.users = response.data.getall;
  } catch (error) {
    console.error('Error fetching users', error);
  }
},
  },


  mounted() {
    setTimeout(() => {
      this.getUsers(this.currentPage);
    }, 1750);
  },
};
</script>




<style scoped>

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

.search-input {
  margin-bottom: 15px;
  margin-top: 15px;

  padding: 5px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 3%;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #57b846;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.sortDropdown{
  margin-bottom: 15px;
  margin-left: 10%;
}

.user-table {
    background: linear-gradient(to right, #2980b9, #2c3e50);
    padding: 0;
    border-radius: 10px;
    border: none;
    height: 350px;
  overflow-y: auto;
  min-width: 550px;

  }
  .tHeading{
  background: #212531;
    width: 60%;
    height: 70px;
    justify-content: center;
    margin-top: 3%;
    border-radius: 10px;
    margin-left: 19%;
    color: white;
}
  
  .user-table thead th {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 12px;
    border: none;
  }
  
  .user-table tbody td {
    color: #fff;
    font-size: 15px;
    padding: 10px 12px;
    border: none;
    
  }
  
  .user-table tbody tr:nth-child(even) {
    background-color: #1C4E80;
  }
  .buttonn{
    cursor: pointer;
  }
  .user-table tbody tr:hover {
    background-color: #374f66;

  }

.approved {
  background-color: #4CAF50;
}

.rejected {
  background-color: #F44336;
}
 
  .user-table tbody tr:hover {
    color: #ffffff;
  }

  /* Styling for the Bootstrap modal */
         

  .disaprove {
    background-image: linear-gradient(to right, #e52d27 0%, #b31217  51%, #e52d27  100%);
            padding: 5px 10px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            border-radius: 10px;
            display: block;
            width: 120px;
}

.aprove {
    background-image: linear-gradient(to right, #27e55a 0%, #2db312  51%, #27e560  100%);
            padding: 5px 10px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            border-radius: 10px;
            display: block;
            width: 120px;

}

.search-input {
  padding-right: 30px; 
}

.search-icon {
  position: absolute;
  right: 342px;
  top: 17%;
  cursor: pointer;
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

.close{
  background: #9f2828;

color: white;
border: none;
padding: 10px;
cursor: pointer;
border-radius: 5px;
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
  width: 550px;
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
select{
  background-color: #1C4E80;
  color: whitesmoke;
  padding: 5px;
}

.modal-header .close {
  cursor: pointer;
}

.modal-body {
  line-height: 1.6;
}



.user-table {
  width: 70%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  height: 10%;
  overflow-y: auto;
  
margin-left: 10%;}

 .tablesize{
  max-height: 550px;
  overflow-y: auto;
  margin: 0 auto; 
  min-width: 550px;

}
.switch {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 8px;
  bottom: 5px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #4CAF50; /* Green when checked */
}

input:focus + .slider {
  box-shadow: 0 0 1px #4CAF50; /* Add green glow when focused */
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Custom styles for the toggle message */
.toggle-message {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 16px;
  color: #999;
  transition: color 0.4s;
}



</style>
