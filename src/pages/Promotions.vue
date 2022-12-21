<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const promotions = ref([]);
async function getPromotions(){
  const response = await axios.get('https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/?page=1&limit=10')
  promotions.value = response.data.items
  console.log("data", response.data.items);
}
getPromotions()

</script>
<template>
  <div>
    <p class="text-center">
      <span class="text-h5 font-weight-bold text-red">Todas la promociones</span>
    </p>
    <p class="my-10">últimas promociones</p>
    <div>
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

        <!-- <v-card-subtitle class="pt-4">
          Number 10
        </v-card-subtitle> -->

        <v-card-text>
          <!-- <div>Whitehaven Beach</div> -->

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
            <!-- <v-list-item-title>Evan You</v-list-item-title> -->
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
</style>