<template>
  <div id="app">
    <div id="messageContainer">
      <Message
        v-bind:key="message.index"
        v-for="message in messageData"
        :msg="message.message"
        :nick="message.nickname"
      ></Message>
    </div>
    <input type="text" v-model="nickname" placeholder="Who are you?">
    <input type="text" v-model="secretKey" placeholder="What's the password?">
    <input
      v-on:keyup.enter="sendMessage"
      type="text"
      v-model="newMessage"
      placeholder="Type something..."
    >
  </div>
</template>

<script>
const messageData = [];

let connection;

import Message from "./components/Message";
import Cryptr from "cryptr";

function sendMessage() {
  if (this.secretKey === "") {
    return;
  }
  const cryptr = new Cryptr(this.secretKey || "default");
  const encryptedMessage = cryptr.encrypt(this.newMessage);
  console.log(encryptedMessage);
  connection.send(
    JSON.stringify({
      nickname: this.nickname,
      encrypted: true,
      message: encryptedMessage
    })
  );
  this.newMessage = "";
}

function setupApp() {
  const url = "ws://localhost:54877";
  connection = new WebSocket(url);

  connection.onopen = () => {};

  connection.onerror = error => {
    console.error(`WebSocket error: ${error}`);
  };

  connection.onmessage = e => {
    const cryptr = new Cryptr(this.secretKey || "default");
    const data = JSON.parse(e.data);
    let decryptedMessage;
    if (data.encrypted) {
      decryptedMessage = cryptr.decrypt(data.message);
    }
    messageData.push({
      message: decryptedMessage || data.message,
      index: messageData.length + 1,
      nickname: data.nickname
    });
    var container = this.$el.querySelector("#messageContainer");
    container.scrollTop = container.scrollHeight + 50;
  };
}

export default {
  name: "app",
  components: {
    Message: Message
  },
  data: function() {
    return {
      messageData,
      newMessage: "hello",
      nickname: "Anonymous Faelin",
      secretKey: ""
    };
  },
  created: setupApp,
  methods: {
    sendMessage
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#messageContainer {
  overflow-y: scroll;
  height: 250px;
}
</style>
