<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter, useRoute } from "vue-router";
import popupComponent from '../components/popupComponent.vue';

const router = useRouter();
const route = useRoute();

const showPopup = ref(false);
const msgPopup = ref('Próximamente');


console.log(route.params);

const promotion = ref(null);
async function getPromotion(){
  const response = await axios.get(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/${route.params.id}/`)
  promotion.value = response.data
  console.log("data", response);
}
getPromotion()

const comments = ref([]);
async function getComments(){
  const response = await axios.get(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/${route.params.id}/comments/`)
  comments.value = response.data
  console.log("data comments", response);
}
getComments()

const likes = ref(0);
async function getLikes(){
  const response = await axios.get(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/${route.params.id}/likes/`)
  likes.value = response.data.length
  console.log("data likes", response);
}
getLikes()

const like = ref(false);
function addlike(){
  like.value = !like.value;
  like.value ? likes.value++ : likes.value--
  //like.value ? showAlert() : '';
}

function reserve(){
  showAlert();
}

const showAlert = () =>{
  if(showPopup.value){
    showPopup.value = false; 
  }
  setTimeout(()=>{
    showPopup.value = true;
  },100)
}

</script>
<template>
  <div>
      <v-card
        class="mx-auto mb-5"
        max-width="450"
      >
        <v-card-title class="ml-0">
            <v-icon
              start
              icon="mdi-arrow-left"
              @click="router.push({ name: 'Promotions'})"
              color="red"
            ></v-icon>
          {{ promotion?.title }}
        </v-card-title>
        <v-img
          class="align-end text-white"
          height="200"
          :src="promotion?.image"
          cover
        >
        </v-img>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar
              color="grey-darken-3"
              :image="promotion?.user?.avatar"
            ></v-avatar>
          </template>
          <v-list-item-title>{{ promotion?.user?.firstName }} {{ promotion?.user?.lastName }}</v-list-item-title>
        </v-list-item>

        <v-card-text>
          <div>{{ promotion?.description }}</div>
        </v-card-text>
      </v-card>

      <v-card
        class="mx-auto my-5 py-5"
        max-width="450"
      >
          <v-btn
            rounded="pill"
            class="mr-4 btn"
            @click="reserve()"
          >
            Reservar
          </v-btn>
          
          <v-btn
            rounded="pill"
            class="mr-4"
            :class="{ 'liked': like }"
            append-icon="mdi-heart"
            @click="addlike()"
          >
            {{ likes }}
          </v-btn>
      </v-card>

      <v-card
      class="mx-auto"
      max-width="450"
      >
      <p>Comentarios</p>
        <v-list lines="two">
          <v-list-item
            v-for="comment in comments"
            :key="comment?.id"
            :title="comment?.user?.firstName + ' '+ comment?.user?.lastName"
            :subtitle="comment?.text"
            :prepend-avatar="comment?.user?.avatar"
          ></v-list-item>
        </v-list>
      </v-card>
      <popupComponent v-if="showPopup" :text="msgPopup"></popupComponent>
  </div>
</template>
<style scoped>
.btn {
  background-color: #FC2016;
  width: 70%;
  color: white;
}
.liked {
  color: #FC2016;
}
</style>