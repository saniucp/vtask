<template>
    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7">
          <div class="card p-3 py-4">
            <div class="text-center">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
            </div>
  
            <div class="text-center mt-3">
              <h2 class="User_name">{{ getCurrentUserName() }}</h2>
              <span class="User_email">{{ getCurrentUserEmail() }}</span>
  
              <div class="bio">
                <p class="fonts">

                    I am a full-stack software engineer and writer. I love programming, reading, writing and speaking.<br> As a software engineer, I enjoy using my obsessive attention to detail, my unequivocal love for<br> making things that change the world. That's why I like to make things that make a difference.                </p>
              </div>
  
              <ul class="social-list">
                <li><i class="fa fa-facebook"></i></li>
                <li><i class="fa fa-dribbble"></i></li>
                <li><i class="fa fa-instagram"></i></li>
                <li><i class="fa fa-linkedin"></i></li>
                <li><i class="fa fa-google"></i></li>
              </ul>
  
              <div class="buttons">
                <button @click="navigateToProfile" class="buttonss">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script scoped>
export default {
  data() {
    return {
      // ... existing data properties ...
      editingBio: false,
      formData: {
        // ... existing form data properties ...
        bio: '',
      },
    };
  },
    methods: {
      navigateToProfile() {
        this.$router.push('Profile');
      },
      getCurrentUserName() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return currentUser.user.user
      },
      getCurrentUserEmail() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return currentUser.user.email;
      },
      handleUpdateBio() {

    },
  },
};

  </script>
  
    <style>
  

.container{
    font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 !important;

}

.card{
    border:none;
    background:#eee;
    margin-top: 7%;
    position:relative;
    overflow:hidden;
    border-radius:8px;
    cursor:pointer;
}

.card:before{
    
    content:"";
    position:absolute;
    left:0;
    top:0;
    width:4px;
    height:100%;
    background-color:#E1BEE7;
    transform:scaleY(1);
    transition:all 0.5s;
    transform-origin: bottom
}

.card:after{
    
    content:"";
    position:absolute;
    left:0;
    top:0;
    width:4px;
    height:100%;
    background-color:#8E24AA;
    transform:scaleY(0);
    transition:all 0.5s;
    transform-origin: bottom
}

.card:hover::after{
    transform:scaleY(1);
}


.fonts{
    font-size:14px;
}

.social-list{
    display:flex;
    list-style:none;
    justify-content:center;
    padding:0;
}

.social-list li{
    padding:10px;
    color:#8E24AA;
    font-size:19px;
}


.buttonss {
         
    background-image: linear-gradient(to right, #9D50BB 0%, #6E48AA  51%, #9D50BB  100%);
            margin: 10px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
            margin-left: 42%;
          }

         
.buttonss:hover {
background-position: right center; /* change the direction of the change here */
color: #fff;
text-decoration: none;
}


    </style>