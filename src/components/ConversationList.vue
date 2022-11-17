<template>
  <aside>
    <header>
      <input type="text" placeholder="search" />
    </header>
    <ul v-if="conversations.length > 0">
        <li v-for="conversation in conversations"  :key="conversation.sender_id" @click="changeConversationUser(conversation.sender_id, conversation.message_count)">
        <img
          src="../assets/avatar.png"
          alt=""
        />
        <div>
          <h2>User {{conversation.sender_id}}</h2>
          <h3>
            {{`${conversation.message_count} ${conversation.message_count > 1 ? "Messages": "Message"}`}}
            
          </h3>
        </div>
      </li>
    </ul>
    <div v-else class="loading--conversations">
        <img
          src="../assets/spinner.svg"
          alt=""
        />
        <p>loading conversations</p>

    </div>
  </aside>
</template>

<script>
import axios from "axios";
import store from '../store'

export default {
  data() {
    return {
        conversations: [],
        loading: false
    }
  },
  mounted() {
    this.getConversations();
  },
  methods: {
    changeConversationUser(userId, count){
        store.commit('setSelectedConversationUser', userId)
        store.commit('setSelectedUserMessages', count)

    },
    async getConversations() {
      let that = this;
      this.loading = true;
      await axios
        .get("http://127.0.0.1:8000/messages/conversations", {
        })
        .then(function (response) {
          let results = response.data;
          if(results.status){
            console.log("_conversations", results.conversations);
            that.conversations = results.conversations;
          }
            that.loading = false;
        })
        .catch(function (error) {
          console.log("error", error);
          that.loading = false;
        });
    },
  },

}
</script>
<style scoped>
.loading--conversations {
    color: #fff;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 50px;
    
}
.loading--conversations img {
    width: 80%;
    height: auto;
}
</style>
