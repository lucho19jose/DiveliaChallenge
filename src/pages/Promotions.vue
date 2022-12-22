<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const promotions = ref([]);
const page = ref(1)
async function getPromotions(){
  try {
    loading.value = true;
    const response = await axios.get(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/?page=${page.value}&limit=10`)
    promotions.value = promotions.value.concat(response.data.items)
    console.log("data", response.data.items);
  } catch (error) {
    console.log(error);
  }
  finally{
    loading.value = false;
  }
}
getPromotions()

onMounted(()=>{
  const promoContainer = document.querySelector('#promotions-container');
  console.log(promoContainer);
  promoContainer.addEventListener('scroll', e => {
    if(promoContainer.scrollTop + promoContainer.clientHeight+5 >= promoContainer.scrollHeight){
      console.log("Load more...");
      page.value++;
      getPromotions();
    }
  })
})

const logout = () => {
  localStorage.clear('login'); 
  router.push({ name: 'Login'});
}

</script>
<template>
  <div>
    <p class="text-center">
      <span class="text-h5 font-weight-bold text-red">Todas la promociones</span>
    </p>
    <div class="my-10 d-flex justify-center" style="width: 100%;">
      <div class="d-flex justify-space-between align-center" style="width: 400px;">
        <span>últimas promociones</span> 
        <span>
          <v-chip
            class="ma-2"
            color="red"
            text-color="white"
            @click="logout()"
          >
          Cerrar Sesion
          </v-chip>
        </span>
      </div>
    </div>
    <div id="promotions-container" class="promotions">
      <div v-show="loading">
        <div class="d-flex justify-center">
          <v-progress-circular indeterminate :size="51" color="red"></v-progress-circular>
        </div>
      </div>
      <v-card
        class="mx-auto mb-5"
        max-width="400"
        v-for="promotion in promotions" :key="promotion.id"
        @click="router.push({ name: 'Promotion', params: { id: promotion.id } })"
      >
        <v-img
          class="align-end text-white"
          height="200"
          :src="promotion.image"
          cover
        >
        </v-img>
        <v-card-title>{{ promotion.title }}</v-card-title>
        <v-card-text>
          <div>{{ promotion.description }}</div>
        </v-card-text>
        <v-card-actions class="card-actions">
          <v-list-item class="w-100">
            <template v-slot:prepend>
              <v-avatar
                color="grey-darken-3"
                :image="promotion.user.avatar"
              ></v-avatar>
            </template>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
.card-actions{
  position: absolute;
  top: 160px;
  left: -20px;
  z-index: 100;
}
.promotions {
  height: 800px; 
  overflow-y:scroll;
}
.promotions::-webkit-scrollbar {
  display: none;
}
</style>