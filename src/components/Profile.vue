<template>
  <div class="profile-settings">
    <br>
    <h1>Profile Settings</h1>
    <div class="card-container">
      <div class="update-profile-card">
        <form @submit.prevent="handleUpdateDetails" class="login100-form validate-form">
      <span class="login100-form-title"><img  style="height: 20px;width: 30px;" src="../assets/images/icons/user-solid.svg" alt="">Update Profile Name</span>

      <div style="margin-left: 25%;" class="wrap-input100 validate-input" data-validate="First Name is required">
        <input class="input100" v-model="formData.firstName" type="text" name="firstName" placeholder="First Name">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fa fa-user" aria-hidden="true"></i>
        </span>
      </div>

      <div style="margin-left: 25%;" class="wrap-input100 validate-input" data-validate="Last Name is required">
        <input class="input100" v-model="formData.lastName" type="text" name="lastName" placeholder="Last Name">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fa fa-user" aria-hidden="true"></i>
        </span>
      </div>


      <div style="margin-top: 25%; margin-left: 25%;" class="container-login100-form-btn">
        <button class="login100-form-btn">Update Name</button>
      </div>
    </form>
      </div>
      <div class="change-password-card">
        <form @submit.prevent="handleChangePassword" class="login100-form validate-form">
      <span class="login100-form-title"><img  style="height: 20px;width: 20px;" src="../assets/images/icons/door-key.png" alt="">Change Password</span>

      <div  style="margin-left: 25%;" class="wrap-input100 validate-input" data-validate="Old Password is required">
        <input class="input100" v-model="formData.oldPassword" type="password" name="oldPassword" placeholder="Old Password">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </span>
      </div>

      <div  style="margin-left: 25%;" class="wrap-input100 validate-input" data-validate="New Password is required">
        <input class="input100" v-model="formData.newPassword" type="password" name="newPassword" placeholder="New Password">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </span>
      </div>

      <div style="margin-left: 25%;" class="wrap-input100 validate-input" data-validate="Confirm Password is required">
        <input class="input100" v-model="formData.confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password">
        <span class="focus-input100"></span>
        <span class="symbol-input100">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </span>
      </div>

      <div style="margin-left: 25%;" class="container-login100-form-btn">
        <button class="login100-form-btn">Change Password</button>
      </div>
    </form>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  mounted() {
    // Retrieve user data from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.formData.firstName = currentUser.firstName || '';
    this.formData.lastName = currentUser.lastName || '';
  },
  methods: {
    handleUpdateDetails() {
      const { firstName, lastName } = this.formData;

      if (firstName.trim() === '' || lastName.trim() === '') {
        alert('Please fill in all fields.');
        return;
      }

      // Retrieve and update the currentUser from local storage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.firstName = firstName;
      currentUser.lastName = lastName;

      // Update the user's data in the 'users' array in local storage
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(user => user.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Profile updated successfully!');
        window.location.reload();
      } else {
        alert('User not found.');
      }
      
    },

    handleChangePassword() {
  const { oldPassword, newPassword, confirmPassword } = this.formData;

  if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }

  // Retrieve the currentUser from local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  // Check if the old password matches the stored password
  if (currentUser.password !== oldPassword) {
    alert('Old Password is incorrect.');
    return;
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    alert('New Password and Confirm Password do not match.');
    return;
  }

  // Update password in currentUser object and 'users' array
  currentUser.password = newPassword;

  // Update password in 'users' array
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex(user => user.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword; // Update password in 'users' array
    localStorage.setItem('users', JSON.stringify(users)); // Update 'users' array in local storage
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Update currentUser in local storage
    alert('Password changed successfully!');
  } else {
    alert('User not found.');
  }
}


  },
};
</script>


<style scoped>



* {
  margin: 0px; 
  padding: 0px; 
  box-sizing: border-box;
}


a {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
-o-transition: all 0.4s;
-moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
color: #57b846;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
  margin: 0px;
}

p {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul, li {
  margin: 0px;
  list-style-type: none;
}


/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

textarea {
outline: none;
border: none;
}

textarea:focus, input:focus {
border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder { color: #999999; }
input:-moz-placeholder { color: #999999; }
input::-moz-placeholder { color: #999999; }
input:-ms-input-placeholder { color: #999999; }

textarea::-webkit-input-placeholder { color: #999999; }
textarea:-moz-placeholder { color: #999999; }
textarea::-moz-placeholder { color: #999999; }
textarea:-ms-input-placeholder { color: #999999; }

/*---------------------------------------------*/
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}



.txt1 {
font-family: Poppins-Regular;
font-size: 13px;
line-height: 1.5;
color: #999999;
}

.txt2 {
font-family: Poppins-Regular;
font-size: 13px;
line-height: 1.5;
color: #666666;
}


/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
width: 100%;
margin: 0 auto;
}

.container-login100 {
width: 100%;  
min-height: 100vh;
display: -webkit-box;
display: -webkit-flex;
display: -moz-box;
display: -ms-flexbox;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
padding: 15px;
background: #9053c7;
background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
background: linear-gradient(-135deg, #c850c0, #4158d0);
}

.wrap-login100 {
width: 960px;
background: #fff;
border-radius: 10px;
overflow: hidden;

display: -webkit-box;
display: -webkit-flex;
display: -moz-box;
display: -ms-flexbox;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
padding: 177px 130px 33px 95px;
}

/*------------------------------------------------------------------
[  ]*/
.login100-pic {
width: 316px;
}

.login100-pic img {
max-width: 100%;
}


/*------------------------------------------------------------------
[  ]*/
.login100-form {
width: 290px;
}

.login100-form-title {
font-family: Poppins-Bold;
font-size: 24px;
color: #333333;
line-height: 1.2;
text-align: center;
margin-left: 60px;
width: 100%;
display: block;
padding-bottom: 54px;
}


/*---------------------------------------------*/
.wrap-input100 {
position: relative;
width: 100%;
z-index: 1;
margin-bottom: 10px;
align-items: center;
}

.input100 {
font-family: Poppins-Medium;
font-size: 15px;
line-height: 1.5;
color: #666666;

display: block;
width: 100%;
background: #e6e6e6;
height: 50px;
border-radius: 25px;
padding: 0 30px 0 68px;
}


/*------------------------------------------------------------------
[ Focus ]*/
.focus-input100 {
display: block;
position: absolute;
border-radius: 25px;
bottom: 0;
left: 0;
z-index: -1;
width: 100%;
height: 100%;
box-shadow: 0px 0px 0px 0px;
color: rgba(87,184,70, 0.8);
}

.input100:focus + .focus-input100 {
-webkit-animation: anim-shadow 0.5s ease-in-out forwards;
animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
to {
  box-shadow: 0px 0px 70px 25px;
  opacity: 0;
}
}

@keyframes anim-shadow {
to {
  box-shadow: 0px 0px 70px 25px;
  opacity: 0;
}
}

.symbol-input100 {
font-size: 15px;

display: -webkit-box;
display: -webkit-flex;
display: -moz-box;
display: -ms-flexbox;
display: flex;
align-items: center;
position: absolute;
border-radius: 25px;
bottom: 0;
left: 0;
width: 100%;
height: 100%;
padding-left: 35px;
pointer-events: none;
color: #666666;

-webkit-transition: all 0.4s;
-o-transition: all 0.4s;
-moz-transition: all 0.4s;
transition: all 0.4s;
}

.input100:focus + .focus-input100 + .symbol-input100 {
color: #57b846;
padding-left: 28px;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
width: 100%;
display: -webkit-box;
display: -webkit-flex;
display: -moz-box;
display: -ms-flexbox;
display: flex;
flex-wrap: wrap;
justify-content: center;
padding-top: 20px;
}

.login100-form-btn {
font-family: Montserrat-Bold;
font-size: 15px;
line-height: 1.5;
color: #fff;
text-transform: uppercase;

width: 100%;
height: 50px;
border-radius: 25px;
background: #57b846;
display: -webkit-box;
display: -webkit-flex;
display: -moz-box;
display: -ms-flexbox;
display: flex;
justify-content: center;
align-items: center;
padding: 0 25px;

-webkit-transition: all 0.4s;
-o-transition: all 0.4s;
-moz-transition: all 0.4s;
transition: all 0.4s;
}

.login100-form-btn:hover {
background: #333333;
}





@media (max-width: 992px) {
.wrap-login100 {
  padding: 177px 90px 33px 85px;
}

.login100-pic {
  width: 35%;
}

.login100-form {
  width: 50%;
}
}

@media (max-width: 768px) {
.wrap-login100 {
  padding: 100px 80px 33px 80px;
}

.login100-pic {
  display: none;
}

.login100-form {
  width: 100%;
}
}

@media (max-width: 576px) {
.wrap-login100 {
  padding: 100px 15px 33px 15px;
}
}



.validate-input {
position: relative;
}

.alert-validate::before {
content: attr(data-validate);
position: absolute;
max-width: 70%;
background-color: white;
border: 1px solid #c80000;
border-radius: 13px;
padding: 4px 25px 4px 10px;
top: 50%;
-webkit-transform: translateY(-50%);
-moz-transform: translateY(-50%);
-ms-transform: translateY(-50%);
-o-transform: translateY(-50%);
transform: translateY(-50%);
right: 8px;
pointer-events: none;

font-family: Poppins-Medium;
color: #c80000;
font-size: 13px;
line-height: 1.4;
text-align: left;

visibility: hidden;
opacity: 0;

-webkit-transition: opacity 0.4s;
-o-transition: opacity 0.4s;
-moz-transition: opacity 0.4s;
transition: opacity 0.4s;
}

.alert-validate::after {
content: "\f06a";
font-family: FontAwesome;
display: block;
position: absolute;
color: #c80000;
font-size: 15px;
top: 50%;
-webkit-transform: translateY(-50%);
-moz-transform: translateY(-50%);
-ms-transform: translateY(-50%);
-o-transform: translateY(-50%);
transform: translateY(-50%);
right: 13px;
}

.alert-validate:hover:before {
visibility: visible;
opacity: 1;
}

@media (max-width: 992px) {
.alert-validate::before {
  visibility: visible;
  opacity: 1;
}
}

.card-container {
  display: flex;
  justify-content: space-between;
margin-top: 5%;
margin-left: 5%;
width: 90%;}

.update-profile-card,
.change-password-card {
  flex: 1;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.update-profile-card {
  margin-right: 20px;
}

@media (min-width: 992px) {
  .card-container {
    display: flex;
    justify-content: space-between;
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
  }

  .update-profile-card,
  .change-password-card {
    flex: 1;
    padding: 30px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .card-container {
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
  }

  .update-profile-card,
  .change-password-card {
    width: 100%;
    margin-bottom: 20px;
  }

  .wrap-input100 {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .card-container {
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
  }

  .update-profile-card,
  .change-password-card {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
  }

  .wrap-input100 {
    width: 100%;
  }
}

@media (max-width: 1377px) {
  .card-container {
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
  }

  .update-profile-card,
  .change-password-card {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
  }

  .wrap-input100 {
    width: 100%;
  }
}
</style>
