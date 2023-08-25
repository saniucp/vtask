<template>
  <div>
    <div class="top-nav">
      <!-- Logged In User Icon -->
      <div class="user-icon">
        <span>{{ getInitials }}</span>
      </div>

      <!-- Logout Button -->
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>
    <nav class="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
     <ul class="nav sidebar-nav">
       <div class="sidebar-header">
       <div class="sidebar-brand">
        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="60">
 <b style="color: aliceblue; padding-top: 150px;">DASHBOARD</b></div></div>
       <li>      <router-link to="/Dashboard/home">
        <i><img style="width: 25px; height: 25px; margin-left: 10px;"  src="../assets/images/icons/home_5973800.png" alt=""></i><b style="font-size: 18px; margin-left: 5px;">Home</b> 
      </router-link></li>
       <li>      <router-link to="/Dashboard/uprofile">
        <i><img style="width: 25px; height: 25px; margin-left: 10px;"  src="../assets/images/icons/profile-user_5973881.png" alt=""></i> <b style="font-size: 18px;">User Profile</b>
      </router-link></li>
       <li>      <router-link to="/Dashboard/Profile">
        <i><img style="width: 25px; height: 25px; margin-left: 10px;" src="../assets/images/icons/gear_5973823.png" alt=""></i>&nbsp;<b style="font-size: 18px;">Profile Settings</b>
      </router-link></li>
      <li>      <router-link to="/Dashboard/registeredUsers">
        <i><img style="width: 25px; height: 25px; margin-left: 10px;" src="../assets/images/icons/group_681392.png" alt=""></i>&nbsp;<b style="font-size: 18px;">Registered Users</b>
      </router-link></li>       <li style="margin-top: 225px;"><a href="#team"><img style="width: 25px; height: 22px; margin-left: 10px;" src="../assets/images/icons/customer-support_6325070.png" alt="">&nbsp;<b style="font-size: 18px;">Services</b></a></li>
      <li><a href="#team"><img style="width: 25px; height: 25px; margin-left: 10px;" src="../assets/images/icons/add_6325515.png" alt="">&nbsp;<b style="font-size: 18px;">Contact</b></a></li>
      </ul>
  </nav>

    <div class="content">
      <router-view></router-view>
      <Chatbot />

    </div>
  </div>
  
</template>


<script>
import Chatbot from './Chatbot.vue';


export default {
  components: {
    Chatbot,
  },
  name: "Dashboard",
  methods: {
    handleLogout() {
      localStorage.removeItem('currentUser');
      
      this.$router.push('/');
    },
  },

  computed: {
    // get the logged-in user's initials
    getInitials() {
      
      const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const firstName = userData.user.user || '';
      console.log(userData);
      return firstName.charAt(0).toUpperCase();
    },
  },

    // Check if the user is logged in

  //   beforeRouteEnter(to, from, next) {
  //   const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //   if (!userData.firstName || !userData.lastName) {
  //     next('/');
  //   } else {
  //     next();
  //   }
  // },
};


</script>


<style scoped>

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #212531;
  padding: 10px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 65px;
}

.user-icon {
  border-radius: 50%;
  background-color: #57b846;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-left: 90%;
}

.logout-btn {
  background-color: red;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 12px;
  border-radius: 10px;
  margin-right: 10px;
}

.logout-btn:hover {
            background-position: right center; /* change the direction of the change here */
            color: #e5e2e2;
            text-decoration: none;
            box-shadow: 0 0 10px #977c7c;
          }



.navbar {
  padding: 0;
}

.sidebar-nav {
    position: absolute;
    top: 0;
    width: 220px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.sidebar-nav li {
    position: relative; 
    line-height: 20px;
    display: inline-block;
    width: 100%;
}

.sidebar-nav li:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 3px;
    background-color: #1c1c1c;
    -webkit-transition: width .2s ease-in;
      -moz-transition:  width .2s ease-in;
       -ms-transition:  width .2s ease-in;
            transition: width .2s ease-in;

}
.sidebar-nav li:first-child a {
    color: #1a1a1a;
    background-color: #1a1a1a;
}
.sidebar-nav li:nth-child(5n+1):before {
    background-color: #ec1b5a;   
}
.sidebar-nav li:nth-child(5n+2):before {
    background-color: #79aefe;   
}
.sidebar-nav li:nth-child(5n+3):before {
    background-color: #314190;   
}
.sidebar-nav li:nth-child(5n+4):before {
    background-color: #279636;   
}
.sidebar-nav li:nth-child(5n+5):before {
    background-color: #7d5d81;   
}

.sidebar-nav li:hover:before,
.sidebar-nav li.open:hover:before {
    width: 100%;
    -webkit-transition: width .2s ease-in;
      -moz-transition:  width .2s ease-in;
       -ms-transition:  width .2s ease-in;
            transition: width .2s ease-in;

}

.sidebar-nav li a {
    display: block;
    color: #1a1a1a;
    text-decoration: none;
    padding: 10px 15px 10px 0px;    
    margin-bottom: 25px;
}

.sidebar-nav li a:hover,
.sidebar-nav li a:active,
.sidebar-nav li a:focus,
.sidebar-nav li.open a:hover,
.sidebar-nav li.open a:active,
.sidebar-nav li.open a:focus{
    color: #111312;
    text-decoration: none;
    background-color: transparent;
}
.sidebar-header {
    text-align: center;
    font-size: 20px;
    position: relative;
    width: 100%;
    display: inline-block;
}
.sidebar-brand {
    height: 65px;
    position: relative;
    background:#212531;
    background: linear-gradient(to right bottom, #2f3441 50%, #212531 50%);
   padding-top: 1em;
}
.sidebar-brand a {
    color: #ddd;
}
.sidebar-brand a:hover {
    color: #fff;
    text-decoration: none;
}
.dropdown-header {
    text-align: center;
    font-size: 1em;
    color: #ddd;
    background:#212531;
    background: linear-gradient(to right bottom, #2f3441 50%, #212531 50%);
}
.dropdown-menu.show {
    top: 0;
}
/*Fontawesome icons*/
.nav.sidebar-nav li a::before {
    font-family: fontawesome;
    vertical-align: baseline;
    display: inline-block;
    padding-right: 5px;
}

.overlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(250,250,250,.8);
    z-index: 1;
}

router-link.active {
  background-color: #57b846;
  color: rgb(199, 29, 29);
}

.sidebar a:hover:not(.active) {
  background-color: #1C4E80;

  color: rgb(118, 42, 42);
}


div.content {
  margin-left: 220px;
  padding: 1px 16px;
  height: 680px;
  background: rgb(238, 174, 202);
  background: radial-gradient(circle, rgba(238, 174, 202, 0.4543067226890757) 0%, rgba(148, 183, 233, 0.303046218487395) 100%);
}


@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }

  .sidebar a {
    float: left;
  }

  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>