<template>
  <main>
    <div v-if="selectedUserConversation != null">
      <header>
        <img src="../assets/avatar.png" alt="" />
        <div>
          <h2>Chat with User : {{ selectedUserConversation }}</h2>
          <h3>{{ selectedUserMessageCount }} messages</h3>
        </div>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
          alt=""
        />
      </header>
      <ul id="chat" v-if="chats.length > 0">
        <li
          :class="chat.sender_id !== recipientId ? 'me' : 'you'"
          v-for="chat in chats"
          :key="chat.id"
        >
          <div class="entete">
            <span class="status green"></span>
            <h3>{{ chat.created_at }}</h3>
          </div>
          <div class="triangle"></div>
          <div class="message">
            {{ chat.message_text }}
          </div>
        </li>
      </ul>
      <div v-else>loading chats</div>
      <footer>
        <textarea
          placeholder="Type your message"
          v-model="messageText"
        ></textarea>
        <button class="primary" @click="postChat()">Send</button>
      </footer>
    </div>
    <div v-else class="chatbox--default">
      <p>select user to see messages</p>
    </div>
  </main>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
  data() {
    return {
      chats: [],
      recipientId: 1,
      messageText: "",
    };
  },
  methods: {
    async getChats() {
      let that = this;
      this.loading = true;
      let senderId = this.selectedUserConversation;
      console.log("senderId", senderId);

      await axios
        .get(`http://127.0.0.1:8000/messages?senderId=${senderId}`, {})
        .then(function (response) {
          let results = response.data;
          if (results.status) {
            console.log("_chats", results.messages);
            that.chats = results.messages;
          }
          that.loading = false;
        })
        .catch(function (error) {
          console.log("error", error);
          that.loading = false;
        });
    },
    async postChat() {
      let that = this;

      console.log("postChat", this.messageText);
      let payload = {
        message_text: this.messageText,
        sender_id: this.recipientId,
        recipient_id: this.selectedUserConversation,
      };
      await axios
        .post(`http://127.0.0.1:8000/messages/`, payload)
        .then(function (response) {
          let results = response.data;
          if (results.status) {
            this.messageText = "";
            that.getChats();
          }
          that.loading = false;
        })
        .catch(function (error) {
          console.log("error", error);
          that.loading = false;
        });
    },
  },

  watch: {
    selectedUserConversation() {
      this.getChats();
    },
  },
  computed: {
    selectedUserConversation() {
      return store.state.selectedUserConversation;
    },
    selectedUserMessageCount() {
      return store.state.selectedUserMessages;
    },
  },
};
</script>
<style scoped>
main header img {
  height: 40px;
  width: auto;
}
button.primary {
  width: 200px;
  height: 50px;
  border: none;
  outline: none;
  background: #2f2f2f;
  color: #fff;
  font-size: 14px;
  border-radius: 40px;
  text-align: center;
  box-shadow: 0 6px 20px -5px rgb(0 0 0 / 40%);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
</style>

