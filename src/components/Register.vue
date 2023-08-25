<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">

        <form class="login100-form">
          <span class="login100-form-title" >
           <b> Register Yourself Here</b>
          </span>

          <div class="wrap-input-group">
            <div class="wrap-input100">
              <label style="margin-left: 10px;">First Name:</label>
              <input class="input100" type="text" name="firstName" v-model="firstName" placeholder="First Name">
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100">
              <label style="margin-left: 10px;">Last Name:</label>
              <input class="input100" type="text" name="lastname"  v-model="lastName" placeholder="Last Name">
              <span class="focus-input100"></span>
            </div>
          </div>

          <div class="wrap-input-group">
            <div class="wrap-input100">
              <label style="margin-left: 10px;">Email:</label>
              <input class="input100" type="email" name="email"  v-model="email" placeholder="Email">
              <span class="focus-input100"></span>
            </div>
              <div class="wrap-input100">
                <label style="margin-left: 10px;">CNIC:</label>
              <input class="input100" type="cnic" name="cinc"  v-model="cnic" placeholder="CNIC">
              <span class="focus-input100"></span>
            </div>
          </div>
          <div class="wrap-input-group">

            <div class="wrap-input100">
              <label style="margin-left: 10px;">Age:</label>
              <input class="input100" type="age" name="age"  v-model="age" placeholder="age">
              <span class="focus-input100"></span>
            </div>
              <div class="wrap-input100">
                <label style="margin-left: 10px;">Phone:</label>
              <input class="input100" type="phoneNo" name="phoneNo"  v-model="phoneNo" placeholder="phoneNo">
              <span class="focus-input100"></span>
            </div>
          </div>

          <div class="wrap-input100">
            <label for="gender">Gender:</label>
            <select class="input100" v-model="gender" id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">*other</option>
            </select>
          </div>

          <div class="wrap-input100">
            <label for="education">Education:</label>
            <select class="input100" v-model="education" id="education">
              <option value="Matriculation">Matriculation</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Master">Master</option>
            </select>
          </div>
          <div class="wrap-input-group">
            <div class="wrap-input100">
              <label style="margin-left: 10px;">DOB</label>
              <input class="input100" type="text" name="DOB" v-model="DOB" placeholder="DOB">
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100">
              <label style="margin-left: 10px;">Address</label>
              <input class="input100" type="text" name="address"  v-model="address" placeholder="Address">
              <span class="focus-input100"></span>
            </div>
          </div>
  
            <div class="wrap-input100">
              <textarea class="input100" v-model="coverLetter" placeholder="Cover Letter"  style="height: 110px;"></textarea>
              <span class="focus-input100"></span>
            </div>
  
            <div class="wrap-input100" style="margin-left: 10px;">
                <label>Upload your Resume</label>
              <input  type="file" accept="image/jpeg,image/png,application/pdf" @change="handleCvFileChange">
              <div v-if="cvFile && !isValidFileFormat" class="txt2">
                Invalid file format. Please upload a JPEG, PNG, or PDF file.
              </div>
              <span class="focus-input100"></span>
            </div>
  
            <div class="container-login100-form-btn">
              <button class="login100-form-btn" :disabled="!isFormValid" @click="submitForm">
                Submit
              </button>
            </div>
          </form>
          <div class="login100-pic">
            <img style="margin-top: 100px; width: 400px; height: 430px;" src="../assets/images/reg.jpg" alt="IMG">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        age:'',
        cnic: '',
        gender: 'Male',
        education: 'Matriculation',
        DOB: '',
        address: '',
        coverLetter: '',
        phoneNo:'',
        cvFile: null,
      }; 
    },
    computed: {
      isValidFileFormat() {
        if (!this.cvFile) return true;
  
        const allowedFormats = ['image/jpeg', 'image/png', 'application/pdf'];
        return allowedFormats.includes(this.cvFile.type);
      },
      isFormValid() {
        return (
          this.isValidFileFormat &&
          this.firstName &&
          this.lastName &&
          this.email &&
          this.age &&
          this.phoneNo &&
          this.cnic &&
          this.gender &&
          this.education &&
          this.DOB &&
          this.address
        );
      },
    },
    methods: {
      handleCvFileChange(event) {
        this.cvFile = event.target.files[0];
      },
      async submitForm() {
        if (!this.isFormValid) return;
        const formData = new FormData();
        formData.append('firstName', this.firstName);
        formData.append('lastName', this.lastName);
        formData.append('email', this.email);
        formData.append('age', this.age);
        formData.append('phoneNo', this.phoneNo);
        formData.append('cinc', this.cnic);
        formData.append('gender', this.gender);
        formData.append('education', this.education);
        formData.append('DOB', this.DOB);
        formData.append('address', this.address);
        console.log('testing');
        if (this.cvFile) {
          formData.append('cv', this.cvFile);
        }
  
        try {
          debugger
          console.log(formData);
          const response = await axios.post('http://192.168.11.213:3000/registration/register-user', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log('Registration successful', response.data);
          debugger
          console.log('Registration successful', response.data);
          debugger

        } catch (error) {
          console.error('Error during registration', error);
        }
      },
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
    width: 90%;
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
    padding: 10px 130px 10px 95px;
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
    width: 590px;
  }
  
  .login100-form-title {
    font-family: Poppins-Bold;
    font-size: 24px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
  
    width: 100%;
    display: block;
    padding-bottom: 54px;
  }
  
  
  /*----------------------------------------------------*/
  .wrap-input100 {
    position: relative;
    width: 100%;
    z-index: 1;
    margin-bottom: 5px;
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
  
  
  /*--------------------[Focus]----------------------*/
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
  
  
  
  /*------------------------------------------------------------------
  [ Responsive ]*/
  
  
  
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
  
  
  /*------------------------------------------------------------------
  [ Alert validate ]*/
  
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

.wrap-input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.wrap-input-group .wrap-input100 {
  width: calc(50% - 10px);
}
  </style>
  

  