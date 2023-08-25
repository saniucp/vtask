<template>
  <div>
    <div class="chat-icon" @click="toggleChatbox">
      <i class="fa fa-envelope"><img src="../assets/images/icons/live-chat.png" style="width: 33px; height: 35px;" alt=""></i>
    </div>
    <div :class="['chatbot', { open: isChatboxOpen }]">
      
      <h3 style="text-align: center; color: aliceblue;">GPT Bot</h3>
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div class="user-message" v-if="message.from === 'user'">{{ message.text }}</div>
          <div class="bot-message" v-else>{{ message.text }}</div>
        </div>
      </div>
      <div class="input-container">
        <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
data() {
  return {
    inputMessage: '',
    messages: [],
    isChatboxOpen: false,
    socket: null,
    isConnected: false,
  };
},
mounted() {
  this.initializeSocket();

  setTimeout(() => {
    this.toggleChatbox();
    this.sendMessage('Hi');
  }, 1000); 
},
methods: {
  initializeSocket() {
    this.socket = io('http://192.168.11.213:3000');

    // Listen for connection 
    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Connected to the server');
    });

    // Listen for disconnection events
    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Disconnected from the server');
    });

    // Listen for incoming messages from the server
    this.socket.on('chat message', (data) => {
      this.messages.push({ text: data, from: 'bot' });
      console.log(data);
    });
    
  },
  async sendMessage() {
    if (!this.isConnected) {
      console.log('Not connected to the server');
      return;
    }

    if (this.inputMessage.trim() === '') {
      return;
    }

    // Send user message to the server
    this.messages.push({ text: this.inputMessage, from: 'user' });
    this.socket.emit('chat message',this.inputMessage);

    this.inputMessage = '';
  },
  toggleChatbox() {
    this.isChatboxOpen = !this.isChatboxOpen;
  },
},
};
</script>

<style scoped>
.chat-icon {
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.chatbot {
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  display: none;
  position: fixed;
  bottom: 70px;
  right: 30px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  
}

.chatbot.open {
  display: block;
  background-image: linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);  }

.messages {
  height: 200px;
  max-height: 250px;
  overflow-y: scroll;

}

.message {
  margin: 10px;
}

.user-message {
  background-color: #f0f0f0;
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
  width: 50%;
  float: right;
}

.bot-message {
  background-color: #b2e9c4;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  width: 50%;
  float: left;
}

.input-container {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.input-container input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-container button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}
</style>
