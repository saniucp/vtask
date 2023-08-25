<template>
  <div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" v-model="firstName" />

    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" v-model="lastName" />

    <label>Education:</label>
    <label>
      <input type="radio" v-model="education" value="Matriculation" /> Matriculation
    </label>
    <label>
      <input type="radio" v-model="education" value="Bachelors" /> Bachelors
    </label>
    <label>
      <input type="radio" v-model="education" value="Master" /> Master
    </label>

    <label for="coverLetter">Cover Letter:</label>
    <textarea id="coverLetter" v-model="coverLetter"></textarea>

    <label for="cvFile">Upload CV (JPEG/PNG/PDF):</label>
    <input type="file" id="cvFile" accept="image/jpeg,image/png,application/pdf" @change="handleCvFileChange" />
    <div v-if="cvFile && !isValidFileFormat">
      Invalid file format. Please upload a JPEG, PNG, or PDF file.
    </div>

    <button type="submit" :disabled="!isFormValid" @click="submitForm">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    firstName: '',
    lastName: '',
    education: '',
    coverLetter: '',
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
    return this.isValidFileFormat && this.firstName && this.lastName && this.education;
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
    formData.append('education', this.education);
    formData.append('coverLetter', this.coverLetter);
    if (this.cvFile) {
      formData.append('cvFile', this.cvFile);
    }

    try {
      const response = await axios.post('http://your-backend-url.com/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Error during registration', error);
    }
  },
},
};
</script>


<style scoped>
.registration-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
textarea,
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
